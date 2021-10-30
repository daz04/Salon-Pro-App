import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {SimpleLineIcons} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import SettingsHeader from '../../Headers/settings'
import {fetchCustomerPaymentMethods} from '../../Stripe/functions'

const PaymentMethods = (props) => {
    //for payment methods we need the stylist id
    //need a stripe Id
    //add Payment method button
    var stylistId = props.navigation.state.params.stylistId 
    const [paymentMethods, setPayments] = useState([])
    const [paymentsFetched, setFetched] = useState(false)

    const backPage = () => {
        props.navigation.goBack()
    }
    const addPayment = () => {
        navigate("Subscription Payment")
        

    }

    const getPaymentMethods = () => {
        fetchCustomerPaymentMethods(stylistId, (result)=> {
            if (result!=null){
                setPayments(result)
            }
            setFetched(true)
        })



    }

    if (paymentsFetched==false){
        getPaymentMethods()
    }

    return (
        <View style={styles.container}>
            <SettingsHeader back={backPage}/>
            <View style={styles.body}>
            <Text style={styles.title}>Your Saved Payment Methods</Text>
                <View style={styles.addAddressRow}>
                    <Text style={{alignSelf: 'center',fontSize:11}}>Add New Payment Method </Text>
                    <TouchableOpacity onPress={()=>addPayment()}>
                <Ionicons name={"add"} size={30} />
                </TouchableOpacity>

                </View>
                </View>


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
    },
    body: {
       
        marginTop:20
    },
    title: {
        marginLeft:10,
        fontWeight: '600',
        fontSize:18,
        marginBottom:10,
        
    },
    addAddressRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
})
export default PaymentMethods