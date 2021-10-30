import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import { getStylistEarnings , getSubscriptions, setStylistSubscription, getStylist, getPaymentMethod, createTransaction} from '../Database/functions';
import SchedualeHeader from '../Headers/scheduale'
import {retrieveSubscriptionList,createCharge} from '../Stripe/functions'
import {sendVerificationEmail, sendSubscriptionConfirmation} from '../Twilio/functions'
import {Ionicons} from 'react-native-vector-icons'
import axios from 'axios'
import uuid from 'react-native-uuid'
import { Alert } from 'react-native';
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay'
import { useFonts } from 'expo-font';


const SubscriptionSettings = (props) => {
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
    var stylistProps = props.navigation.state.params.stylist
    // var selectedOption = stylist.Subscription
    var passedSub = props.navigation.state.params.selectedSub
    var cardAddedProps = props.navigation.state.params.cardAdded 
    console.log("THE STYLIST IN SUB SETTINGS AGAIN")
    console.log(stylist)
    //just pass it to not load it from async storage everytime
    const [spinner, setSpinner] = useState(true)
    const [subscriptionType, setType] = useState(null)
    const [renewalDate, setrenewalDate] = useState(null)
    const [options, setOptions] = useState([])
    const [prices, setPrices] = useState([])
    const [description, setDescriptions] = useState({})
    const [scopes, setScopes] = useState({})
    const [intervals, setIntervals] = useState({})
    const [stylist, setStylist] = useState(null)
    const [otherSelected, setotherSelected] = useState(null)
    const [stripeId, setStripeId] = useState(null)
    const [fetchStripeId, setStripeFetched] = useState(false)
    const [cardAdded, setcardAdded] = useState(false)
    const [selectedOption, setselectedOption] = useState(null)
    const [refresh, setRefresh] = useState(props.navigation.state.params.refresh)
    const [subscriptions, setSubscriptions] = useState([])

    console.log("SUBSCRIPTION SETTINGS 2")
    console.log(refresh)
    console.log(props.navigation.state.params.refresh)

    useEffect(()=> {
        console.log("IN USE EFFECT LOOP")
        if (stylist==null){
            console.log("STYLIST IS NULL1")
            console.log(stylistProps)
            //set stylist object
            setStylist(stylistProps)
            //set subscription type as stylist's current subscription
            setType(stylistProps.Subscription)
            //set the selected subscription as stylist subscription
         
        }
        if (subscriptions.length==0 && subscriptionType!=null){
            console.log("ABOUT TO FETCH SUBSCRIPTIONS IN SUBSCRIPTION SETTINGS")
            getSubscriptions((result)=> {
                if (result!=null){
                    console.log("THE SUBSCRIPTION RESULT")
                    console.log(result.data)
                    setSubscriptions(result.data)
                    var selectedOption = null 
                    for (var record in result.data){
                        if (result.data[record].Name==subscriptionType){
                            selectedOption = result.data[record]
                            break
                        }
                    }
                    console.log("THE SELECTED OPTION FOR SUBSCRIPTIONS")
                    console.log(selectedOption)
                    setselectedOption(selectedOption)
                    setSpinner(false)
                    

                } else {
                    Alert.alert("Network Error", "Unable to fetch subscription options")
                }

            })
        }



    },[subscriptionType])
   

  
    // if (options.length==0){
    //     getSubscriptions((result)=> {
    //         console.log("IN GET SUBSCRIPTIONS ANSWER")
    //         console.log(result)
    //         var subscriptionList = result.data 
    //         console.log("THE SUBSCRIPTION LIST 2")
    //         console.log(subscriptionList)
    //         var names = []
    //         var preNames = []
    //         var priceList = {}
    //         var scopesList ={}
    //         var descriptionList = {}
    //         var intervalList = {}
    //         for (var sub in subscriptionList){
              
    //             preNames.push(subscriptionList[sub])
    //             // names.push(subscriptionList[sub].Name)
    //             priceList[subscriptionList[sub].Name] = subscriptionList[sub].Price
    //             if (subscriptionList[sub].Description!=null){
    //                 descriptionList[subscriptionList[sub].Name] = subscriptionList[sub].Description
    //             }
    //             intervalList[subscriptionList[sub].Name] = subscriptionList[sub].RenewalInterval
    //             scopesList[subscriptionList[sub].Name] = subscriptionList[sub].Scopes
                

    //         }
    //         preNames = preNames.sort((a,b)=> {
    //             return a.Precedence>b.Precedence
    //         })
    //         console.log("THE PRENAMES 3")
    //         console.log(preNames)
    //         for (var elem in preNames){
    //             names.push(preNames[elem].Name)
    //         }
    //         // priceList = priceList.sort((a,b)=> priceList[a]<priceList[b])
    //         // names = []
    //         // for (var elem in priceList){
    //         //     names.push(elem)
                
    //         // }
            
    //         console.log("BEFORE SET OPTION NAMES")
    //         console.log(names)

    //         setOptions(names)
    //         setPrices(priceList)
    //         setDescriptions(descriptionList)
    //         setScopes(scopesList)
    //         setIntervals(intervalList)
    //     })
    // }




    // //I don't know if I should save subscriptions by number or by name in case we choose to rename
    // if (passedSub!=null && selectedOption==null && stylist!=null){
    //     console.og("WE ARE IN FIRST ITER")
    //     console.log(stylist)
    //     setotherSelected(passedSub)
    //     setselectedOption(stylist.Subscription)
    //     console.log("BEFORE RENEWAL DATE 1")
    //     console.log(stylist)
    //     setrenewalDate(stylist.RenewalDate)
    // } else if (selectedOption==null && stylist!=null){
    //     console.log("THE NEW STYLIST")
    //     console.log(stylist)
    //     setselectedOption(stylist.Subscription)
    //     setrenewalDate(stylist.RenewalDate)
    // }

    
    const goBack = () => {
        props.navigation.goBack()
    }

    const fetchActiveSubscriptions = () => {
        retrieveSubscriptionList(stylist.StripeId, (result)=> {
            if (result!=null){
                //result is gonna be a list
                for (var data in result){



                }

            }
        })


    }

    const refreshPage = () => {
        getStylist(stylist.id, (result)=> {
            if (result!=null){
                console.log("IN REFRESH PAGE STYLIST")
                console.log(result.data)
                setStylist(result.data[0])
                setOptions([])
                setselectedOption(result.data[0].Subscription)
                setrenewalDate(result.data[0].RenewalDate)
            }
            
        })
        setRefresh(props.navigation.state.params.refresh)
    }
    // if (props.navigation.state.params.refresh != refresh){
    //     refreshPage()
    // }
   
    // if (subscriptionType!="Free" && renewalDate==null){
    //     //have to get renewal date
    //     fetchRenewalDate()
    // }

    const selectSubscription = (name) => {
        console.log("IN SELECT SUBSCRIPTION 2")
        console.log(stylist.StripeId)
        if (stylist!=null && stylist.StripeId==null ){
            const {navigate} = props.navigation 
            var stylistPayload = {
                id: stylist.id, 
                activeAddress: stylist.ActiveAddress, 
                addressList: stylist.AddressList, 
                birthdate: stylist.Birthdate,
                email: stylist.Email,
                firstName: stylist.FirstName,
                lastName: stylist.LastName,
                phone: stylist.Phone,
                status: stylist.Status, 
                subscription: stylist.Subscription,
                titles: stylist.Titles
            }
            console.log("BEFORE NAV TO PAYMENT")
            navigate("Subscription Payment", {
                stylistPayload: stylistPayload, 
                next: "Subscription Settings",
                stylist: stylist,
                updateSubscription:true,
                selectedSub: name,
                subscriptionFlag: true,
                discount:0,
                amount: prices[name]

            })
            //they have not created a card yet 
            //redirect them to card screen

        } else {
            //we already have a card 
            //put up alert to proceed with payment 
            //after that refresh

            //step 1: get payment method
            getPaymentMethod(stylist.StripeId, (result)=> {
                if (result==null){
                    Alert.alert("Network Error", "Unable to process request")
                } else {
                    console.log("GET PAYMENT METHOD RES")
                    console.log(result)
                    var mainPaymentMethod = result.data[0].MainPaymentMethod
                    console.log("THE MAIN PAYMENT METHOD")

                    console.log(mainPaymentMethod)
                    var interval = intervals[name]
                    var currentDate = moment().format("YYYY-MM-DD")
                    
                    var renewal = moment(currentDate).add(interval, 'M').format("YYYY-MM-DD")
                    Alert.alert("Confirmation", `Proceed with the purchase of the Glamo ${name} for $${prices[name]}?`, [
                        {
                            text: 'Approve',
                            onPress: () => {
                                createCharge(prices[name] *100, stylist.StripeId, mainPaymentMethod, (result)=> {
                                    console.log("CREATE CHARGE RESULT")
                                    console.log(result)
                                    if (result!=null){
                                        setStylistSubscription(stylist.id, name, renewal, (result)=> {
                                            if (result==null){
                                                Alert.alert("Network Error","Error occured while trying to update your subscription")
                                            }
                                            else {
                                                sendSubscriptionConfirmation(stylist.email, name, prices[name], currentDate, (result)=> {
                                                    console.log("Send subscription confirmation went through")
                                                    refreshPage()
        
                                                })


        
                                            }
                                        })

                                    }
                                })
                                
                            }
                        }, {
                            text: "Cancel"
                        }
                    ], 
                    {
                        cancelable: true,

                    
                    }
                    )
                    


                }
            } )

            
            
        }
        setotherSelected(name)
    }


    const createSubscription = (price,priceAmount, stripeId, stylistId,cardId) => {
        console.log("IN CREATE SUBSCRIPTION 2")
        console.log(price)
       
        axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/subscription/createSubscription?priceId=${price}&customerId=${clientId}&paymentId=${paymentMethodId}`).then(response=> {
        //axios.get(`http://localhost:5000/subscription/createSubscription?priceId=${price.id}&customerId=${stripeId}&paymentId=${cardId}`).then(response=> {
            if (response!=null){

                console.log("CREATE SUBSCRIPTION WAS SUCCESSFUL")
                console.log(response.data)
                var payloadId = uuid.v4()
                var payload = {
                    id: payloadId,
                    customerId: stylistId, 
                    cardId: cardId, 
                    amount: priceAmount
                }
                createTransaction(payload, (result)=> {
                    if (result==null){
                        Alert.alert("Payment Error", "There was an issue processing your payment, please retry")
                    }
                })

            }
        }).catch(error=> {
            console.log(error)
        })

        
        console.log("THE PAYLOAD")
        console.log(payload)

        

    }
    const createPrice = (stripeId, stylistId, cardId) => {
        console.log("IN CREATE PRICE 2")
        console.log(stripeId)
        var theindex = options.indexOf(otherSelected)
        var priceOriginal = prices[theindex]
        var price = prices[theindex] * 100
        var productName = otherSelected
        axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/price/createPrice?priceCent=${priceCents}&productName=${productName}`).then(response=> {
        //axios.get(`http://localhost:5000/price/createPrice?priceCent=${price}&productName=${productName}`).then(response=> {
        console.log("PRICE")
        console.log(response)
        if (response!=null){
            console.log("THE PRICE RESPONSE")
            console.log(response)
            // setPriceId(response.data)
            createSubscription(response.data,priceOriginal,stripeId,stylistId, cardId)
        }
        }).catch(error=> {
            console.log(error)
        })



    }
    const submit = () => {
        console.log("IN SUBMIT")
        console.log(stylist.id)
        getStylist(stylist.id, (result)=> {
            if (result!=null){
                console.log("THE SUBMIT")
                console.log(result)
                var stripeId = result.data[0].StripeId 
                getPaymentMethod(stripeId, (response)=> {
                    if (response!=null && response.data.length>0){
                        var paymentId = response.data[0].MainPaymentMethod
                        createPrice(stripeId, stylist.id, paymentId)

                    }
                })


            }
        })
        //change subscription
        //need to form payment with card number


    }

    var submitBox = null 
    // if (otherSelected!=null){
    //     submitBox = <TouchableOpacity style={styles.submitBtn} onPress={()=>submit()}>
    //     <Text style={styles.submitText}>Update Subscription</Text>
    // </TouchableOpacity>
    // }
    return (
        <View style={styles.container}>
             <Spinner 
            visible={spinner}
            />
            <SchedualeHeader backwards={goBack}/>
            <ScrollView style={{height:'100%'}}>
            <View style={styles.body}>
            {selectedOption!=null && 
            <View style={styles.current}>
               
                <Text style={{fontWeight:'600', color: '#1A2232', marginLeft:20, fontSize:22, marginBottom:10,
                    fontFamily: 'Poppins-Medium'}}>Current Plan:</Text>
                    <View style={{backgroundColor:"#1A2232", height:120,width:Dimensions.get('window').width-40,margin:10,borderRadius:20,flexDirection:'row', justifyContent: 'space-between', alignSelf: 'center'}}>
                       <View style={{marginBottom:10,marginLeft:20,alignSelf:'center'}}>
                        <Text style={{color:"white",fontWeight:'600',fontSize:24, justifyContent: 'flex-end', justifyContent: 'flex-end', maxWidth:120,
                    fontFamily: 'Poppins-Medium'}}>{selectedOption.Name}</Text>
                        </View>
                        <View style={styles.optionDescription}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap',alignSelf:'flex-end', color:"white", fontWeight:'500', maxWidth:'100%', marginRight:20}}>
                        <Text style={{color:"white", fontFamily:'Poppins-Regular'}}>${selectedOption.Price}/</Text>
                        {selectedOption.RenewalInterval>1 && <Text style={{color:"white", marginRight:70, fontFamily:'Poppins-Regular'}}>{selectedOption.RenewalInterval} months</Text>}
                        {selectedOption.RenewalInterval==1 && <Text style={{color:"white", fontFamily:'Poppins-Regular'}}>month</Text>}
                        
                        </View>
                        <Text style={{color:'grey',fontSize:11,display:selectedOption=="Plus"?"flex":"none",alignSelf:'flex-end', justifyContent: 'flex-end',marginRight:20,marginBottom:5,marginTop:5, fontFamily: 'Poppins-Regular'}}>*Recommended</Text>
                        {selectedOption.Scopes !=null && 
                        selectedOption.Scopes.map(des=> {
                            return (
                                <Text  style={{color:"white",marginRight:20, justifyContent:'flex-end',alignSelf: 'flex-end', fontFamily: 'Poppins-Regular'}}>{des}</Text>
                            )
                        })
                        }
                        


                        
                        </View>
                        
                        

                    </View>
               

            </View>
            }
            {subscriptionType!="Free" &&  
            <View style={styles.renew}>
                <Text>Auto renewal at: {renewalDate}</Text>

            </View>}
            
           
            <View style={styles.subscriptions}>
                <Text style={{fontWeight:'600', color: '#1A2232', marginLeft:20, fontSize:22, marginBottom:10, marginTop:Dimensions.get('window').height*0.05, fontFamily: 'Poppins-Regular'}}>Other Available Subscriptions:</Text>
                <View style={{height:Dimensions.get('window').height*0.9, marginLeft:20, marginRight:20}}>
                
            {subscriptions.length>1 && subscriptions.map(option=> {
                
                
                if (option!=selectedOption){
                return (
                    <TouchableOpacity onPress={() => selectSubscription(option)}>
                    <View style={{backgroundColor:selectedOption==option?"#1A2232":"white", height:120,width:Dimensions.get('window').width-40,margin:10,borderRadius:20,flexDirection:'row', justifyContent: 'space-between', alignSelf: 'center',borderWidth:option=="Plus"?2:0,borderColor:option=="Plus"?"#1A2232":"transparent"}}>
                       <View style={{marginBottom:10,marginLeft:20,alignSelf:'center'}}>
                        <Text style={{color:selectedOption==option?"white":"#1A2232",fontWeight:'600',fontSize:24, justifyContent: 'flex-end', justifyContent: 'flex-end', maxWidth:120}}>{option.Name}</Text>
                       
                        </View>
                        <View style={styles.optionDescription}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap',alignSelf:'flex-end', color:selectedOption==option?"white":"#1A2232", fontWeight:'500', maxWidth:'100%', marginRight:20}}>
                        <Text style={{color:selectedOption==option?"white":"#1A2232"}}>${option.Price}/</Text>
                        {intervals[option]>1 && <Text style={{color:selectedOption==option?"white":"#1A2232", marginRight:70}}>{option.RenewalInterval} months</Text>}
                        {intervals[option]==1 && <Text style={{color:selectedOption==option?"white":"#1A2232"}}>month</Text>}
                        
                        </View>
                        <Text style={{color:'grey',fontSize:11,display:option=="Plus"?"flex":"none",alignSelf:'flex-end', justifyContent: 'flex-end',marginRight:20,marginBottom:5,marginTop:5}}>*Recommended</Text>
                        {option.Scopes !=null && 
                        option.Scopes.map(des=> {
                            return (
                                <Text  style={{color:selectedOption==option?"white":"#1A2232",marginRight:20, justifyContent:'flex-end',alignSelf: 'flex-end'}}>{des}</Text>
                            )
                        })
                        }
                        


                        
                        </View>
                        
                        

                    </View>
                    </TouchableOpacity>
                )
            }
            })}
            {subscriptions.length==1 && 
                <View>
                    <Text style={{
                        fontFamily: 'Poppins-Regular'
                    }}>No other subscriptions available at the moment</Text>
                </View>
            }
           
            
            </View>
            </View>
            <ScrollView/>


            {submitBox}

        </View>
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
    },
    subscriptions:{
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap:'wrap',
        // width:'100%',
        // alignSelf: 'center'

    },
    historyTab: {
        borderWidth:0.5,
        borderColor: 'lightgrey',
        height: Dimensions.get('window').height*0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthlyPayment: {
        backgroundColor: "#1A2232",
        height:Dimensions.get('window').height*0.1,
        width:'100%'
    },
    optionDescription: {
        flexDirection:'column',
        alignSelf:'center'
        
     },
     current: {
         marginTop: Dimensions.get('window').height*0.05
     },
     checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,
        marginTop:Dimensions.get('window').height*0.05,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20
    
    },
    check: {
        color: 'white',
        alignSelf: 'center'
    },
    submitBtn: {
      
        backgroundColor: '#1A2232',
        width:'100%',
        height:60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // bottom:0,
        // position:'absolute'
    },
    submitText: {
        fontWeight:'600',
        color: 'white',
        alignSelf: 'center',
        fontSize:18
    },
    body: {
        height:Dimensions.get('window').height
    },
    renew: {
        marginLeft:30, 
    }

})
export default SubscriptionSettings