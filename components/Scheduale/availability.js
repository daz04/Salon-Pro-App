import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import SchedualeHeader from '../../Headers/scheduale'
import {ProgressBar, Colors} from 'react-native-paper'
import TimeSlot from '../../components/timeSlot'
import {postAvailabilityForStylist, getAvailabilityForStylist, updateAvailability} from '../../Database/functions'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';


const Availability = (props) => {
    //this is where we handle time availability 
    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"]
    const times = ["Early", "Morning", "Noon", "Afternoon", "Evening", "Night"]
    const [selectedDates, setDates] = useState(["Monday"])
    const [currentDate, setDate] = useState("Monday")
    const [refresh, setRefresh] = useState(false)
    const [timeSlots, setTime] = useState(null)
    // const [timeSlots, setTime] = useState({"Monday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false

    // },"Tuesday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false
    // },"Wednesday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false
    // },"Thursday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false
    // },"Friday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false
    // },"Saturday":{
    //     'Early': false,
    //     'Morning':false,
    //     'Noon': false,
    //     'Afternoon': false,
    //     'Evening': false,
    //     'Night': false
    // },"Sunday":
    // { 'Early': false,
    // 'Morning':false,
    // 'Noon': false,
    // 'Afternoon': false,
    // 'Evening': false,
    // 'Night': false}})
    const [disable,setDisable] = useState(true)
    const [fetched, setFetched] = useState(false)
    const [stylistId, setstylistId] = useState(null)
    const [availability, setAvailability] = useState(null)
    const [insertDates, setInsertDates] = useState({})
    const [removeDates, setRemoveDates] = useState({})


    useEffect(()=> {
        console.log("IN USE EFFECT AGAIN")
        if (fetched==false){
            setFetched(true)
            getAvailabilityForStylist((fillTimeSlots))

        }
       

    },[])
    // const goBack = () => {
    //     props.navigation.goBack()
    // }

    const fillTimeSlots = (result) => {
        
        var response = result[0]
        setstylistId(response.stylistId)
        var timeDict = {}
       
        for (var key in Object.keys(response)){
            if (key!="stylistid"){
                timeDict[Object.keys(response)[key]] = response[Object.keys(response)[key]]
            }
        }
        console.log("TIME DICT IN FILL TIME SLOTS")
        console.log(timeDict)
        setTime(timeDict)
    //     console.log("FILL TIME SLOT RESPONSE")
    //     console.log(response)
    //     console.log("RESPONSE MONDAY")
    //     console.log(response['Monday'])
    //     console.log("THE RESPONSE KEYS")
    //     console.log(Object.keys(response))
    //     var tempTimeSlot = {"Sunday": {}, "Monday":{},
    // "Tuesday":{}, "Wednesday":{}, "Thursday":{}, "Friday":{}, "Saturday":{}}
    //     for (var day in Object.keys(response)){
    //         if (day!='stylistid'){
    //             console.log("THE DAY IN THE WEEKDAYS")
    //             console.log(day)
    //             console.log("IN OBJECT KEYS LOOP 123")
    //             console.log(Object.keys(response)[day])
    //             var weekDay = Object.keys(response)[day]
    //             console.log("THE WEEK DAY PRINTED")
    //             console.log(weekDay)
    //             for (var time in response[weekDay]){
    //                 var timeSlot = response[weekDay][time]
    //                 console.log("TIME SLOT IN LOOP HERE")
    //                 console.log(timeSlot)
    //                 console.log(weekDay)
               
    //                 tempTimeSlot[weekDay][timeSlot] = true
    //                 console.log("THE TEMP TIME SLOT AFTER BEING SET 1234")
    //                 console.log(tempTimeSlot)
    //             }
    //     }
    //     // console.log("TIME SLOTS BEFORE SET 2")
    //     console.log("THE TEMP TIME SLOT")
    //     console.log(tempTimeSlot)
    //     // console.log(timeSlots)
    // }
    //     // timeSlots['Monday'] = response['Monday']
    //     // timeSlots['Tuesday'] = response['Tuesday']
    //     // timeSlots['Wednesday'] = response['Wednesday']
    //     // timeSlots['Thursday'] = response['Thursday']
    //     // timeSlots['Friday'] = response['Friday']
    //     // timeSlots['Saturday'] = response['Saturday']
    //     // timeSlots['Sunday'] = response['Sunday']
    //     // setAvailability(availability)
    //     setTime(tempTimeSlot)
       

    }

    const update_Availability = () => {
        // var updatedDict = {'Monday':[],'Tuesday':[],'Wednesday':[],'Thursday': [], 'Friday':[],'Saturday':[],'Sunday':[]}
        // for (var day in timeSlots){
        //     for (var time in timeSlots[day]){
        //         if (timeSlots[day][time]==true && !(updatedDict[day].includes(time))){
        //             updatedDict[day].push(time)
        //         }
        //     }

        // }
        
        //remove dates with current date 
        // for (var day in removeDates){
        //     var availabilityList = timeSlots[day]
        //     for (var elem in removeDates[day]){
        //         timeSlots[day] = timeSlots[day].filter(obj => obj != removeDates[day][elem])
        //     }

        // }
        // for (var day in insertDates){
        //     var availabilityList = timeSlots[day]
        //     for (var elem in insertDates[day]){
        //         timeSlots[day].push(insertDates[day][elem])
        //     }
        // }
        var tempSlots = timeSlots
        tempSlots['stylistid'] = stylistId

        updateAvailability(tempSlots, (result)=> {
            console.log("UPDATE AVAILABILITY RESPONSE 123")
            console.log(result)
            if (result==false){
                Alert.alert("Network Error", "Network error occured")
            } else {
                setFetched(false)
                props.goBack()
            }
        })
        //after i made the edits now I need to make the update to availability

    }

    const removeTimeSlot = (time) => {
        //i have availability dict, what is pulled from database 

        // timeSlots[currentDate] = timeSlots[currentDate].filter(elem => elem!=time)
        // setTime(timeSlots=> ({...timeSlots}))
       




        // if (removeDates[currentDate]==null){
        //     removeDates[currentDate] = [time]
        //     setRemoveDates(removeDates)
        // }else {
        //     if (!removeDates[currentDate].includes(time)){
        //         removeDates[currentDate].push(time)
        //         setRemoveDates(removeDates)

        //     }
            
        // }
        // if (insertDates[currentDate]!=null && insertDates[currentDate].includes(time)){
        //     insertDates[currentDate] = insertDates[currentDate].filter(elem => elem!=time)
        //     setInsertDates(insertDates)
        // }
    }


    const addTimeSlot = (time) => {
        //adding time slot to something that is not already in the availability dict
        //first check if time slot is added in the list before or not 
        var tempSlots = timeSlots

        tempSlots[currentDate].push(time)
        setTime(tempSlots)

        // if (timeSlots[time]==null){
        //     console.log("IN TIME SLOT IS NULL")
        //     if (insertDates[currentDate]==null){
        //         insertDates[currentDate] = [time]
        //         setInsertDates(insertDates)
        //     } else {
        //         if (!insertDates[currentDate].includes(time)){
        //             insertDates[currentDate].push(time)
        //             setInsertDates(insertDates)
        //         }
        //     }

        // }
        // if (removeDates[currentDate]!=null && removeDates[currentDate].includes(time)){
        //     //remove it from the removed dates
        //     removeDates[currentDate] = removeDates[currentDate].filter(elem => elem !=time)
        //     setRemoveDates(removeDates)
        // }
        


    }

    const modifySlot = (time) => {
        // if (timeSlots[currentDate][time]==false){
        //     timeSlots[currentDate][time] = true
        // } else {
        //     timeSlots[currentDate][time] = false
        // }
        // setTime(timeSlots)
        // setRefresh(!refresh)
        console.log("IN MODIFY SLOT 12345")
        if (timeSlots[currentDate].includes(time)){
            var tempSlots = timeSlots
            tempSlots[currentDate] = tempSlots[currentDate].filter(element=> element!=time)
            setTime(tempSlots)
            // console.log("ABOUT TO REMOVE TIME SLOT")
            
            // removeTimeSlot(time)
        } else {
            console.log("IN ADD TIME")
            var tempSlots = timeSlots
            tempSlots[currentDate].push(time)
            setTime(tempSlots)
        }
        setRefresh(!refresh)
    }
    if (fetched==false){
        setFetched(true)
        getAvailabilityForStylist(fillTimeSlots)
    }
    const addSlot = (time) => {
        console.log("AT ADD SLOT")
        console.log(currentDate)
        console.log(timeSlots)
        // if (timeSlots[currentDate]==null){
        //     timeSlots[currentDate] = [time]
            
        // }
       
        // if (!(timeSlots[currentDate].includes(time))){
        //     setDisable(false)
        //     var arr = timeSlots[currentDate]
        //     arr.push(time)
        //     timeSlots[currentDate] = arr
        // } else {
        //     var index = timeSlots[currentDate].indexOf(time)
        //     var newArr = timeSlots[currentDate]
        //     newArr.splice(index,1)
        //     var count = 0
        //     for (var key in timeSlots){
        //         if (timeSlots[key].length>0){
        //             count +=1
        //             if (count>1){
        //                 break
        //             }
        //         }
        //     }
        //     if (count<1){
        //         setDisable(true)
        //     }
        //     timeSlots[currentDate] = newArr
        // }
        // setTime({...timeSlots})

    }
    const handlenewdate = (date) => {
        if (!(selectedDates.includes(date))){
            setDates(selectedDates=> ([...selectedDates,date]))

        }
        setDate(date)

    }
    console.log("RELOADEDDDD")
    // const submit = () => {
    //     postAvailabilityForStylist(timeSlots)
    //     const {navigate} = props.navigation
    //     var stylistPayload = props.navigation.state.params.stylistPayload
    //     var formattedNum = props.navigation.state.params.formattedNum
    //     stylistPayload['weeklyScheduale'] = timeSlots
    //     navigate("Profile", {
    //         stylistPayload: stylistPayload,
    //         formattedNum: formattedNum
    //     })

    // }

   
    if (timeSlots!=null){
        console.log("THE TIME SLOTS SET")
        console.log(currentDate)
        console.log(timeSlots[currentDate])
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            {/* <SchedualeHeader backwards={goBack}/> */}
            {/* <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 3 
                </Text>



                <ProgressBar progress={1} color={"#1A2232"} style={styles.progressBar}/>
            </View> */}
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

                
                {timeSlots!=null &&

                times.map((time)=> 
                
               
                
                {
                   console.log("TIME SLOTS PRINT 2")
                   console.log(timeSlots[currentDate][time])
                   var selected = false
                   if (timeSlots[currentDate].includes(time)){
                       selected = true

                   }
               
                //     var selected = false
                //     if (timeSlots[currentDate][time]==true){
                //         selected=true
                //     }
                //     // if ((timeSlots[currentDate]!=null && timeSlots[currentDate].includes(time))){
                //     //     console.log("SELECTED IS TRUE 2")
                //     //     console.log(time)
                //     //     console.log(timeSlots[currentDate])
                //     //     selected=true
                        
                //     // } 
                //     console.log("GENERATED TIME SLOT VARIABLE")
                    var time_Slot = <TimeSlot time={time} selected={selected}/>
                   
                    return (
                 <TouchableOpacity style={styles.intervalBox} onPress={()=>{modifySlot(time)}}>
                     {/* <Text>{time}</Text> */}
                 {time_Slot}
                </TouchableOpacity>
                    )
                    

                })}
            


           
            

          
            </View>
            
           
            
            </View>
            {/* <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                position: 'absolute',
                bottom:0,
                height:60,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                width: Dimensions.get('window').width ,
                
               
            }} disabled={disable} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Submit</Text>
            </TouchableOpacity>
            
            */}
            <TouchableOpacity style={styles.bottom} onPress={()=> update_Availability()}>
                <Text style={styles.busyText}>UPDATE YOUR WEEKLY AVAILABILITY</Text>

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
    body: {
        height: Dimensions.get('window').height*0.7

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
        
        // padding:10,
        marginBottom:0,
        paddingBottom:0,
        
      
        // backgroundColor: "#1A2232"


    },
    bottom: {
        position: 'absolute',
        bottom:Dimensions.get('window').height*0.13,
        width:'100%',
        height:Dimensions.get("window").height*0.1,
        backgroundColor: '#1A2232',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    busyText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight:'600'
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
        // flex: 1,
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

export default Availability