import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';

import {generateBookingRows} from './Scripts/functions'
import BookingRow from '../bookingRow'



const BookingListView = ({phoneNum, stylistId, transactionList, bookingsList, showAppointmentCard}) => {
    console.log("BACK TO BOOKING LIST VIEW 2")
    console.log(transactionList)

    const [bookingsElem, setBookingsElem] = useState({})
    const [appointmentCard, setAppointmentCard] = useState(null)

    useEffect(()=> {
        console.log("IN BOOKING LIST VIEW USE EFFECT")
        var bookingRows = generateBookingRows(bookingsList, transactionList)
        
        setBookingsElem(bookingRows)

        
    }, [bookingsList])

  
    return (
        <View style={styles.container}>
            {/* {bookings.length==0 && 
            <Text>
                You currently have no upcoming appointments
            } */}
            <ScrollView style={{height:'95%'}}>
            {Object.keys(bookingsElem).map(key => {
                console.log("THE BOOKINGS ELEM 1")
                console.log(bookingsElem[key])
                return (
                    <View style={styles.appointmentCard}>
                    <Text style={styles.date}>{key}</Text>
                    
                    {bookingsElem[key].map(row=> {
                        console.log("BOOKINGS ELEM LIST 4")
                        console.log(row)

                        return (
                           <TouchableOpacity onPress={()=>showAppointmentCard(row)}>
                            <BookingRow booking={row.booking} appointment={row.appointment} transaction={row.transaction} client={row.client}/>
                           </TouchableOpacity>
                     
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
        
    },
    appointmentCard: {
      
        borderRadius:20,
        padding:10,
        marginBottom:'5%'
    }
})

export default BookingListView