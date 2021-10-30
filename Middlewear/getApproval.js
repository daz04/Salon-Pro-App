import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {trackPromise} from 'react-promise-tracker'
import LoadingIndicator from './loadingIndicator'
import axios from "axios"



const GetApproval = (props) => {
    var stylistPayload = props.navigation.state.params.stylistPayload
    var firstName = stylistPayload.firstName 
    var lastName = stylistPayload.lastName
    var birthdate = stylistPayload.birthdate
    var city = stylistPayload.city
    var state = stylistPayload.state 
    const [loading,isLoading] = useState(true)
    const [approved,isApproved] = useState(null)
    if (approved==null){
        trackPromise(
            axios.post()

        )
        
        
    }
}
return (
    <View >
        <LoadingIndicator/>

    </View>
    
)
const styles = StyleSheet.create({
    container: {

    }
})