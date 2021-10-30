import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import moment from 'moment'
import Modal from 'react-native-modal'
import { useFonts } from 'expo-font';
import {getService} from '../../../Database/functions'
import {getClient, getAddress, updateBookingStatus, getStylist, fetchTransactionForBooking} from '../../../Database/functions'
import {Ionicons} from 'react-native-vector-icons'
import {sendClientConfirmation, sendClientCancelledMsg} from '../../../sns/functions'
import {sendTeamConfirmation, sendTeamCancellation} from '../../../Twilio/functions'
import {createCharge} from '../../../Stripe/functions'


const PendingModal = ({appointment, serviceId, booking, client, close}) => {
    console.log("IN PENDING MODAL THE SERVICE ID 1")
    console.log(serviceId)
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf")
     });


    const [service, setService] = useState(null)
    const [fetchService, setFetched] = useState(false)
    const [price, setPrice] = useState(null)
    const [address, setAddress] = useState(null)
    const [addressFetched, setaddressFetched] = useState(false)
    const [stylist, setStylist] = useState(null)
    const [stylistFetched, setstylistFetched] = useState(false)
    const [clientCard, setcard] = useState(null)
    const [transaction, setTransaction] = useState(null)

    useEffect(()=> {
        fetchTransactionForBooking(booking.id, (result)=> {
            if (result!=null){
                console.log('THE TRANSACTION RESPONSE 6')
                console.log(result.data)
                if (result.data.length>0){
                    console.log("ABOUT TO PUT THE TRANSACTION AMOUNT 3")
                    console.log(result.data[0])
                    setTransaction(result.data[0])

                }
            }
        })
        if (stylistFetched==false){
            setstylistFetched(true)
            getStylist(booking.StylistId, (result)=> {
                console.log("WE HERE")
                console.log(result)
                setStylist(result.data[0])
            })
        }
    
    }, [])

    
    const confirmBooking = () => {
        var bookingId = booking.id 
        updateBookingStatus(bookingId, 'Confirmed', (result)=> {
            if (result==null){
                Alert.alert("Network Error", "Failed to confirm booking")
            } else {
                console.log("AFTER UPDATE BOOKING STATUS")
                console.log(stylist)
                var phone = client.Phone 
                var serviceName = service.Name 
                var stylistName = stylist.FirstName +stylist.LastName 
                var date = moment(appointment.Date).format("LL")
                var time = appointment.StartTime
                fetchTransactionForBooking(booking.id, (result)=> {
                    console.log("THE BOOKING ID")
                    console.log(booking.id)
                    if (result!=null){
                        console.log("FETCH TRANSACTION FOR BOOKING IS NOT NULL")
                        console.log('THE TRANSACTION RESPONSE 4')
                        console.log(result.data)
                        setTransaction(result.data[0])
                        var transaction = result.data[0]
                        console.log('THE TRANSACTION')
                        console.log(transaction)
                        updateTransactionStatus(transaction.id, "Confirmed", (result)=> {
                            //at this endpoint we set the transaction status to confirmed
                            if (result!=null){
                                var price = transaction.TotalStripeAmount
                                createCharge(price, transaction.CardId, transaction.CustomerId, (result)=> {
                                    if (result!=null){
                                        console.log("CREATE CHARGE RESULT")
                                        console.log(result)
                                        sendClientConfirmation(phone, stylistName, serviceName, date, time)
                                        var clientName = client.FirstName +  client.LastName
                                        sendTeamConfirmation(clientName, stylistName, serviceName, date, time, appointment.id, (result)=> {
                                            if (result!=null){
                                                console.log("SEND CALLERS CONFIRMATION RESULT")
                                                console.log(result)
                                                close(booking.id)
                
                                            } else {
                                                Alert.alert("Network error", "Network error occured")
                                            }
                                        
                                        })
                
                                    } else {
                                        Alert.alert('Network Error', 'Network error occured')
                                    }
                                })

                            } else {
                                Alert.alert('Network Error', 'Network error occured')
                                
                            }
                        })
                        
                    }
                })
                
                
                
               
                
                //now need to change the scheduale for stylist 

            }
        })

        //booking record needs to be changed 
        //trigger an SMS message to be sent to client, do it from aws
    }

    const cancelBooking = () => {
        var bookingId = booking.id 
        updateBookingStatus(bookingId, 'Cancelled', (result)=> {
            if (result==null){
                Alert.alert("Network Error", "Failed to cancel booking")
            } else {
                console.log("AFTER UPDATE BOOKING STATUS")
                console.log(stylist)
                var phone = client.Phone 
                var serviceName = service.Name 
                var stylistName = stylist.FirstName + stylist.LastName 
                var date = moment(appointment.Date).format("LL")
                var time = appointment.StartTime
                sendClientCancelledMsg(phone, stylistName, serviceName, date, time)
                var clientName = client.FirstName  + client.LastName
                console.log("THE CLIENT NAME 2")

                console.log(clientName)
                sendTeamCancellation(clientName, stylistName, serviceName, date, time, appointment.id, (result)=> {
                    if (result!=null){
                        console.log("SEND TEAM CANCELLATION RESULT")
                        console.log(result)
                        
                        close(booking.id)

                    } else {
                        Alert.alert("Network error", "Network error occured")
                    }
                   
                })
                
               
                
                //now need to change the scheduale for stylist 

            }
        })


    }

    if (addressFetched==false){
        getAddress(appointment.ServiceId, (result)=> {
            setAddress(result[0])
        })
        setaddressFetched(true)

    }

    if (fetchService==false){
        getService(serviceId, (result)=> {
            if (result!=null){
                console.log("THE GET SERVICE RESULT 2")
                console.log(result.data[0])
                setService(result.data[0])

            }
        })
        setFetched(true)

    }

    var date = appointment.Date
    var time = appointment.StartTime
    var clientCoords = appointment.ClientCoords
    var clientName = client.FirstName + " "+client.LastName

    const computePrice = () => {
        if (String(service.Price).split(".")[1]!=null && String(service.Price).split(".").length>2){
            var price_ = String(service.Price).split(".")[0]+"."+String(service.Price).split(".")[1].substring(0,2)
            setPrice(price_)
        } else if (String(service.Price).split(".")[1]!=null && String(service.Price).split(".")[1].length==1){
            var price_ = String(service.Price)+'0'
            setPrice(price_)

        } else {
            var price_ = String(service.Price) + ".00"
            setPrice(price_)
        }
    }
    // const close = () => {
    //     props.close()
    // }
    if (price==null && service!=null){
        computePrice()

    }

    const goToMaps = () => {
        Linking.openURL(`https://www.google.com/maps/place/${appointment.ClientAddress}`)

    }
 
    return (
        <View>
           <Modal
           isVisible={true}
           animationIn ='slideInUp'
           animationOut='slideOutDown'
           style={styles.modal}
           backdropOpacity={0}
           >
               <View style={styles.container}>
                   <View style={styles.row}>
                       <Text style={styles.infoText}>BOOKING INFO</Text>
                   </View>
                   <View style={styles.row}>
                       <View style={styles.dateBox}>
                           <Text style={styles.dateText}>{moment(date).format("dddd DD MMMM")}</Text>
                           <Text style={styles.timeText}>{time}</Text>

                       </View>
                       <View style={styles.pendingBox}>
                           <Text style={styles.pendingText}>PENDING</Text>
                       </View>
                   </View>
                   <View style={styles.row}>
                       <View style={styles.addressBox}>
                           <Text style={styles.addressText}>ADDRESS</Text>
                           <Text style={styles.addressText}>{appointment.ClientAddress}</Text>
                           {address!=null &&
                           <Text style={styles.geoaddressText}>{address.AppartmentNumber} {address.UnitName} {address.StreetNumber} {address.StreetName} {address.City} {address.State}</Text>
                           }
                           
                       </View>
                       
                   </View>
                   <View style={styles.row}>
                  
                   <View style={styles.mapBox}>
                   <Ionicons name="location-outline" size={17} color={'white'}/>
                   <TouchableOpacity onPress={()=>goToMaps()}>
                       
                           <Text style={styles.mapText}>VIEW ON MAP</Text>
                    </TouchableOpacity>
                       </View>
                    </View>
                   <View style={styles.row2}>
                       <View style={styles.clientBox}>
                           <Text style={styles.clientNameText}>{clientName}</Text>
                       </View>
                       
                   </View>
                   <View style={styles.row}>
                       {service!=null &&
                       <View>
                       <Text style={styles.serviceText}>1 x {service.Name}</Text>
                       <View style={styles.duration}>
                           <Text style={styles.durationText}>{service.Duration} min</Text>
                           <Ionicons name={"time-outline"} size={15} color={"white"} ></Ionicons>

                       </View>
                       </View>
                       }
                           
                       </View>
                    <View style={{width:'100%', marginTop:10}}>
                        <View style={{alignSelf: 'center', height:1, width:'90%',borderTopColor: 'lightgrey',borderTopWidth:0.5, zIndex:0}}>
    
                        </View>
                        <Text style={styles.totalText}>TOTAL</Text>
                    </View>
                    {transaction!=null && 
                   
                    <Text style={styles.priceText}>${transaction.TotalPrice}</Text>
                    }
                    {fontsLoaded && 
                    <View style={{
                        marginLeft:20,
                        marginRight:20
                    }}>
                           
                           <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width:'100%'
                             
                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: 'white',
                                    }}>Service Price</Text>
                                </View>
                                {transaction!=null &&
                                <Text style={{
                                    fontFamily: 'Poppins-Regular',
                                    color: 'white',
                                  
                                }}> + ${Number(transaction.ServicePrice).toFixed(2)}</Text>}
                               
                            </View>
                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'space-between',
                           }}>
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>Travel Cost</Text>
                               {transaction!=null &&
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>${transaction.TravelPrice}</Text>}
                           </View>
                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'space-between',

                           }}>
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>Taxes</Text>
                               {transaction!=null && 
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>${transaction.TaxesPrice}</Text>}
                           </View>
                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'space-between',
                           }}>
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>Booking Fee</Text>
                               {transaction!=null && 
                               <Text style={{
                                   fontFamily: 'Poppins-Regular',
                                   color: 'white'
                               }}>${transaction.BookingPrice}</Text>}
                           </View>
                    </View>
            }
                    <TouchableOpacity style={styles.confirmBox} onPress={()=> confirmBooking()}>
                            <Text style={styles.confirmText}>Confirm Booking</Text>
                            
                        </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.cancelBox} onPress={() => cancelBooking()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
               </View>
           </Modal>
           </View>
      
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1A2232",
        borderRadius:20,
        width: '100%',
        // height: '75%',
        flexDirection: 'column',
        paddingBottom:20,
        
        bottom:0,
        position:'absolute'

    },
    modal:{
       
        borderRadius:20,
        width: '100%',
        height: '90%',
        flexDirection: 'column',
        alignSelf: 'center'
        
        

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:20,
        marginLeft:20,
        marginRight:20
        
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10,
        marginLeft:20,
        marginRight:20

    },
    infoText: {
        color: "#C2936D",
        fontWeight:'600',
        fontSize:13,
        marginTop:20
    },
    dateText: {
        color: "white",
        fontWeight:'bold',
        fontSize:16

    },
    timeText: {
        color:'white',
        fontSize:24
    },
    pendingBox: {
        backgroundColor: "#e2a110",
        borderRadius:50,
        width:70,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center'
        
    },
    pendingText: {
        color: "white",
        fontSize:10,
        alignSelf: 'center',
        fontWeight: '600'
    },
    addressText: {
        color: 'white',
        fontSize:16,
        fontWeight: '500'

    },
    geoaddressText: {
        color: "white",
        fontWeight: '300',
        fontSize:14
    },
    mapBox: {
        flexDirection: 'row'
    },
    mapText: {
        marginLeft:5,
        textDecorationLine: 'underline',
        color: 'white',
        fontSize:13,
        fontWeight:'600'
    },
    close: {
        alignSelf: 'flex-start',
        marginTop:10
    },
    clientNameText: {
        color: "white",
        fontWeight: 'bold',
        fontSize:20
    },
    serviceText: {
        color: "white",
        fontSize: 12

    },
    durationText: {
        color: "white",
        fontSize:12,
        marginRight:5,
        alignSelf: 'center'
    },
    duration: {
        flexDirection: 'row'
    },
    totalText: {
        
        alignSelf: 'center',
        color: 'white',
        zIndex:1,
        backgroundColor: '#1A2232',
        top:-10
    },
    totalBox: {
        backgroundColor: "#1A2232",
        width:'100%',
        height:50,
        flex:1,
     
        top:-10, 
    },
    priceText: {
        alignSelf: 'center',
        fontSize:40,
        fontWeight:'bold',
        color: 'white'
    },
    confirmBox: {
        width: '90%',
        height:50,
        backgroundColor: 'green',
        alignSelf: 'center',
        borderRadius:2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20
    },
    confirmText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize:14

    },
    cancelBox: {
        width: '90%',
        height:50,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius:2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20

    },
    cancelText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize:14

    }
})
export default PendingModal