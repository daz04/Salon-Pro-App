import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
import { Elements } from '@stripe/react-stripe-js';
import {generateBookingRows} from './Scripts/functions'



const UpcomingBody = ({phoneNum, stylistId, upcomingBookingsList}) => {

    // var phoneNum = props.phoneNum
    // const stylistId = props.stylistId
  
    // const [stylistId, setId] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [upcomingConfirmed, setupcomingConfirmed] = useState([])
    const [upcomingFetched, setupcomingFetched] = useState(false)
    const [appointmentsFilterd]
    const [dateElems, setDateElems] = useState([])
    const [bookingsElem, setBookingsElem] = useState({})
    const [bookings, setBookings] = useState([])


    useEffect(()=> {
        var bookingRows = generateBookingRows(upcomingBookingsList)
        setBookingsElem(bookingRows)


        

    }, [])




    const fetchAppointment = async (appointmentId, bookingObj, callback) => {
        console.log("UPCOMING BODY FETCH APPOINTMENT")
        console.log(appointmentId)
        // console.log("APPOINTMENT ID")
        // console.log("THE BOOKINGS ELEM")
        // console.log(bookingsElem)
        // console.log("THE BOOKINGS LIST")
        // console.log(bookings)
        // console.log(appointmentId)
        getAppointment(appointmentId, (result)=> {
            if (result!=null){
                console.log("FETCH APPOINTMENT RESULT")
                console.log(result)
            var appointment = result.data[0]
            console.log("APPOINTMENT RESULT IN UPCOMING BODY 2")
            console.log(appointment)
            var date = appointment.Date 
            // console.log("DATE")
            // console.log(date)
            
            if (date == moment().format("YYYY-MM-DD")) {
                date = "TODAY"
            } else {
                date = moment(date).format('LL').toUpperCase()
            }
            console.log("BOOKINGS ELEM")
            console.log(bookingsElem)
            if (date in bookingsElem){
               
                var dateList = bookingsElem[date]
                console.log("DATE IN BOOKINGA ELEM")
                console.log(dateList)
                if (!(bookings.includes(bookingObj))){
                    console.log("APPEND BOOKING TO EXSISTING")
                    var bookingElem = <BookingRow booking={bookingObj} appointment={appointment}/>
                    dateList.push(bookingElem)
                    console.log("NEW DATE LIST")
                    console.log(dateList)
                    bookingsElem[date] = dateList
                    setBookingsElem({...bookingsElem})
                    setBookings(bookings => ([...bookings,bookingObj]))
                    // var dateElem = <View style={styles.obj}>
                    // <Text style={styles.date}>{date}</Text>
                    // {bookingsElem[date]}
                    // </View>
                    // setDateElems(dateElems=> ([...dateElems,dateElem]))
    
                }
                callback(true)
                
    
            } else {
                var dateList = []
                var bookingElem = <BookingRow booking={bookingObj} appointment={appointment}/>
                dateList.push(bookingElem)
                bookingsElem[date] = dateList
                setBookingsElem({...bookingsElem})
                setBookings(bookings => ([...bookings, bookingObj]))
                // var dateElem = <View style={styles.obj}>
                // <Text style={styles.date}>{date}</Text>
                // {bookingsElem[date]}
                // </View>
                // setDateElems(dateElems=> ([...dateElems,dateElem]))
                callback(true)
    
            }
        }

        })
      
       
    
   
    }

    const appointmentIterator = (upcomingList, count) => {
        console.log("IN APPOINTMENT ITERATOR")
        if (count==upcomingList.length){
            console.log("DONE WITH APPOINTMENT ITERATOR")
        } else {
            console.log("APPOINTMENT ITERATOR BODY 1")
            console.log(count)
            console.log(upcomingList)
            var appointmentId = upcomingList[count].AppointmentId
            fetchAppointment(appointmentId, upcomingList[count], (result)=> {
                console.log("FETCH APPOINTMENT RESULT")
                appointmentIterator(upcomingList, count+1)
            })


        }

    }
    
    console.log("UPCOMING STYLIST ID")
    console.log(stylistId)
    if (stylistId!=null && upcomingFetched==false){
        console.log("BEFORE GETTING UPCOMING CONFIRMED")
        getUpcomingConfirmed(stylistId, (result)=> {
            console.log("BACK AT PARENT UPCOMING CONFIRMED 1234")
            console.log(result)
            if (result!=null){
                var tempList = []
                for (var elem in result){
                    setupcomingConfirmed(upcomingConfirmed=> ([...upcomingConfirmed,result[elem]]))
                    tempList.push(result[elem])
                    console.log("AFTER GETTING UPCOMING CONFIRMED")
                    console.log(result[elem])
                    
                }
                console.log("TEMP LIST BEFORE ITERATOR")
                console.log(tempList)
                appointmentIterator(tempList,0)
            }

        })
       
        setupcomingFetched(true)
    }
    // console.log("the email")
    // console.log(email)
    // if (email!=null){
    //     console.log("email")
    //     upcomingConfirmed = getUpcomingConfirmed(email)
    //     console.log("upcoming")
    //     console.log(upcomingConfirmed)
    //     //returns list of future and confirmed booking objects
      


    //     //user is signed in

    // }
    return (
        <View style={styles.container}>
            {/* {bookings.length==0 && 
            <Text>
                You currently have no upcoming appointments
            </Text>
            } */}
            <ScrollView>
            {Object.keys(bookingsElem).map(key => {
                return (
                    <View>
                    <Text style={styles.date}>{key}</Text>
                    {bookingsElem[key].map(row=> {
                        return (
                            <View>
                                {row}
                            </View>
                     
                        )
                            
                    })}
                    </View>
                )
            })}
            </ScrollView>
        
            
        </View>
    )
    

}
const styles = StyleSheet.create({
    container: {
        marginLeft:20,
        marginRight:20,
        marginTop:20,
    },
    date: {
        marginBottom:20,
        fontWeight: '500',
        fontSize:12
    },
    obj: {
        
    }
})

export default UpcomingBody