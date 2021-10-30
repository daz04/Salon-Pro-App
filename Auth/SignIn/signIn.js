import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import {CognitoUserPool,CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import SchedualeHeader from '../../Headers/scheduale';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {addStylistIdAsync, getStylistByPhone, getStylistObjByPhone} from '../../Database/functions'
import {StackActions, NavigationActions} from 'react-navigation'
import ResetVerification from '../Verification/resetVerification'
import {redirectToNextScreen} from './Scripts/functions'
const SignIn = (props)=> {
    
    const {navigate} = props.navigation
    var phoneNum = props.navigation.state.params.phone
    const [email,setEmail] = useState(null)
    const [stylist,setStylist] = useState(null)
    const [fetched, setFetched] = useState(false)

    const setId = async (id)=> {
        try {
            await AsyncStorage.setItem(
                'stylistId',
                id
            )
        } catch (error) {
            //console.log("SAVE STYLIST ASYNC ERROR")
            //console.log(error)
        }

    }

    


    const parseEmail = (stylistObj) => {
        //console.log("AT PARSE EMAIL")
        //console.log(stylistObj)
        setStylist(stylistObj)
        setEmail(stylistObj.Email)
        setId(stylistObj.id)
    }
    if (email==null){
        //console.log("AT EMAIL EMPTY")
        getStylistByPhone(phoneNum, parseEmail)

    }
    //console.log("SIGN IN PROPS")
    //console.log(props)
    const storeTokens = async (tokens) => {
        //console.log("AT STORE TOKENS")
        try {
            await AsyncStorage.setItem('Session',tokens)
        } catch (e){
            alert (e)
        }
    }
    const poolData = {
        UserPoolId: "us-east-1_gY0Wfju9i",
        ClientId:"4ts3ni32s1lvjapk199ekure9p"

    }
    var userPool = new CognitoUserPool(poolData);
    let [fontsLoaded] = useFonts({
        'Lato-Heavy': require('../../assets/fonts/Lato-Heavy.ttf'),
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
        'Lato-Semibold': require('../../assets/fonts/Lato-Semibold.ttf')
            
        
        })
   
    const [password, changePassword] = useState(null)
    const [verification, setVerification] = useState(null)
    const [code,setCode] = useState(null)
    if (fontsLoaded){
        //console.log("THE FONTS LOADED")
        
    }
    const resendVerification = () => {
        var user = new CognitoUser({
            Username: email, 
            Pool: userPool
        })
        user.resendConfirmationCode((err,res)=>{
            if (err){
                //console.log(err)
            }
            //console.log("worked")
        })

    }

    const goBack = () => {
        props.navigation.goBack()
    }
    const submit = () => {
       
        //console.log("AT SUBMIT")
        //console.log(phoneNum)
        //console.log(email)
        var user = new CognitoUser({
            Username: email, 
            Pool: userPool
        })
        //console.log("COGNITO USER")
        //console.log(user)
        //console.log(email)
        
        var authDetails = new AuthenticationDetails({
            Username: email,
            Password: password

        })
    
        //console.log("THE AUTH DETAILS")
        //console.log(authDetails)
        if (verification!=null && code!=null){
            user.confirmRegistration(code, true, ((err,result)=>{
                if (err){
                    //console.log(err)
                    return
                }

            }))
            
        }
        //console.log("AUTHENTICATE USER")
        user.authenticateUser(authDetails, {
           
            
            onSuccess: session => {
                //console.log("AT SUCCESS")
                var tokens = {
                    accessToken: session.getAccessToken().getJwtToken(),
                    idToken: session.getIdToken().getJwtToken(),
                    refreshToken: session.getRefreshToken().getToken()
                   
                }
                var tokenData = JSON.stringify(tokens)
                

                //console.log("AFTER ADD STYLIST ID ASYNC STORAGE",stylist.id)
                try {
                    AsyncStorage.setItem('@tokens', tokenData)
                    AsyncStorage.setItem('@phone',phoneNum)
                    AsyncStorage.setItem('stylistId',stylist.id)
                  } catch (e) {
                      //console.log("PHONE NOT SAVED IN ASYNC")
                    // saving error
                  }
                

                //check if the stylist has a payment method attributed to their name yet or not
                
                // redirectToNextScreen("Sign In", stylist, (result)=> {
                //     console.log("IN DETERMINE REDIRECT SCREEN RESULT")
                //     if (result=="Subscription"){
                        
                //         console.log("IS SUBSCRIPTION")
                //         // navigate("Subscription", {
                //         //     stylistPayload: stylist, 
                //         //     formattedNum: phoneNum
                //         // })
                //         const resetAction = StackActions.reset({
                //             index:0,
                //             actions: [NavigationActions.navigate({routeName: 'Subscription',
                //             params: {
                //                 stylistPayload: stylist, 
                //                 formattedNum: phoneNum

                //             }})]
                //         });
                //         props.navigation.dispatch(resetAction)
        
                //     } else if (result=="Titles"){
                //         navigate("Step 2", {
                //             stylistPayload: stylist,
                //             formattedNum: phoneNum
                //         })
                //     } else if (result=="License"){
                //         navigate("Step 3_1", {
                //             stylistPayload: stylistPayload,
                //             formattedNum: formattedNum,
                //             optional: false
                //         })
                //     } else if (result=="Availability"){
                //         navigate("Scheduale")

                //     } else if (result=="Payment Screen"){
                //         navigate("Payment Methods")
                //     } else {
                //         navigate("Home")

                //     }
                // })
              

                navigate("Home")
                const resetAction = StackActions.reset({
                    index:0,
                    actions: [NavigationActions.navigate({routeName: 'Home'})]
                });
                props.navigation.dispatch(resetAction)

               
                

                  
                
            
              
               
            },
            onFailure: ((err)=>{
                //console.log("IN FAILURE SECTION")
                if (err.code=="UserNotConfirmedException"){
                    //console.log("not confirmed")
                    // setVerification(verification => 
                    // <View style={styles.verification}><TouchableOpacity onPress={()=>resendVerification()}><Text style={styles.verificationText}>Resend Verification Code</Text></TouchableOpacity>
                    // <TextInput value={code}
                    // onChangeText={setCode}
                    // placeholder="Enter verification code"/>
                    // </View>
                    // )

                }
                //console.log(err)
                alert("There was an issue verifying your user credentials. Please try again.")
            })
        })


    }
    const signUp = () =>{
        navigate('Phone Number')
    }

    const resetPassword = () => {
        var user = new CognitoUser({
            Username: email, 
            Pool: userPool
        })
       
        // user.getAttributeVerificationCode('phone_number', {
        //     onSuccess: session => {
        //         console.log("GET ATTRIBUTE VERIFICATION CODE EMAIL")
        //         console.log(session)
        //     },
        //     onFailure: err => {
        //         console.log("GET ATTRIBUTE VERIFICATION CODE EMAIL ERROR")
        //         console.log(err)
        //     },
        //     inputVerificationCode: () => {
        //         console.log("VERIFICATION CODE SENT")
        //     }
        
        // })
        var params = {
            ClientId: "4ts3ni32s1lvjapk199ekure9p" ,
            Username: email
        }
        console.log("iN RESET PASSWORD")
        console.log(user)
        user.forgotPassword({
            onSuccess: session => {
                console.log("RESET SESSION")
                console.log(session)

            },
            onFailure: ((err)=> {
                console.log("RESET ERROR")
                console.log(err)

            }),
            inputVerificationCode() {
          
                console.log("VERIFICATION CODE WAS SENT")
                navigate("Reset Verification", {
                    phone: stylist.Phone,
                    email: stylist.Email
                })
                
                //cognitoUser.confirmPassword(verificationCode, newPassword, this);
                
            }

        })

    }
    return (
        <View style={styles.container}>
           
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.body}>
            <Text style={styles.signup}>LOGIN</Text>
            <View style={styles.passwordBlock}>
                <Text style={styles.passwordText}>Password</Text>
                <TextInput style={styles.password}
                value={password}
                onChangeText={changePassword}
                placeholder="Enter your password"
                secureTextEntry={true}>
                    
                </TextInput>

            <TouchableOpacity style={styles.resendBox} onPress={()=>resetPassword()}>
                <Text style={styles.resendText}>Forgot password? Reset Password</Text>
            </TouchableOpacity>

            </View>
            {verification}
            </View>
         
            <TouchableOpacity style={styles.login} onPress={()=> {submit()}}>
                <Text style={styles.loginText}>LOGIN</Text>

            </TouchableOpacity>

        </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column"

    },
   
    login: {
        width:Dimensions.get('window').width,
        // marginTop:60,
        height:Dimensions.get('window').height*0.08,
        display:'flex',
        justifyContent: 'center',
        bottom:0,
        position:'absolute',
        // flexDirection: "row",
        // justifyContent: "center",
        // marginRight: 10,
        // borderRadius: 5,
        backgroundColor: "#1A2232",
       
       

    },
    loginText: {
        color: "white",
        fontFamily: "Lato-Heavy",
        alignSelf: "center",
        fontWeight: '600',
        

    },
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:10,
        
        height: Dimensions.get('window').height-70
        

    },
    signup: {
        fontWeight: '600'

    },
    emailText: {
        paddingBottom:20,
        color: "#1A2232",
        fontFamily: "Lato-Semibold"

    },
    verificationText: {
        paddingBottom:20,
        color: "#1A2232",
        fontFamily: "Lato-Semibold",
        marginTop:20

    },
    passwordText: {
        paddingBottom:20

    },
    emailBlock: {
        marginTop:40

    },
    passwordBlock: {
        marginTop:40

    },
    password: {
        
        height:60,
        
        flexDirection: "row",
        justifyContent: "flex-start",
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        borderWidth:2,
        borderColor: "lightgray",
        shadowColor: "black",
        shadowRadius:10,
        shadowOffset: {
            height:10,
            width:10
        },
        
        backgroundColor: 'white',
        height:60,
        flexDirection: "row",
        justifyContent: "center",
        
        marginRight: 10,
        borderRadius: 5,
        fontSize: 20,
        padding:10

    },
    email: {
        
        height:60,
        
        flexDirection: "row",
        justifyContent: "flex-start",
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        borderWidth:2,
        borderColor: "lightgray",
        shadowColor: "black",
        shadowRadius:10,
        shadowOffset: {
            height:10,
            width:10
        },
        
        backgroundColor: 'white',
        height:60,
        flexDirection: "row",
        justifyContent: "center",
        
        marginRight: 10,
        borderRadius: 5,
        fontSize: 20,
        padding:10
    },
    footer: {
        position:"absolute",
        
        bottom:0,
        
        flexDirection:'column',
        width:'100%',
        marginBottom:40,
        justifyContent: "center",
        alignItems: "center",
    },
    signupText: {
        fontFamily: "Lato-SemiBold",
        fontSize:16,
        textDecorationLine: "underline"
    },
    haveaccountText: {
        padding:20,
        fontFamily: "Lato-SemiBold",
        fontSize: 16,
        color: "grey",
        fontWeight: "600"
    },
    verification: {
        paddingTop:20,
        marginTop:20
    },
    resendText: {
        alignSelf: 'center',
        fontSize: 16, 
        textDecorationLine: 'underline',
        color: '#1A2232'
 
     },
     resendBox: {
        marginTop:20,
        
    },
})
export default SignIn