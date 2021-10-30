import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';


const RewardsList = () => {

    const [rewardsPayments, setPayments] = useState([])
    const [rewardsFetched, setFetched] = useState(false)
    const [pendingRewards, setPending] = useState(null)

    if (rewardsFetched==false){
        
    }


    return (
        <View style={styles.container}>
        <ScrollView>
            


        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginLeft:20,
        marginRight:20,
        
        marginTop:20,
      
    },

})