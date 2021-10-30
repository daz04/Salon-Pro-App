
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Linking ,Platform, TouchableOpacity, Dimensions} from 'react-native';
import HomeOverview from './Home/index'
import EarningsOverview from './Earnings/overview'
import ProfileOverview from './Storefront/overview'
import SettingsOverview from './Settings/overview'
import SchedualeOverview from './Scheduale/overview'
import AddressOverview from './components/Address/address'
import ModifyAddress from './components/Address/modifyAddress'
import AddressList from './components/Address/addressList'
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack'
import PhoneNumberForm from './Auth/SignIn/PhoneForm'
import SignIn from './Auth/SignIn/signIn'
import SignUp from './Auth/SignUp/signUp'
import AccountVerification from './Auth/Verification/verification'
import ApprovalStatus from './Auth/Verification/approvalStatus';
import Step1 from './Auth/SignUp/step1'
import Step1_2 from './Auth/SignUp/step1_2'
import Step2 from './Auth/SignUp/step2'
import Step3_1 from './Auth/SignUp/step3_1'
import Step3_2 from './Auth/SignUp/step3_2'
// import NewStorefrontOverview from './newStorefront/overview'
import Item from './components/Item/item'
import Identification from './Identification/identification'
import Subscription from './Subscription/subscription'
import SubscriptionPayment from './Subscription/payment'
import PaymentMethods from './components/Payment/paymentMethods'
import AddCreditCard from './Payment/Components/CreditCard'
import SubscriptionSettings from './Subscription/subscriptionSettings'
import AccountDetails from './Settings/accountDetails'
import TravelDetails from './Settings/travelDetails'
import PayoutOverview from './components/Payout/overview'
// import {Linking} from 'react-native'
// import VersionCheck from 'react-native-version-check'
import {version} from './package.json'
import axios from 'axios';
import PasswordReset from './Auth/Verification/passwordReset';
import ResetVerification from './Auth/Verification/resetVerification';
import Referral from './components/Referral/overview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import {checkForPaymentMethod} from './Scripts/functions'
import linking from './linking'
import VerifyYourIdentity from './OnboardingPayment/VerifyYourIdentity'
import AddBankAccount from './OnboardingPayment/AddBankAccount'
import MailingAddress from './OnboardingPayment/MailingAddress'
import IdentificationDocument from './OnboardingPayment/IdentificationDocument'
console.log("THE VERSION")
console.log(version)

console.log("TEST UUID")
console.log(uuid.v1())

// VersionCheck.getCountry()
//   .then(country => console.log(country));          // KR
// console.log(VersionCheck.getPackageName());        // com.reactnative.app
// console.log(VersionCheck.getCurrentBuildNumber()); // 10
// console.log(VersionCheck.getCurrentVersion());  
// // var currentVersion = VersionCheck.getLatestVersion({
// //   provider: 'appStore'
// // })

// VersionCheck.needUpdate().then(async res=> {
//   if (res.isNeeded){
//     Linking.openURL(res.storeUrl)
//   }
// })


// const Stack = createStackNavigator()
const checkUpdates = (callback) => {

  axios.get('http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/version/getVersion', {
    headers: {
        'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

    }}).then(response=>{
      var latestVersion = response.data[0]['current']
      if (latestVersion!=version){
        callback(false)
       
      } else {
        callback(true)
      }
    }).catch(error=> {
      console.log("ERROR IN GETTING VERSION")
      console.log(error)
    })

}

const redirectToStore = () => {
  if (Platform.OS==='ios'){
   Linking.openURL("https://apps.apple.com/us/app/glamo-pro/id1565406104")
       // Alert.alert(
       //   "Expired version",
       //   'Update to latest version to continue using the app', 
       //   [
       //     {'UPDATE': Linking.openURL("https://apps.apple.com/us/app/glamo/id1446779455")}
 
       //   ]
       //   )

     } else if (Platform.OS==="android"){
       Linking.openURL("https://play.google.com/store/apps/details?id=com.glamoapp.glamopro")
       // Alert.alert(
       //   "Expired version",
       //   'Update to latest version to continue using the app', 
       //   [
       //     {'Update': Linking.openURL("https://play.google.com/store/apps/details?id=com.glamoapp.glamo")},
       //     {'Update': Linking.openURL("https://play.google.com/store/apps/details?id=com.glamoapp.glamo")}
 
       //   ]
       //   )
     }

}


// const checkUpdates = () => {

//   axios.get('http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/version/getVersion', {
//     headers: {
//         'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

//     }}).then(response=>{
//       var latestVersion = response.data[0]['current']
//       if (latestVersion!=version){
//         if (Platform.OS==='ios'){
//           Alert.alert(
//             "Expired version",
//             'Update to latest version to continue using the app', 
//             [
//               {'UPDATE': Linking.openURL("https://apps.apple.com/us/app/glamo-pro/id1565406104")},
//               {'UPDATE': Linking.openURL("https://apps.apple.com/us/app/glamo-pro/id1565406104")}
    
//             ]
//             )

//         } else if (Platform.OS==="android"){
//           Alert.alert(
//             "Expired version",
//             'Update to latest version to continue using the app', 
//             [
//               {'UPDATE': Linking.openURL("https://play.google.com/store/apps/details?id=com.glamoapp.glamopro")},
//               {'UPDATE': Linking.openURL("https://play.google.com/store/apps/details?id=com.glamoapp.glamopro")}
    
//             ]
//             )
//         }
//       }
//     }).catch(error=> {
//       console.log("ERROR IN GETTING VERSION")
//       console.log(error)
//     })
//   // axios.get('http://itunes.apple.com/lookup?bundleId=com.glamoapp.glamopro').then(response=>{
//   //   console.log("RESPONSE FOR CHECK UPDATES")
//   //   var len = response.data['results'].length
//   //   var appleVersion = response.data['results'][len-1]['version']
//   //   if (appleVersion != version){
//   //     Alert.alert(
//   //       "Expired version",
//   //       'Update to latest version to continue using the app', 
//   //       [
//   //         {'UPDATE': Linking.openURL("https://apps.apple.com/us/app/glamo-pro/id1565406104")},
//   //         {'UPDATE': Linking.openURL("https://apps.apple.com/us/app/glamo-pro/id1565406104")}

//   //       ]
//   //       )
//   //   }
    
//   // })
//   // .catch(error=> {
//   //   console.log(error)
//   // })

// }
// checkUpdates()

// const {store, persistor} = reduxStore()


const persistenceKey = "Home"
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey)
  return JSON.parse(jsonString)
  //setScreen(jsonString)
}
const persistNavigationState = async (prevState, newState, action) => {
  var totalLen = prevState['routes'].length
  var newRoute = prevState['routes'][totalLen-1]
  // console.log("PREV STATE")
  // console.log(prevState)
  // console.log("NEW STATE")
  // console.log(newState)
  // console.log("ACTION")
  // console.log(action)
  try {
    // console.log("IN PERSIST NAVIGATION STATE")
    // console.log("THE NEW STATE")
    // console.log(newState)
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(newRoute))
  } catch (err) {
    console.log("GETTING PERSISTENCE KEY ERROR")
    console.log(err)
  }
}

const computeMainScreen = async (callback) => {
  console.log('IN COMPUTE MAIN SCREEN')
    var stylistId = await AsyncStorage.getItem("stylistId")
    console.log("THE STYLIST ID")
    console.log(stylistId)
    if (stylistId!=null){
      callback("Home")
    } else {
      callback("Phone")
    }
  
}

var mainScreen = null
console.log("MAIN SCREEN RESULT")
console.log()


const AppNavigationPersists = () => <AppNavigator 
    persistNavigationState={persistNavigationState} 
    loadNavigationState={loadNavigationState} 
/>




export default function App() {

  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState({})
  const [mainScreen_, setMainScreen] = useState(null)
  const [correctVersion,setcorrectVersion] = useState(null)
  const [fetchPaymentMethod, setFetchPaymentMethod] = useState(false)

  useEffect(()=> {

    if (mainScreen_==null){
      console.log("MAIN SCREEN_ IS NULL")
      computeMainScreen((result)=> {
        console.log("IN COMPUTE MAIN SCREEN RESULT")
        console.log(result)
        
        setMainScreen(result)
        
    })
  }
  // if (mainScreen_!=null && mainScreen_=="Home" && fetchPaymentMethod==false){
  //   setFetchPaymentMethod(true)
  //   checkForPaymentMethod((result)=> {
  //     console.log("IN CHECK FOR PAYMENT METHOD RETURN")
      
  //     if (result==false){
  //       //stylist has no payment method currently attributed to their account
  //       setMainScreen("Add Credit Card")
  //     }
  //   })
  //   //it means user is signed in and we need to check if they have an available payment method or not

  // }




  }, [mainScreen_])

  if (correctVersion==null){
    checkUpdates((result)=> {
      setcorrectVersion(result)
    })
    
  }


  // console.log("THE APP CONTAINER")
  // console.log(AppContainer)
  const AppNavigator = createStackNavigator({
    "Main Screen": {screen: mainScreen_!=null&&mainScreen_=="Home"?HomeOverview:PhoneNumberForm, 
    navigationOptions: {
      headerShown: false
    },
  params: {
    next:"Home"
  }},
    "Add Credit Card": {screen: AddCreditCard, 
    navigationOptions: {
      headerShown: false
    },
    params: {
      next: "Home"
    }
  },
    // "LoadingScreen": {screen: LoadingScreen, 
    // navigationOptions: {
    //   headerShown:false
    // }},
    "Phone Form": {screen:PhoneNumberForm, 
      navigationOptions: {
        headerShown:false
      }
    },
    "Account Verification": {screen:AccountVerification,
      navigationOptions: {
        headerShown:false
      }
    },
    "Home": {screen:HomeOverview, 
    navigationOptions: {
      headerShown:false
    }},
    "Earnings": {screen:EarningsOverview,
    navigationOptions: {
      headerShown:false
    }},
    "Profile": {screen: ProfileOverview,
    navigationOptions: {
      headerShown:false
    }},
   
    "Settings": {screen: SettingsOverview,
    navigationOptions: {
      headerShown:false
    }},
    "Scheduale":{screen: SchedualeOverview,
    navigationOptions: {
      headerShown:false
    }},
    "Address":{screen:AddressOverview,
    navigationOptions: {
      headerShown:false
    }},
    "Modify Address": {screen:ModifyAddress,
    navigationOptions: {
      headerShown:false
    }},
    "Address List": {screen:AddressList,
    navigationOptions: {
      headerShown:false
    }},
    "Sign In": {screen: SignIn,
    navigationOptions: {
      headerShown:false
    }},
    "Step 1": {screen: Step1, 
    navigationOptions: {
      headerShown:false
    }},
    "Step 1_2": {screen: Step1_2, 
      navigationOptions: {
        headerShown:false
      }},
  
    "Step 2": {screen: Step2, 
      navigationOptions: {
        headerShown:false
      }},
    "Step 3_1": {screen: Step3_1, 
      navigationOptions: {
        headerShown:false
      }},
    "Step 3_2": {screen: Step3_2, 
      navigationOptions: {
        headerShown:false
      }},
  
    "Approval Status": {screen: ApprovalStatus, 
    navigationOptions: {
      headerShown:false
    }},
    // "New Storefront": {screen: NewStorefrontOverview,
    // navigationOptions: {
    //   headerShown:false
    // }},
    "Item": {screen: Item, 
    navigationOptions: {
      headerShown:false
    }},
    "Identification": {screen: Identification, 
    navigationOptions: {
      headerShown:false
    }},
    // "Get Approval": {screen:GetApproval,
    // navigationOptions: {
    //   header:null
    // }},
    "Subscription": {screen:Subscription,
    navigationOptions: {
      headerShown:false
    }},
    "Subscription Payment": {screen: SubscriptionPayment,
    navigationOptions: {
      headerShown:false
    }}, 
    "Payment Methods": {screen: PaymentMethods, 
    navigationOptions: {
      headerShown: false
    }},
    "Subscription Settings": {screen: SubscriptionSettings, 
    navigationOptions: {
      headerShown:false
    }},
    "Account Details": {screen: AccountDetails,
    navigationOptions: {
      headerShown: false
    }},
    "Travel Details": {screen: TravelDetails,
      navigationOptions: {
        headerShown: false
    }},
    "Password Reset": {screen: PasswordReset, 
    navigationOptions: {
      header:null
    }},
    "Reset Verification": {screen: ResetVerification, 
      navigationOptions: {
        header:null
      }
  
    },
    "Referral": {screen: Referral, 
    navigationOptions: {
      header: null
    }},
    "Payout Overview": {screen: PayoutOverview, 
    navigationOptions: {
      header:null
    }},
    "Verify Your Identity": {screen: VerifyYourIdentity, 
    navigationOptions: {
      header: null
    }},
    "Add Bank Account": {
      screen: AddBankAccount,
      navigationOptions: {
        header:null
      }
    },
    "Mailing Address": {
      screen: MailingAddress,
      navigationOptions: {
        header:null
      }
    },
    "Identification Document": {
      screen: IdentificationDocument,
      navigationOptions: {
        header:null
      }
    }
    
  
  })
  const AppContainer = createAppContainer(AppNavigator)
  

  return (
    //<Text>Hey</Text>
    //<AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState}/>
    <View style={{height:'100%', width:'100%'}} >
    {correctVersion!=null && correctVersion==true &&  <AppContainer  uriPrefix={"GlamoPro://app"}/>}
    {correctVersion!=null && correctVersion==false && <View style={styles.modalStyle}>
    
       <Text style={{fontSize:18, color: 'white'}}>Update App Version</Text>
       <TouchableOpacity  onPress={()=>redirectToStore()} style={{backgroundColor: '#C2936D', width:Dimensions.get('window').width*0.4, 
       height:Dimensions.get('window').width*0.1, borderRadius:20, flexDirection: 'column', alignSelf: 'center',justifyContent: 'center', marginTop:'10%'}}>
        <Text style={{color:'#1A2232', alignSelf: 'center', justifyContent: 'center', fontSize:18, fontWeight:'600'}}>UPDATE</Text>
       </TouchableOpacity>
       
      </View>}
  </View>
  //   <View>
  //     {/* {AppContainer!=null &&
  // <AppContainer screenProps={{persistNavigationState}} persistNavigationState={persistNavigationState}></AppContainer>
  //     } */}
  //     <Text>Hey</Text>
  // </View>

  // <NavigationContainer>
  //    <Stack.Navigator 
  //       >
         
  //         <Stack.Screen 
  //         name={'LoadingScreen'}
  //         component={LoadingScreen}
  //         screenOptions={{
  //           header:null
  //         }}
  //         />


  //       </Stack.Navigator>
  // </NavigationContainer>
    
    
    // <PhoneNumberForm initialState={initialState}
    // onStateChange={(state)=> 
    //   AsyncStorage.setItem(persistenceKey, JSON.stringify(state))
    // }></PhoneNumberForm>
    // <NavigationContainer
    // initialState={initialState}
    // onStateChange={(state)=> 
    //   AsyncStorage.setItem(persistenceKey, JSON.stringify(state))
    // }>
    // <NavigationContainer>
    //   <AppNavigator.Navigator>
    //     <AppNavigator.Screen name="Phone Form" component={PhoneNumberForm} options={{navigationOptions: {
    //       headerShown:false
    //     }}}>
         
        

    //     </AppNavigator.Screen>
        

    //   </AppNavigator.Navigator>
    //   {/* <AppNavigator/> */}

    // </NavigationContainer>
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //<AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState}/>
  //     </PersistGate>

  //  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#E8EAED'
  
  },
  screenWrapper: {
    paddingTop: 0,
    paddingHorizontal: 0,

  },
  sectionTitle: {
    fontSize: 24, 
    fontWeight: 'bold'
  },
  items: {
    marginTop:30
  },
  headerImg: {
    width:100,
    height:50

  },
  modalStyle: {
    backgroundColor: "#1A2232",
   
    height: '100%',
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center'
  },
  updateView: {
    width: '90%',
    alignSelf: 'center',
    height: '100%'
  }
});
