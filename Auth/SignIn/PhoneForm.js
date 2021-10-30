import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {CognitoUserPool,CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import axios from 'axios'

const poolData = {
    UserPoolId: "us-east-1_gY0Wfju9i",
    ClientId: "4ts3ni32s1lvjapk199ekure9p" 
   
    
 }
 

const userPool = new CognitoUserPool(poolData);



var params = {
    TableName: 'stylists',
    Key: {
        'Phone': {N: '+15555555555'}
    },
   
}




const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)
const PhoneNumberForm = (props) => {
    console.log("PHONE NUMBER FORM HEIGHT")
    console.log(Dimensions.get('window').height)
    //console.log("PHONE NUMBER FORM PROPS")
    //console.log(props)
    //props.screenProps.persistNavigationState({...props.navigation.state})
    const [number, setNumber] = useState('')

    

    const _handleNumberChange = (input) => {
        if (input.length>number.length){
            if ((input.replace(/[-]/g,'').length) % 3==0  && number.replace(/[-]/g,'').length>0 && number.replace(/[-]/g,'').length <7){
                setNumber(number => input + "-")
            } else {
                setNumber(number => input)
            }
        }
        if (input.length<number.length){
            //console.log("IN DELETE")
            if (number.charAt(number.length-1)=="-"){
                setNumber(number=>number.slice(0,-2))
            } else {
                setNumber(number=>input)
            }
        }

    }
    const submit = () =>{
        console.log("AT SUBMIT")
        const {navigate} = props.navigation
      
        
        if (number.replace(/[-]/g,'').length <10 || isNaN(Number(number.replace(/[-]/g,'')))){
            
            alert("Enter a valid phone number")
            return
        }

        //console.log("USER DATA INPUT")
        //console.log(number.replace(/[-]/g,''))

        //check from aws cognito first


     
        axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/getbyPhone?phone=${number.replace(/[-]/g,'')}`, {
        //axios.get(`http://localhost:3000/api/stylists/getbyPhone?phone=${number.replace(/[-]/g,'')}`, {
            headers: {
                'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

            }
        }).then(response=> {
            
            console.log("AT RESPONSE")
            console.log(response.data)
            //console.log(typeof(response))
            //console.log(response.data)

            if (response.data.length>0){
                navigate("Sign In", {
                    phone: number.replace(/[-]/g,'')
                })
            } else {
                console.log("iN ELSE")
                navigate("Step 1", {
                    formattedPhone: number,
                    phone: number.replace(/[-]/g,'')
                }
                )

            }
                
                //console.log("RESPONSE DATA LENGTH IS GREATER THAN 0")
            //     if (response.data[0].Status=="Unconfirmed"){
            //         var data = response.data[0]
            //         var payload = {
            //             id: data.id,
            //             firstName: data.FirstName,
            //             lastName: data.LastName,
            //             email: data.Email,
            //             phone: data.Phone,
            //             birthdate: data.Birthdate
                        
            //         }
            //         navigate("Account Verification", {
            //             stylistPayload: payload,
            //             formattedNum: number

            //         })
            //     } else if (response.data[0].Status=="Pending"){
            //         navigate("Approval Status", {
            //             phone: number,
            //             status: "Pending"
            //         })
            //         //  navigate("Sign In", {
            //         //     phone: number.replace(/[-]/g,'')
            //         // })
            //     } else if (response.data[0].Status=="Reject"){
            //         navigate("Approval Status", {
            //             phone: number,
            //             status: "Reject"
            //         })


            //     } else if (response.data[0].Status=="Approve"){
            //         navigate("Sign In", {
            //             phone: number.replace(/[-]/g,'')
            //         })
                    

            //     } 


            // } else {
            //     navigate("Step 1", {
            //         phone: number.replace(/[-]/g,''),
            //         formattedPhone: number
            //     })

            // }

        }).catch(error=>{
            //console.log("ERROR OCCURED")
            //console.log(error)
            navigate("Step 1",
                {
                    formattedPhone: number,
                    phone: number.replace(/[-]/g,'')
                }
            )
        })

    }

    return (
        <DismissKeyboard style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
        <View style={styles.container}>
            <View style={styles.body}>
       
            <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../assets/logotext.png")}/>
            <Text style={styles.proText}>PRO</Text>
            </View>
            <Image source={require("../../assets/withgradient.png")} style={styles.backgroundImg}/>
            
               
            <View style={styles.promptPhone}>
            
        
            
                <View style={styles.phone}>
                    <View style={styles.ext}>
                        <Text style={styles.extText}>+1</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput style={styles.numberInput}
                    keyboardType='numeric'
                    value={number}
                    onChangeText={_handleNumberChange}
                    placeholder="Enter phone number"
                    maxLength={12}
                    returnKeyType={'done'}></TextInput>
                    </TouchableWithoutFeedback>

            </View>
            </View>
           
            
           
           

        </View>
        <TouchableOpacity style={{
             flexDirection: "row",
             alignItems: "center",
             textAlign: "center",
             // flex: 1,
             justifyContent: 'center',
             // bottom:-Dimensions.get('window').height*0.05,
             bottom: Dimensions.get('window').height<=1000?Dimensions.get('window').height*0.05:Dimensions.get('window').height*0.15,
             padding:'2%',
             alignSelf: 'center',
             backgroundColor: "#1A2232",
            //height: 70,
             height: Dimensions.get('window').height*0.08,
             
             width: Dimensions.get('window').width
        }} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Continue</Text>
            </TouchableOpacity>
        </View>
        </DismissKeyboard>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
        flexDirection: 'column',
        marginTop:'50%',
        alignItems: 'center'
    },
    body:{
        width:'100%',
        height:Dimensions.get('window').height*0.7

    },
    logoContainer: {
        width: 225,
        height:52,
        alignSelf: 'center'
    
       
       

    },
    logo: {
        width: '100%',
        height:'100%'
    },
    phone:{
        
        flexDirection: 'row',
        justifyContent: 'flex-start',
       


    },
    promptPhone: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:'20%',
        marginLeft:20,
        marginRight:20,
        
    },
    promtText: {
        fontWeight: '500',
        fontSize: 16,
        paddingBottom:20,
        color: "#1A2232"

    },
    ext: {
        width: 50,
        height:70,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,

        borderColor: 'lightgray'
    },
    extText: {
        fontWeight:'400',
        fontSize:18

    },
    numberInput: {
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        width: '80%',
        fontSize: 18,
        paddingLeft: 20
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        // bottom:-Dimensions.get('window').height*0.05,
        bottom:Dimensions.get('window').height*0.05,
        padding:'2%',
        alignSelf: 'center',
        backgroundColor: "#1A2232",
       //height: 70,
        height: Dimensions.get('window').height*0.08,
        
        width: Dimensions.get('window').width
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    proText: {
        alignSelf: 'flex-end',
        marginRight:12,
       
        color: "#C2936D",
        fontWeight:'600',
        fontSize:16
    },
    backgroundImg: {
        width:'100%',
        height:400,
        top:'17.5%',
        zIndex:0,
        
        
     
      
        alignSelf: 'center',
        opacity:0.4,
        position:'absolute'
        // backgroundColor: 'rgba(0,0,0,0)',
    
    }
 

})
export default PhoneNumberForm