import React, {useState} from 'react'
import {Ionicons} from 'react-native-vector-icons'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Svg, {SvgXml} from 'react-native-svg'
import {AntDesign} from 'react-native-vector-icons'
import { BackHandler } from 'react-native';

const SettingsHeader = (props)=> {
    
   const callback = () => {
       console.log("CALL BACK SCHEDUALE")
       console.log(props)
       props.callback("SCHEDUALE")
   }
   const back = () => {
       props.back()
   }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>back()} style={{alignSelf: 'center'}}>
            <AntDesign name={"left"} size={25} />
            </TouchableOpacity>
            
            <Image style={styles.logo} source={require("../assets/logotext.png")}></Image>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop:0.04*Dimensions.get('window').height,
        height:0.06*Dimensions.get('window').height,
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
export default SettingsHeader