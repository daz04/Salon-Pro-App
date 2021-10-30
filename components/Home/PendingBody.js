import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import BookingRow from '../Bookings/bookingRow'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getPendingConfirmed} from '../../Database/functions'
import {getAppointment} from '../../Database/functions'
import moment from 'moment';
import EmptyBody from './EmptyBody'


const PendingBody = (props) => {
    const [email, setEmail] = useState('clara@hotmail.com')
    const [fetched, setFetched] = useState(false)

    const getEmail = async () => {
        var email_ = await AsyncStorage.getItem("@email")
        if (email_!=null){
            setEmail(email=>email_)
            setFetched(true)
        } else {
            Alert("No email")
            //enter redirect to sign up
        }

        
       

    }
    if (email==null && fetched==false){
        getEmail()

    }
    
    
    var pendingConfirmed = []
    var bookingsElem = {}
    var dateElems = []
    console.log("the email")
    console.log(email)
    if (email!=null){
        console.log("email")
        pendingConfirmed = getPendingConfirmed(email)
        console.log("pending")
        console.log(pendingConfirmed)
        //returns list of future and confirmed booking objects
        if (pendingConfirmed.length>0){
            //means there are elements here
            for (var booking in pendingConfirmed){
                var appointmentId = pendingConfirmed[booking].AppointmentId
                console.log("APPOINTMENT ID")
                console.log(appointmentId)
                var appointment = getAppointment(appointmentId)
                console.log("appointment")
                console.log(appointment)
                if (appointment.Date in bookingsElem){
                    var dateList = bookingsElem[appointment.Date]
                    var bookingElem = <BookingRow booking={pendingConfirmed[booking]}/>
                    dateList.push(bookingElem)
                    bookingElem[appointment.Date] = dateList

                } else {
                    var dateList = []
                    var bookingElem = <BookingRow booking={pendingConfirmed[booking]}/>
                    dateList.push(bookingElem)
                    bookingsElem[appointment.Date] = dateList

                }
                console.log("BOOKINGS ELEM")
                console.log(bookingsElem[appointment.Date])
                var date = appointment.Date 
                if (date == moment().format("YYYY-MM-DD")) {
                    date = "TODAY"
                } else {
                    date = moment(date).format('LL').toUpperCase()
                }
                var dateElem = <View style={styles.obj}>
                    <Text style={styles.date}>{date}</Text>
                    {bookingsElem[appointment.Date]}
                </View>
                dateElems.push(dateElem)

            }
        } else {
            dateElems = <EmptyBody type="pending"/>

        }


        //user is signed in

    }
    return (
        <View style={styles.container}>
           
        
            {dateElems}
        </View>
    )
    

}
const styles = StyleSheet.create({
    container: {
        marginLeft:20,
        marginRight:20,
        
        marginTop:20

    },
    date: {
        marginBottom:20,
        fontWeight: '500',
        fontSize:12
    },
    obj: {
        
    }
})

export default PendingBody