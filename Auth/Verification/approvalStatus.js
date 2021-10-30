import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import {CognitoUserPool,CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';
import Svg, {SvgXml} from 'react-native-svg';
import {MaterialIcons} from 'react-native-vector-icons'
import SchedualeHeader from '../../Headers/scheduale'
import {AntDesign} from 'react-native-vector-icons'
// import {CognitoIdentityCredentials, CognitoIdentity, CognitoIdentityServiceProvider} from 'aws-sdk'


const config = {
    identityPool: 'us-east-1:41a3b7d5-ecd1-45fc-bb02-b8e7dd45fc54',

}
const poolData = {
    UserPoolId: "us-east-1_t7jb40TQi",
    ClientId: "2jqchvesq7gscj0vqd2hu1m5po" 
   
    
}

var userPool = new CognitoUserPool(poolData);
const ApprovalStatus = (props) => {
    var imageElem = null
    const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    var phone = props.navigation.state.params.phone
    var status = props.navigation.state.params.status


    if (status=="Pending"){
        imageElem =  <MaterialIcons name={"sms"} size={35}/>

    } else if (status=="Reject"){
        imageElem = <AntDesign name={"close"} size={50}/>
    }

    var textMessage = null 
    if (status=="Reject"){
        textMessage=<Text style={styles.verificationText}>
            Account associated with phone number: {phone} is blacklisted. This user has not been approved to join Glamo Pro

        </Text>

    }
    if (status=="Pending"){
        textMessage=<Text style={styles.verificationText}>
            Account associated with phone number: {phone} is now being processed for approval. You will recieve a notification upon approval within the next 48 hours.

        </Text>

    }
    const goBack = () => {
        props.navigation.goBack()
    }
    const submit = ()=> {
        const {navigate} = props.navigation
        navigate("Phone Form")

}

    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.body}>
            
             <View style={styles.imageBox}>
                
                {imageElem}
                
            </View>
           {textMessage}
          
           </View>
           <TouchableOpacity style={{
              
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              justifyContent: 'center',
              position: 'absolute',
              bottom:0,
              height:Dimensions.get('window').height*0.08,
              alignSelf: 'center',
              backgroundColor: "#1A2232",
              width: Dimensions.get('window').width ,
              
             
          }} onPress={()=>submit()}>
              <Text style={styles.confirmText}>Go To Home</Text>
          </TouchableOpacity>

        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height:'100%',
       
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    body: {
        marginTop:'25%'

    },
    inputBox: {
        width: Dimensions.get('window').width*0.8 +25,
        height: 50,
        borderWidth:1,
        borderColor: 'grey',
        alignSelf: 'center',
        
        
      

    },
    inputText: {
       
        fontFamily: "Lato-Semibold",
        fontSize:16,
        fontWeight: '600',
        alignSelf: "center",
        paddingTop:10,
      
       
        paddingLeft:20,
        paddingRight:20
    },
    submit: {
        fontSize:18,
        color: 'white',
        fontWeight: '600'
    },
    imageBox: {
        backgroundColor: '#dae0ee',
        borderRadius: 100,
        height: 120,
        width:120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:20

    },
    verificationText: {
        fontWeight: '500',
        
        alignSelf: 'center',
        marginTop:'25%',
        paddingLeft:10,
        paddingRight:10
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        marginTop:'25%',
        // position: 'absolute',
        // bottom:0,
        borderRadius:5,
        padding:20,
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        // height: 50,
        marginBottom:50,
        width: Dimensions.get('window').width*0.8 +25
    },
    resendText: {
       alignSelf: 'center',
       fontSize: 16, 
       textDecorationLine: 'underline',
       color: '#1A2232'

    },
    resendBox: {
        marginTop:20,
        
    }
})

export default ApprovalStatus