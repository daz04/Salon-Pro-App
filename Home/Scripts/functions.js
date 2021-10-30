import moment from 'moment'
import {getPendingBookings, getTransactions, getStylist, getAppointment, getAddress, getAppointmentList, getBookings, getClientList, getClient} from '../../Database/functions'
export const generatePendingCards = (bookings, appointments, clients) => {
    console.log("IN GENERATE PENDING CARDS")
    console.log(bookings)
    var cardsList = []
    for (var booking in bookings){
        var appointmentRecord = null 
        var clientRecord = null
        for (var appointment in appointments){
            if (appointments[appointment].id == bookings[booking].AppointmentId){
                appointmentRecord = appointments[appointment]
                break
            }
        }
        
        for (var client in clients){
            if (clients[client].id == bookings[booking].ClientId){
                clientRecord = clients[client]
                break
            }
        }
        console.log("THE RECORDS")
        console.log(appointmentRecord)
        console.log(clientRecord)
        if (appointmentRecord!=null && clientRecord!=null){
            cardsList.push({
                booking: bookings[booking],
                appointment: appointmentRecord,
                client: clientRecord
            })

        }
        

    }
    console.log("THE CARD LIST LENGTH")
    console.log(cardsList.length)
   
    return cardsList

}

export const filterUpcomingBookings = (bookings, appointments, clients) => {
    //upcoming List will be an object pair of appointment and booking
    console.log("UPCOM 1")
    var upcomingList = []
    
    for (var booking in bookings){
        if (bookings[booking].Status=="Confirmed"){
            var appointmentRecord = null
            var clientRecord = null
            for (var appt in appointments){
                if (appointments[appt].id==bookings[booking].AppointmentId){
                    appointmentRecord = appointments[appt]
                    break
                }
            }
            for (var client in clients){
                if (clients[client].id == bookings[booking].ClientId){
                    clientRecord = clients[client]
                    break
                }
            }
            if (appointmentRecord!=null && clientRecord!=null){
                var appointmentDate = appointmentRecord.Date 
                var startTime = appointmentRecord.StartTime 
                var endTime = appointmentRecord.EndTime 
                var currentDate = moment().format("YYYY-MM-DD")
            
                if (moment(appointmentDate, "YYYY-MM-DD").isAfter(currentDate, "YYYY-MM-DD")){
                    //appointment is in a future date
                    upcomingList.push({
                        'booking': bookings[booking],
                        'appointment': appointmentRecord,
                        'client': clientRecord
                    })

                } else if (appointmentDate==currentDate && moment(startTime, "h:mm A").isAfter(currentDate, "h:mm A")){
                    //appointment is today but at a later time 
                    upcomingList.push({
                        'booking': bookings[booking],
                        'appointment': appointmentRecord,
                        'client': clientRecord
                    })
                }

        }
    }
    }
    console.log("ABOUT TO RETURN UPCOMING LIST 1")
    console.log(upcomingList.length)
    return upcomingList
   


}

export const filterPendingBookings = (bookings,appointments, clients) => {
    console.log("IN FILTER PENDING BOOKINGS")
    console.log(bookings)
    console.log(appointments)
    var pendingList = []
    for (var booking in bookings){
        var appointmentRecord = null
        var clientRecord = null
        if (bookings[booking].Status=="Pending"){
            for (var appt in appointments){
                if (appointments[appt].id == bookings[booking].AppointmentId){
                    appointmentRecord = appointments[appt]
                    break
                }

            }
            for (var client in clients){
                if (clients[client].id == bookings[booking].ClientId){
                    clientRecord = clients[client]
                    break
                }
            }

        }
        if (appointmentRecord!=null && clientRecord!=null){
            pendingList.push({
                'booking': bookings[booking],
                'appointment': appointmentRecord,
                'client': clientRecord
            })
        }
    }


    console.log("PENDING BOOKINGS FILTERED 2")
    console.log(pendingList.length)
    return pendingList

}

export const filterPastBookings = (bookings, appointments, clients) => {
    var pastBookingsList = []
    for (var booking in bookings){
        var appointmentRecord = null 
        var clientRecord = null
        if (bookings[booking].Status=="Confirmed"){
            
            for (var appt in appointments){
                if (appointments[appt].id == bookings[booking].AppointmentId){
                    appointmentRecord = appointments[appt]
                    break
                }
            }
            for (var client in clients){
                if (clients[client].id == bookings[booking].ClientId){
                    clientRecord = clients[client]
                    break
                }
            }
            if (appointmentRecord!=null && clientRecord!=null){
                var appointmentDate = appointmentRecord.Date 
                var startTime = appointmentRecord.StartTime 
                var currentDate = moment().format("YYYY-MM-DD")
                if (moment(appointmentDate, "YYYY-MM-DD").isBefore(currentDate, "YYYY-MM-DD")){
                    //appointment date passed 
                    pastBookingsList.push({
                        'booking': bookings[booking], 
                        'appointment': appointmentRecord,
                        "client": clientRecord
                    })

                } else if (appointmentDate==currentDate && moment(startTime, "h:mm A").isBefore(moment(currentDate, "h:mm A"))){
                    //appointment is today but time passed 
                    pastBookingsList.push({
                        'booking': bookings[booking],
                        'appointment': appointmentRecord,
                        "client": clientRecord
                    })
                }


            }
        }
    }
    console.log('THE PAST BOOKINGS LENGTH')
    console.log(pastBookingsList.length)
    return pastBookingsList

}

export const filterCancelledBookings = (bookings, appointments, clients) => {
    var cancelledList = []
    for (var booking in bookings){
        var appointmentRecord = null 
        if (bookings[booking].Status=="Cancelled"){
            
            for (var appt in appointments){
                if (appointments[appt].id == bookings[booking].AppointmentId){
                    appointmentRecord = appointments[appt]
                    break
                }
            }
            if (appointmentRecord!=null){
                cancelledList.push({
                    'booking': bookings[booking],
                    'appointment': appointmentRecord
                })

            }
        }
    }
    return cancelledList
}


export const fetchRecordsfromDatabase = (stylist,callback) => {
    var returnObject = {
        'AppointmentList': null, 
        'TransactionList': null,
        'ClientList': null,
        'UpcomingBookings': null,
        "PendingBookings":null,
        "PastBookings": null,
        "CancelledBookings":null,

    }
    getAppointmentList((result)=> {
        if (result!=null){
            var tempList = []
            for (var record in result.data){
                if (result.data[record].StylistId == stylist.id){
                    tempList.push(result.data[record])

                }
            }
            console.log("I SET APPOINTMENT LIST")
            returnObject['AppointmentList'] = tempList
            // setAppointmentList(tempList)
            var appointmentList = tempList
            getTransactions(stylist.id, (res)=> {
                if (res!=null){
                    var transactionList = res.data
                    
                    

            
                getClientList((result)=> {
                    if (result!=null){
                        console.log("CLIENT LIST RESPONSE")
                        console.log(result.data)
                        // setClientList(result.data)
                        returnObject['ClientList'] = result.data
                        clientList = result.data
                        getBookings(stylist.id, (result)=> {
                            if (result!=null){
                                console.log("GET BOOKINGS RESULT IS NOT NULL")
                                var upcomingList = []
                                var pendingList = []
                                var upcomingBookings = filterUpcomingBookings(result.data, appointmentList, clientList)
                                var pendingBookings = filterPendingBookings(result.data, appointmentList, clientList)
                                var pastBookings = filterPastBookings(result.data, appointmentList, clientList)
                                var cancelledBookings = filterCancelledBookings(result.data, appointmentList, clientList)
            
                                // setupcomingbookingList(upcomingBookings)
                                // setpendingbookingList(pendingBookings)
                                // sethistorybookingList(pastBookings)
                                // setcancelledBookingList(cancelledBookings)
                                returnObject['UpcomingBookings'] = upcomingBookings
                                returnObject['PendingBookings'] = pendingBookings
                                returnObject['PastBookings'] = pastBookings
                                returnObject['CancelledBookings'] = cancelledBookings
                                returnObject['TransactionList'] = transactionList
                                callback(returnObject)

                                // if (upcomingBookings.length>0){
                                //     setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} bookingsList={upcomingBookings}/>)

                                // }
                            }
                            // setSpinner(false)
        
                        })
                    }
                })
            }
        })

        }
    })

}