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




const PasswordReset = (props) => {
    var email = props.navigation.state.params.email 
    var code = props.navigation.state.params.code


    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId

    }
    var userPool = new CognitoUserPool(poolData);
    var user = new CognitoUser({
        Username: email, 
        Pool: userPool
    })


    const goBack = () => {
        props.navigation.goBack()
    }
    console.log("IN PASSWORD RESET")
    console.log(props)
    
    const [password1, setPass1] = useState(null)
    const [password2, setPass2] = useState(null)

    const submit = () => {
        if (password2!=password1){
            alert("Passwords do not match")
            return
        } 
        if (password1.length<8){
            alert("Passwords must be a minimum of 8 characters long")
            return
        }
        user.confirmPassword(code, password1, {
            onFailure: ((err)=> {
                console.log("CONFIRM PASSWORD ERROR")
                console.log(err)
                alert(err)
            }),
            onSuccess: session => {
                const {navigate} = props.navigation
                navigate("Home")
            }
        })

    }
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.body}>
            <Text style={styles.verificationText}>Enter new password</Text>
            <TextInput style={styles.verification}
                value={password1}
                onChangeText={setPass1}
                placeholder="Enter in password"
                secureTextEntry={false}>
                    
                </TextInput>

            <Text style={styles.verificationText}>Re-enter new password</Text>
            <TextInput style={styles.verification}
                value={password2}
                onChangeText={setPass2}
                placeholder="Enter in password"
                secureTextEntry={false}>
                    
                </TextInput>



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

export default PasswordReset