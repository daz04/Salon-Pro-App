import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import {AntDesign} from 'react-native-vector-icons'


const ImageItem = (props) => {
    var imageSource = props.imageSource
    return (
        <View style={styles.container}>
            <Image source={{uri:imageSource}}/>
            <View style={styles.row}>
            <AntDesign name={"closecircle"} size={25} style={styles.deleteIcon}/>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width:'auto',
        height: 'auto',

    },
    row: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'flex-end'
    }
    
})