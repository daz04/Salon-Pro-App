import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';
import {CreditCardInput, LiteCreditCardInput} from "react-native-vertical-credit-card-input"
import axios from 'axios';
import moment from 'moment';
import CreditCardHeader from '../../Headers/CreditCardHeader'
import Spinner from 'react-native-loading-spinner-overlay'
import {getStylist, createPaymentMethodEntry} from '../../Database/functions'
import {createStripeClient, createPaymentMethod, addStripeId, attachCardtoCustomer} from '../Scripts/fuctions'

var stripe = require('stripe-client')('pk_live_51IPVjfDjfKG70QFNRDEnqEBhhJEiizfXty6pbZryCBDyykjdn65JNgWe9MpFhRqNIsct3RH9EMpyxFqxvIuPss1900acdnhhkl')

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


// stripe.setOptions({
//     publishableKey: 'pk_test_51IPVjfDjfKG70QFNN58V01Z1ktEIPjAT49Rzw88Eu12D03QSiH8aPPQ7ZFmLlUbEMlFf0cvWgbIh1RECJNFiGvay00zAug9QW0'
// })


const AddCreditCard = (props) => {

    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Medium': require("../../assets/fonts/Lato-Medium.ttf"),
        'Lato-Regular': require("../../assets/fonts/Lato-Regular.ttf")
     
     });
    console.log("IN CORRECT ADD CREDIT CARD")
    const next = props.navigation.state.params.next
    const paymentMethod = props.navigation.state.params.paymentMethod

    const cardList = ['Master','Visa','Apple Pay','PayPal','Discovery']
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
    const [spinner, setSpinner] = useState(true)
    const [stylistId, setstylistId] = useState(null)
    const [selectedpaymentMethod, setselectedpaymentMethod] = useState(paymentMethod)
    const [stylist, setStylist] = useState(null)

    useEffect(()=> {
        if (stylistId==null){
            fetchStylistId()
        }
        if (stylistId!=null && stylist==null){
            getStylist(stylistId, (result)=> {
                if (result!=null){
                    setStylist(result.data[0])
                }
            })

        }

    },[stylistId])

    const fetchStylistId = async () => {
        var stylistId = await AsyncStorage.getItem('stylistId')

        setstylistId(stylistId)

    }

    const _onChange = (form) => {
        setCardForm(cardForm=>form)
        if (form.values.number!="" && form.values.cvc!="" && form.values.expiry!=""){
            setDisable(false)
        }
    }
    if ([fontsLoaded] && spinner==true){
        setSpinner(false)
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
            if (stylist.StripeId==null){
                //case 1: stylist is not registered on stripe
                createStripeClient(card.id, stylist.Email, (result)=> {
                    console.log("IN CREATE STRIPE CLIENT HERE AGAIN")
                    console.log(result)
                    if (result!=null){
                        //added customer id -> STRIPE API
                        var stripeId = result
                        addStripeId(stylist.id, result, (response)=> {
                            if (response==true){
                                console.log("SUCCESSFULLY ADDED STRIPE ID")
                                //we added stripe id successfully to stylist -> DATABASE API
                                console.log("THE PAYMENT METHOD HERE")
                                console.log(paymentMethod)
                                if (paymentMethod==null){
                                    console.log("PAYMENT METHOD IS NULL")

                                    createPaymentMethod(card.id, stripeId, (response)=> {
                                        if (response!=null){
                                            console.log("SUCCESSFULLY CREATED A PAYMENT METHOD")
                                            var cardId = response
                                            createPaymentMethodEntry(stripeId, cardId, [cardId], (response)=> {
                                                if (response!=null){
                                                    const {navigate} = props.navigation
                                                    navigate(next, {
                                                        isBack: !props.navigation.state.params.isBack
                                                    })
                                                }
                                            })
                                           

                                            //added payment method successfully to stripe id -> STRIPE API

                                        } else {

                                        }

                                    })
                                    //this is a new payment method we need to add

                                }
                            }

                        })
                    }
                   
                })
            } else {
                //case 2: stylist is registered on stripe
                var stripeId = stylist.StripeId
                if (paymentMethod==null){
                    //this is a new card
                    createPaymentMethod(card.id, stripeId, (response)=> {
                        if (response!=null){
                            createPaymentMethodEntry(stripeId, card.id, [card.id], (response)=> {
                                if (response!=null){
                                    const {navigate} = props.navigation
                                    navigate(next, {
                                        isBack: !props.navigation.state.params.isBack
                                    })
                                }
                            })
                           

                            //added payment method successfully to stripe id -> STRIPE API

                        } else {

                        }

                    })

                }

                
            }
    
             

            }
           
        
     
    }

  
    return (
        <DismissKeyboard style={{width:'100%',height:'100%'}}>
        <View style={styles.container}>
        <CreditCardHeader></CreditCardHeader>
        <Spinner 
            visible={spinner}
            />
            
           
           <View style={styles.body}>
           <Text style={{
               
               fontFamily:'Poppins-Medium',
               marginBottom:'10%'

           }}>Please enter in your debit or credit card information to recieve payments on</Text>
       
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
        marginTop:'10%'

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