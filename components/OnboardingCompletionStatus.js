import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getPaymentMethod, getStylist} from '../Database/functions'
import {MaterialIcons} from 'react-native-vector-icons'
import {retrieveConnectAccount} from '../Stripe/functions'


const OnboardingCompletionStatus = ({redirectLink}) => {
    console.log("IN ONBOARDING COMPLETION SCREEN")
    const [stylistId, setstylistId] = useState(null)
    const [stylist, setStylist] = useState(null)
    const [stripeId, setstripeId] = useState(null)
    const [paymentMethod, setpaymentMethod] = useState([])
    const [message, setMessage] = useState(null)
    const [redirectPage, setredirectPage] = useState(null)
    
    useEffect(()=> {
        console.log("IN USE EFFECT AGAIN OF ONBOARDING 2")
        if (stylistId==null){
            fetchStylistId()
        }
        if (stylistId!=null){
            getStylist(stylistId, (result)=> {
                if (result!=null){
                    console.log("GET STYLIST IN ONBOARDING 2")
                    console.log(result.data[0].StripeId)
                    setStylist(result.data[0])
                    if (result.data[0].StripeId ==null){
                        console.log("ON BOARDING STATUS")
                        console.log("stripe id is null")
                        //stylist has not put in their identity information 
                        setMessage("Onboarding Incomplete.")
                        setredirectPage("Verify Your Identity")

                    } else {
                        setstripeId(result.data[0].StripeId)
                        //we have a connected account id. We need to retrieve that connected account information to see if there are any lacking requirements
                        retrieveConnectAccount(result.data[0].StripeId , (res)=> {
                            if (res!=null){
                                console.log("RETRIEVE CONNECT ACCOUNT RESPONSE B")
                                console.log(res)
                                var mailingAddress = res.individual.address 
                                var externalAccount = res.external_accounts.data
                                var accountError = res.individual.requirements.currently_due
                                console.log("ACCOUNT ERROR EXISTS")
                                console.log(accountError)
                                if (mailingAddress.city==null || mailingAddress.line1==null || mailingAddress.state==null || mailingAddress.postal_code==null){
                                    //this statement means that user has not input their mailing information in as of yet
                                    setMessage("Onboarding Incomplete.")
                                    setredirectPage("Mailing Address")
                                    AsyncStorage.setItem("OnboardingComplete", "false")
                                } else if (externalAccount.length==0){
                                    setMessage("Onboarding Incomplete.")
                                    setredirectPage("Add Bank Account")
                                    AsyncStorage.setItem("OnboardingComplete", "false")
                                } else if (accountError.includes("verification.document")){
                                    console.log("IN ACCOUNT ERROR 3")
                                    setMessage("Onboarding is Pending")
                                    setredirectPage("Taking Too Long?")
                                    AsyncStorage.setItem("OnboardingComplete", "false")
                            
                                } else {
                                    console.log("IN ONBOARDING COMPLETE STATEMENT")
                                    AsyncStorage.setItem("OnboardingComplete", "true")
                                }
                        }})
                    }
                    
                }
            })
        } 
      
       


    },[stylistId, stripeId])
    const fetchStylistId = async () => {
        console.log("IN FETCH STYLIST ID IN ONBOARDING 1")
        var stylistId = await AsyncStorage.getItem("stylistId")
        console.log(stylistId)
        setstylistId(stylistId)

    }


    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Medium': require("../assets/fonts/Lato-Medium.ttf"),
        'Lato-Regular': require("../assets/fonts/Lato-Regular.ttf")
     
     });

  
    return (
        <View style={{
            width: Dimensions.get('window').width,
            height: 'auto',
            paddingTop:2,
            paddingBottom:2,
            backgroundColor: 'black',
            display: message!=null?'flex':'none',
            flexDirection:'column'
        }}>
            {fontsLoaded && message!=null && redirectPage!=null &&
            <TouchableOpacity onPress={() => redirectLink(redirectPage, stripeId)}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <MaterialIcons name={'error-outline'} size={15} color={"white"} style={{
                    alignSelf:'center',
                    marginRight:5
                    
                }}/>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'white',
                   
                }}>{message}</Text>
               
            </View>
            {message!="Onboarding is Pending"  &&
            <Text style={{
                    color: 'white',
                    fontFamily: 'Poppins-Light',
                    fontSize:11,
                    alignSelf:'center'
                }}>Click to fill out missing information</Text>
            } 
            {message=="Onboarding is Pending" &&
             <Text style={{
                color: 'white',
                fontFamily: 'Poppins-Light',
                fontSize:11,
                alignSelf:'center'
            }}>Your identity and account information are being reviewed</Text>
            }
            </TouchableOpacity>
            }
            

        </View>

    )

}
const styles = StyleSheet.create({ 
   

})
export default OnboardingCompletionStatus
