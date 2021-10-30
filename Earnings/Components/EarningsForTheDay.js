import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';
import {computeStylistTakeHomeAmountforTransaction} from '../../Scripts/functions'
import moment from 'moment'
import {AntDesign} from 'react-native-vector-icons'
import {getPayoutByDateAndStylist} from '../../Database/functions'
import {useFonts} from 'expo-font';


const EarningsForTheDay = ({stylistId, currentDate, appointments, bookings, transactions, forwardDay, backwardDay}) => {


    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Medium': require("../../assets/fonts/Lato-Medium.ttf"),
        'Lato-Regular': require("../../assets/fonts/Lato-Regular.ttf")
     
     });

    console.log("IN EARNINGS FOR THE DAY")
    console.log(currentDate)
    console.log(appointments)
    console.log(bookings)
    console.log(transactions)
    const [numberOfBookings, setnumberOfBookings] = useState(null)
    const [existingPayouts, setexistingPayouts] = useState([])
    const [payoutSummation, setpayoutSummation] = useState(0)
    const [totalTransactionAmount, settotalTransactionAmount] = useState(null)


    useEffect(()=> {
        computeTransactionAmountandBookingNumber()
        getPayoutByDateAndStylist(currentDate, stylistId, (result)=> {
            if (result!=null && result.data.length>0){
                setexistingPayouts(result.data)
            }
        })
        if (existingPayouts.length>0 && payoutSummation==0){
            //compute payout summation for payouts that took place on this date
            var payoutTotal = 0 
            for (var record in existingPayouts){
                payoutTotal += existingPayouts[record].Total 
            }
            setpayoutSummation(payoutTotal)

        }

    },[currentDate, existingPayouts, transactions])

    

    const computeTransactionAmountandBookingNumber = () => {
        console.log("IN COMPUTE TRANSACTION AMOUNT AND BOOKINGS 2")
        console.log(currentDate)

        var filteredAppointments = appointments.filter(record=> record.Date==currentDate)
        console.log("THE FILTERED APPOINTMENTS 1")
        console.log(filteredAppointments)
        var filteredBookings = []
        var filteredTransactions = []
        for (var record in filteredAppointments){
            var id = filteredAppointments[record].id 
            var booking = bookings.filter(element=> element.AppointmentId == id && element.Status=="Confirmed")[0]
            if (booking!=null){
                filteredBookings.push(booking)
            }
        }
        console.log("THE FILTERED BOOKING")
        console.log(filteredBookings)
        for (var record in filteredBookings){
            var id = filteredBookings[record].id
            var transaction = transactions.filter(element=> element.BookingId == id)[0]

            if (transaction!=null && transaction.Status=="Confirmed"){
                filteredTransactions.push(transaction)
            }

        }
        console.log("FILTERED TRANSACTIONS LIST")
        console.log(filteredTransactions)
        //we end up with all the transactions for today that the stylist has recieved thus far
        var bookingNumber = filteredTransactions.length
        var transactionSummation = 0
        for (var record in filteredTransactions){
            var takeHomeForTransaction = computeStylistTakeHomeAmountforTransaction(filteredTransactions[record].ComissionPercentage,
                filteredTransactions[record].TaxesPrice, filteredTransactions[record].TravelPrice,
                filteredTransactions[record].ServicePrice)
            transactionSummation += takeHomeForTransaction

        }
        console.log("THE BOOKING NUMBER")
        console.log(bookingNumber)
        console.log("TRANSACTION SUMMATION")
        console.log(transactionSummation)
        setnumberOfBookings(bookingNumber)
        settotalTransactionAmount(transactionSummation)

    }
    return (
        <View style={styles.overview}>
                <View style={styles.priceScroll}>
                    {fontsLoaded && 
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'Poppins-Regular'

                    }}>{moment(currentDate).format('LL')}</Text>
                    }
                    <View style={styles.currentPrice}>
                        <TouchableOpacity onPress={()=>backwardDay()}>
                    <AntDesign style={styles.arrow} name={"left"} size={25}/>
                    </TouchableOpacity>
                    <Text style={styles.totalText}>${Number(totalTransactionAmount).toFixed(2)}</Text>
                    <TouchableOpacity onPress={()=>forwardDay()}>
                    <AntDesign style={styles.arrow} name={"right"} size={25}/>
                    </TouchableOpacity>
                    </View>
                    {fontsLoaded && payoutSummation>0 && 
                    <Text style={{
                        fontSize:12,
                        fontFamily: 'Poppins-Regular'
                    }}>You wired ${Number(payoutSummation).toFixed(2)} to your bank account on this day</Text>
                    }
                  

                </View>
                
            
                <View style={styles.booking}>
                    
                    <Text style={styles.bookingInt}>{numberOfBookings} </Text>
                    {fontsLoaded && 
                    <Text style={{
                        fontSize: 12,
                        alignSelf: 'flex-end',
                        fontWeight: '400',
                        color: "#1A2232",
                        fontFamily: 'Poppins-Regular',
                    
                    }}>Bookings</Text>
                }
                   
                    
                </View>

            </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flexDirection: 'column',
       

    },
    overview: {
        marginTop: 40,
        width: '90%',
        height:160,
        backgroundColor: 'white',
        borderRadius:20,
        borderWidth:0.5,
        borderColor:'lightgray',
        alignSelf: 'center'

    },

    paymentHistory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:10,
        paddingRight:10,
        marginTop:2.5

    },
    historyText: {
        color: "white",
        fontSize: 12,
        fontWeight: '500',
        alignSelf: 'center'

    },
    priceScroll: {
        height: 120, 
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop:20
        
    },
    selectedDate: {
        alignSelf: 'center'
    },
    currentPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
        
    },
    totalText: {
        fontSize:40,
        fontWeight:'600'
    },
    arrow: {
        alignSelf: 'center'
    },
    booking: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-end',
        paddingLeft:10,
        marginTop: '2%'
    },
    bookingInt: {
        fontSize: 13,
        alignSelf: 'flex-end',
        fontWeight:'bold',
        color: '#1A2232'
    },
    bookingText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        fontWeight: '400',
        color: "#1A2232"
    },
    withdrawBtn: {
        borderRadius:20,
        width:100,
        height:20,
        backgroundColor: '#C2936D',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    withdraw: {
        color: 'white',
        marginLeft: 5,
        fontWeight: '600',
        fontSize:11,
        
        
    },
    balance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    walletBalancetxt: {
        color:'#C2936D',
        fontSize:13,
        fontWeight:'600'
    },
    
})
export default EarningsForTheDay
