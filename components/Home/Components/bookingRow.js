import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert} from 'react-native';
import {getAppointment} from '../../Database/functions'
import {getService} from '../../Database/functions'
import {getStylist, getAddress, getClient} from '../../Database/functions'
// import {getAddressFromCoords} from '../../Google/functions'
import {getAddressFromCoords} from '../../GeoLocation/functions'
import {Ionicons} from 'react-native-vector-icons'

const BookingRow = (props) => {
    console.log("IN BOOKING ROW")
    var booking = props.booking
    var appointment = props.appointment
    var appointmentId = booking.AppointmentId
    
    const [client, setClient] = useState(null)
    const [clientFetched, setclientFetched] = useState(false)
    const [service, setService] = useState(null)
    const [serviceFetched, setserviceFetched] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [address, setAddress] = useState(null)
    const [fetcehdService, setfetchedService] = useState(false)

    if (clientFetched==false){
        setclientFetched(true)
        getClient(booking.ClientId, (result)=> {
            if (result!=null){
                setClient(result.data[0])

            } else {
                Alert.alert("Network Error", "Network error occured")

            }

        })

    }

    if (serviceFetched==false){
        setserviceFetched(true)
        getService(appointment.ServiceId, (result)=> {
            if (result!=null){
                setService(result.data[0])

            } else {
                Alert.alert("Network Error", "Network error occured")
            }
        })
    }
    const computeTotalPrice = (price) => {
        var taxes = price*0.06
        var total = taxes + price 
        if (String(total).split(".")[1].length>2){
            var num = String(total).split(".")[0]
            var dec = String(total).split(".")[1].substring(0,2)
            total = num + "."+dec
        } else{
            total = String(total)
        }
        return total
    }
    // const appointmentRetrieve =  () => {
    //     getAppointment(appointmentId, (result)=> {
    //         if (result!=null){
    //             if (result.data.length>0){
    //                 setAppointment(appointment_.data[0])
    //                 setFetched(true)
    //             }

    //         }
           
            
    //     })
        
    // }
    const serviceRetrieve = async () => {
        console.log("IN SERVICE RETRIEVE")
        var service_ = await getService(appointment.ServiceId)
        console.log(service_)
        if (service_.data.length>0){
            setService(service_.data[0])
            setfetchedService(true)
        }
    }
    // if (appointment==null && fetched==false){
    //     appointmentRetrieve()
    // }
    if (service==null && fetcehdService==false && appointment!=null){
        serviceRetrieve()

    }
    
    const getBookingTime = () => {
        console.log("IN BOOKING TIMEEEEEEEEEEEEEEEEEEEEEEEEEE\n\n\n")
        console.log(appointment)
        
        var startTime = appointment.StartTime
        // var newTime = startTime
        // var pmAm = startTime.slice(-2)
        // console.log("AM / PM")
        // console.log(pmAm)
        // newTime = newTime.split(":")[0]+pmAm
        return startTime

    }
    // const getBookingLocation = () => {
    //     console.log("AT GET BOOKING LOCATION")
       
    //     var clientCoords = appointment.ClientCoords
    //     var address = getAddressFromCoords(clientCoords[0],clientCoords[1])
    //     return address
    // }
    // const getServiceInfo = () => {
       
    //     var serviceId = appointment.ServiceId 
    //     var service = getService(serviceId)
    //     return service

    // }
    // const getStylistInfo = () => {
        
    //     var stylistId = service.StylistId
    //     getStylist(stylistId, (result)=> {
    //         if (result!=null && stylist==null){
    //             setStylist(result)
    //         }
    //     })

       
        
    // }

    const getAppointmentLocation = () => {
        console.log("BOOKING ROW APPOINTMENT LOCATION")
        var addressId = appointment.ClientAddress 
        console.log("THE ADDRESS ID")
        console.log(addressId)
        getAddress(addressId, (result)=> {
            console.log("GET ADDRESS RESULT")
            console.log(result)
            setAddress(result[0])

        })

    }
    
    const getStylistName = () => {
        
        if (stylist!=null){
            return stylist.FirstName + " " + stylist.LastName

        } else {
            return null
        }
        

    }
    const getServiceName = () => {
        // var service = getServiceInfo()
        return service.Name
    }
    const getServicePrice = () => {
        // var service = getServiceInfo()
        var total = computeTotalPrice(service.Price)
        return "$" + total
    }

    const getServiceDuration = () => {
        // var service = getServiceInfo()
        var duration = service.Duration
        return duration 
    }
    const getBookingStatus = () => {
        var letter = booking.Status.substring(0,1).toUpperCase()
        var status = letter + booking.Status.substring(1,booking.Status.length)
        return status
    }
    var startTime = null
    var location = null
    var stylistName = null
    var serviceName =null
    var servicePrice = null
    var serviceDuration = null
    var bookingStatus = null
    if (appointment!=null){
        console.log("APPOINTMENT IN BOOKING ROW IS NOT NULL")
        startTime = getBookingTime()
        console.log("START TIME")
        console.log(startTime)
        if (address==null){
            console.log("IN GET APPOINTMENT LOCATION")
            getAppointmentLocation()

        }
        
        // stylistName = getStylistName()
        bookingStatus = getBookingStatus()
        // getStylistInfo()

    }
    

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.time}>
                    <Text style={styles.timeText}>{appointment.StartTime} </Text>
                    
                    <Text style={{
                        fontWeight:'300',
                        flexDirection: 'row',
                        
                    }}>AT {appointment.ClientAddress}</Text>
                    
                    
                    
                    

                </View>
                {/* <View style={styles.stylistBox}>
                    <Text style={styles.stylistText}>{stylistName}</Text>
                </View> */}
                <View style={styles.serviceBox}>
                    {service!=null && 
                    <Text style={styles.serviceText}>{service.Name}</Text>
                    }
                    
                </View>
            </View>
            <View style={styles.status}>
                <View style={styles.statusBox}>
                    <Text style={styles.statusText}>{booking.Status}</Text> 

                </View>
                <View style={styles.priceBox}>
                    {service!=null && 
                    <Text style={styles.priceText}>${computeTotalPrice(service.Price)}</Text>
                    }
                    
                </View>
                <View style={styles.durationBox}>
                    {service!=null && 
                    <Text style={styles.durationText}>{service.Duration} min</Text>
                    }
                    
                    <Ionicons style={styles.icon} name={"time-outline"} size={12.5}/>

                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
       
    },
    info: {
        
        flexDirection: 'column',
        marginBottom:10
    },
    status: {
        
        flexDirection: 'column'
    },
    time: {
       
        flexDirection: 'row',
        marginBottom:2.5,
        flexWrap: 'wrap',
        maxWidth:'80%'
    },
    statusBox: {
        backgroundColor: 'limegreen',
        borderRadius:20,
        padding:3,
        marginBottom:2.5

    },
    statusText: {
        color: "white",
        fontWeight: '600',
        fontSize:11,
      
        alignSelf:'flex-start'
    },
    timeText: {
        fontWeight: "600",
        
        flexWrap: 'wrap',
        maxWidth:'90%'
    },
    locationText: {
        fontWeight: '300'
    },
    stylistText: {
        fontWeight: '600',
        fontSize:18
    },
    serviceBox: {
        marginBottom: 2.5
    },
    stylistBox: {
        
        marginBottom:2.5
    },
    serviceText: {
        color: 'grey'
    },
    priceText: {
        alignSelf: 'flex-end',
        fontWeight: '400'
    },
    durationText: {
        color: 'grey',
        fontSize:12
      
    },
    durationBox: {
        
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    icon: {
       
        alignSelf: 'center',
        marginLeft: 5,
        color: 'grey'
    },
    priceBox: {
       
        marginBottom: 2.5
    }
    
})
export default BookingRow