import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {SimpleLineIcons} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import SettingsHeader from '../../Headers/settings'
import axios from 'axios'
import {postAddress, updateStylistAddressList, getStylist, updateAddress} from '../../Database/functions'
import uuid from 'react-native-uuid'

import {NavigationActions, StackActions} from 'react-navigation'
const GOOGLE_AUTHORIZATION_KEY = "AIzaSyBqS9FjLeM8fHeL-BYL2pdj9mJ1aUiOnTo";

const ModifyAddress = (props) => {


    var stylistId = props.navigation.state.params.stylistId 
    var activeAddress = props.navigation.state.params.activeAddress

    const [keyboardHeight, setkeyboardHeight] = useState(0)
    const [inputHeight, setInputHeight] = useState(100)
    const [cityList,setCityList] = useState([])
    const [selected,setSelected] = useState(false)
    const [btnDisabeled, setDisabeled] = useState(true)
    const [label, setLabel] = useState(null)
    const [selectedNickname, setNickname] = useState(null)
    const [streetNumber,setstreetNumber] = useState(null)
    const [streetName, setstreetName] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [newNickname, setOtherNickname] = useState("")
    const [cityInput, setcityInput] = useState(null)
    const [stylist, setStylist] = useState(null)
    const [stylistFetched, setFetched] = useState(false)



   


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

    if (stylistFetched==false && stylist==null){
        console.log("IN STYLIST IS NULL")
        
        console.log("stylist id")
        console.log(stylistId)
        getStylist(stylistId, (result)=> {
            console.log("GET STYLIST RESULT 12345")
            console.log(result)
            if (result!=null){
                var stylist_ = result.data[0]
                setStylist(stylist_)

            }
        })

        console.log("BEFORE SET FETCHED")
        setFetched(true)

    }
    

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
    const selectedCity = (data) => {
        setDisabeled(false)
        
        setcityInput(data)
        setSelected(true)
    }

    
    var address = props.navigation.state.params.address 
    var streetNum_ = null 
    var streetName_ = null 
    var city_ = null 
    var state_ = null 
    var zip_ = null 
    var label_ = null
    if (address!=null){
        console.log("ADDRESS IS NOT NULLLL 123")
        console.log(address)
        //this means we passed an address from previous screen and want to update it
       
        streetName_ = address.StreetName
        city_ = address.City 
        state_ = address.State
        label_ = address.Name

        var streetNamePresent = false
        if (streetName==null && streetName_!=null){
            streetNamePresent = true
            setstreetName(streetName_)
        }
        if (city==null){
            setCity(city_)

        }
        if (state==null){
            setState(state_)
        }
        if (cityInput==null){
            if (streetNamePresent==true){
                var cityStr = streetName_ +", "+city_+", "+state_
                setcityInput(cityStr)
            } else{
                var cityStr = city_+", "+state_
                setcityInput(cityStr)

            }

        }
        if (label==null && label_!=null){
            setLabel(label_)
        }
        
        if (label_=="Home" || label_==null){
            if (selectedNickname==null){
                setNickname("Home")

            }
            

        } else {
            if (selectedNickname==null){
                setNickname("Other")
            }
        }
       
    } 
    if (address==null){
        if (selectedNickname==null){
            setNickname("Home")

        }
        
    }
    var extraOption = null

    console.log("IF HOME OR OTHER")
    console.log(selectedNickname)
    //if we did not pass an address that means we are creating a new one and all state variables are null
//     if (address!=null){

    

  
    

//     if (label!="Home" ){
//         extraOption=<TouchableOpacity>
//         <View style={styles.nicknameBox}>
//         <SimpleLineIcons name={'home'} size={25} style={styles.addressIcon}/>
//         <Text>{label}</Text>

//         </View>
//         </TouchableOpacity>

//     }
// }

   
    var starter = null
    if (label!=null && label=="Other"){
        starter = "Other"
    } else {
        starter = "Home"
    }
    
   
    const otherClick = () => {
        if (selectedNickname!="Other"){
            setNickname(selectedNickname=>"Other")
        }
    }
    const homeClick = () => {
        if (selectedNickname!="Home"){
            setNickname(selectedNickname=>"Home")
        }
    }

    const submit = () => {
       
        console.log("AT SUBMIT")
        if (selectedNickname=="Other"){
            console.log("SELECTED NICK NAME IS OTHER")
            if (label==""){
                console.log("AT NEW NICKNAME")
                Alert.alert("Need to fill in nickname field before proceeding")
            }
        }
        if (cityInput==null){
            Alert.alert("Need to provide city information")
        }
      

        if (address==null){
            //this means we are posting an address not updating an existing address
            var id = uuid.v4()
            console.log("THE ID")
            console.log(id)
            console.log("THE LABEL")
            console.log(label)
            var addressObj = {
                id: id,
                addressName: label,
                streetName: cityInput.split(", ")[0],
                city: cityInput.split(", ")[1],
                state: cityInput.split(", ")[2]

               

            } 
            
            postAddress(addressObj)
            console.log("THE STYLIST")
            console.log(stylist)
            var newAddressList = stylist.AddressList 
            newAddressList.push(id)
            updateStylistAddressList(id, newAddressList, (result)=> {
                console.log(result)
                console.log("ABOUT TO LEAVE MODIFY ADDRESS FIX")
                console.log(props.navigation.state.params.visited)
                props.navigation.navigate("Address List", {
                    stylistId: stylistId,
                    activeAddress: activeAddress,
                    visited: props.navigation.state.params.visited
                })
            })    
        } else {
            console.log("IN MODIFYING EXISTING ADDRESS")
            console.log("LABEL HERE")
            console.log(label)
            console.log("THE CITY INPUT")
            console.log(cityInput)
            //modify existing address 
            var addressPayload = {
                id: address.id,
                addressName: label,
                streetName: cityInput.split(", ")[0],
                city: cityInput.split(", ")[1],
                state: cityInput.split(", ")[2]

            }
            updateAddress(addressPayload.id, addressPayload.addressName, addressPayload.streetName, addressPayload.city, addressPayload.state, (result)=> {
                props.navigation.navigate("Address List", {
                    stylistId: stylistId,
                    activeAddress: activeAddress,
                    visited: props.navigation.state.params.visited
                })
            })

        }
    }
   
    if (selectedNickname=="Other"){
        extraOption = 
        <View>
            <Text style={styles.text}>Add Nickname</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput style={styles.input} onChangeText={setLabel} value={label}/>
            </TouchableWithoutFeedback>
        </View>

    } 
    const pageBack = () => {
        props.navigation.goBack()
    }

    console.log("KEYBOARD HEIGHT")
    console.log(keyboardHeight)
    //address object 



    return (
       
        <View style={styles.container}>

    <SettingsHeader back={pageBack}/>
    <View style={{ height: Dimensions.get('window').height-keyboardHeight-80, display: 'flex', justifyContent: 'flex-end'}}>
            <ScrollView scrollEnabled={true} style={{flex:1,height: Dimensions.get('window').height-keyboardHeight-80}}>
           
            <View style={styles.body}>
            <View>
                <Text style={styles.title}>Choose a Nickname</Text>
                
                <View style={styles.nicknameRow}>
                    <TouchableOpacity onPress={()=>homeClick()}>
                        <View style={{width:100,height:100,borderColor: '#1A2232',borderWidth:0.5,margin:10, backgroundColor: selectedNickname=="Home"?'#1A2232':"white"}}>
                        <SimpleLineIcons name={'home'} size={25} style={{alignSelf: 'center',marginTop:25, color:selectedNickname=="Home"?'white':"#1A2232"}} />
                        <Text style={{alignSelf: 'center',color: selectedNickname=="Home"?'white':"#1A2232"}}>Home</Text>

                        </View>
                        </TouchableOpacity>
                      
                        <TouchableOpacity onPress={()=>otherClick()}>
                        <View style={{width:100,height:100,borderColor: '#1A2232',borderWidth:0.5,margin:10, backgroundColor: selectedNickname=="Other"?'#1A2232':"white"}}>
                            <Ionicons name={"add"} size={25} style={{alignSelf: 'center',marginTop:25, color:selectedNickname=="Other"?'white':"#1A2232"}}/>
                            <Text style={{alignSelf: 'center',color: selectedNickname=="Other"?'white':"#1A2232"}}>Other</Text>
                        </View>
                        </TouchableOpacity>
                    

                </View>
                {extraOption}
            </View>
            <View>
                <Text style={styles.title}>Address Details</Text>
                {/* <Text style={styles.text}>Street Number</Text>
                
                <TextInput style={styles.input} value={streetNumber} onChangeText={setstreetNumber}/>
               
                <Text style={styles.text}>Street Name</Text>
               
                <TextInput style={styles.input} value={streetName} onChangeText={setstreetName}/> */}
             
                
                
                <TextInput style={styles.input} value={cityInput} onChangeText={autoComplete}/>
                <View style={{display:selected?"none":"flex"}}>
                {cityList.map((data)=>
               <View style={styles.searchResultView}><TouchableOpacity onPress={ () => selectedCity(data)}><Text style={styles.searchResultText}>{data}</Text></TouchableOpacity></View>)}
                
                {/* <Text style={styles.text}>State</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput style={styles.input} value={state} onChangeText={setState}/>
                </TouchableWithoutFeedback> 
                <Text style={styles.text}>Zip</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput style={styles.zipInput} value={zip} onChangeText={setZip}/>
                </TouchableWithoutFeedback> */}
               
            </View>
            
            </View>
            </View>
            
           
           
            </ScrollView>
            
            </View>
            
            <TouchableOpacity style={styles.submitBtn} onPress={()=>submit()}>
                <Text style={styles.submitText}>SAVE</Text>
            </TouchableOpacity>
          
            
        </View>
        
        
        
    )

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
        
    },
    body: {
        marginTop:20,
        paddingLeft:10,
        paddingRight:10,
       

    },
    nicknameRow: {
        flexDirection: 'row',
        width:'100%',
        marginBottom:20,
        
    },
    nicknameBox: {
        width:100,
        height:100,
        borderColor: '#1A2232',
        borderWidth:0.5,
        margin:10


    },
    addressIcon: {
        alignSelf: 'center',
        marginTop:25,
        color:'#1A2232'
    },
    nicknameText: {
        alignSelf: 'center',
        color: '#1A2232',
        
    },
    title: {
        fontSize:18,
        fontWeight:'600',
        marginBottom:5,
        marginLeft:10
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
    text: {
        marginLeft:10
    },
    submitBtn: {
      
        backgroundColor: '#1A2232',
        width:'100%',
        height:60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom:0,
        position:'absolute'
    },
    submitText: {
        fontWeight:'600',
        color: 'white',
        alignSelf: 'center',
        fontSize:18
    },
    zipInput: {
        width:Dimensions.get("window").width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        
        marginBottom:20,
        fontSize:18,
        paddingLeft: 20,
        paddingBottom:10

    },
    searchResultView: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        padding:10,
        backgroundColor: 'white'
    },

})
export default ModifyAddress