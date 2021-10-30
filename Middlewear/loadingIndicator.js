import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {usePromiseTracker} from "react-promise-tracker"
import Loader from 'react-loader-spinner'
const LoadingIndicator = (props) => {
    
    const {promiseInProgress} = usePromiseTracker()
    return (
        promiseInProgress && 
        <View style={styles.loader}> 
        <Loader type="ThreeDots" color="#1A2232" height={100} width={100}/>

        </View>

        
    )
}
const styles = StyleSheet.create({
    loader: {
        width: '100%',
        height:100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default LoadingIndicator