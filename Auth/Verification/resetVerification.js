import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import SchedualeHeader from '../../Headers/scheduale';
import {CognitoUserPool,CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

const appConfig = {
    region: 'us-east-1',
    IdentityPoolId: "us-east-1_UUYnG1z8w",
    UserPoolId: "us-east-1_gY0Wfju9i",
    ClientId: "4ts3ni32s1lvjapk199ekure9p" 

}


const ResetVerification = (props) => {
    var phone = props.navigation.state.params.phone
    var email = props.navigation.state.params.email
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId

    }
    var userPool = new CognitoUserPool(poolData);
   
    
    const [code, setCode] = useState("")

    const goBack = () => {
        props.navigation.goBack()
    }

    const submit = () => {
        const {navigate} = props.navigation
        if (code.length==0){
            alert("Enter value for code")

        } else {
            navigate("Password Reset", {
                code: code,
                email:email
            })
        }



    }

    const resetPassword = () => {
        var user = new CognitoUser({
            Username: email, 
            Pool: userPool
        })
       
       
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
                console.log("verification code sent")
           
            }

        })

    }
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.body}>
            <Text style={styles.verificationText}>Enter verification code sent to {phone}</Text>
            <TextInput style={styles.verification}
                value={code}
                onChangeText={setCode}
                placeholder="Enter your code"
                secureTextEntry={false}>
                    
                </TextInput>
                <TouchableOpacity style={styles.resendBox} onPress={()=>resetPassword()}>
                <Text style={styles.resendText}>Did not recieve code? Resend verification code</Text>
            </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.login} onPress={()=> {submit()}}>
                <Text style={styles.loginText}>NEXT</Text>

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
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:10,
        
        height: Dimensions.get('window').height-70
        

    },
    verificationText: {
        paddingBottom:20

    },
    verification: {
        
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
    login: {
        width:Dimensions.get('window').width,
        // marginTop:60,
       height:Dimensions.get('window').height*0.08,
        display:'flex',
        justifyContent: 'center',
        bottom:0,
        position:'absolute',

        backgroundColor: "#1A2232",
       
       

    },
    loginText: {
        color: "white",
        fontFamily: "Lato-Heavy",
        alignSelf: "center",
        fontWeight: '600',
        

    }


})
export default ResetVerification