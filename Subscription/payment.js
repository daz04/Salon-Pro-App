import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SchedualeHeader from '../Headers/scheduale'
import {setStylistStripeId, createPaymentMethodEntry, updatePaymentMethodEntry, addClientStripeId, getSubscriptions, setStylistSubscription} from '../Database/functions'
import {createCharge} from '../Stripe/functions'
import {sendVerificationEmail, sendSubscriptionConfirmation} from '../Twilio/functions'
//import {Elements} from '@stripe/react-stripe-js';
//import {loadStripe} from '@stripe/stripe-js';
import {CreditCardInput, LiteCreditCardInput} from "react-native-vertical-credit-card-input"
// import {
//     CardElement,
//     useStripe,
//     useElements
//   } from "@stripe/react-stripe-js";
import axios from 'axios';
import moment from 'moment';


//import stripe from '@stripe/stripe-react-native'
var stripe = require('stripe-client')('pk_live_51IPVjfDjfKG70QFNRDEnqEBhhJEiizfXty6pbZryCBDyykjdn65JNgWe9MpFhRqNIsct3RH9EMpyxFqxvIuPss1900acdnhhkl')
//var stripe = require('stripe-client')('pk_test_51IPVjfDjfKG70QFNN58V01Z1ktEIPjAT49Rzw88Eu12D03QSiH8aPPQ7ZFmLlUbEMlFf0cvWgbIh1RECJNFiGvay00zAug9QW0')

//Stripe.setOptions({publishingKey: 'pk_live_51IPVjfDjfKG70QFNRDEnqEBhhJEiizfXty6pbZryCBDyykjdn65JNgWe9MpFhRqNIsct3RH9EMpyxFqxvIuPss1900acdnhhkl'})

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


// stripe.setOptions({
//     publishableKey: 'pk_test_51IPVjfDjfKG70QFNN58V01Z1ktEIPjAT49Rzw88Eu12D03QSiH8aPPQ7ZFmLlUbEMlFf0cvWgbIh1RECJNFiGvay00zAug9QW0'
// })


const AddCreditCard = (props) => {
    var params = props.navigation.state.params.params
    var id = props.navigation.state.params.stylistPayload.id
    var discount = props.navigation.state.params.discount
    console.log("THE DISCOUNT HERE")
    console.log(discount)
    var stylistPayload = props.navigation.state.params.stylistPayload
    console.log("STYLIST PAYLOAD IN PAYMENT")
    console.log(stylistPayload)
    var formattedNum = props.navigation.state.params.formattedNum
    const forSubscription = props.navigation.state.params.subscriptionFlag
    const subscriptionOption = props.navigation.state.params.selectedSub
    const forRecievingPayments = props.navigation.state.params.recievingPaymentFlag
    const next = props.navigation.state.params.next



 
    
    const cardList = ['Master','Visa','Apple Pay','PayPal','Discovery']
    // const cardSrc = [
    //     require('../assets/Cards/master-card.png'),
    //     require('../assets/Cards/visa-card.png'),
    //     require('../assets/Cards/apple-pay.png'),
    //     require('../assets/Cards/paypal-card.png'),
    //     require('../assets/Cards/discover-card.png')

    // ]
    // const SrcString = [
    //     '../assets/Cards/master-card.png',
    //     '../assets/Cards/visa-card.png',
    //     '../assets/Cards/apple-pay.png',
    //    '../assets/Cards/paypal-card.png',
    //     '../assets/Cards/discover-card.png'


    // ]

    const ComputePriceCents = () => {
        var price = parseFloat(props.navigation.state.params.params.Price) *100
        return price
        
    }
   
  
    const [cardholderName, setName] = useState(null)
    const [cardNum, setNum] = useState('')
    const [cardType,setType] = useState(1)
    const [exprMonth, setMonth] = useState(null)
    const [exprYear, setYear] = useState(null)
    const [expr,setExpr] = useState('')
    const [cvv, setCvv] = useState(null)
    const [cardsVisible, setVisible] = useState(false)
    const [cards,setCards] = useState(null)
    const [token, setToken] = useState('1235ABC')
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [fetchedSecret, setFetchedSecret] = useState(false);
    const [secretDatabase, setSecretDatabase] = useState(false);
    const [stripeCard, setStripeCard] =useState(null)
    const [stripeClient, setStripeClient] = useState(null)
    const [priceId, setPriceId] = useState(null)
    const [cardForm, setCardForm] = useState(null)
    const [disable,setDisable] = useState(true)
    // const stripe = useStripe();
    // const elements = useElements();

    const createClient = async () => {
        console.log("IN CREATE CLIENT")
        axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/customer/createCustomer`)
        .then(response => {
            console.log("CREATE CLIENT RESPONSE")
            console.log(response)
            if (response!=null){
                setStylistStripeId(id,response)
                setClientSecret(response)
                setFetchedSecret(true)
            }
            
        })
        .catch(error=> {
            console.log(error)
        })

    }

    // if (fetchedSecret==false){
    //     createClient()
    // }
    if (setSecretDatabase==false){
        //comme back to this 
    }




    const goBack = () => {
        props.navigation.goBack()
    }
    //test out with a random token for now 
    var data = []
    var count = 0
    for (var card in cardList){
        var Id = String(count)
        var image = null
        // if (card==0){
        //     image = require('../assets/Cards/master-card.png')

        // } else if (card==1){
        //     image = require('../assets/Cards/visa-card.png')
        // } else if (card==2){
        //     image = require('../assets/Cards/apple-pay.png')
        // } else if (card==3){
        //     image = require('../assets/Cards/paypal-card.png')
        // } else {
        //     image = require('../assets/Cards/discover-card.png')
        // }
       
        var name = cardList[card]
        var obj = {'name':name,'image':image}
        var dataObj = {id:Id,card:obj}
        data.push(dataObj)
        count+=1
    }

    const setCard = async(cardObj) => {
        try {
            var cardString = JSON.stringify(cardObj)
            await AsyncStorage.setItem("@card",cardString)
        } catch (e){
            console.log(e)
        }
    }
    const getStripeCard = async (token) => {
        console.log("IN STRIPPE CARD")
        const params = {
            id: clientSecret,
            token: token
        }
        console.log(params)
        //axios.post(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/card/createCard`,params)
        axios.post("http://localhost:3000/card/createCard",params)
        .then(response=> {
            console.log("GET STRIPE CARD")
            setStripeCard(response)
        })
        .catch(error=> {
            console.log("ERROR IN GET STRIPE CARD")
            console.log(error)
        })

    }
    if (stripeCard!=null){
        //means we already sent submit

    }

    
    const addStripeId = (stripeId, card) => {
        console.log("IN ADD STRIPE ID")
        console.log(stripeId)
        console.log("BEFORE ADD CLIENT STRIPE ID 2")
        console.log(id)
        addClientStripeId(id, stripeId, (response)=> {
            if (response==null){
                console.log("IN ADD STRIPE ID FAILED")
                Alert.alert("Network Error", "Failed to upload card information. Please try again")
            } else {
                createPaymentMethod(card,stripeId)
            }
        })

    }
    const createStripeClient = (card) => {
       
       
        var email = props.navigation.state.params.stylistPayload.email
        console.log(email)
        console.log("IN CREATE STRIPE CLIENT")
        //axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/customer/createCustomer?email=${email}`).then(response=> {
        axios.get(`http://localhost:5000/customer/createCustomer?email=${email}`).then(response=> {
            console.log("CREATE CLIENT RESPONSE")
            console.log(response)
            if (response!=null){
                console.log("CREATE STRIPE CLIENT RESULT")
                console.log(response.data)
                // setStripeClient(response.data)
                addStripeId(response.data,card)
                
                

            }
        }).catch(error=> {
            console.log(error)
        })
    }
    const createPaymentMethod = (token,clientId)=> {
        console.log("IN CREATE PAYMENT METHOD")
        console.log(token)
        console.log(clientId)
        var params = {
            token: token,
            id: clientId
            
        }
        //axios.post(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/card/createCard`,params).then(response=> {
        
        axios.post(`http://localhost:5000/card/createCard`,params).then(response=> {
            if (response!=null){
                console.log("RESULT IN CREATE PAYMENT METHOD 2")
                console.log(response.data)
                
                attachCardtoCustomer(response.data.id,clientId)
                // setStripeCard(response.data)
                // createPrice()
            }
        }).catch(error=> {
            console.log(error)
        })

    }
    const createPrice = (clientId,paymentMethodId) => {
        console.log("IN CREATE PRICE")
        var priceCents = ComputePriceCents()
        console.log("PRICE CENTS")
        console.log(priceCents)
        var productName = props.navigation.state.params.params.Option
        console.log("THE PRODUCT NAME")
        console.log(productName)

        axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/price/createPrice?priceCent=${priceCents}&productName=${productName}`).then(response=> {
            console.log("PRICE")
            console.log(response)
            if (response!=null){
                console.log("THE PRICE RESPONSE")
                console.log(response)
                // setPriceId(response.data)
                createSubscription(response.data,clientId,paymentMethodId)
            }
        }).catch(error=> {
            console.log(error)
        })

    }


    

    const attachCardtoCustomer = (cardId,clientId) => {
        console.log("IN ATTACHING CARD TO CUSTOMER")
        console.log(cardId)
        console.log(clientId)
        //axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/customer/attachCard?id=${cardId}&customerId=${clientId}`).then(response=> {
        //axios.get(`http://localhost:5000/customer/attachCard?id=${cardId}&customerId=${clientId}`).then(response=> {
        console.log("ATTACH CARD TO CUSTOMER RESPONSE")

        var cardList = []
        var newPayment = true
        if (props.navigation.state.params.paymentMethods!=null){
            console.log("WE HAVE PAYMENT METHODS")
            console.log(props.navigation.state.params.paymentMethods)
            cardList = props.navigation.state.params.paymentMethods
            cardList.push(cardId)
            newPayment = false
        } else {
            cardList = [cardId]
        }
        if (newPayment==true){
            console.log("THE CLIENT ID 2")
            console.log(clientId)
            console.log(cardId)
            console.log(cardList)

        
            createPaymentMethodEntry(clientId, cardId, cardList, (result)=> {
                if (result!=null){
                    console.log("CREATE PAYMENT METHOD ENTRY RESPONSE")
                    console.log(result)
                    console.log("FOR SUBSCRIPTION")
                    console.log(forSubscription)
                    const {navigate} = props.navigation
                    if (forSubscription==true){
                        //then we have to take out amount 
                        getSubscriptions((result)=> {
                            console.log("GET SUBSCRIPTIONS ANSWER")
                            console.log(result)
                            if (result!=null && result.data.length>0){
                                console.log("GET SUBSCRIPTIONS LIST IS NOT EMPTY")
                                console.log("SUBSCRIPTION OPTION")
                                console.log(subscriptionOption)
                                for (var elem in result.data){
                                    if (result.data[elem].Name == subscriptionOption){
                                        console.log("FOUND IT")
                                        var price = result.data[elem].Price 
                                        var finalPrice = price
                                        if (discount!=0){
                                            console.log("DISCOUNT IS NOT 0")
                                            console.log(discount)
                                            console.log(1-discount)
                                            
                                            finalPrice = finalPrice*(1-discount/100) *100
                                            console.log("FINAL PRICE")
                                            console.log(finalPrice)
                                        }
                                            createCharge(price*100, clientId, cardId, (result)=> {
                                                console.log("SUCCESSFULLY CREATED A CHARGE 2")
                                                console.log(result)
                                                var currentDate = moment().format("YYYY-MM-DD")
                                                var interval = result.data[elem].RenewalInterval
                                                var renewal = moment(currentDate).add(interval, 'M').format("YYYY-MM-DD")
                                                console.log("THE RENEWAL")
                                                console.log(renewal)

                                                setStylistSubscription(stylistPayload.id, subscriptionOption, renewal, (result)=>{
                                                    if (result==null){
                                                        Alert.alert("Network Error","Error occured while trying to update your subscription")
                                                    }
                                                    else {
                                                        sendSubscriptionConfirmation(stylistPayload.email, subscriptionOption, price, currentDate, (result)=> {
                                                            console.log("Send subscription confirmation went through")
        
                                                        })

                                                    }
                                                })
                                                
                                                
                                                // navigate(next, {
                                                //     stylistPayload: stylistPayload,
                                                //     formattedNum: formattedNum
                                                // })

                                            })
                                            
                                        



                                    }
                                    break
                                }
                            } else {
                                Alert.alert("Network Error", "Unable to proceed with payment")
                            }
                        })

                    
                    }
                    if (props.navigation.state.params.next=="Subscription Settings"){
                        navigate("Subscription Settings", {
                            stylist: props.navigation.state.params.stylist, 
                            selectedSub: props.navigation.state.params.selectedSub,
                            refresh: !props.navigation.state.params.refresh
                        })
                    }
                    if (props.navigation.state.params.next=="Checkout"){
                        navigate("Checkout", {
                            client: props.navigation.state.params.client,
                            state: props.navigation.state.params.state,
                            arrivalDate: props.navigation.state.params.arrivalDate,
                            arrivalTime: props.navigation.state.params.arrivalTime
                        })

                    } else if (props.navigation.state.params.next=="Card List"){
                        navigate("Card List")
                    } else if (props.navigation.state.params.next=="Payout Overview"){
                        navigate("Payout Overview", {
                            stylist: stylistPayload,
                            amount: props.navigation.state.params.amount,
                            refresh: !props.navigation.state.params.refresh
                        })
                    }
                    

                } else {
                    console.log("FAILED IN ATTACH CARD TO CUSTOMER RESPONSE")
                    Alert.alert("Network Error", "Failed to upload card information. Please try again")
                }
            })
        } else {
            updatePaymentMethodEntry(clientId, props.navigation.state.params.mainMethod, cardList, (result)=> {
                if (result!=null){
                    const {navigate} = props.navigation
                    if (props.navigation.state.params.next=="Subscription Settings"){
                        console.log("ABOUT TO NAVIGATE BACK TO SUBSCRIPTION SETTINGS")
                        console.log(props.navigation.state.params.refresh)
                        console.log(!props.navigation.state.params.refresh)
                        navigate("Subscription Settings", {
                            stylist: props.navigation.state.params.stylist, 
                            selectedSub: props.navigation.state.params.selectedSub,
                            refresh: !props.navigation.state.params.refresh
                        })
                    }
                    if (props.navigation.state.params.next=="Checkout"){
                        navigate("Checkout", {
                            client: props.navigation.state.params.client,
                            state: props.navigation.state.params.thestate,
                            arrivalDate: props.navigation.state.params.arrivalDate,
                            arrivalTime: props.navigation.state.params.arrivalTime
                        })

                    } else if (props.navigation.state.params.next=="Card List"){
                        navigate("Card List", {
                            state: props.navigation.state.params.state
                        })
                    }
                    

                } else {
                    console.log("FAILED IN ATTACH CARD TO CUSTOMER RESPONSE")
                    Alert.alert("Network Error", "Failed to upload card information. Please try again")
                }

            })

        }

    }
    const createSubscription = (price,clientId,paymentMethodId) => {
        console.log("IN CREATE SUBSCRIPTION")
        console.log(price)
        console.log(paymentMethodId)
        axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/subscription/createSubscription?priceId=${price}&customerId=${clientId}&paymentId=${paymentMethodId}`).then(response=> {
            if (response!=null){
                console.log("CREATE SUBSCRIPTION WAS SUCCESSFUL")
                console.log(response.data)
            }
        }).catch(error=> {
            console.log(error)
        })

    }
    const validateCard = () => {
        var cardNum = cardForm.values.number
        var expiry = cardForm.values.expiry
        var cvc = cardForm.values.cvc 
        if (cardNum==""){
            alert("Enter in a card number")
            return false
        }
        
        if (cardForm.status.number!="valid"){
            alert("Card number is invalid")
            return false
        }
        if (cardForm.status.expiry!="valid"){
            alert("Expiry is invalid")
            return false
        }
        if (cardForm.values.expiry==""){
            alert("Expiry is empty")
            return false
        }
        if (cardForm.status.cvc!="valid"){
            alert("CVC is invalid")
            return false
        }
        if (cardForm.values.cvc==""){
            alert("CVC is empty")
            return false
        }
        return true




    }
    const submit = async () => {
        const {navigate} = props.navigation
        var service = props.navigation.state.params.service 
        var arrivalDate = props.navigation.state.params.arrivalDate
        var arrivalTime = props.navigation.state.params.arrivalTime
        var lastfourdigits = cardNum.slice(-4)
        var cardName = cardList[cardType]
        //var cardImageSource = SrcString[cardType]
        console.log(expr)
        var validCard = validateCard()
        if (validCard==true){
            console.log("CARD FORM")
            console.log(cardForm)
            console.log(cardForm.values.number.replace(" ",""))
            console.log(parseInt(cardForm.values.expiry.split("/")[0]))
            console.log(parseInt(cardForm.values.expiry.split("/")[0]))
            console.log(cardForm.values.cvc)
            const information = {
                card: {
                    number: cardForm.values.number.replace(" ","").replace(" ","").replace(" ",""),
                    exp_month: parseInt(cardForm.values.expiry.split("/")[0]),
                    exp_year: parseInt(cardForm.values.expiry.split("/")[1]),
                    cvc: cardForm.values.cvc,
                
                }
                
            }
            
            var card = await stripe.createToken(information)
            console.log("GENERATEDDDDD CARDDDDDDD")
            console.log(card)
            if (stylistPayload.StripeId==null){
                createStripeClient(card.id)

            }
            
            else {
                createPaymentMethod(card.id, stylistPayload.StripeId)
            }
            

            console.log("THE CARD TOKEN")
            console.log(card.id)
            // const token =  await Stripe.createTokenWithCardAsync(params)
            // console.log("THE TOKEN")
            // console.log(token)
            // getStripeCard(card.id)


            //we have a token - send token to backend

            // var cardObj = {
            //     lastDigits: lastfourdigits,
            //     cardName: cardName, 
            //     imageSource:cardImageSource,
            //     token:token
            // }
            // setCard(cardObj)

           
             

            }
           
        
     
    }
      
    
    

    const _handleUpdateCard = (image) => {
        // var index = cardSrc.indexOf(image)
        // setType(cardType=>index)
        // setCards(cards=>null)

    }
    // const Item = ({image}) => (
        
    //     <TouchableOpacity style={styles.item} onPress={()=>_handleUpdateCard(image)}>
           
    //         <Image source={image}></Image>

    //     </TouchableOpacity>


    // )
    // const renderItem = ({item}) => (
    //     <Item name={item.card.name} image={item.card.image}/>
    // )
    

    const _handlingExpiration = (text) => {
        if (text.length>expr.length){
           
            if (text.replace(/[/]/g,'').length==2){
                setExpr(expr=>text +"/")


            } else {
                setExpr(expr=>text)
            }
            //this means we are adding text

        }
        if (text.length<expr.length){
            console.log("AT DELETING EXPIRATION TEXT")
            if (expr.charAt(expr.length-1)=="/"){
                setExpr(expr=>expr.slice(0,-2))

            } else {
                setExpr(expr => text)
            }
        }
    }


    const _handlingCardNumber = (number) =>{
        console.log("CARD NUMBER")
        console.log(cardNum.replace(/\s/g,'').length)
        var edited = cardNum.replace(/\s/g,'')
        console.log(edited)
       
        if (number.length>cardNum.length){
            if ((number.replace(/\s/g,'').length) % 4==0  && cardNum.replace(/\s/g,'').length<15 &&cardNum.replace(/\s/g,'').length>0 ){
                setNum(cardNum => number + " ")
            } else {
                setNum(cardNum => number)
            }
        }
        if (number.length<cardNum.length){
            console.log("IN DELETE")
            if (cardNum.charAt(cardNum.length-1)==" "){
                setNum(cardNum=>cardNum.slice(0,-2))
            } else {
                setNum(cardNum=>number)
            }
        }
       
       
    }

    const _handleChangeCard = () => {
        //setCards(cards=><FlatList style={styles.flatlist} data={data} renderItem={renderItem} keyExtractor={card => card.id}/>)

            
    }
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
      };
      
    const _onChange = (form) => {
        setCardForm(cardForm=>form)
        if (form.values.number!="" && form.values.cvc!="" && form.values.expiry!=""){
            setDisable(false)
        }
    }

    var saveElem = null
    return (
        <DismissKeyboard style={{width:'100%',height:'100%'}}>
        <View style={styles.container}>
           <SchedualeHeader backwards={goBack}/>
           <View style={styles.body}>
            {props.navigation.state.params.updateSubscription!=null && props.navigation.state.params.updateSubscription==true &&
            <View>
                <Text style={styles.title}>Add a credit/debit card to upgrade your current subscription plan to our {subscriptionOption} subscription plan for ${props.navigation.state.params.amount}</Text>
                
                </View>}
{/*         
            <View style={styles.cardholder}>
                <Text style={styles.title}>Card Holder's Name</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                value={cardholderName}
                onChangeText={setName}
                placeholder={"Enter name"}
                style={styles.nameInput}></TextInput>
                </TouchableWithoutFeedback>
            </View> */}
            <CreditCardInput onChange={_onChange}
            additionalInputsProps={
            {
                name: {
                    returnKeyType: 'done'
                },
                expiry: {
                    returnKeyType: 'done'
                },
                name: {
                    returnKeyType: 'done'
                },
               

            }
        }
            inputContainerStyle={{
                backgroundColor:"white",
                
            }}/>
            
            {/* <View style={styles.cardnum}>
                <Text style={styles.title}>Card Number</Text>
                <View style={styles.cardNumType}>
                    <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput value={cardNum} 
                onChangeText={_handlingCardNumber}
                keyboardType={'numeric'}
                maxLength={19}
                placeholder="Number of card"
                style={styles.cardInput}
                ></TextInput>
                </TouchableWithoutFeedback>
                </View>
                <View>
                <TouchableOpacity style={styles.selectedCard} onPress={()=>_handleChangeCard()}>
                    <Image source={cardSrc[cardType]}/>
                    </TouchableOpacity>
                    {cards}
                   

                
                </View>
                </View>

            </View>
            <View style={styles.datecvv}>
                
                <View style={styles.expireDate}>
                <Text style={styles.title}>Expire Date</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput value={expr}
                    onChangeText={_handlingExpiration}
                    placeholder="MM/YYYY"
                    maxLength={7} style={styles.shortInput}></TextInput>
                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.cvv}>
                    <Text style={styles.title}>CVC</Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput value={cvv}
                    onChangeText={setCvv}
                    keyboardType={'numeric'}
                    maxLength={3}
                    secureTextEntry={true}
                    placeholder="xxx" style={styles.shortInput}/>
                    </TouchableWithoutFeedback>

                </View> */}

            {/* </View> */}
           
            </View>
            <View style={styles.confirmBox}>
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                height:50,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                flex:1,
                width: Dimensions.get('window').width,
            }} disabled={disable} onPress={()=>submit()}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>
           </View>
            {/* <TouchableOpacity style={styles.confirm} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity> */}
        </View>
        </DismissKeyboard>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        

    },
    body: {
        paddingLeft:20,
        paddingRight:20,
        paddingTop:25

    },
    title:{
        fontSize:12,
        color:"grey",
        marginBottom:5
    },
    nameInput: {
        fontSize:20,
        color:'black',
        fontWeight:'600',
        borderBottomColor: 'lightgray',
        borderBottomWidth:1,
        width:'80%'

    },
    cardInput: {
        fontSize:20,
        color:'black',
        fontWeight:'600',
        borderBottomColor: 'lightgray',
        borderBottomWidth:1,
        width:'100%',
        marginRight:'25%'

    },
    shortInput: {
        fontSize:20,
        color:'black',
        fontWeight:'600',
        borderBottomColor: 'lightgray',
        borderBottomWidth:1,
        

    },
    datecvv: {
        flexDirection: 'row',
        
    },
    title: {
        fontSize:14,
        fontWeight: '500',
        color: 'gray',
        marginBottom:10
    },
    cardholder: {
        marginBottom:20
    },
    cardnum: {
        marginBottom:20
    },
    expireDate: {
        flexDirection: 'column',
        marginRight:'50%'
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
        height:50,
        
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        flex:1,
        width: Dimensions.get('window').width,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:20,
        marginBottom:20,
        height:60,
        bottom:0,
        position: 'absolute'
       
    },
    cardNumType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    item: {
        flexDirection: 'row',
        
    },
    selectedCard: {
        width:50,
        
        flexDirection: 'column',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: '600',
        fontSize:16,
        marginLeft:10,
        marginBottom:20

    }, 
    
})

export default AddCreditCard