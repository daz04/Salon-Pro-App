
import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import {getPaymentMethod, getStylist, postPayoutRequest} from '../../Database/functions'
import SettingsHeader from '../../Headers/settings'
import {AntDesign} from 'react-native-vector-icons'
import {retrieveCard} from '../../Stripe/functions'
import {Ionicons} from 'react-native-vector-icons'
import moment from 'moment'
import { StackActions } from '@react-navigation/native';


const PayoutOverview = (props) => {
    var stylistId = props.navigation.state.params.stylistId
    var amount = props.navigation.state.params.amount
    console.log("PAYOUT OVERVIEW STYLIST ID")
    console.log(stylistId)
  
    const [paymentMethods, setpaymentMethods] = useState(null)
    const [mainPaymentMethod, setMain] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [stylist, setStylist] = useState(null)
    const [stylistFetched, setstylistFetched] = useState(false)
    const [refresh, setRefresh] = useState(props.navigation.state.params.refresh)
    const [cards, setCards] = useState([])
    const [cardSelected, setSelected] = useState(null)


    console.log("PAYOUT REFRESH")
    console.log(refresh)
    console.log(props.navigation.state.params.refresh)
    console.log("STYLIST FETCHED 2")
    console.log(fetched)
    console.log(stylist)
    console.log(paymentMethods)
    if (stylistFetched==false){
        getStylist(stylistId, (result)=> {
            if (result!=null){
                //has to be by default 
                setStylist(result.data)

            }
        })
        setstylistFetched(true)
    }

    if (props.navigation.state.params.refresh!=refresh){
        getStylist(stylistId, (result)=> {
            if (result!=null){

                //has to be by default 
                console.log("STYLIST STRIPE ID IN PAYOUT 2")
                console.log(result.data)
                console.log(result.data.StripeId)
                setStylist(result.data)
                getPaymentMethod(result.data[0].StripeId, (result)=> {
                    if (result!=null){
                        setpaymentMethods(result.data[0])
                    }
                })

            }
        })
        
        setRefresh(!refresh)

    }

    if (fetched==false && stylist!=null){
        console.log("ABOUT TO SEARCH PAYMENT METHOD 3")
        console.log(stylist[0].StripeId)
        if (stylist[0].StripeId!=null){
            getPaymentMethod(stylist[0].StripeId, (result)=> {
                if (result!=null){
                    setpaymentMethods(result.data[0])
                    setFetched(true)

                }
            })
            

        }
        
    }

    const paymentIterator = (count, callback) => {
        if (count==paymentMethods.PaymentMethodList.length){
            callback("done")
        } else {
            var paymentMethod = paymentMethods.PaymentMethodList[count]
            retrieveCard(paymentMethod, paymentMethods.StripeId, (result)=> {
                console.log("RETRIEVE CARD RESULT")
                console.log(result)
                if (result!=null){
                    if (paymentMethod == paymentMethods.MainPaymentMethod){
                        setSelected(paymentMethod)
                    }
                    var card = result.data 
                    var cardType = card.brand 
                    var last4 = card.last4
                    var exp_month = card.exp_month
                    var exp_year = card.exp_year
                    var cardObj= {
                        lastDigits:last4,
                        cardName:cardType,
                        exp_month:exp_month,
                        exp_year:exp_year,
                        paymentId: paymentMethod
                        }
                    setCards(cards=> ([...cards, cardObj]))
                    
                    paymentIterator(count+1, callback)

                } else {
                    Alert.alert("Network Error", "Unable to fetch payment methods")
                    
                }

                })
            
        }

    }

    if (cards.length==0 && paymentMethods!=null){
        console.log("BEFORE ITERATOR")
        paymentIterator(0, (result)=> {
            console.log("payment iterator count")
        })

    }

    const backPage = () => {
        
        props.navigation.goBack()
       
    }


    const submit = () => {
        var params = {
            amount: amount,
            date: moment().format("YYYY-MM-DD"),
            paymentId: cardSelected


        }
        postPayoutRequest(params, (result)=> {
            if (result!=null){
                Alert.alert("Success!", "Payout request was sucessful", [
                    {
                        text: "OK",
                        onPress: () => 
                        {console.log("PAYMENT METHODS IN ALERT")
                        console.log(paymentMethods)
                            props.navigation.goBack()}

                    }
                ])
            } else {
                Alert.alert("Network Error", "Payout request failed. Please retry or contact for support")
            }
        })

    }
    const goToPayment = () => {
        const {navigate} = props.navigation
        console.log("BEFORE SUBSCRIPTION PAYMENT NAV")
        console.log(stylist)
        navigate("Subscription Payment", {
            refresh: props.navigation.state.params.refresh,
            
            amount: amount,
            params: null, 
            stylistPayload: stylist[0],
            formattedNum: null,
            discount: 0,
            subscriptionFlag: false,
            subscriptionOption:null,
            next: "Payout Overview"
        })
    }

    var paymentOptionBody = null 
    if (cards.length==0){
        paymentOptionBody = 
        <TouchableOpacity style={styles.row} onPress={()=> goToPayment()}>
            <Text>Click to add payment method</Text>
            <AntDesign name={"arrowright"} size={25}/>


        </TouchableOpacity>
        
    } else {
        
        paymentOptionBody = 
        <ScrollView>
            {cards.map((method)=> {
                var lastDigits = method.lastDigits
                var cardName = method.cardName
                //var imageSource = props.card.imageSource
                //var token = props.card.token 
                var exp_month = method.exp_month
                var exp_year = method.exp_year
                return (
                    <TouchableOpacity style={{height:50,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: "white",
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth:1,
                        paddingLeft:20,
                        paddingRight:20,
                        marginBottom:10,
                        
                    }} onPress={()=> {
                            setSelected(method.paymentId)
                        }}>
                    <View style={styles.cardInfo}>
                    <View style={styles.checkbox} onPress={()=>setSelected(method.paymentId)}>
                        <View style={{backgroundColor: cardSelected==method.paymentId?'#1A2232':'transparent', display:cardSelected==method.paymentId?'flex':'none', width: 30,height:30,borderRadius: 20,}}> 
                        <Ionicons name='checkmark-outline' size={25} style={styles.check}></Ionicons>
                        </View>
                    </View>
                    {/* <Image style={styles.cardImg} source={imageSource}/> */}
                    {/* <Image style={styles.cardImg} source={cardList[cardName]}/> */}
                    <View style={styles.cardText}>
                        <Text style={styles.cardNameText}>{cardName}</Text>
                        <Text style={styles.cardDigits}>**** {lastDigits}</Text>
        
                    </View>
                    
                    </View>
                    <Text style={styles.expiry}>Expires {exp_month}/{exp_year}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    }

    console.log("THE PAYMENT METHODS")
    console.log(paymentMethods)
   console.log("THE CARDS")
   console.log(cards)


    return (
        <View style={styles.container}>
            <SettingsHeader back={backPage}/>
            <View style={styles.amountView}>
                <Text style={styles.header}>Payout Amount</Text>
                <Text style={styles.header2}>${amount}</Text>
            </View>
            <View style={styles.paymentOptions}>
                <Text style={{marginBottom:30, marginLeft:10}}>Your Payment Methods</Text>
                
                    {paymentOptionBody}
            </View>

            <TouchableOpacity style={styles.confirm} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Continue</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    cardText: {
        flexDirection: 'column',
        paddingLeft:10
    },
    cardDigits: {
        fontWeight:'300'
    },
    expiry: {
        alignSelf: 'center'

    },

    amountView: {
        backgroundColor: "#848687",
        height: Dimensions.get("window").height*0.1, 
       
        paddingLeft:20,

        paddingTop:20,
        borderRadius:20,
        width: '90%',
        alignSelf: 'center',
        marginTop: 40,
    },
    paymentOptions: {
        backgroundColor: "white",
        height: Dimensions.get("window").height*0.55, 
       
        

        paddingTop:20,
        borderRadius:20,
        width: '90%',
        alignSelf: 'center',
        marginTop: 40,

    }, 
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft:20,
        backgroundColor: 'white',
        borderBottomColor: 'lightgrey',
        borderBottomWidth:1,
        width: '100%',
        height: 75,
        alignItems: 'center',
        marginBottom:10
    },
    header: {
        fontSize:25,
        color: "white",
        fontWeight:'500',
    
    },
    header2: {
        fontSize:18,
        color: "white",
        fontWeight:'500',
        marginTop:'1%'
    },
    checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,
    
    },
    check: {
        color: 'white',
        alignSelf: 'center'
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        // bottom:-Dimensions.get('window').height*0.05,
        bottom:0,
        padding:'2%',
        alignSelf: 'center',
        backgroundColor: "#1A2232",
       //height: 70,
        height: Dimensions.get('window').height*0.08,
        
        width: Dimensions.get('window').width,
        position: 'absolute'
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
})

export default PayoutOverview