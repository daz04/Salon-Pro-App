import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import {getBookingsList,getAppointment } from '../../Database/functions'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BookingRow from '../Bookings/bookingRow'

const HistoryBody = (props) => {
    var phoneNum = props.phoneNum
  
    const [stylistId, setId] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [historyConfirmed, sethistoryConfirmed] = useState([])
    const [historyFetched, sethistoryFetched] = useState(false)
    const [dateElems, setDateElems] = useState([])
    const [bookingsElem, setBookingsElem] = useState({})
    const [bookings, setBookings] = useState([])

    const getStylistId = async () => {
        console.log("IN HISTORY GET STYLIST ID")
        console.log("IN GET STYLIST ID IN UPCOMING")
        var stylistId_ = await AsyncStorage.getItem("stylistId")
        console.log(stylistId_)
        setId(stylistId_)
        setFetched(true)

    }
    if (stylistId==null && fetched==false){
        console.log("UPCOMING - STYLISY ID IS NULL")
        getStylistId()
    }
 
    const bookingsIterator = (bookingsList, count) => {
        if (count==bookingsList.length){
            console.log("Done")
        } else {
            var booking = bookingsList[count]
            var status = booking.Status
            var appointmentId = booking.AppointmentId
            getAppointment(appointmentId, (result)=> {
                console.log("IN BOOKING ITERATOR GET APPOINTMENT 123")
                console.log(result.data[0])
                if (result!=null){
                    var date = result.data[0].Date 
                    var startTime = result.data[0].StartTime
                    var currentDate = moment()
                    console.log("GET APPOINTMENT CURRENT DATE")
                    console.log(currentDate)
                    
                    
                    if (moment(date, "YYYY-MM-DD").isBefore(currentDate, "YYYY-MM-DD") && status=="Confirmed"){
                        console.log("IN A BOOKING OPTION")
                        date = moment(date).format('LL').toUpperCase()
            
                        if (date in bookingsElem){
                            var dateList = bookingsElem[date]
                            if (!(bookingsList.includes(booking))){
                                var bookingElem = <BookingRow booking={booking} appointment={result.data[0]}/>
                                dateList.push(bookingElem)
                                bookingsElem[date] = dateList
                                setBookingsElem({...bookingsElem})
                                setBookings(bookings => ([...bookings,booking]))
                            }
                        } else {
                            var dateList = []
                            var bookingElem = <BookingRow booking={booking} appointment={result.data[0]}/>
                            dateList.push(bookingElem)
                            bookingsElem[date] = dateList
                            setBookingsElem({...bookingsElem})
                            setBookings(bookings => ([...bookings, booking]))
                          
                        }
                        

                    } else if (date==currentDate.format("YYYY-MM-DD") && moment(startTime, "h:mm A").isBefore(currentDate, 'h:mm A')){
                        date = moment(date).format('LL').toUpperCase()
                        if (date in bookingsElem){
                            var dateList = bookingsElem[date]
                            if (!(bookingsList.includes(booking))){
                                var bookingElem = <BookingRow booking={booking} appointment={result.data[0]}/>
                                dateList.push(bookingElem)
                                bookingsElem[date] = dateList
                                setBookingsElem({...bookingsElem})
                                setBookings(bookings => ([...bookings,booking]))
                            }
                        } else {
                            var dateList = []
                            var bookingElem = <BookingRow booking={booking} appointment={result.data[0]}/>
                            dateList.push(bookingElem)
                            bookingsElem[date] = dateList
                            setBookingsElem({...bookingsElem})
                            setBookings(bookings => ([...bookings, booking]))
                          
                        }
                        




                    }

                } else {
                    Alert.alert("Network Error", "Network error occured")
                }
                bookingsIterator(bookingsList, count+1)

            })
        


        }

    }


    if (stylistId!=null && historyFetched==false){
        sethistoryFetched(true)
        console.log("BEFORE GETTING HISTORY")
        getBookingsList(stylistId, (result)=> {
            if (result!=null){
                bookingsIterator(result.data, 0)

            } else {
                Alert.alert("Network error", "Network error occured")
            }


        })
      
       
        
    }




    return (
       
        <View style={styles.container}>
            {bookings.length==0 && 
            <Text>
                You currently have no past appointments
            </Text>
            }
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
export default HistoryBody