import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import DatePicker from 'react-native-datepicker'
import CreditCardHeader from '../Headers/CreditCardHeader'
import {AntDesign} from 'react-native-vector-icons'
import {createAccountWithBasicInfo} from '../Stripe/functions'
import {NetworkInfo} from "react-native-network-info";
import {addStylistAccountId, addClientStripeId} from "../Database/functions"
// import UserAgent from 'react-native-user-agent';
import moment from 'moment'


const VerifyYourIdentity = ({navigation}) => {
    var stylistId = navigation.state.params.stylistId
    const [date,setDate] = useState(new Date())
    const [firstName, setfirstName] = useState(null)
    const [lastName, setlastName] = useState(null)
    const [number, setNumber] = useState('')
    const [socialsecurity, setSocialSecurity] = useState('')
    const [email, setEmail] = useState(null)
    const [disable, setDisable] = useState(true)
    const [ip, setIp] = useState(null)
    // const [userAgent, setuserAgent] = useState(UserAgent.getUserAgent())

    if (ip==null){
        NetworkInfo.getIPAddress().then(ipAddress=> {
            setIp(ipAddress)
        })
    }
    console.log("THE USER AGENT IN VERIFY YOUR IDENTITY")
  
    console.log("THE NEW DATE")
    console.log(new Date())
    console.log("THE IP")
    console.log(ip)

  

    const initializeAccount = () => {
        var today = moment().format("YYYY.MM.DD")
        var unix = moment(today,'YYYY.MM.DD').unix()
        console.log("THE UNIX TIME IN INITIALIZE ACCOUNT")
        console.log(unix)
        
        console.log("IN INITIALIZE ACCOUNT")
        console.log(typeof(date))
        var payload = {
            type: 'custom',
            business_type: 'individual',
            individual: {
                first_name: firstName,
                last_name: lastName,
                phone: number,
                email: email,
                id_number: socialsecurity,
                dob: {
                    day: Number(date.split("-")[2]),
                    month: Number(date.split("-")[1]),
                    year: Number(date.split("-")[0])
                }
            },
            capabilities: {
                card_payments: {
                    requested: true
                },
                transfers: {
                    requested: true
                }
               
            },
            tos_acceptance: {
                date: unix,
                ip: ip,
                service_agreement: "full",
             
            },
            business_profile: {
                mcc: 7230,
                product_description: "Salon services"
            }
        }
        console.log("THE PAYLOAD BEFORE CREATE ACCOUNT WITH BASIC INFO")
        console.log(payload)
        createAccountWithBasicInfo(payload, (result)=> {
           if (result!=null){
               const {navigate} = navigation
               console.log("BEFORE GOING TO BANK ACCOUNT")
               console.log(result)
               addClientStripeId(stylistId, result, (res)=> {
                   if (res!=null){
                        navigate("Mailing Address", {
                            accountId: result
                            
                        })

                   } else {
                       Alert.alert('Network Error', "Unable to save identity information")
                   }
               })
           }
        })
    }
    

    const _handleNumberChange = (input) => {
        console.log("in handle number change")
        console.log(input.length)
        console.log(number.length)
        if (input.length>number.length){
            console.log("INPUT LEN IS GREATER THAN NUMBER LEN")
            if ((input.replace(/[-]/g,'').length) % 3==0  && number.replace(/[-]/g,'').length>0 && number.replace(/[-]/g,'').length <7){
                setNumber(number => input + "-")
            } else {
                console.log("IN ABOUT TO SET NUMBER IN HANDLE NUMBER CHANGE")
                setNumber(number => input)
            }
        }
        if (input.length<number.length){
            //console.log("IN DELETE")
            if (number.charAt(number.length-1)=="-"){
                setNumber(number=>number.slice(0,-2))
            } else {
                setNumber(number=>input)
            }
        }

    }
    const _handleSocialSecurityChange = (input) => {
       
        if (input.length>socialsecurity.length){
            console.log("INPUT LEN IS GREATER THAN NUMBER LEN")
            if ((input.replace(/[-]/g,'').length) % 3==0  && socialsecurity.replace(/[-]/g,'').length>0 && socialsecurity.replace(/[-]/g,'').length <7){
                setSocialSecurity(socialsecurity => input +"-")
              
            } else {
                console.log("IN ABOUT TO SET NUMBER IN HANDLE NUMBER CHANGE")
                setSocialSecurity(socialsecurity => input)
            }
        }
        if (input.length<socialsecurity.length){
            //console.log("IN DELETE")
            if (socialsecurity.charAt(socialsecurity.length-1)=="-"){
                setSocialSecurity(socialsecurity => socialsecurity.slice(0,-2))
              
            } else {
                setSocialSecurity(socialsecurity => input)
            }
        }

    }

    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Regular': require("../assets/fonts/Lato-Regular.ttf"),
        'Lato-Medium': require("../assets/fonts/Lato-Medium.ttf"),
        'Lato-Semibold': require("../assets/fonts/Lato-Semibold.ttf"),
        'Lato-Heavy': require("../assets/fonts/Lato-Heavy.ttf")

     });
    return (
        <View style={styles.container}>
            <CreditCardHeader/>
            {fontsLoaded && 
            <View style={
                styles.body
            }>
                <Text style={{
                    fontFamily: 'Poppins-Medium',
                    alignSelf: 'center',
                    fontSize: 20,
                    marginBottom:10,
                    marginTop:20
                }}>Verify Your Identity</Text>
                <Text>Federal law requires we verify your identity to make sure your account is secure.</Text>

                <View style={styles.form}>
                    <View style={styles.inputbox}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                           
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium'
                            }}>FIRST NAME</Text>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize:12
                            }}>As appears on drivers license</Text>
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={firstName}
                        onChangeText={setfirstName}
                        ></TextInput>
                    </View>
                    <View style={styles.inputbox}>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                        }}>
                            <Text style={{
                                 fontFamily: 'Poppins-Medium',
                                

                            }}>LAST NAME</Text>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize:12
                            }}>As appears on drivers license</Text>
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={lastName}
                        onChangeText={setlastName}
                        ></TextInput>

                    </View>
                    <View style={styles.inputbox}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium'
                        }}>PHONE NUMBER</Text>
                         <TextInput style={{
                             height:25,
                            
                        }} keyboardType={'numeric'}
                        placeholder={'XXX-XXX-XXXX'}
                        onChangeText={setNumber}
                        value={number}
                        maxLength={12}
                        
                        ></TextInput>
                    </View>   
                    <View style={styles.inputbox}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium'
                        }}>EMAIL</Text>
                         <TextInput style={{
                             height:25,
                            
                        }} 
                       
                        onChangeText={setEmail}
                        value={email}
                      
                        
                        ></TextInput>
                    </View> 
                    <View style={styles.inputbox}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium'
                        }}>SOCIAL SECURITY NUMBER</Text>
                        <TextInput style={{
                             height:25,
                            
                        }} keyboardType={'numeric'}
                        placeholder={'XXX-XX-XXXX'}
                        onChangeText={setSocialSecurity}
                        maxLength={9}
                        ></TextInput>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium'
                        }}>DATE OF BIRTH</Text>
                        <DatePicker date={date} onDateChange={setDate}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            style={{
                                borderWidth:0,
                                display: 'flex',
                                justifyContent: 'flex-end'
                                
                            }}
                            maxDate={new Date()}
                            customStyles={{
                                dateIcon: {
                                    display:'none'
                                },
                                cancelBtnText: {
                                    color: "#1A2232"
                                },
                                confirmBtnText: {
                                    color: "#1A2232"
                                },
                                dateTouchBody: {
                                    backgroundColor: "transparent",
                                    borderColor:'transparent',
                                    borderWidth:0,
                                    width:Dimensions.get("window").width-40,
                                },
                                dateInput: {
                                    borderWidth:0.1,
                                    borderColor: 'lightgray',
                                    alignItems: 'flex-start',
                                    height:25,
                                    backgroundColor: "transparent",
                                    width:Dimensions.get("window").width-40,

                                },
                                btnTextConfirm: {
                                    color:"#1A2232"
                                },
                                dateText: {
                                    fontSize:16
                                }
                                
                            }}/>
                    </View>

                </View>

                <View style={styles.disclaimer}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize:12,
                        alignSelf:'center'
                    }}>
                        *** This information will be used for verification purposes only.
                        It will not be shared with your clients or displayed on your storefront.
                    </Text>
                </View>
                <View style={styles.moreInfo}>
                    <AntDesign name={"questioncircleo"} size={30} style={{
                        alignSelf:'center',
                        marginBottom:10
                    }}/>
                    <Text style={{
                        alignSelf:'center',
                        fontFamily: 'Poppins-Medium',
                        fontSize:12,
                    }}>
                        Need more info? Reach out to info@glamoapp.com with any questions.

                    </Text>
                </View>
                
            </View>
            }
            {fontsLoaded && 
                <TouchableOpacity style={{
                        flexDirection: "row",
                        alignItems: "center",
                        textAlign: "center",
                        // flex: 1,
                        justifyContent: 'center',
                        // bottom:-Dimensions.get('window').height*0.05,
                        bottom: Dimensions.get('window').height<=1000?Dimensions.get('window').height*0.05:Dimensions.get('window').height*0.15,
                        padding:'2%',
                        alignSelf: 'center',
                        backgroundColor: "black",
                        //height: 70,
                        height: Dimensions.get('window').height*0.08,
                        
                        width: Dimensions.get('window').width
                    }} onPress={()=>initializeAccount()}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            color: 'white',


                        }}>Continue</Text>
                    </TouchableOpacity>
            }

        </View>
        
    )

}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
    },
    body: {
        marginRight:20,
        marginLeft:20,
        height:'85%'
     
    },
    inputbox: {
        borderTopColor:'lightgrey',
        borderTopWidth:0.5,
        borderBottomColor: 'lightgrey',
        borderBottomWidth:0.5,
        paddingTop:5
    },
    form: {
        marginTop:20
    },
    disclaimer: {
        alignSelf:'center',
        marginTop:40
    },
    moreInfo: {
        marginTop:40
    }

})
export default VerifyYourIdentity