import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useFonts } from 'expo-font';
import moment from 'moment'
import {postStylist, getStylistByEmail, getStylistByPhone, saveStylistAsync} from '../../Database/functions'
import SchedualeHeader from '../../Headers/scheduale';
import { CognitoUserAttribute, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { validate } from 'uuid';
import {ProgressBar, Colors} from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import uuid from 'react-native-uuid'

const poolData = {
    UserPoolId: "us-east-1_gY0Wfju9i",
    ClientId: "4ts3ni32s1lvjapk199ekure9p" 
   
    
 }
const userPool = new CognitoUserPool(poolData);

const Step1 = (props) => {
    console.log("IN STEP 1")
    console.log(props)
    console.log("NAV")
    console.log(props.navigation)

    const [keyboardHeight, setkeyboardHeight] = useState(0)
    const [inputHeight, setInputHeight] = useState(100)
    const [stylistPayload,setPayload] = useState(null)
    const [formattedNum, setformattedNum] = useState(props.navigation.state.params.formattedPhone)
    


    useEffect(()=> {
        Keyboard.addListener("keyboardDidShow",_keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
    })

    const _keyboardDidHide = (e)=> {
        setkeyboardHeight(0)
    }
    const _keyboardDidShow = (e) => {
        setkeyboardHeight(e.endCoordinates.height)
    }
    var phone = props.navigation.state.params.phone
    const [email,setEmail] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [password, setPassword] = useState("")
    const [error,seterror] = useState(null)
    const [uniqueEmail, setUniqueEmail] = useState(null)
    const [submitClicked, clickSubmit] = useState(false)
    const [submitStop, stopSubmit] = useState(null)
    const [date,setDate] = useState(new Date())
    const [disable, setDisable] = useState(true)
    
 
    var errorElem = null
    var errorText = null 


    if (password.length>0 && email.length>0 && firstName.length>0 && lastName.length>0){
        if (disable==true){
            setDisable(false)

        }
        
    }else {
        if (disable==false){
            setDisable(true)
        }
    }
    const emailPress = () => {
        const {navigate} = props.navigation
        navigate('Sign Up Email', {
            phone: props.navigation.state.params.phone
        })
    }
    const login = () => {
        const {navigate} = props.navigation
        navigate('Sign In')
    }
    const _handleBirthday = (input) => {
        if (input.length>birthdate.length){
            if (input.length==2 || input.length==5){
                setBirthdate(birthdate => input+"-")
            } else {
                setBirthdate(birthdate=>input)
            }
        }
        if (input.length<birthdate.length){
            if (birthdate.charAt(birthdate.length-1)=="-"){
                setBirthdate(birthdate=>birthdate.slice(0,-2))
            } else {
                setBirthdate(birthdate=>input)
            }
        }

    }
    const validateEmail = () => {
        if (email.length==0){
            alert("Enter in a value for email")
            return false
        }
        console.log("at check email")
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if (reg.test(email) === false){
            alert("Incorrect Email Format")
            // errorText = 'Incorrect Email Format'
           
            return false
        }

        return true
        
    }
    const validateBirthdate = () => {
        console.log("AT VALIDATE BIRTHDATE")
     
        var birthdateArray = birthdate.split("-")
        var day = birthdateArray[1]
        var month = birthdateArray[0]
        var year = birthdateArray[2]
        
        if (isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year))){
            Alert.alert("Enter in your birthday")
            console.log("AT PARSING FALSE")
            
        }
        //valiate a valid date
        if (parseInt(month)<1 || parseInt(month)>12){
            Alert.alert("Enter in a valid month number")

        }
        var currentYear = moment().format("YYYY")
        if (parseInt(year)>currentYear){
            Alert.alert("Enter in a valid birthdate year ")
        }
        var daysInMonth= new Date(parseInt(year),parseInt(month),0).getDate()
        if (day<=0 || day>daysInMonth){
            Alert.alert("Enter in a valid birthdate day")
        }
        return true


    }
    const validatePassword = () => {
        if (password.length<8){
            alert('Password must contain at least 8 characters')
            return false
        }
        else {
            return true
        }
    }

    const userSignUp = (stylistPayload) => {
        console.log("IN USER SIGN UP STATEMENT RIGHT HERE")
        const {navigate} = props.navigation
        var phoneNum = "+1" +phone 
        console.log("THE PHONE NUMBER")
        console.log(phoneNum)
        var phoneData = {
            Name: "phone_number",
            Value: phoneNum

        }
        var emailData = {
            Name:"email",
            Value: email
        }
        var firstNameData = {
            Name: "name",
            Value:firstName
        }
        var lastNameData = {
            Name:"family_name",
            Value:lastName
        }
        var birthdayData = {
            Name: "birthdate",
            Value: moment(date).format("YYYY-MM-DD")
        }
        const emailAttribute = new CognitoUserAttribute(emailData);
        const phoneAttribute = new CognitoUserAttribute(phoneData);
        const firstNameAttribute = new CognitoUserAttribute(firstNameData);
        const lastNameAttribute = new CognitoUserAttribute(lastNameData);
        const birthdayAttribute = new CognitoUserAttribute(birthdayData)
        userPool.signUp(email, password, [emailAttribute,phoneAttribute, firstNameData, lastNameData, birthdayData], null, (err,data)=> {
            var userData = {
                Username: email,
                Pool: userPool
            }
            var tempUser = new CognitoUser(userData)
            if (err){
                console.log("USER POOL SIGN UP ERROR")
                console.log(err)
                if (err.code=="UsernameExistsException"){
                    Alert.alert("Email address is already associated with an existing account", "Enter a different email account or login")
                }
                return
            } else {
                postStylist(stylistPayload, (result)=> {
                    if (result!=null){
                        console.log("THE POST STYLIST RESPONSE IN STEP 1")
                        console.log(result)
                        saveStylistAsync(result.data.id)
                        navigate("Step 1_2", {
                            "stylistPayload":stylistPayload,
                            "formattedNum": formattedNum,
                            "phoneNum":phone,
                            user: tempUser
                       
                            
                        })

                    } else {
                        Alert.alert("Network Error", "Unable to post personal information")
                    }
                    
                })
               
            }
       
        })

    }
 
  
  
    const submit = () => {
        if (firstName.length==0){
            alert("Enter in a value for your first name")
            return
        }
        if (lastName.length==0){
            alert("Enter in a value for your last name")
            return
        }
        
        const {navigate} = props.navigation
        var validEmail = validateEmail()
        console.log("BIRTHDAY DATA")
        console.log(date)
        var validBirthdate = true
        var validPassword = validatePassword()
        if (validEmail==true && validBirthdate==true && validPassword==true){
            var random3Digits = uuid.v1().substring(0,3)
            var stylistPayload_ = {
                "birthdate":moment(date).format("YYYY-MM-DD"),
                "email": email,
                "firstName":firstName,
                "lastName":lastName,
                "phone":phone,
                "password": password,
                'id': uuid.v4(),
                'referralCode': firstName.toLowerCase()+lastName.toLowerCase()+random3Digits
            }
            console.log("SHOW THE REFERRAL CODE")
            console.log(stylistPayload_.referralCode)
            userSignUp(stylistPayload_)
        }
    }
    const goBack = () => {
        props.navigation.goBack()
    }
    if (error!=null){
        console.log("AT ERROR NOT EMPTY")
        console.log(error)
        errorElem= <Text>{error}</Text>
    }
    // if (submitClicked==true && uniqueEmail==true && submitStop!=true) {
    //     submit()
    // }

    // console.log("THE KEYBOARD HEIGHT")
    // console.log(keyboardHeight)
   


    return (
        <View style={{ width: '100%',height: '100%',flexDirection: "column"}}>
           <View style={{height:Dimensions.get('window').height-80}}>

            <SchedualeHeader backwards={goBack}/>
            <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 1 
                </Text>
                <ProgressBar progress={0.33} color={"#1A2232"} style={styles.progressBar}/>
            </View>
           
            
            <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}} >
            
            <View style={{ paddingTop:40,
        marginLeft:20,
        marginRight:20,
        display: 'flex',
        justifyContent: 'flex-end',
        flex:1,
        height: Dimensions.get('window').height*0.65-keyboardHeight}}>
            <ScrollView style={{ 
        flex:1,
        height: Dimensions.get('window').height*0.65-keyboardHeight}}>
     
            <Text style={styles.signup}>SIGN UP</Text>
            <View style={styles.signupOptions}>
            <View style={styles.inputBox}>
            <Text style={styles.inputText}>First Name</Text>
                <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setfirstName}
                
               
                placeholder={"Enter in first name"}
                returnKeyType={'done'}
               
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Last Name</Text>
                <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setlastName}
                placeholder={"Enter in last name"}
                returnKeyType={'done'}
               
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Email</Text>
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
               
                placeholder={"Enter in email"}
                returnKeyType={'done'}
                
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Birthday</Text>
            <DatePicker date={date} onDateChange={setDate}
          
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{
                borderWidth:0,
                display: 'flex',
                justifyContent: 'flex-end'
                
            }}
            maxDate={new Date()}
            customStyles={{
                dateIcon: {
                    display:'none'
                },
                cancelBtnText: {
                    color: "#1A2232"
                },
                confirmBtnText: {
                    color: "#1A2232"
                },
                dateTouchBody: {
                    backgroundColor: "white",
                    borderColor:'transparent',
                    borderWidth:0,
                    width:Dimensions.get("window").width-40,
                },
                dateInput: {
                    borderWidth:1,
                    borderColor: 'lightgray',
                    alignItems: 'flex-start',
                    height:50,
                    backgroundColor: "white",
                    width:Dimensions.get("window").width-40,
                    paddingLeft: 20

                },
                btnTextConfirm: {
                    color:"#1A2232"
                },
                dateText: {
                    fontSize:16
                }
                
            }}/>
          
           </View>
           
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Password</Text>
            <Text>Password must be at least 8 characters long </Text>
                <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder={"Enter in password"}
                secureTextEntry={true}
                returnKeyType={'done'}
                
              
                ></TextInput>

           </View>
            </View>
            </ScrollView>
            {errorElem}
         
            </View>
            </KeyboardAvoidingView>
            </View>
            <View style={styles.confirmBox}>
            
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                height:Dimensions.get('window').height*0.08,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                width: Dimensions.get('window').width,
            }} disabled={disable} onPress={()=>submit()}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>
           </View>
           
        </View>

    )
}
const styles = StyleSheet.create({
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:20,
        display: 'flex',
        justifyContent: 'flex-end',
        flex:1
    },
    google: {
        marginTop: 40,
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
        

    },
    facebook: {
        marginTop: 40,
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

    },
    signup: {
        fontWeight: '600'

    },
    googleLogo: {
        height:40,
        width:40,
        alignSelf: "center",
      

    },
    googleLogoFrame:{
        alignSelf: "center",
        borderColor: "lightgray",
        height:"100%",
        borderRightWidth:2,
        padding:10,
        backgroundColor: "white",
        

    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        flex:1

    },
    signupOptions: {
        paddingTop:30

    },
    signupBlock: {
        width: '100%',
        height: 100,
      

    },
    email: {
        backgroundColor: '#1A2232',
        height:60,
        flexDirection: "row",
        justifyContent: "center",
        
        marginRight: 10,
        borderRadius: 5
    },
    emailText: {
        color: "white",
        // fontFamily: "Lato-SemiBold",
        alignSelf: "center",
        fontWeight: '600'


    },
    googleText: {
        alignSelf: "center",
        color: "#1A2232",
        // fontFamily: "Lato-SemiBold",
        fontWeight: '600',
        paddingLeft:50

    },
    footer: {
        // position:"absolute",
        
        // bottom:0,
        
        flexDirection:'column',
        width:'100%',
        marginBottom:40,
        justifyContent: "center",
        alignItems: "center",
        
        
    },
    haveaccountText: {
        padding:20,
        // fontFamily: "Lato-SemiBold",
        fontSize: 16,
        color: "grey",
        fontWeight: "600"
    },
    loginText: {
        // fontFamily: "Lato-SemiBold",
        fontSize:16,
        textDecorationLine: "underline"

    },
    stylistText: {
        padding:20,
        // fontFamily: "Lato-SemiBold",
        // fontSize: 16,
        // color: "grey",
        fontWeight: "600",
        alignSelf: "center"

    },
    stylistOption: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    or: {
     
        // fontFamily: "Lato-SemiBold",
        fontSize: 12,
        color: "grey",
        fontWeight: "600"

    },
    inputBox: {
        width: '100%',
        height: 100,
      

    },
    inputText: {
        color: "#1A2232",
        // fontFamily: "Lato-Semibold",
        fontSize:14,
        marginBottom:10,
        
        fontWeight: '600'
    },
    input: {
        width:Dimensions.get("window").width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        
        marginBottom:20,
        fontSize:18,
        paddingLeft: 20
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
       
        
       
        // bottom:0,
        // height:50,
       
      
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        // flex:1,
        width: Dimensions.get('window').width,
        // marginBottom:20,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
        bottom:Dimensions.get('window').height*0.00,
        // height:Dimensions.get('window').height*0.08,
      
        //marginTop:20,
        // marginBottom:20,
        // height:60,
        // bottom:0,
        position: 'absolute'
        
       
    },
    stepHeader: {
        marginTop:20,
        alignSelf: 'center',
        width: 200
        
        

    },
    stepText: {
        fontSize:18,
        fontWeight:'600',
        alignSelf: 'center',
        marginBottom:10
    },
    progressBar: {
        width: '100%'
    }

})

export default Step1