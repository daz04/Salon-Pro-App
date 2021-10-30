// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import moment from 'moment'
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
// import {AntDesign} from 'react-native-vector-icons'
// import calendarWrapper from './calendarWrapper'
// import CalendarWrapper from './calendarWrapper';
// import CalendarPicker from 'react-native-calendar-picker'
// import CalendarTime from './times'
// // import SchedualeHeader from '../../Headers/scheduale'
// import TimeSlot from '../timeSlot'
// import {updateScheduale, getScheduale, getSchedualeForStylist} from '../../Database/functions'
// import { useSharedValue } from 'react-native-reanimated';


// const CalendarView = (props) => {
//     var today = moment().format('YYYY-MM-DD')
//     const times = ["Early", "Morning", "Noon", "Afternoon", "Evening", "Night"]
//     const [selectedDate, setDate] = useState(Date.now())
//     const [insertDates, setInsertDates] = useState({})
//     const [removeDates, setRemoveDates] = useState({})
//     const [id, setId] = useState(null)
//     const [scheduale, setScheduale] = useState({})
//     const [loading, setLoading] = useState(null)
//     const [currentMonthComputed, setcurrentMonthComputed] = useState(false)
//     const [visited, setVisited] = useState([])
    
//     const [timeSlots, setTime] = useState({
//         today: {disabled:false}

//     })

    
    
//     const [selected, setSelected] = useState({})
//     const [days, setDays] = useState({"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[], "Saturday":[],"Sunday":[]})
//     const [currentDate, setCurrent] = useState(today)
//     const [calendar, setCalendar] = useState(<CalendarWrapper current={moment().format('YYYY-MM-DD')}/>)
//     const [markedDay, setMarked] = useState(moment().format("YYYY-MM-DD"))
//     const [eligibleDays, setEligible] = useState({})
//     const [customDates, setcustomDates] = useState([])
//     const [savedAvailability, getsavedAvailability] = useState(null)
//     const [disable,setDisable] = useState(true)

//     const type = props.type 

//     const addDate = (date) => {
//         console.log("IN APPEND DATES IN SCHEDUALE")
//         var day = date['date']
//         var time = date['time']
//         var schedualeId = date['schedualeId']
//         //input is just one date object so in format: {'YYYY-MM-DD': slot}
//         //check if it is delete or not
//         var day = date['date']
//         var time = date['time']
//         if (day in removeDates){
//             removeDates[day] = removeDates[day].filter(elem => elem!=time)
//             setRemoveDates(removeDates)
           
//             scheduale[schedualeId] = {'dates':day}
//             setScheduale(scheduale)
            
//         } else {
//             if (day in insertDates){
//                 insertDates[day].push(time)
//             } else {
//                 insertDates[day] = [time]
//             }
//             setInsertDates(insertDates)
//             scheduale[schedualeId] = {'dates':day}
//             setScheduale(scheduale)
//         }
       
     
//     }
//     const removeDate = (date) => {
//         console.log("IN DELETE DATES IN IN SCHEDUALE")
//         console.log("THE DATE")
//         console.log(date)
//         //input is just one date object so in format: {'YYYY-MM-DD': slot}
//         //check if it is in insert cause could have been added as an insert 
//         var day = date['date']
//         var time = date['time']
//         var schedualeId = date['schedualeId']
       
//         if (day in insertDates){
//             //we put in as an insert previously and now want to remove it
//             insertDates[day] = insertDates[day].filter(elem => elem!=time)
//             setInsertDates(insertDates)
//             scheduale[schedualeId] = {'date':day}
//             setScheduale(scheduale)
//             //remove slot
//         } else {
//             //means this time slot was not originally selected, so to remove it it should have already been set
//             //we wat to remove it
//             if (day in removeDates){
//                 removeDates[day].push(time)
//             } else {
//                 removeDates[day] = [time]
//             }
//             console.log("REMOVE DATES")
//             console.log(removeDates)
//             setRemoveDates(removeDates)
//             scheduale[schedualeId] = {'date':day}
//             setScheduale(scheduale)
//         }
        
//     }
//     const addSlot = (time) => {
//         console.log("AT ADD SLOT")
//         console.log(currentDate)
//         console.log(timeSlots)
//         console.log(currentDate)
//         if (timeSlots[currentDate]==null){
//             timeSlots[currentDate] = []

//         }
//         // if (timeSlots[currentDate]==null){
//         //     timeSlots[currentDate] = [time]
            
//         // }
//         if (!(timeSlots[currentDate].includes(time))){
//             setDisable(false)
//             var arr = timeSlots[currentDate]
//             arr.push(time)
//             timeSlots[currentDate] = arr
//         } else {
//             var index = timeSlots[currentDate].indexOf(time)
//             var newArr = timeSlots[currentDate]
//             newArr.splice(index,1)
//             var count = 0
//             for (var key in timeSlots){
//                 if (timeSlots[key].length>0){
//                     count +=1
//                     if (count>1){
//                         break
//                     }
//                 }
//             }
//             if (count<1){
//                 setDisable(true)
//             }
//             timeSlots[currentDate] = newArr
//         }
//         setTime({...timeSlots})

//     }

//     const monthIterator = (month, year, count, totalLen, tempList) => {
//         if (count==totalLen+1){
//             console.log("MONTH ITERATOR ENDED")
//             setEligible({...eligibleDays})
//             setLoading(false)
//             if (currentMonthComputed==false){
//                 setcurrentMonthComputed(true)

//             }
            
//         } else {
//             setLoading(true)
//             var tempMonth = null 
//             if (month.month==null){
//                 tempMonth = month
//             } else {
//                 tempMonth = month.month
//             }
//             //var tempMonth = month.month
//             if (String(tempMonth).length==1){
//                 tempMonth= "0"+String(tempMonth)
//             }
//             var tempDay = count
//             console.log("LEN OF TEMP DAY 4")
//             console.log(String(tempDay).length)
//             if (String(tempDay).length==1){
//                 tempDay= "0"+ String(tempDay)
//             }

//             var tempDate = `${year}-${tempMonth}-${tempDay}T00:00:00`
//             console.log("THE TEMP DATE 2")
//             console.log(tempDate)
//             var thedate = moment(tempDate).format("YYYY-MM-DD")
//             console.log(count)
//             console.log(month.month)
//             console.log(year)
//             console.log("THE DATE BLAH 8")
            
//             console.log(thedate)
//             getSchedualeForStylist(thedate, (result)=> {
//                 console.log("IN GET SCHEDUALE FOR STYLIST THE RESULT")
//                 var available = false
//                 if (result!=null){
//                     console.log("SCHEDUALE FOR STYLIST RESPONSE")
//                     console.log(result)
//                     if (result.length>0  && result[0].AvailableIntervals.length>0 && result[0].AvailableIntervals[0]!=""){
//                         console.log("LENGTH OF SCHEDUALE RESULT GREATER THAN 0")
//                         available = true
//                         eligibleDays[thedate] = {dotColor: "green", marked:true}
//                         setEligible({...eligibleDays})


//                     }
//                     if (available==false){
//                         console.log("IN AVAILABLE IS FALSE")
                        
//                         eligibleDays[thedate] = {dotColor: "red", marked:true}
                        
//                     }
//                     monthIterator(month,year,count+1,totalLen, tempList)
                    
//                 } else {
//                     console.log("IN AVAILABLE IS FALSE")
//                     eligibleDays[thedate] = {dotColor: "red", marked:true}
//                     //setEligible({...eligibleDays})
//                     monthIterator(month,year,count+1,totalLen, tempList)

//                 }
        
//             })

//         }

//     }

     

//     const computemonthAvailability = (month_) => {
//         console.log("IN COMPUTE MONTH AVAILABILITY")
//         var thecurrentYear = moment(Date.now()).format("YYYY")
//         console.log("THE CURRENT YEAR")
//         console.log(thecurrentYear)
//         console.log("THE CURRENT MONTH 2")
//         console.log(month_.month)
//         var themonth = null 
//         if (month_.month==null){
//             themonth = month_
//         } else {
//             themonth = month_.month
//         }
//         var daysInMonth = new Date(thecurrentYear,themonth,0).getDate()
//         console.log("DAYS IN MONTH")
//         console.log(daysInMonth)
//         if (!visited.includes(`${themonth}-${thecurrentYear}`)){
//             monthIterator(month_,thecurrentYear,1, daysInMonth, [])
//             setVisited(visited=> ([...visited, `${themonth}-${thecurrentYear}`]))

//         }
        
//     }

//     const computeDates = () => {
//         if (currentDate!=null){
//             var month = moment(currentDate).format("MM")
            

//         }
//     }
//     // let newDaysObject = {}
//     // markedDays.forEach((day)=>{
//     //     newDaysObject={
//     //         ...newDaysObject, [day]: {
//     //             selected:true,
//     //             selectedColor: "#1A2232"
//     //         }
//     //     }
//     // })
//     const generateCalendarSequence = (month) => {
//         var today = moment().format()
//         var month = today.format('M')
//         var day = today.format('D')
//         var year = today.format('YYYY')

//     }
//     const getCurrentDate = () => {
//         return moment().format('YYYY-MM-DD')
//     }
//     const getCurrentMonth = () =>{
//         return moment(currentDate).format("MMMM")
//     }
//     const getCurrentYear = () => {
//         return moment(currentDate).format("YYYY")
//     }
//     const monthBack = () => {
//         var newDate = moment(currentDate).subtract(1,'months').format("YYYY-MM-DD")
//         console.log("MONTH BACK")
//         console.log(newDate)
//         setCurrent(newDate)
//         console.log(currentDate)
//         setCalendar(<CalendarWrapper current={newDate}/>)

//     }
//     const monthForward = (month_) => {
//         //compute the year first
//         var newDate = null
        
//         var currentMonth = moment(currentDate).format("M")
//         console.log("THE CURRENT MONTH IN MONTH FORWARD")
//         console.log(currentMonth)
//         console.log("THE MONTH PASSED IN MONTH FORWARD")
//         console.log(month_.month)
//         if (currentMonth<month_.month){
//             newDate = moment(currentDate).add(1,"months").format("YYYY-MM-DD")
            

//         } else {
//             var newDate = moment(currentDate).subtract(1,"months").format("YYYY-MM-DD")
//         }
        
        
//         setCurrent(newDate)
//         console.log(currentDate)
//         setCalendar( <CalendarWrapper current={newDate}/>)
//     }
//     var calenderElem = null
//     const getCurrent = () => {
//         console.log("AT GET CURRENT")
//         return currentDate
//     }
//     const onDateChange = (date) => {



//     }
//     const backwards = () => {
//         props.callback()
//     }

//     const goBack = () => {
//         props.goBack()
//     }



//     // const iterator = (count) => {
//     //     if (count==1){
//     //         console.log("done")
//     //     } else {
//     //         console.log(Object.keys(scheduale)[0])
//     //         console.log("THE COUNT")
//     //         console.log(count)
//     //         var elem = Object.keys(scheduale)[count]
//     //         console.log("THE ELEM")
//     //         console.log(elem)
//     //         var date = scheduale[elem]['dates']
//     //         console.log("THE DATE")
//     //         console.log(date)
//     //         getScheduale(Object.keys(scheduale)[count], (result)=> {
//     //             console.log("THE RESPONSEEEE")
//     //             console.log(result)
//     //             if (result!=null){
//     //                 var intervals = result[0].AvailableIntervals
//     //                 console.log("THE INTERVALS")
//     //                 console.log(intervals)
                    
//     //                 if (insertDates[date]!=null){
//     //                     for (var day_ in insertDates[date]){
//     //                         intervals.push(insertDates[date][day_])

//     //                     }
                        
//     //                     console.log("INTERVALS AT INSERT")
//     //                     console.log(intervals)
//     //                     updateScheduale(elem,intervals, (response)=> {
//     //                         var newCount = count +=1
//     //                         iterator(newCount)

//     //                     })
//     //                     //we need to make an update
        
//     //                 }
//     //                 if (removeDates[date]!=null){
//     //                     for (var time_ in removeDates[date]){
//     //                         intervals = intervals.filter(element => element!=time_)

//     //                     }
                        
//     //                     updateScheduale(elem,intervals, (response)=> {
//     //                         var newCount = count +=1
//     //                         iterator(newCount)

//     //                     })
//     //                 }

//     //             }
//     //             var newCount = count +=1
//     //             iterator(newCount)
//     //         })

           

           
//     //     }

//     // }


//     const update_Scheduale = () => {
//         console.log("IN UPDATE SCHEDUALE")
//         console.log(scheduale)
//         console.log("SELECTED DATE")
//         console.log(currentDate)
//         console.log(moment(currentDate).format('YYYY-MM-DD'))


//         for (var elem in scheduale){
//             if (scheduale[elem]['dates']==moment(currentDate).format('YYYY-MM-DD')){
//                 console.log("scheduale elem")
//                 console.log(elem)
                
//                 getScheduale(elem, (result)=> {
//                     console.log("THE RESPONSEEEE")
//                     console.log(result)
//                     if (result!=null){
//                         var intervals = result[0].AvailableIntervals
//                         console.log("THE INTERVALS")
//                         console.log(intervals)
                        
//                         if (insertDates[currentDate]!=null){
//                             for (var day_ in insertDates[currentDate]){
//                                 intervals.push(insertDates[currentDate][day_])
    
//                             }
                            
//                             console.log("INTERVALS AT INSERT")
//                             console.log(intervals)
//                             updateScheduale(elem,intervals, (response)=> {
//                                 console.log(response)
                               
    
//                             })
//                             //we need to make an update
            
//                         }
//                         if (removeDates[currentDate]!=null){
//                             console.log("IN REMOVE DATES")
//                             for (var time_ in removeDates[currentDate]){
//                                 intervals = intervals.filter(element => element!=time_)
    
//                             }
                            
//                             updateScheduale(elem,intervals, (response)=> {
//                                 console.log(response)
                               
    
//                             })
//                         }
    
//                     }
                    
//                 })

//             }
//         }
      
        

//         //here we remove and update scheduale 
//         //need to also update availability


//     }


   
//     var leftArrow = <AntDesign name={"arrowleft"} size={25}/>
//     var rightArrow = <AntDesign name={"arrowright"} size={25}/>
//     console.log("THE CURRENT DATE")
//     console.log(currentDate)

//     var markedDaysList = {[markedDay]:{selected: true, selectedColor: '#1A2232'}}
   
//     // for (var day in markedDays){
//     //     markedDaysList[[markedDays[day]]] = {selected: true, selectedColor: '#1A2232'}
//     // }

//     if (currentMonthComputed==false){
//         console.log("IN CURRENT MONTH COMPUTED IS FALSE")
//         console.log(moment(currentDate).format("M"))
//         computemonthAvailability(moment(currentDate).format('M'))
//         setcurrentMonthComputed(true)

//     }

    
//     return (
//         <View style={styles.container}>
//             {/* <SchedualeHeader backwards={backwards}/> */}

    
//             <View style={styles.calendarWrapper}>
           
//                 {/* <View style={styles.topBar}>
//                     <Text>{getCurrentMonth()}, {getCurrentYear()}</Text>
                   

//                 </View> */}
//                 {loading ?
//             <View style={styles.loadingBox}>
//             <ActivityIndicator size="large" color="#1A2232"/>
//             </View>
//             :
//                 <Calendar current={currentDate}
//                 style={styles.calendar}
                
//                     // onPressArrowLeft={(subtractMonth)=> monthBack()}
//                     // onPressArrowRight={(addMonth)=> monthForward()}
//                     monthFormat={'MMMM, yyyy'}
//                     customDatesStyles={customDates}
//                     minDate={moment().format("YYYY-MM-DD")}
//                     theme={{

//                         backgroundColor: "#f2f2f2",
//                         calendarBackground: "#f2f2f2"
//                     }}
                    
//                     disableAllTouchEventsForDisabledDays={true}
//                     enableSwipeMonths={true}
//                     renderArrow={(direction)=>{
//                         if (direction=='left'){
//                             return leftArrow
//                         } else {
//                             return rightArrow
//                         }
//                     }}
//                     markedDates={eligibleDays}
//                     markingType={"simple"}
//                     onMonthChange={(month)=> {
//                         computemonthAvailability(month)
//                         setCurrent(current=>monthForward(month))
//                     }}
//                     onDayPress={(day)=> {
//                         console.log("IN DAY PRESS")
//                         eligibleDays[currentDate] = {selected: false}
//                         setMarked(day.dateString)
//                         setCurrent(day.dateString)
                      
                     
//                         eligibleDays[day.dateString] = {selected: true, selectedColor: '#1A2232'}

//                         // if (!(markedDays.includes(day.dateString))){
//                         //     setMarked(markedDays=>([...markedDays,day.dateString]))

//                         // } else {
//                         //     var index = markedDays.indexOf(day.dateString)
//                         //     console.log("THE INDEX")
//                         //     console.log(index)
//                         //     setMarked(markedDays.filter(day_=>day_!=day.dateString))
//                         //     console.log("MARKED AFTER REMOVE")
//                         //     console.log(markedDays)
//                         // }
                        
//                         // console.log("MARKED DAYS")
//                         // console.log(markedDays)
//                     }}
                    
//                     ></Calendar>
//                 }
//                     <CalendarTime date={currentDate} insertDate={addDate} deleteDate={removeDate}/>
              
                    
                 
                

//             </View>
//             <TouchableOpacity style={styles.bottom} onPress={()=> update_Scheduale()}>
//                 <Text style={styles.busyText}>UPDATE YOUR SCHEDUALE</Text>

//             </TouchableOpacity>


//         </View>

//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         width:'100%',
//         height:'87%',
        
//         flexDirection: "column",
//         // justifyContent: 'center'

//     },
//     calendar: {
//         width: '100%',
//         height:300,
//         alignSelf: 'center'
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     arrows:{
//         flexDirection: 'row',
//         marginBottom:20
//     },
//     // calendar: {
//     //     backgroundColor: '#f3f7f9'
//     // }
//     calendar: {
//         marginBottom:20
//     },
//     bottom: {
//         position: 'absolute',
//         bottom:Dimensions.get('window').height*0.01,
//         width:'100%',
//         height:Dimensions.get("window").height*0.1,
//         backgroundColor: '#1A2232',
//         flexDirection: 'row',
//         justifyContent: 'center'

//     },
//     busyText: {
//         color: 'white',
//         alignSelf: 'center',
//         fontWeight:'600'
//     },
//     timeFrame: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         paddingRight:20,
//         paddingLeft:20,
//         marginTop:'10%',
//         justifyContent: 'space-between',
        
//     },

// })
// export default CalendarView