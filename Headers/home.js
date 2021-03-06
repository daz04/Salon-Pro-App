import React, {useState} from 'react'
import {Ionicons} from 'react-native-vector-icons'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Svg, {SvgXml} from 'react-native-svg'

const HomeHeader = (props)=> {
    const calendar = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">

       <path d="M274.9,234.13c-0.36,2,0.28,4.69-2.65,4.7c-2.93,0.01-2.3-2.69-2.71-4.89c-1.76,0-3.55,0-5.34,0c-1.82,0-3.65,0-5.62,0
           c-0.38,2.06,0.29,5.02-2.9,4.87c-2.74-0.13-2.17-2.66-2.34-4.87c-1.82,0-3.62,0-5.42,0c-1.82,0-3.65,0-5.56,0
           c-0.64,1.93,0.39,5.08-2.93,4.87c-2.76-0.17-2.23-2.8-2.42-4.63c-5.79-0.75-8.01,1.13-8.01,6.63c-0.01,11.83-0.01,23.66,0,35.49
           c0,4.9,1.73,6.63,6.61,6.64c5.42,0.01,10.83,0.01,16.25,0c1.78,0,3.57,0.15,3.62,2.42c0.05,2.45-1.83,2.59-3.7,2.59
           c-5.67-0.01-11.33,0.02-17-0.01c-6.64-0.04-10.76-4.14-10.78-10.78c-0.04-12.25-0.02-24.5-0.01-36.74
           c0.01-7.52,3.79-11.33,11.35-11.47c0.49-0.01,0.98-0.05,1.55-0.07c0.42-1.96-0.29-4.8,2.73-4.8c2.95,0,2.27,2.69,2.58,4.71
           c3.64,0,7.26,0,11.05,0c0.4-1.89-0.43-4.93,2.86-4.69c2.65,0.19,2.17,2.7,2.39,4.7c3.63,0,7.25,0,10.99,0
           c0.59-1.73-0.36-4.71,2.71-4.72c3.07-0.01,2.28,2.87,2.74,4.92c1.24,0,2.4-0.06,3.55,0.01c5.11,0.33,9.18,4.2,9.41,9.29
           c0.21,4.82,0.08,9.66,0.07,14.49c0,1.63-0.73,2.79-2.5,2.78c-1.78-0.01-2.46-1.19-2.47-2.81c-0.02-3.83-0.01-7.67-0.01-11.5
           C282.98,235.28,281,233.49,274.9,234.13z"/>
       <path d="M257.8,272.82c-0.01-8.31,6.74-15.06,15.06-15.06c8.29,0,15.11,6.79,15.11,15.06c0,8.22-6.88,15.11-15.1,15.11
           C264.6,287.92,257.81,281.11,257.8,272.82z M272.79,262.75c-5.54,0.04-9.97,4.48-9.99,10.03c-0.02,5.62,4.56,10.19,10.15,10.15
           c5.46-0.04,10-4.6,10.02-10.06C283,267.27,278.4,262.71,272.79,262.75z"/>
       <path class="st0" d="M272.79,262.75c5.62-0.04,10.21,4.52,10.19,10.11c-0.03,5.46-4.56,10.01-10.02,10.06
           c-5.59,0.05-10.17-4.53-10.15-10.15C262.82,267.23,267.24,262.79,272.79,262.75z M275.53,270.16c-0.09-1.04-0.07-1.96-0.27-2.84
           c-0.39-1.7-2.05-2.63-3.41-1.79c-2.58,1.59-1.27,4.24-1.33,6.41c-0.03,1.04,0.87,2.75,1.73,3.05c1.47,0.51,3.29,0.37,4.88,0.05
           c0.71-0.14,1.71-1.37,1.69-2.07c-0.03-0.85-0.93-1.74-1.63-2.44C276.85,270.21,276.11,270.28,275.53,270.16z"/>
       <path d="M275.53,270.16c0.58,0.12,1.32,0.04,1.64,0.37c0.7,0.7,1.6,1.6,1.63,2.44c0.03,0.7-0.97,1.93-1.69,2.07
           c-1.59,0.31-3.4,0.46-4.88-0.05c-0.86-0.3-1.76-2-1.73-3.05c0.07-2.17-1.25-4.82,1.33-6.41c1.37-0.84,3.02,0.09,3.41,1.79
           C275.46,268.2,275.44,269.13,275.53,270.16z"/>

</svg>`
   const callback = () => {
       console.log("CALL BACK SCHEDUALE")
       console.log(props)
       props.callback("SCHEDUALE")
   }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logotext.png")}></Image>
            <TouchableOpacity onPress={()=>callback()}>
            <Image source={require('../assets/Icons/Menu/appointments.png')} style={{
                width:35,
                height:35,
                marginRight:'2%'
            }}
            />
            
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:0.04*Dimensions.get('window').height,
        height:0.1*Dimensions.get('window').height,
        width:'100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        paddingLeft:10,
        paddingRight:10
    },
    logo: {
        width:200,
        height:46,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginTop:'10%'
        
    }
})
export default HomeHeader