import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {getSchedualeForStylist} from '../../Database/functions'

const CalendarTime = (props) => {
    console.log("WINDOW HEIGHT")
    console.log(Dimensions.get("window").height)
    const [selectedList, setSelected] = useState([])
    const [fetched, setFetched] = useState(false)
    const [currentDate, setDate] = useState(null)
    const [schedualeId, setId] = useState(null)
    const [loading, setLoading] = useState(true)
    
    //stylist supossed to put in start and end times
    var date = props.date 

    if (currentDate!=date){
        if (selectedList.length>0){
            setSelected(selectedList=>[])

        }
        console.log("CURRENT DATEE")
        console.log(currentDate)
        console.log(date)
        
        console.log("IN GET SCHEDUALE FOR STYLIST")
        getSchedualeForStylist(date,(result)=> {
            console.log("THE SCHEDUALE RESULT")
            console.log(result)
            if (result!=null){
                setId(result[0].schedualeId)
                // if (dat)
                // if (schedualeId==null){
                //     setId(result[0].schedualeId)
                // }
                //means there is no error
                //how to handle errors when they come up?
                var response = result[0]
                var intervals = response['AvailableIntervals']
                console.log("INTERVALS")
                console.log(intervals)
                var tempList = []
                for (var interval in intervals){
                    console.log("INTERVAL IN INTERVALS")
                    console.log(intervals[interval])
                    var am_pm = intervals[interval].slice(-2)
                    var startHour = intervals[interval].split('-')[0]
                    var endHour = intervals[interval].split('-')[1].slice(0,-2)
                    console.log("AM PM")
                    console.log(am_pm)
                    console.log("START HOUR")
                    console.log(startHour)
                    console.log("END HOUR")
                    console.log(endHour)
                    
                    for (var i=Number(startHour); i<Number(endHour);i++){
                        var newTime = String(i)+"-"+String(i+1)+":00 " +am_pm
                        console.log("NEW TIME")
                        console.log(newTime)
                        if (!(selectedList.includes(newTime))){
                            tempList.push(newTime)
                           

                        }
                        

                    }

                   
                }
                setSelected(selectedList=> tempList)
                //only be only entry in result cause each day is mapped to one record
    
    
            }
            setDate(date)
            setLoading(false)
            //setLoading(false)
           
        })
        //setLoading(true)

    }
    
    //get day of week of date and return availability 
    var timeSlots = ["8-9:00 AM","9-10:00 AM","10-11:00 AM", "11-12:00 PM",
    "12-1:00 PM","1-2:00 PM","2-3:00 PM", "3-4:00 PM", "4-5:00 PM","5-6:00 PM",
    "6-7:00 PM", "7-8:00 PM", "8-9:00 PM", "9-10:00 PM", "10-11:00 PM"]
    const modifyTime = (time) => {
        console.log("THE SELECTED LIST")
        console.log(selectedList)
        if (!(selectedList.includes(time))){
            console.log("IN TIME INSERT DATA")
            props.insertDate({'date':date, 'time':time, 'schedualeId':schedualeId})
         
            setSelected(selectedList=> ([...selectedList,time]))
            //we are appending it
            
        } else {
            console.log("IN TIME DELETE DATA")
            console.log(date)
            console.log(time)
            props.deleteDate({'date':date, 'time':time, 'schedualeId':schedualeId})
            setSelected(selectedList.filter(select => select!= time))
           
        }
    }
    console.log("THE SELECTED LIST")
    console.log(selectedList)
    //need to get availability for that day or set time slots 
    return (
        <View style={styles.container}>
            <Text style={styles.timeTitle}>TIME SLOTS</Text>
            <ScrollView style={{height:'100%'}}>
            {loading ?
            <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#1A2232"/>
            </View>
            :
            <View style={styles.body}>
                
                {timeSlots.map((time) => {
                    return (
                        <View style={styles.timeHolder}>
                            <TouchableOpacity onPress={()=>modifyTime(time)} style={{
                                backgroundColor: selectedList.includes(time)?"#1A2232":"white",
                                width:Dimensions.get("window").width*0.25,
                                height:40,
                                borderRadius:50,
                                borderWidth:0.5,
                                borderColor: 'grey',
                                
                                flexDirection: 'row',
                                justifyContent: 'center',
                                margin:10
                            }}>

                            
                            <Text style={{alignSelf: 'center', color: selectedList.includes(time)?"white":"#1A2232"}}>{time}</Text>
                            </TouchableOpacity>
                            </View>
                    )
                })}
               

                </View>
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:Dimensions.get("window").height*0.4,
        
       

    },
    body:{
        flexDirection: 'row',
        flexWrap:'wrap',
        width:'100%'

    },
    timeSlot: {
        width:100,
        height:40,
        borderRadius:50,
        borderWidth:0.5,
        borderColor: 'grey',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timeText: {
        alignSelf: 'center',
        fontWeight:'400',
        fontSize:12
    },
    timeTitle: {
        fontSize:11,
        fontWeight:'600',
        color: "#1A2232",
        marginLeft:20

    },
    timeHolder: {
        paddingLeft:10
    }
})
export default CalendarTime