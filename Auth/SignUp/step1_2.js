import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Picker} from 'react-native';
import { useFonts } from 'expo-font';
import SchedualeHeader from '../../Headers/scheduale'
import {ProgressBar, Colors} from 'react-native-paper'
import {addresstoCoords, updateStylistCoordinates, postAddress, updateStylistAddInitialAddress} from '../../Database/functions'
import {CognitoUserPool,CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import axios from 'axios';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import AsyncStorage from '@react-native-async-storage/async-storage'
const GOOGLE_AUTHORIZATION_KEY = "AIzaSyBqS9FjLeM8fHeL-BYL2pdj9mJ1aUiOnTo";

const poolData = {
    UserPoolId: "us-east-1_gY0Wfju9i",
    ClientId: "4ts3ni32s1lvjapk199ekure9p" 
   
    
}
var userPool = new CognitoUserPool(poolData);
const Step1_2 = (props) => {
    var stylistPayload = props.navigation.state.params.stylistPayload
    var formattedNum = props.navigation.state.params.formattedNum
    var phoneNum = stylistPayload.phone

    const [cityList,setCityList] = useState([])
    const [cityInput, setcityInput] = useState(null)
    const [selected,setSelected] = useState(false)
    const [btnDisabeled, setDisabeled] = useState(true)
    
 
 
    const autoComplete = (input) => {
        setcityInput(input)
        setSelected(false)
        console.log("IN AUTO COMPLETE")
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:us&types=address&key=${GOOGLE_AUTHORIZATION_KEY}`).then(response=> {
           
            if (response!=null && response.status==200){
                
                var descriptions = []
               
                for (var elem in response.data.predictions){
                    console.log(response.data.predictions[elem])
                    descriptions.push(response.data.predictions[elem].description)

                }
                console.log("DESCRIPTIONS")
                console.log(descriptions)
                setCityList(cityList=>descriptions)
            }
        })
    }

    const goBack = () => {
        props.navigation.goBack()
    }
  
    const submit = () => {
        if (cityInput==null){
            alert("Fill in your city")
            return
        }
        addresstoCoords(cityInput, (result)=> {
            console.log("THE ADDRESS TO COORDS RESPONSE")
            console.log(result)
            if (result!=null){
                var coordinates = {
                    'Latitude': result.data["lat"],
                    'Longitude': result.data['lng']
                }
                updateStylistCoordinates(stylistPayload.id, coordinates, (result)=> {
                    if (result!=null){
                        console.log("AT UPDATE THE STYLIST COORDINATES RESULT")
                        console.log(result)
                        var addressPayload = {
                            streetName: cityInput.split(", ")[0],
                            city: cityInput.split(", ")[1],
                            state: cityInput.split(", ")[2],
                            addressName: "Home"
                            
                        }
                        postAddress(addressPayload, (res)=> {
                            if (res!=null){
                                //we stored this address object now it's time to attribute address object to stylist
                                //store the address id in stylist active address and address list columns
                                console.log("POST ADDRESS RETURNS 1")
                                console.log(res.data)
                                var addressId = res.data.id 
                                updateStylistAddInitialAddress(stylistPayload.id, addressId, [addressId], (result)=> {
                                    if (result!=null){
                                        console.log("UPDATE STYLIST INITIAL ADDRESS RESPONSE")
                                        console.log(result)
                                        const {navigate} = props.navigation 
                                        navigate("Account Verification", {
                                            stylistPayload: stylistPayload,
                                            formattedNum: formattedNum,
                                            phoneNum: phoneNum,
                                            user: props.navigation.state.params.user
                                        })

                                    } else {
                                        Alert.alert("Network Error", "Unable to save location information ")

                                    }
                                   
                                })

                              

                            } else {
                                Alert.alert("Network Error", "Unable to save location information ")

                            }
                        })

                    } else {
                        Alert.alert("Network Error", "Unable to save location information ")
                    }
                    
                })

            }
           
        })
        // authorization()
        // setDisabeled(false)
       
        // stylistPayload['city'] = cityInput.split(", ")[0]
        // stylistPayload['state'] = cityInput.split(", ")[1]
   
        // if (authStatus!="Reject"){ 
        //     console.log("ABOUT TO RUN THE SIGN UP")
        //     const {navigate} = props.navigation 
        //     signUp()
        //     navigate("Account Verification", {
        //         stylistPayload: stylistPayload,
        //         formattedNum: formattedNum,
        //         phoneNum: phoneNum
        //     })
        //     // we are authorized, post this information and create a new stylist
        //     // create new address, get address id 
            
        // } else {
        //     const {navigate} = props.navigation 
        //     navigate("Approval Status", {
        //         phone: formattedNum,
        //         status: "Reject"

        //     })

        // }
    
    }
    const selectedCity = (data) => {
        setDisabeled(false)
        
        setcityInput(data)
        setSelected(true)
    }
    //let state be a dropdown
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 1 
                </Text>
                <ProgressBar progress={0.33} color={"#1A2232"} style={styles.progressBar}/>
            </View>
            <View style={styles.body}>
            <Text style={styles.signup}>ENTER IN LOCATION INFO</Text>
            <View style={styles.inputBox}>
            <Text style={styles.inputText}>Home Address</Text>
      
                <TextInput
                style={styles.inputCity}
                value={cityInput}
                onChangeText={autoComplete}
                placeholder={"Enter city"}
                returnKeyType={'done'}
                ></TextInput>
                {/* <ScrollView style={styles.cityScroll} scrollEnabled={true}> */}
                <View style={{display:selected?"none":"flex"}}>
                 {cityList.map((data)=>
               <View style={styles.searchResultView}><TouchableOpacity onPress={ () => selectedCity(data)}><Text style={styles.searchResultText}>{data}</Text></TouchableOpacity></View>)}
               </View>
        
           </View>
         
           
           </View>
           <View style={styles.confirmBox}>
            
            <TouchableOpacity style={{flexDirection: "row",alignItems: "center",textAlign: "center",justifyContent: 'center',alignSelf: 'center',backgroundColor: btnDisabeled==true?"gray":"#1A2232",flex:1,
        width: Dimensions.get('window').width,height:Dimensions.get('window').height*0.08}} disabled={btnDisabeled} onPress={()=>submit()}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>
           </View>


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
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
    inputBox: {
        width: '100%',
        height: 100,
        paddingTop:30
      

    },
    inputText: {
        color: "#1A2232",
        // fontFamily: "Lato-Semibold",
        fontSize:14,
        marginBottom:10,
        
        fontWeight: '600',
        
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
    inputCity: {
        width:Dimensions.get("window").width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        
       
        fontSize:18,
        paddingLeft: 20

    },
    modalDropdown: {
        width:Dimensions.get("window").width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        
        marginBottom:20,
        fontSize:22,
        

    },
    signup: {
        fontWeight: '600',
        

    },
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:20

    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
        height:Dimensions.get('window').height*0.08,
        
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        flex:1,
        width: Dimensions.get('window').width,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        // marginTop:20,
       
        // height:Dimensions.get('window').height*0.08,
        bottom:0,
        position: 'absolute'
       
    },
    cityScroll: {
        width:'100%',
        height:200
        
        
    },
    searchResultView: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        padding:10,
        backgroundColor: 'white'
    },

})
export default Step1_2
