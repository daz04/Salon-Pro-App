import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert, Linking, TouchableHighlight } from 'react-native';
import moment from 'moment'
import {Ionicons} from 'react-native-vector-icons'
import { useFonts } from 'expo-font';
const AppointmentDetails = ({appointment,client, service, transaction}) => {
    console.log("THE APPOINTMENT DETAILS 1")
    console.log(appointment)
    console.log(client)
    console.log(service)
    console.log(transaction)
    const [servicePricePostComission, setservicePricePostComission] = useState(null)
    const [comissionAmount, setcomissionAmount] = useState(null)
    const [takeHomeAmount, setTakeHomeAmount] = useState(null)
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../../../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../../../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../../../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Medium": require("../../../../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Light": require("../../../../../assets/fonts/Poppins-Light.ttf")
     });

     useEffect(()=> {
        var finalComissionAmount = computeComissionAmount()
        setcomissionAmount(finalComissionAmount)
        var finalServiceAmount = computeServiceAmountPostComission(finalComissionAmount)
        setservicePricePostComission(finalServiceAmount)
        var takeHomeAmount = computeStylistTakeHomeAmount(finalServiceAmount)
        setTakeHomeAmount(takeHomeAmount)
     },[])

   
     const computeComissionAmount = () => {
        return Number(transaction.ServicePrice) * Number(transaction.ComissionPercentage)/100
     }
     const computeServiceAmountPostComission = (finalComissionAmount) => {
         console.log("IN COMPUTE SERVICE AMOUNT POST COMISSION")
         console.log(finalComissionAmount)
         console.log(transaction.S)
         console.log(Number(transaction.ServicePrice) - finalComissionAmount)
         return Number(transaction.ServicePrice) - finalComissionAmount

     }

     const computeStylistTakeHomeAmount = (servicePricePostComission) => {
         console.log("IN COMPUTE STYLIST TAKE HOME AMOUNT")
         console.log(servicePricePostComission)
         console.log(transaction.TaxesPrice)
         console.log(transaction.TravelPrice)
         return Number(servicePricePostComission + Number(transaction.TravelPrice) + Number(transaction.TaxesPrice)).toFixed(2)

     }

     const goToMaps = () => {
        Linking.openURL(`https://www.google.com/maps/place/${appointment.ClientAddress}`)
     }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                       <Text style={styles.infoText}>BOOKING INFO</Text>
                       
                       <TouchableOpacity style={styles.getDirectionBackground} onPress={()=>goToMaps()}>
                      
                        {fontsLoaded &&
                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize:14,
                            alignSelf: 'center',
                            color: "#1A2232",
                            fontWeight:'600'
                        }}>Get Directions</Text>
                        }
                    </TouchableOpacity>

                   </View>
                   <View style={styles.row}>
                       {fontsLoaded &&
                       <View style={styles.dateBox}>
                           <Text style={{
                                color: "white",
                                fontWeight:'bold',
                                fontSize:18,
                                fontFamily: 'Poppins-Bold'
                        
                           }}>{moment(appointment.Date).format("ll").toUpperCase()}</Text>
                           <Text style={{
                               color:'white',
                               fontSize:24,
                               fontFamily: 'Poppins-Light'
                           }}>
                               {appointment.StartTime}
                               {/* {moment(appointment.StartTime).format("h:mm A")} */}
                               </Text>
                       </View>
                    }
                      
                   </View>
                   <View style={styles.row}>
                       {fontsLoaded && 
                       <View style={styles.addressBox}>
                           <Text style={{
                                color: 'white',
                                fontSize:18,
                                fontWeight: '500',
                                fontFamily: 'Poppins-Bold'

                           }}>ADDRESS</Text>
                           <Text style={{
                               color: 'white',
                               fontSize:16,
                               fontWeight: '500',
                               fontFamily: 'Poppins-Light'
                           }}>{appointment.ClientAddress.toUpperCase()}</Text>  
                       </View>
                    }
                   </View>
                   <View style={styles.row}>
                  
                   <View style={styles.mapBox}>
                  
                   {/* <TouchableOpacity onPress={()=>goToMaps()}>
                       
                           <Text style={styles.mapText}>VIEW ON MAP</Text>
                    </TouchableOpacity> */}
                       </View>
                    </View>
                   <View style={styles.row2}>
                       {fontsLoaded &&
                       <View style={styles.clientBox}>
                           <Text style={{
                               color: "white",
                               fontWeight: 'bold',
                               fontSize:24,
                               fontFamily: 'Poppins-Bold'

                           }}>{client.FirstName} {client.LastName}</Text>
                       </View>
                    }
                       
                   </View>
                   <View style={styles.row}>
                       {service!=null &&
                       <View>
                        {fontsLoaded &&
                       <Text style={{
                           color: "white",
                           fontSize: 16,
                           fontFamily: 'Poppins-Regular'
                       }}>1 x {service.Name}</Text>

                    }
                       
                       </View>
                       }
                       <View style={styles.duration}>
                           <Text style={styles.durationText}>{service.Duration} min</Text>
                           <Ionicons name={"time-outline"} size={15} color={"white"} ></Ionicons>

                       </View>
                           
                       </View>
                    <View style={{width:'100%', marginTop:10}}>
                        <View style={{alignSelf: 'center', height:1, width:'90%',borderTopColor: 'lightgrey',borderTopWidth:0.5, zIndex:0}}>
    
                        </View>
                        <Text style={styles.totalText}>TOTAL</Text>
                    </View>
                    <View style={{
                        marginLeft:20,
                        marginRight:20
                    }}>
                        <Text style={styles.priceText}>${transaction.TotalPrice}</Text>
                        {fontsLoaded && 
                        <View>
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
                                <Text style={{
                                    fontFamily: 'Poppins-Regular',
                                    color: 'white',
                                  
                                }}> + ${Number(transaction.ServicePrice).toFixed(2)}</Text>
                               
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width:'100%'
                             
                            }}>
                                 <View style={{
                                    flexDirection:'row',
                                   width:'100%',
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{
                                         fontFamily: "Poppins-Regular",
                                         color:"white"

                                    }}>
                                        Comission Fee      - ({transaction.ComissionPercentage}%)
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Poppins-Regular",
                                        color:"white",
                                        alignSelf: 'flex-end',
                                        justifyContent: 'flex-end'
                                
                                    }}> - ${Number(comissionAmount).toFixed(2)}</Text>
                                   
                                </View>
                                
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width:'100%'
                              
                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: 'white',
                                    
                                    }}>Travel Cost</Text>
                                </View>
                                <Text style={{
                                    fontFamily: 'Poppins-Regular',
                                    color: 'white',
                                    maxWidth:'33%'
                                }}> + ${Number(transaction.TravelPrice).toFixed(2)}</Text>
                               
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width:'100%'

                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: 'white',
                                      
                                    }}>Taxes</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: 'white',
                                      
                                    }}> + ${transaction.TaxesPrice}</Text>
                                </View>
                             
                               
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            
                            }}>
                                <View>
                                <Text style={{
                                    fontFamily: 'Poppins-Regular',
                                    color: 'white',
                                }}>Booking Fee (for Glamo)</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: 'white',
                                     
                                    }}> - ${Number(transaction.BookingPrice).toFixed(2)}</Text>
                                </View>
                               
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent: 'space-between',
                                marginTop:'5%'
                            }}>
                                {fontsLoaded && 
                                <Text style={{
                                    fontFamily: 'Poppins-Medium',
                                    color: "white",

                                

                                }}>Take-Home Amount</Text>
                                }
                            <View>
                                <Text style={{
                                    fontFamily: 'Poppins-Medium',
                                    color:'white'
                                }}>${takeHomeAmount}</Text>

                            </View>
                            </View>
                        </View>

                    }
                    </View>
                    </ScrollView>
               
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1A2232",
        borderRadius:20,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
   
        
    modal:{
        
        borderRadius:20,
        width: '100%',
        height: '80%',
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom:'5%'
        
        

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

    },
    getDirectionBackground: {
        backgroundColor: 'white',
        width:150,
        borderRadius:10,
        height:30,
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'center'
       
      
       
    }

})

export default AppointmentDetails