import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';



const ReferralList = (props) => {
    var referrals = props.referrals 
    var stylists = props.stylists
    console.log("REFERRAL LIST REFERRALS")
    console.log(referrals)



    var bodyElem = null 
    if (referrals.length==0){
        bodyElem = <View style={{paddingLeft:20}}>
            <Text>No referrals made with your referral code</Text>
            </View>
    } else {
        bodyElem = 
        <View style={styles.container}>
            <ScrollView>
                {referrals.map((referral)=> {
                    var refereeId = referral.ReferreeStylistId
                    var stylistObj = null 
                    for (var stylist in stylists){
                        if (stylists[stylist].id==refereeId){
                            stylistObj = stylists[stylist]
                            break
                        }
                    }
                    if (stylistObj!=null){

                    return (
                        <View style={styles.row}>
                            <View>
                                <Text>{referral.Date}</Text>


                            </View>

                            <View>
                                <Text>{stylistObj.FirstName}, {stylistObj.LastName}</Text>
                                
                            </View>


                        </View>
                    )
                }
                })}
            </ScrollView>
        </View>
    }

    return (
        <View style={styles.container}>
            {bodyElem}

        </View>
    )


}
const styles = StyleSheet.create({

    container: {
        height: '90%'

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft:20,
        backgroundColor: 'white',
        borderBottomColor: 'lightgrey',
        borderBottomWidth:1,
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    col: {
        flexDirection: 'column'
    }

})
export default ReferralList