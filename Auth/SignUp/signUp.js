import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import moment from 'moment'
import {postStylist, getStylistByEmail, getStylistByPhone} from '../../Database/functions'
import SchedualeHeader from '../../Headers/scheduale';
import { CognitoUserAttribute, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { validate } from 'uuid';
const poolData = {
    UserPoolId: "us-east-1_gY0Wfju9i",
    ClientId: "4ts3ni32s1lvjapk199ekure9p" 
   
    
 }
 

const userPool = new CognitoUserPool(poolData);

const SignUp = (props) => {
    console.log("NAV")
    console.log(props.navigation)
    
    // let {status} = await Location.requestPermissionsAsync()
    // console.log("status")
    // console.log(status)
    let [fontsLoaded] = useFonts({
        'Lato-Heavy': require('../../assets/fonts/Lato-Heavy.ttf'),
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
        'Lato-Semibold': require('../../assets/fonts/Lato-Semibold.ttf')
            
        
        })
    
    
    var phone = props.navigation.state.params.phone
    var formattedphone = props.navigation.state.params.formattedPhone

    const [email,setEmail] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [password, setPassword] = useState("")
    const [error,seterror] = useState(null)
    const [uniqueEmail, setUniqueEmail] = useState(null)
    const [submitClicked, clickSubmit] = useState(false)
    const [submitStop, stopSubmit] = useState(null)
    
 


    var errorElem = null
    var errorText = null 

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
        console.log("at check email")
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if (reg.test(email) === false){
            errorText = 'Incorrect Email Format'
           
            return false
        }

        return true
        
    }
    const validateBirthdate = () => {
        console.log("AT VALIDATE BIRTHDATE")
        //make sure input is of valid date
        if (birthdate.length<10){
            console.log("BIRTHDATE LENGTH UNDER 10")
            console.log(birthdate)
            Alert.alert("Enter in full date length")
            
        }

        //make sure all input is numeric
        var birthdateArray = birthdate.split("-")
        var day = birthdateArray[1]
        var month = birthdateArray[0]
        var year = birthdateArray[2]
        
        if (isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year))){
            Alert.alert("Birthdate must be numeric")
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
        var strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (strongRegex.test(password)===false){
            errorText = "Password must contain at least 8 characters, at least one uppercase letter, at least one lower case, at least one number and at least one special character."
            seterror(error => errorText)
            return false
        }
        else {
            seterror(error=> null)
            return true
        }
    }

    const userSignUp = (stylistPayload) => {
        const {navigate} = props.navigation
        var phoneNum = "+1" +phone 
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
            Value: birthdate
        }
        var verified = {
            Name: "email_verified",
            Value: "True"
        }
        const emailAttribute = new CognitoUserAttribute(emailData);
        const phoneAttribute = new CognitoUserAttribute(phoneData);
        const firstNameAttribute = new CognitoUserAttribute(firstNameData);
        const lastNameAttribute = new CognitoUserAttribute(lastNameData);
        const birthdayAttribute = new CognitoUserAttribute(birthdayData)
        var emailVerified = new CognitoUserAttribute(verified)
        userPool.signUp(email, password, [emailAttribute,phoneAttribute, firstNameData, lastNameData, birthdayData, emailVerified], null, (err,data)=> {
            if (err){
                console.log("USER POOL SIGN UP ERROR")
                console.log(err)
                if (err.code=="UsernameExistsException"){
                    alert("An account with this email address or phone number already exists")
                }
                return
            }
            console.log("COGNITO SIGN UP DATA")
            console.log(data)
            navigate("Account Verification", {
                "stylistPayload":stylistPayload,
                "formattedNum": formattedphone
            })
        })

    }
    const uniqueEmailCallback = (val) => {
        if (val==false){
            setUniqueEmail(false)
            clickSubmit(true)
            
        } else {
            setUniqueEmail(true)
            clickSubmit(true)
          
        }
    }
  
    const validateUser = () => {
        getStylistByEmail(email, uniqueEmailCallback)
        
       


    }


    const submit = () => {
        var validEmail = validateEmail()
        var validBirthdate = validateBirthdate()
        var validPassword = validatePassword()
        if (validEmail==true && validBirthdate==true && validPassword==true){
            var stylistPayload = {
                "birthdate":birthdate,
                "email": email,
                "firstName":firstName,
                "lastName":lastName,
                "phone":phone
            }
            if (uniqueEmail==null){
                validateUser()

            }
          
           
            if (uniqueEmail==true){
                console.log("IN UNIQUE EMAIL IS TRUEEEEEEE")
                postStylist(stylistPayload)
                userSignUp(stylistPayload)
                stopSubmit(true)
                
               

            } else if (uniqueEmail==false ){
                errorText = "Provided email address is already registered"
                seterror(errorText)

            } 
            
            

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
    if (submitClicked==true && uniqueEmail==true && submitStop!=true) {
        submit()
    }
   


    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.body}>
            <Text style={styles.signup}>SIGN UP</Text>
            <View style={styles.signupOptions}>
            <View style={styles.inputBox}>
            <Text style={styles.inputText}>First Name</Text>
                <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setfirstName}
               
                placeholder={"Enter in your first name"}
               
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Last Name</Text>
                <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setlastName}
               
                placeholder={"Enter in your last name"}
               
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Email</Text>
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
               
                placeholder={"Enter in your email"}
                
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Birthdate</Text>
                <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={_handleBirthday}
                placeholder={"Enter in your birthdate"}
                maxLength={10}
              
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Password</Text>
                <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder={"Enter in your password"}
               
                secureTextEntry={true}
                
              
                ></TextInput>

           </View>
                

            </View>
            {errorElem}
            <View style={styles.confirmBox}>
            
             <TouchableOpacity style={styles.confirm} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Submit</Text>
            </TouchableOpacity>
            </View>
          
           

            </View>
           
            {/* <View style={styles.footer}>
                <Text style={styles.haveaccountText}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>login()}>
                <Text style={styles.loginText}>Login instead</Text>
                </TouchableOpacity>


            </View> */}
           
        </View>

    )
}
const styles = StyleSheet.create({
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:20

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
        flexDirection: "column"

    },
    signupOptions: {
        paddingTop:40

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
        fontFamily: "Lato-SemiBold",
        alignSelf: "center",
        fontWeight: '600'


    },
    googleText: {
        alignSelf: "center",
        color: "#1A2232",
        fontFamily: "Lato-SemiBold",
        fontWeight: '600',
        paddingLeft:50

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
    haveaccountText: {
        padding:20,
        fontFamily: "Lato-SemiBold",
        fontSize: 16,
        color: "grey",
        fontWeight: "600"
    },
    loginText: {
        fontFamily: "Lato-SemiBold",
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
     
        fontFamily: "Lato-SemiBold",
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
        fontFamily: "Lato-Semibold",
        fontSize:14,
        marginBottom:10,
        
        fontWeight: '600'
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
        height:100,
        borderRadius:5,
      
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        flex:1,
        width: Dimensions.get('window').width -40,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:20,
        marginBottom:20,
       
        
     
        height:75,
       
    }

})

export default SignUp