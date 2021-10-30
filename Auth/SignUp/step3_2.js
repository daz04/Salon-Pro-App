import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import SchedualeHeader from '../../Headers/scheduale'
import {ProgressBar, Colors} from 'react-native-paper'
import TimeSlot from '../../components/timeSlot'
import {postAvailabilityForStylist, postSchedualeForStylist, updateStylistStatus} from '../../Database/functions'
import moment from 'moment'


const Step3_2 = (props) => {
    //this is where we handle time availability 
    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"]
    const times = ["Early", "Morning", "Noon", "Afternoon", "Evening", "Night"]
    const [selectedDates, setDates] = useState(["Monday"])
    const [currentDate, setDate] = useState("Monday")
    const [timeSlots, setTime] = useState({"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[],"Saturday":[],"Sunday":[]})
    const [disable,setDisable] = useState(true)

    const goBack = () => {
        props.navigation.goBack()
    }
    const addSlot = (time) => {
        console.log("AT ADD SLOT")
        console.log(currentDate)
        console.log(timeSlots)
        // if (timeSlots[currentDate]==null){
        //     timeSlots[currentDate] = [time]
            
        // }
        if (!(timeSlots[currentDate].includes(time))){
            setDisable(false)
            var arr = timeSlots[currentDate]
            arr.push(time)
            timeSlots[currentDate] = arr
        } else {
            var index = timeSlots[currentDate].indexOf(time)
            var newArr = timeSlots[currentDate]
            newArr.splice(index,1)
            var count = 0
            for (var key in timeSlots){
                if (timeSlots[key].length>0){
                    count +=1
                    if (count>1){
                        break
                    }
                }
            }
            if (count<1){
                setDisable(true)
            }
            timeSlots[currentDate] = newArr
        }
        setTime({...timeSlots})

    }
    const handlenewdate = (date) => {
        if (!(selectedDates.includes(date))){
            setDates(selectedDates=> ([...selectedDates,date]))

        }
        setDate(date)

    }
    const submit = () => {
        postSchedualeForStylist(timeSlots,moment().format('YYYY-MM-DD'))
        postAvailabilityForStylist(timeSlots)
        const {navigate} = props.navigation
        var stylistPayload = props.navigation.state.params.stylistPayload
        updateStylistStatus(stylistPayload.id, "Approve", (result)=> {
            console.log("IN UPDATE STYLIST STATUS TO APPROVE FINALLY")
            console.log(result)

        })
        var formattedNum = props.navigation.state.params.formattedNum
        stylistPayload['weeklyScheduale'] = timeSlots
        navigate("Profile", {
            stylistPayload: stylistPayload,
            formattedNum: formattedNum
        })

    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 3 
                </Text>



                <ProgressBar progress={1} color={"#1A2232"} style={styles.progressBar}/>
            </View>
            <View style={styles.titleBox}>
                <View>
            <Text style={styles.title}>Set your availability</Text>
            <Text style={styles.subTitle}>Choose at least one time slot</Text>
            </View>
            </View>
           
            <View style={styles.scroll}>
               
            {days.map((date)=>
                <TouchableOpacity style={styles.dateSlot} onPress={()=>handlenewdate(date)}>
                    <View style={{ padding:10,borderRadius:20,width: Dimensions.get('window').width/7.5, height: 100,flexDirection:'column',justifyContent:'center',alignContent:'center', backgroundColor: date==currentDate?"#1A2232":"transparent"}}>
                    <Text style={{alignSelf: 'center', fontSize:15, color: date==currentDate?"white":"#1A2232"}}>{date.substring(0,2)}</Text>
                    
                    </View>

                </TouchableOpacity>)}
               
            </View>
            <View style={styles.timeFrame}>
                {times.map((time)=> 
                
                {
                    var selected = false
                    if (timeSlots[currentDate]!=null && timeSlots[currentDate].includes(time)){
                        selected=true
                    }
                   
                    return (
                 <TouchableOpacity style={styles.intervalBox} onPress={()=>{addSlot(time)}}>
                 <TimeSlot time={time} selected={selected}/>
                </TouchableOpacity>
                    )

                })}
           
            

          
            </View>
            </View>
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                position: 'absolute',
                bottom:0,
               height:Dimensions.get('window').height*0.08,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                width: Dimensions.get('window').width ,
                
               
            }} disabled={disable} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Submit</Text>
            </TouchableOpacity>
           
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column"
    },
    stepHeader: {
        marginTop:20,
        alignSelf: 'center',
        width: 200
        
        

    },
    stepText: {
        fontSize:18,
        fontWeight:'600',
        alignSelf: 'center',
        marginBottom:10
    },
    progressBar: {
        width: '100%'
    },
    dateSlot: {
        width: Dimensions.get('window').width/7.5,
        height: 100,
        borderRadius:20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center",
    
        marginBottom:0,
        paddingBottom:0,
        


    },
    scroll: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'space-between'
    
   
    },
    title: {
        fontSize:22,
        fontWeight:'500',
       
        
        marginLeft:10,
        marginBottom:5
    },
    titleBox: {
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'space-between',
        marginTop:'7%',
        marginBottom:0
    },
    timeFrame: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight:20,
        paddingLeft:20,
        marginTop:'10%',
        justifyContent: 'space-between',
        
    },
    intervalBox: {
        width:100,
        height:100,
        marginTop:10
     
        
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: 'center',
        position: 'absolute',
        bottom:0,
        height:70,
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        width: Dimensions.get('window').width ,
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:20,
        // marginBottom:20,
        height:60,
       
    },
    subTitle:{
        fontSize:16,
        marginBottom:20,
        marginLeft:10,
        marginBottom:20
    },
    body: {
        height: Dimensions.get('window').height-60,
        width: '100%'
    }

})

export default Step3_2