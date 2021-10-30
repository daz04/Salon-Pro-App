import BookingRow from '../../bookingRow'

export const generateBookingRows = (upcomingAppointmentsList) => {
    console.log('IN GENERATE BOOKING ROWS 1')
    var bookingsByDate = {}
    //sort the upcoming appointment objects by date 
    for (var appt in upcomingAppointmentsList) {
        var booking = appt.booking 
        var appointment = appt.appointment 
        var appointmentDate = appointment.Date 
        if (bookingsByDate[appointmentDate]==null){
            bookingsByDate[appointmentDate] = [upcomingAppointmentsList[appt]]
        } else {
            bookingsByDate[appointmentDate].push(upcomingAppointmentsList[appt])
            var sortedList = bookingsByDate.sort((a,b)=> moment(a.appointment.StartTime, "h:mm A").isBefore(b.appointment.StartTime, "h:mm A"))
            bookingsByDate[appointmentDate] = sortedList
        }
        bookingRowList.push(bookingRow)


    }
    console.log(bookingsByDate)
    bookingsByDate = bookingsByDate.sort((a,b)=> moment(a, "YYYY-MM-DD").isBefore(moment(b, "YYYY-MM-DD")))

    //generate booking rows for sorted bookings by date dictionary
    for (var object in Object.keys(bookingsByDate)){
        var bookingRowList = []
        for (var record in bookingsByDate[object]){
            var bookingRow = <BookingRow booking={bookingsByDate[object][record].booking} appointment={bookingsByDate[object][record].appointment}/>
            bookingRowList.push(bookingRow)
            
        }
        bookingsByDate[object] = bookingRowList

    }
    return bookingsByDate


}