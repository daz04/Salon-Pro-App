import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getStylists, getReferralsByStylistId} from '../../Database/functions'
import SettingsHeader from '../../Headers/settings'
import ReferralList from './referralsList'

const Referral = (props) => {
    const stylist = props.navigation.state.params.stylist
    const stylistId = stylist.id
    var referralId = stylist.ReferralId
    const [stylistReferrels, setReferrals] = useState([])
    const [referralFetched, setFetched] = useState(false)
    const [stylists, setStylists] = useState([])
    const [selected,setSelected] = useState("Referrals")
    
    console.log("REFERRAL STYLIST ID")
    console.log(stylistId)



    const getStylistId = async () => {
        var id = await AsyncStorage.getItem("stylistId")
        setId()
    }
    
    if (stylistId==null){
        getStylistId()
    }

    if (stylists.length==0){
        getStylists((result)=> {
            var stylistsData = result.data 
            setStylists(stylistsData)
        })
    }


    if (referralFetched==false){
        getReferralsByStylistId(stylistId, (result)=> {
            if (result!=null){
                setReferrals(result.data)
            }
            setFetched(true)
        })

    }

    const backPage = () => {
        props.navigation.goBack()
    }

    var bodyElem = null 
    if (selected=='Referrals'){
        bodyElem = <ReferralList referrals={stylistReferrels} stylists={stylists}/>
    }
    
    return (
        <View style={styles.container}>
            <SettingsHeader back={backPage}/>
            <View style={styles.referralTab}>
                <View>
                    <Text style={styles.header2}>Your Referral Id</Text>
                    <Text style={styles.header3}>{referralId}</Text>
                </View>
                {/* <View>
                    <Text style={styles.header}>Total Rewards Earned</Text>
                    <Text  style={styles.header}>{stylistReferrels.length}</Text>
                </View> */}
               

            </View>
            <View>
                <View style={styles.menu}>
                    {/* <TouchableOpacity style={{
                         borderBottomWidth: selected=="Rewards"?3:0,
                         borderBottomColor: selected=="Rewards"?'#1A2232':'transparent',
                         width: '50%',
                         alignSelf: 'center',
                         paddingBottom:5
                    }} onPress={()=> {setSelected("Rewards")}}>
                        <Text style={styles.menuText}>My Rewards</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{
                        borderBottomWidth: selected=="Referrals"?3:0,
                        borderBottomColor: selected=="Referrals"?'#1A2232':'transparent',
                        width: '100%',
                        alignSelf: 'center',
                        paddingBottom:5
                    }} onPress={()=> {setSelected("Referrals")}}>
                        <Text style={styles.menuText}>
                        My Referrals
                    </Text>
                    </TouchableOpacity>

                </View>
            </View>
            {bodyElem}

        </View>
    )
}
const styles = StyleSheet.create({
     container: {
        width:'100%',
        height: '100%'

    },
    referralTab: {
        backgroundColor: "#1A2232",
        height: Dimensions.get("window").height*0.1, 
       
        paddingLeft:20,

        paddingTop:20
    }, 
    header: {
        fontSize:25,
        color: "white",
        fontWeight:'500',
        marginTop:'10%'
    },
    header2: {
        fontSize:18,
        color: "white",
        fontWeight:'500'
    },
    header3: {
        fontSize:14,
        color: "white",
        fontWeight:'500',
        marginTop: '2%'
    }, 
    menu: {
        flexDirection: 'row',
        marginBottom:20,
        marginTop:20
    }, 
    menuItem: {
        width: '50%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#1A2232'
    },
    menuText: {
        alignSelf: 'center',
        fontWeight: '600', 
        color: 'grey',
        fontSize: 16
    }

})
export default Referral