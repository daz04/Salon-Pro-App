import React from 'react';
import BookingRow from '../../bookingRow'
import moment from 'moment'
export const generateBookingRows = (upcomingAppointmentsList, transactionList) => {
    console.log("IN GENERATE THE BOOKING ROWS 3")
    console.log(upcomingAppointmentsList)
    var bookingsByDate = {}
    for (var appt in upcomingAppointmentsList) {
        var booking = upcomingAppointmentsList[appt].booking 
        var appointment = upcomingAppointmentsList[appt].appointment 
        var transaction = transactionList.filter(trans => trans.BookingId==booking.id)[0]
        upcomingAppointmentsList[appt].transaction = transaction
        var appointmentDate = appointment.Date
        if (bookingsByDate[appointmentDate]==null){
            bookingsByDate[appointmentDate] = [upcomingAppointmentsList[appt]]
        } else {
            bookingsByDate[appointmentDate].push(upcomingAppointmentsList[appt])
            var sortedList = bookingsByDate[appointmentDate].sort((a,b)=> moment(a.appointment.StartTime, "h:mm A").isBefore(b.appointment.StartTime, "h:mm A"))
            bookingsByDate[appointmentDate] = sortedList
        }
    }

    //up to here is correct

    console.log(bookingsByDate)
    var items = Object.keys(bookingsByDate).map((key)=> {
        return [key, bookingsByDate[key]]
    })
    console.log('THE ITEMS')
    console.log(items)
    bookingsByDateListVersion = items.sort((a,b)=> moment(a[0], "YYYY-MM-DD").isBefore(moment(b[0], "YYYY-MM-DD")))
    console.log("BOOKINGS BY DATE AFTER SORT 1")
    console.log(bookingsByDateListVersion)
    //generate booking rows for sorted bookings by date dictionary

    var finalBookingList = {}
    for (var object in bookingsByDateListVersion){
        //iteration is going to happen in sorted date order  
        console.log("IN THE FINAL BOOKING LIST LOOP")
        console.log(bookingsByDateListVersion[object])
        var bookingRows = bookingsByDateListVersion[object][1]
        var theDate = bookingsByDateListVersion[object][0]
        var tempBookingList = []
        for (var record in bookingRows){
            console.log("THE RECORDS IN BOOKING ROW")
            console.log(bookingRows[record])
            console.log("\n")
            tempBookingList.push(bookingRows[record])
           
            
        }
        theDate = moment(theDate).format("LL")
        finalBookingList[theDate] = tempBookingList

    }
    console.log('THE FINAL BOOKING LIST')
    console.log(finalBookingList)
    return finalBookingList


}