import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import HomeNavigator from '../components/Home/navigation'
import HomeHeader from '../Headers/home'
import MenuBar from '../components/menuBar'
import PendingModal from './Components/PendingCard/index'
import {getPendingBookings, getStylist, getAppointment, getAddress, getAppointmentList, getBookings, getClientList, getClient} from '../Database/functions'
import {generatePendingCards} from './Scripts/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CognitoUserPool,CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';
import {filterCancelledBookings, filterPastBookings, filterPendingBookings, filterUpcomingBookings, fetchRecordsfromDatabase} from './Scripts/functions'
import BookingListView from './Components/BookingsListView/index'
import Spinner from 'react-native-loading-spinner-overlay'
import AppointmentCard from './Components/Appointment/index'
import OnboardingCompletionStatus from '../components/OnboardingCompletionStatus'
import VerifyYourIdentity from '../OnboardingPayment/VerifyYourIdentity';

const HomeOverview = (props) => {
    const poolData = {
        UserPoolId: "us-east-1_t7jb40TQi",
        ClientId: "2jqchvesq7gscj0vqd2hu1m5po" 
    }
    var userPool = new CognitoUserPool(poolData);

    var isBack = null 
    if (props.navigation.state.params!=null && props.navigation.state.params.isBack!=null){
        isBack = props.navigation.state.params.isBack
    } else {
        isBack = true
    }
    
    console.log("IS BACK IS HERE")
    console.log(isBack)
    const [body, setBody] = useState(null)
    const [type,setType] = useState("Upcoming")
    const [stylist, setStylist] = useState(null)
    const [pendingList, setPending] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [appointmentFetched, setappointmentFetched] = useState(false)
    const [clientList, setClientList] = useState([])
    const [pendingBookingList, setpendingbookingList] = useState([])
    const [upcomingBookingList, setupcomingbookingList] = useState([])
    const [cancelledBookingList, setcancelledBookingList] = useState([])
    const [historybookingList, sethistorybookingList] = useState([])
    const [transactionList, settransactionList] = useState([])
    const [pendingModalList, setpendingmodalList] = useState([])
    const [client,setClient] = useState(null)
    const [clientFetched, setclientFetched] = useState(false)
    const [email,setEmail] = useState(null)
    const [trackappts, setTrack] = useState([])
    const [trackFetched, settrackFetched] = useState(false)
    const [navReset, setNav] = useState(false)
    const [phoneNum, setphoneNum] = useState(false)
    const [pendingFetched, setPendingFetched] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [spinner, setSpinner] = useState(true)
    const [databaseRecordsFetched, setdatabaseRecordsFetched] = useState(false)
    const [appointmentCard, setAppointmentCard] = useState(null)
    const [onboardingElement, setonboardingElement] = useState(null)
  
    useEffect(()=> {
        console.log("BACK AT USE EFFECT STATUS")
        fetchAsyncStylist((result)=> {
            var stylist_ = result.data[0]
            var phoneNum = stylist_.Phone
            console.log("STYLIST ASYNC RETURNS IN HOME DASHBOARD 1")
            console.log(stylist_)
            setStylist(stylist_)
           
            setphoneNum(phoneNum)
            var appointmentList = []
            var clientList = []
            var upcomingBookingList = []
            // if (databaseRecordsFetched==false){
                fetchRecordsfromDatabase(stylist_,(result)=> {
                    console.log("IN FETCH RECORDS RETURN")
                    setdatabaseRecordsFetched(true)
                    setAppointmentList(result.AppointmentList)
                    setClientList(result.ClientList)
                    setupcomingbookingList(result.UpcomingBookings)
                    setpendingbookingList(result.PendingBookings)
                    sethistorybookingList(result.PastBookings)
                    setcancelledBookingList(result.CancelledBookings)
                    settransactionList(result.TransactionList)
                    console.log("IN FETCH RECORDS FROM DATABASE RES CANCELLED 2")
                    console.log(result.PendingBookings.length)
                    console.log(result.TransactionList)
                    if (result.UpcomingBookings.length>0){
                        setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist_.id} transactionList={result.TransactionList} bookingsList={result.UpcomingBookings} showAppointmentCard={createNewAppointmentCard}/>)
                    }
                    
                    setSpinner(false)
                    
                   
                   
                    

        })
    })
    // setonboardingElement(<OnboardingCompletionStatus redirectLink = {onboardingRedirectLink}/>)
   
    

    },[isBack])

    
    console.log("THE APPONTMENT LIST 2")
    console.log(appointmentList)

    const createNewAppointmentCard = (bookingAppointmentObject) => {
        console.log("IN CREATE NEW APPOINTMENT CARD")
        console.log(bookingAppointmentObject)
        setAppointmentCard(bookingAppointmentObject)


    }


   

    const fetchAsyncStylist = async (callback) => {
        var stylistId = await AsyncStorage.getItem("stylistId")
        //console.log("stylist id in async storage", stylistId)
        getStylist(stylistId, (result)=> {
            if (result!=null){
                callback(result)
                // setStylist(result.data[0])
                // setphoneNum(result.data[0].Phone)
                //what would the alternative be anyways?
            }
        })
    }

    // if (stylist==null){
    //     fetchAsyncStylist()

    // }
    // if (appointmentFetched==false && stylist!=null){
    //     setappointmentFetched(true)
    //     getAppointmentList((result)=> {
    //         if (result!=null){
    //             var tempList = []
    //             for (var record in result.data){
    //                 if (result.data[record].StylistId == stylist.id){
    //                     setAppointmentList(result.data)

    //                 }
    //             }
                
    //         }
    //     })

    // }


  


 
    const callback = (screen) => {
        console.log("IN HISTORY TAB 2")
        console.log(historybookingList.length)
        console.log(upcomingBookingList.length)
        console.log(cancelledBookingList.length)
        
        if (screen=="history"){
            setBody(null)
           
            setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} transactionList = {transactionList} bookingsList={historybookingList} showAppointmentCard={createNewAppointmentCard}/>)
            setType(type=>"History")
        }
        if (screen=="upcoming"){
            setBody(null)
            setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} transactionList = {transactionList} bookingsList={upcomingBookingList} showAppointmentCard={createNewAppointmentCard}/>)
            setType(type=>"Upcoming")
        }
       
        if (screen=='cancelled'){
            setBody(null)
            setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} transactionList = {transactionList} bookingsList={cancelledBookingList} showAppointmentCard={createNewAppointmentCard}/>)
            setType(type=>"Cancelled")
        }
        

    }
    const redirect = (screen) => {
        const {navigate} = props.navigation
        if (screen=="EARNINGS"){
            navigate("Earnings")
            
        } else if (screen=="PROFILE"){
            navigate("Profile",{
                isNew: false,
                
            })
        } else if (screen=="SETTINGS"){
            navigate("Settings")
        } else if (screen=="SCHEDUALE"){
            //console.log("AT SCHEDUALE")
            navigate("Scheduale")
        }

    }
    const close2 = (bookingId) => {
        console.log("IN CLOSE AGAIN AFTER CANCEL HERE")
        console.log(pendingBookingList)
        console.log(pendingBookingList.length)
        var temp = pendingBookingList
        for (var pending in pendingBookingList){
            if (pendingBookingList[pending].booking.id==bookingId){
                temp = pendingBookingList.filter(pending_ => pending_ == pendingList[pending])
                break
            }
        }
        console.log("TEMP LIST AFTER FILTERING THROUGH UPDATED PENDING APPOINTMENTS")
        console.log(temp)

        console.log(temp)
        setpendingbookingList(temp)
        setRefresh(!refresh)
        fetchRecordsfromDatabase(stylist,(result)=> {
            console.log("IN FETCH RECORDS RETURN")
            setdatabaseRecordsFetched(true)
            setAppointmentList(result.AppointmentList)
            setClientList(result.ClientList)
            setupcomingbookingList(result.UpcomingBookings)
            setpendingbookingList(result.PendingBookings)
            sethistorybookingList(result.PastBookings)
            setcancelledBookingList(result.CancelledBookings)
            settransactionList(result.TransactionList)
            console.log("IN FETCH RECORDS FROM PENDING 2")
            console.log(result.PendingBookings.length)
            if (result.UpcomingBookings.length>0){
                setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} transactionList={result.TransactionList} bookingsList={result.UpcomingBookings} showAppointmentCard={createNewAppointmentCard}/>)
            }
            setSpinner(false)

        })
        // if (temp.length==0){
        //     setBody(null)
        //     setBody(<BookingListView phoneNum={phoneNum} stylistId={stylist.id} bookingsList={upcomingBookingList} showAppointmentCard={createNewAppointmentCard}/>)
        // }
    }


    const appointmentIterator = (pendingList, count, modalList) => {
        if (pendingList.length==count){
            console.log("IN APPOINTMENT ITERATOR STOP")
            console.log("appointment iterator done 123456")
            console.log(modalList.length)
            setPending(pendingList=> modalList)
            setBody(modalList[0])
            
        } else {
            console.log("PENDING ITERATOR INFO")
            console.log(booking)
            var appointmentId = pendingList[count].AppointmentId
            var booking = pendingList[count]
        
            getAppointment(appointmentId, (result)=> {
                console.log("GET APPOINTMENT RESULT WE WANT")
                console.log(result)
                if (result!=null && result.data.length>0){
                    var apptObj = result.data[0]
                    var clientId = booking.ClientId 
                    console.log("THE CLIENT ID 4")
                    console.log(clientId)
                    getClient(clientId, (response)=> {
                        console.log("IN GET CLIENT RESPONSE 123")
                        console.log(response)
                        if (response!=null && response.data.length>0){
                            var client = response.data[0]
                            var obj = {
                                appointment: apptObj,
                                client:client,
                                booking:booking
                            }
                            console.log("WE GOT CLIENT AND CREATED A PENDING BOOKING CARD")
                            console.log(obj)
                            if (!(modalList.includes(obj))){
                                console.log("IN APPENDING TO MODAL LIST")
                                // console.log(obj)
                                //console.log("IN THIS LOOP")

                              
                               
                                var modalElem = <PendingModal appointment={apptObj} client={client} booking={booking} close={close2}/>
                                modalList.push(modalElem)
                                // setTrack(trackappts=> ([...trackappts, appointment]))
                                
            
                            }

                        
                        }
                        appointmentIterator(pendingList, count+1, modalList)
                    })

                    


                } else {
                    appointmentIterator(pendingList, count+1,modalList)
                }
            })

        }
    }
    
    const getPending = () => {
        console.log("IN GET PENDINGggg 1234")
        console.log(stylist)
        
        console.log("STYLIST IS NOT NULL 123")
        var id = stylist.id
        console.log("THE STYLIST ID IN GET PENDING")
        console.log(id)
        getPendingBookings(id, (result)=> {
            console.log("GET PENDING RESULTS HERE HERE")
            console.log(result.data)
            if (result!=null){
                // setpendingList(result.data)
                
                
                appointmentIterator(result.data,0, [])
            } 
        })
    
   
}
 
  const onboardingRedirectLink = (screen, accountId) => {
      console.log("THE ONBOARDING REDIRECT LINK 1")
      console.log(stylist.id)
      console.log(screen)
      const {navigate} = props.navigation
      if (screen=="Verify Your Identity"){
          console.log("IN VERIFY YOUR IDENTITY SCREEN CHANGE")
        navigate("Verify Your Identity", {
            stylistId: stylist.id,
            next: 'Home',
            isBack: isBack
        })

      } else if (screen=="Mailing Address") {
        navigate("Mailing Address", {
            accountId: accountId,
            next: 'Home',
            isBack: isBack
        })

    } else if (screen=="Add Bank Account"){
        navigate("Add Bank Account", {
            accountId: 'Home',
            next: 'Home',
            isBack: isBack

        })
    } else if (screen=="Taking Too Long?"){
        Alert.alert("Taking too long?", "Contact us at info@glamoapp.com for more information regarding your onboarding status")

    }
     
  }

   
    
    console.log("THE PENDING LIST LENGTH")
    console.log(pendingList.length)
    
    return (
        <View style={styles.container}>
              <Spinner 
            visible={spinner}
            />
            
            <HomeHeader callback={redirect}/>
            {stylist!=null && 
            <OnboardingCompletionStatus redirectLink = {onboardingRedirectLink}/>
            }
            <HomeNavigator callback={callback} selected={type}/>
            <View style={styles.body}>
            {appointmentCard!=null && 
                <AppointmentCard appointment={appointmentCard.appointment} booking={appointmentCard.booking} client={appointmentCard.client} requestClose={()=> setAppointmentCard(null)}/>
            }
                {pendingBookingList.map((card)=> {
                    console.log("THE PENDING MODAL LIST MAPPED 123")
                    console.log(card)
                    return (
                        <PendingModal appointment={card.appointment} serviceId={card.appointment.ServiceId} booking={card.booking} client={card.client} close={close2}/>
                    )
                })}
                

            {body}
            


            </View>
           {/* {pendingList.map((pending) => {
               console.log("IN PENDING LIST MAP")
               console.log(pending)
               
               return (
                <PendingModal appointment={pending.appointment} client={pending.client} booking={pending.booking} close={close2}/>
               )
           }

           )} */}
           
          
          
           
            <MenuBar screen={"HOME"} callback={redirect}/>
         
            

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    body: {
        height:Dimensions.get('window').height*0.85
    },
    bottom: {
        position: 'absolute',
        bottom:0
        // flex:1,
        // justifyContent: 'flex-end',
    //    flexDirection: 'column',
    //    justifyContent: "flex-end",
    //    alignItems: 'flex-end',
      
    },
   
   
})
export default HomeOverview