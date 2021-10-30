import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';


const EmptyBody = (props) => {
    var type = props.type
    return (
        <View>
            {type=="pending" && 
            <Text> 
                You currently have no pending appointments

            </Text>}

        </View>
    )
}
export default EmptyBody