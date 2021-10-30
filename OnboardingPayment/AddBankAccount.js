import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import CreditCardHeader from '../Headers/CreditCardHeader'
import {createBankAccount} from '../Stripe/functions'

const AddBankAccount = ({navigation}) => {
    var accountId = navigation.state.params.accountId
    const [accountHolderName, setaccountHolderName] = useState(null)
    const [routingNumber, setroutingNumber] = useState(null)
    const [accountNumber, setaccountNumber] = useState(null)
    const [renteraccountNumber, setrenteraccountNumber] = useState(null)

    const initializeBankAccount = () => {
        if (accountNumber!=null && renteraccountNumber!=null && accountNumber!=renteraccountNumber){
            Alert.alert("Account numbers do not match")
        } else if (accountHolderName==null || accountHolderName.length==0){
            Alert.alert("Invalid entry at Account Holder Name")
        } else if (routingNumber==null || routingNumber.length==0){
            Alert.alert("Invalid entry at Routing Number")

        } else if (accountNumber==null || accountNumber.length==0){
            Alert.alert("Invalid entry at Account Number")

        } else if (renteraccountNumber==null || renteraccountNumber.length==0){
            Alert.alert("Invalid entry at Re-Enter Account Number")

        }
        
        else {
            var payload = {
                external_account: {
                    object: 'bank_account',
                    country: 'US',
                    currency: 'USD',
                    account_holder_name: accountHolderName,
                    account_holder_type: 'individual',
                    routing_number: routingNumber,
                    account_number: accountNumber
                }
            }
            createBankAccount(accountId, payload, (result)=> {
                if (result[0]==false){
                    console.log("CREATE BANK ACCOUNT ERROR")
                    console.log(result[1])
                    var errorMessage = result[1].error.message 
                    Alert.alert(errorMessage) 
                }
                console.log("BACK AT THE BANK ACCOUNT SCREEN")
                console.log(result)
            })

        }

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
                    fontSize: 18,
                    marginBottom:10,
                    marginTop:20
                }}>Where should we send your deposits?</Text>
                <View style={styles.form}>
                    <View style={styles.inputbox}>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                           
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium'
                            }}>ACCOUNT HOLDER'S NAME</Text>
                        
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={accountHolderName}
                        onChangeText={setaccountHolderName}
                        ></TextInput>
                        </View>
                        <View style={styles.inputbox}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                           
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium'
                            }}>ROUTING NUMBER</Text>
                         
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={routingNumber}
                        onChangeText={setroutingNumber}
                        ></TextInput>
                        </View>
                        <View style={styles.inputbox}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                           
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium'
                            }}>ACCOUNT NUMBER</Text>
                           
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={accountNumber}
                        onChangeText={setaccountNumber}
                        ></TextInput>
                        </View>
                        <View style={styles.inputbox}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                           
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium'
                            }}>RE-ENTER ACCOUNT NUMBER</Text>
                         
                        </View>
                        <TextInput style={{
                             height:25,
                             fontFamily: 'Poppins-Regular'
                        }}
                        value={renteraccountNumber}
                        onChangeText={setrenteraccountNumber}
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
                        //height: 70,
                        height: Dimensions.get('window').height*0.08,
                        
                        width: Dimensions.get('window').width
                    }} onPress={()=>initializeBankAccount()}>
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
    inputbox: {
        borderTopColor:'lightgrey',
        borderTopWidth:0.5,
        borderBottomColor: 'lightgrey',
        borderBottomWidth:0.5,
        paddingTop:5
    },
    form: {
        marginTop:20
    },
})
export default AddBankAccount