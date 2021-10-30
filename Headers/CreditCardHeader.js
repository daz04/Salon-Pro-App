import React, {useState} from 'react'
import {Ionicons} from 'react-native-vector-icons'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Svg, {SvgXml} from 'react-native-svg'

const CreditCardHeader = (props)=> {
    
 
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logotext.png")}></Image>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:40,
        height:50,
        width:'100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        paddingLeft:10,
        paddingRight:10

    },
    logo: {
        width:120,
        height:35,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center'
    }
})
export default CreditCardHeader