import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Picker} from 'react-native';
import { useFonts } from 'expo-font';
import CreditCardHeader from '../Headers/CreditCardHeader'
import axios from 'axios'
import {updateAccount} from '../Stripe/functions'
// import { Dropdown } from 'react-native-material-dropdown';
// import Picker from '@react-native-community/picker'
const MailingAddress = ({navigation}) => {
    var accountId = navigation.state.params.accountId
    console.log("THE ACCOUNT ID PASSED TO THE MAILING ADDRESS")
    console.log(accountId)
    const stateList= {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }


    
    const GOOGLE_AUTHORIZATION_KEY = "AIzaSyBqS9FjLeM8fHeL-BYL2pdj9mJ1aUiOnTo";
    const [address, setAddress] = useState(null)
    const [addressList, setaddressList] = useState([])
    const [address2, setAddress2] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [zip, setZip] = useState(null)
    const [selected,setSelected] = useState(false)
    const [selectedState, setselectedState] = useState(false)
    const [activeStateList, setactiveStateList] = useState([])

    const addAddresstoAccount = () => {
        if (address==null || address.length==0 || selected==false){
            //means that no address for line 1 was entered or:
            //if one was entered it was not selected from the dropdown options
            Alert.alert("Invalid entry for Address")
        } else if (zip==null || zip.length==0){
            Alert.alert("Invalid entry for ZIP")
        } else if (city==null || city.length==0){
            Alert.alert("Invalid entry for City")

        } else if (address.split(", ")[1]!=city){
            //means the city entered does not match with the city of address line 1
            Alert.alert("City input does not match the your address city", "Please make sure the two match to proceed")

        } else if (state==null || state.length==0){
            Alert.alert("Invalid entry for State")
        }  else {
            //zip is not empty
            //address is not empty which by default means that city and state are not empty
            var payload = {
                individual: {
                    address: {
                        city: city,
                        state: state,
                        line1: address,
                        line2: address2,
                        postal_code:zip
                    }
                }
            }
            updateAccount(accountId, payload, (result)=> {
                if (result[0]==false){
                    //means there was an error particularly with the postal code entered
                    var errorMessage = result[1].error.message 
                    Alert.alert(errorMessage) 
    
                } else {
                    const {navigate} = navigation 
                    navigate("Add Bank Account", {
                        accountId: accountId
                    })
    
                }
               
            })

        }
        
        

        
        
    }

    const onChangeState = (input) => {
        console.log("INPUT IN CHANGE STATE")
        console.log(input)
        setselectedState(false)
        setState(input)
        var tempList = []
        for (var record in stateList){
            if (stateList[record].includes(input)){
                tempList.push(stateList[record])
            }
        }
        console.log("THE TEMP LIST IN CHANGE STATE")
        console.log(tempList)
        setactiveStateList(tempList)

    }

    const autoCompleteForAddress = (input) => {
        setSelected(false)
        setAddress(input)
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:us&types=address&key=${GOOGLE_AUTHORIZATION_KEY}`).then(response=> {
            if (response!=null && response.status==200){
                
                var descriptions = []
               
                for (var elem in response.data.predictions){
                    console.log(response.data.predictions[elem])
                    descriptions.push(response.data.predictions[elem].description)

                }
                console.log("DESCRIPTIONS")
                console.log(descriptions)
                setaddressList(descriptions)
             
            }
            
        })

    }
    const selectState = (data) => {
        setState(data)
        setselectedState(true)
    }
    const selectedCity = (data) => {
        var line1 = data.split(", ")
        var state = line1[2]
        console.log("THE SPLIT SELECTED LINE 3")
        console.log(stateList[state])
        setCity(line1[1])
        setState(stateList[state])
       
        setAddress(data)
        setSelected(true)
    }
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Regular': require("../assets/fonts/Lato-Regular.ttf"),
        'Lato-Medium': require("../assets/fonts/Lato-Medium.ttf"),
        'Lato-Semibold': require("../assets/fonts/Lato-Semibold.ttf"),
        'Lato-Heavy': require("../assets/fonts/Lato-Heavy.ttf")

     });
    return (
        <View style={styles.container}>
            <CreditCardHeader/>
            {fontsLoaded && 
            <View style={styles.body}>
               <Text style={{
                    fontFamily: 'Poppins-Medium',
                    alignSelf: 'center',
                    fontSize: 20,
                    marginBottom:10,
                    marginTop:20
                }}>Add your mailing address</Text>
               <Text style={{
                   fontFamily: 'Poppins-Regular',
                   alignSelf: 'center'
               }}>We need this information to verify your identity</Text>

            <View style={styles.form}>
                <View style={styles.inputbox}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium'
                    }}>ADDRESS</Text>
                    <TextInput style={{
                        height:25,
                        fontFamily: 'Poppins-Regular'
                    }}
                    value={address}
                    onChangeText={autoCompleteForAddress}
                    placeholder={"eg: 111 Street Avenue"}
                    ></TextInput>
                    <View style={{display:selected?"none":"flex"}}>
                        {addressList.map((data)=>
                    <View style={styles.searchResultView}><TouchableOpacity onPress={ () => selectedCity(data)}><Text style={styles.searchResultText}>
                        {data}
                    </Text></TouchableOpacity></View>)}
                    </View>
                </View>

                <View style={styles.inputbox}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium'
                    }}>ADDRESS 2</Text>
                    <TextInput style={{
                        height:25,
                        fontFamily: 'Poppins-Regular'
                    }}
                    value={address2}
                    onChangeText={setAddress2}
                    placeholder={"eg: Suite 305"}
                    ></TextInput>
                </View>

                <View style={styles.inputbox}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium'
                    }}>CITY</Text>
                    <TextInput style={{
                        height:25,
                        fontFamily: 'Poppins-Regular'
                    }}
                    value={city}
                    onChangeText={setCity}
                    ></TextInput> 
                   
                </View>

                <View style={styles.inputbox}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium'
                    }}>STATE</Text>
                    <TextInput style={{
                        height:25,
                        fontFamily: 'Poppins-Regular'
                    }}
                    value={state}
                    onChangeText={onChangeState}
                    ></TextInput>
                     {/* <View style={{display:selectedState?"none":"flex"}}>
                        {activeStateList.map((data)=>
                    <View style={styles.searchResultView}><TouchableOpacity onPress={ () => selectState(data)}><Text style={styles.searchResultText}>
                        {data}
                    </Text></TouchableOpacity></View>)}
                    </View> */}
                </View>
                <View style={styles.inputbox}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium'
                    }}>ZIP</Text>
                    <TextInput style={{
                        height:25,
                        fontFamily: 'Poppins-Regular'
                    }}
                    value={zip}
                    onChangeText={setZip}
                    ></TextInput>
                </View>
                
            </View>
            


            </View>
            }
             {fontsLoaded && 
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
                        backgroundColor: "black",
                        height: Dimensions.get('window').height*0.08,
                        
                        width: Dimensions.get('window').width
                    }} onPress={()=>addAddresstoAccount()}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            color: 'white',
                        }}>Continue</Text>
                    </TouchableOpacity>
            }

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },
    body: {
        marginRight:20,
        marginLeft:20,
        height:'85%'

    },
    form: {
        marginTop:20
    },
    inputbox: {
        borderTopColor:'lightgrey',
        borderTopWidth:0.5,
        borderBottomColor: 'lightgrey',
        borderBottomWidth:0.5,
        paddingTop:5
    },
    searchResultView: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        padding:10,
        backgroundColor: 'white'
    },
})
export default MailingAddress