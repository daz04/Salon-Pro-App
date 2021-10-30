import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment'
import {AntDesign} from 'react-native-vector-icons'
import {getStylistEarnings, getStylist, updateTransactionsStatus, createPayout} from '../Database/functions'
import {numberOfBookings, getBookings, getTransactions, getAppointmentList} from '../Database/functions'
import {walletBalance} from '../Database/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EarningsHeader from '../Headers/earnings'
import MenuBar from '../components/menuBar'
import { Alert } from 'react-native';
import EarningsForTheDay from './Components/EarningsForTheDay'
import {computeStylistTakeHomeAmountforTransaction} from '../Scripts/functions'
import OnboardingCompletionStatus from '../components/OnboardingCompletionStatus'
import {payout} from '../Stripe/functions'
import { useFonts } from 'expo-font';

const EarningsOverview = (props) => {
    const [bookings, setBookings] = useState([])
    const [appointments, setAppointments] = useState([])
    const [appointmentsFetched, setAppointmentsFetched] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [transactionsForCashout,settransactionsForCashout] = useState([])
    const [walletAmount, setwalletAmount] = useState(0)
    const [fetchWalletAmount, setFetchWalletAmount] = useState(false)
    const [transactionsFetched, setTransactionsFetched] = useState(false)
    const [currentDate, setCurrent] = useState(moment().format("YYYY-MM-DD"))
    const [selectedDate, setselectedDate] = useState("Today")
    const [email,setEmail] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [stylistId, setId] = useState(null)
    const [connectOnboardingComplete, setconnectOnboardingComplete] = useState(null)
    const [disable, setDisable] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [accountId, setaccountId] = useState(null)

    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Medium': require("../assets/fonts/Lato-Medium.ttf"),
        'Lato-Regular': require("../assets/fonts/Lato-Regular.ttf")
     
     });


    useEffect(()=> {
        fetchOnboardingComplete()
        if (stylistId==null){
            fetchStylistId()
        }
        if (stylistId!=null){
            fetchAccountId()
            console.log("STYLIST ID IS DIFFERENT THAN NULL IN PRO")
            fetchTransactions()
            
            getAppointmentList((result)=> {
                var appointmentsForStylist = []
                if (result!=null){
                    appointmentsForStylist = result.data.filter(record=> record.StylistId == stylistId)

                }
                setAppointments(appointmentsForStylist)
            })
           
           

        }

      
       
        

    },[stylistId])

    const fetchTransactions = () => {
        getTransactions(stylistId, (result)=> {
            if (result!=null){
                var transactions = result.data

            }
            getBookings(stylistId, (result)=> {
                if (result!=null){
                    var bookings = result.data
                    
                }
                if (transactions.length>0 && bookings.length>0){
                    
                    var sum = computeWithdrawAmount(transactions, bookings) 
                    console.log("THE SUM PRINTED")
                    console.log(sum)
                    setwalletAmount(sum)
                   

                }
                setTransactions(transactions)
                setBookings(bookings)
            })
            
        })

    }

    const fetchOnboardingComplete = async () => {
        var onboardingComplete_ = await AsyncStorage.getItem("OnboardingComplete")
        if (onboardingComplete_=="false"){
            setconnectOnboardingComplete(false)
            setDisable(true)

        } else {
            setconnectOnboardingComplete(true)
            setDisable(false)

        }
    }
    const fetchStylistId =  async () => {
        var id = await AsyncStorage.getItem("stylistId")
        console.log('FETCH SYTLIST ID 2')
        console.log(id)
        setId(id)
    }

    const fetchAccountId = () => {
        getStylist(stylistId, (result)=> {
            if (result!=null){
                setaccountId(result.data[0].StripeId)
            }
        })
    }

  

    const computeWithdrawAmount = (transactions, bookings) => {
        console.log("IN COMPUTE WITHDRAW AMOUNT")
        console.log(stylistId)
        var stylistTransactions = []
        var transactionSummation = 0
        var bookingIdList = []
        for (var booking in bookings){
            if (bookings[booking].StylistId == stylistId){
                bookingIdList.push(bookings[booking].id)
                
            }
        }
        stylistTransactions = transactions.filter(record=> bookingIdList.includes(record.BookingId) && record.Status=="Confirmed")
        settransactionsForCashout(stylistTransactions)
        //set list of transactions to later mark as cashed out if stylist chooses to withdraw money
        for (var transaction in stylistTransactions){
            var transactionRecord = stylistTransactions[transaction]
            var takeHomeAmount = computeStylistTakeHomeAmountforTransaction(transactionRecord.ComissionPercentage,
                transactionRecord.TaxesPrice, transactionRecord.TravelPrice,
                transactionRecord.ServicePrice)

            transactionSummation += takeHomeAmount
        }
        console.log("THE TOTAL TRANSACTION SUMMATION")
        console.log(transactionSummation)
        if (transactionSummation==0){
            setDisable(true)
        }
       
        return transactionSummation

    }
 
   
    const redirect = (screen) => {
        console.log("AT REDIRECT")
        console.log(screen)
        const {navigate} = props.navigation 
        if (screen=="SCHEDUALE"){
            
            navigate("Scheduale")
        }
        if (screen=="HOME"){
            navigate("Home")

        }
        if (screen=="PROFILE"){
            navigate("Profile", {
                isNew:false
            })
        }
        if (screen=="SETTINGS"){
            navigate("Settings")
        }
    }
    const dayBack = () => {
        console.log("IN DAY BACK")
        var newDate = moment(currentDate).subtract(1,"days").format("YYYY-MM-DD")

        console.log(newDate)
        setCurrent(currentDate=>newDate)
       
    }
    const dayForward = () => {
        var today = moment().format("YYYY-MM-DD")
        
        var newDate = moment(currentDate).add(1,"days").format("YYYY-MM-DD")
        if (!(moment(newDate, "YYYY-MM-DD").isAfter(today, 'YYYY-MM-DD'))){
            setCurrent(currentDate=>newDate)

        }
    }

    const withdraw = () => {
        var payoutAmount = Number(walletAmount) *100 
        if (accountId!=null){
            updateTransactionsStatus(transactionsForCashout, "Cashed Out", (result)=> {
                if (result==null){
                    Alert.alert("Network Error", "Network error occured")

                } else {
                    payout(accountId,payoutAmount, (result)=> {
                        if (result==null){
                            Alert.alert("Network Error", "Network error occured")
                            
                        } else {
                            var currentDate = moment().format("YYYY-MM-DD")
                            createPayout(stylistId, walletAmount, currentDate, transactionsForCashout, (result)=> {
                               //need to make sure this doesnt happen
                               //need to add crashlytics logs here to make sure each api returns correctly
                                var wiredAmount = walletAmount
                                setDisable(true)
                                setwalletAmount(0)
                                fetchTransactions()
                                Alert.alert("Congratulations!", `You should expect to see ${wiredAmount} in your bank account within the next 48 hours`)


                            })
                            
                            //need to change the transaction list values to cash out
                        }
                    })

                }
                        
            })
            
        } else {
            Alert.alert("Network Error", "Network error occured")
        }

        // const {navigate} = props.navigation 
        
        // if (walletAmount>0){
        //     navigate("Payout Overview", {
        //         stylistId: stylistId, 
        //         amount: walletAmount,
        //         refresh: false
        //     })

        // } else {
        //     Alert.alert("No funds","No funds currently available under your account to be withdrew")

        // }
    }

    const viewPaymentHistory = () => {
        Alert.alert("No transactions","No transactions are associated with your account at the moment")

    }
    const onboardingRedirectLink = (screen, accountId) => {
        console.log("THE ONBOARDING REDIRECT LINK 1")
        const {navigate} = props.navigation
        if (screen=="Verify Your Identity"){
            console.log("IN VERIFY YOUR IDENTITY SCREEN CHANGE")
          navigate("Verify Your Identity", {
              stylistId: stylistId,
              next: 'Earnings',
              isBack: isBack
          })
  
        } else if (screen=="Mailing Address") {
          navigate("Mailing Address", {
              accountId: accountId,
              next: 'Earnings',
              isBack: isBack
          })
  
      } else if (screen=="Add Bank Account"){
          navigate("Add Bank Account", {
              accountId: accountId,
              next: 'Earnings',
              isBack: isBack
  
          })
      } else if (screen=="Taking Too Long?"){
          Alert.alert("Taking too long?", "Contact us at info@glamoapp.com for more information regarding your onboarding status")
  
      }
       
    }
    
    
    return (
        <View style={styles.container}>
            <EarningsHeader callback={redirect}/>
            <OnboardingCompletionStatus redirectLink = {onboardingRedirectLink}/>
            {connectOnboardingComplete==false && 
            <View style={{
                width: Dimensions.get('window').width,
                height: 'auto',
                paddingTop:2,
                backgroundColor: 'darkred',
               
                flexDirection:'column'
            }}>
                <Text style={{
                    marginLeft:20,
                    marginRight:20,
                    color:'white',
                    height:'auto'
                }}>You need to complete your payment onboarding process or be approved before being able to withdraw funds.</Text>
            </View>
            }
            <EarningsForTheDay stylistId={stylistId} currentDate={currentDate} appointments={appointments} bookings={bookings} transactions={transactions} forwardDay={dayForward} backwardDay={dayBack}/>
           
            <View style={styles.walletBalance}>
                <View style={styles.wallet}>
                    <View style={styles.balance}>
                        {fontsLoaded && 
                        <Text style={{
                            color:'#C2936D',
                            fontSize:13,
                            fontWeight:'600',
                         
                        }}>WALLET BALANCE</Text>
                        }

                        <TouchableOpacity  disabled={disable} style={{
                            borderRadius:20,
                            width:100,
                            height:20,
                            backgroundColor: (!disable)?'#C2936D':'grey',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} onPress={()=> withdraw()}>
                            <Text style={styles.withdraw}>Withdraw</Text>
                            <AntDesign name={"arrowright"} size={20} color={"white"} style={{}}/>

                        </TouchableOpacity>

                    </View>
                    <Text style={styles.walletAmount}>$ {walletAmount}</Text>

                </View>
                {/* <TouchableOpacity style={styles.paymentHistory} onPress={()=>viewPaymentHistory()}>
                    <Text style={styles.historyText}>PAYMENT HISTORY</Text>
                    <AntDesign style={styles.arrow} name={"right"} size={20} color={"white"} style={{alignSelf: 'center'}}/>


                </TouchableOpacity> */}

            </View>
            <MenuBar selectedScreen="EARNINGS" callback={redirect}/>

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
    walletBalance: {
        marginTop:40,
        width: '90%',
        height: 120,
        backgroundColor: '#1A2232',
        borderRadius:20,
        alignSelf: 'center'


    },
    walletAmount: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft:20,
        fontSize: 18


    },
    wallet: {
        width: '100%',
        height: 90,
        borderBottomColor: 'white',
        borderBottomWidth: 1



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
export default EarningsOverview