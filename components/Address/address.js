import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';

const AddressOverview = (props) => {
    
    var addressList = props.navigation.state.params.addressList

    return (
        <View style={styles.container}>
            {addressList.map((address)=> {
                return (
                    <View style={styles.addressRow}>
                        <View>

                        <Text>{address.StreetNumber}, {address.StreetName}</Text>
                        <Text>{address.City}, {address.State} {address.Zip}</Text>
                        </View>
                        
                        </View>
                    
                )


            })}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop:'20%'
    },
    addressRow: {
        flexDirection: 'row',
        width:'100%',
        height:100
    }

})
export default AddressOverview