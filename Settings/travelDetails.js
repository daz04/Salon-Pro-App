import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import SchedualeHeader from '../Headers/scheduale'
import {updateStylistRadius} from '../Database/functions'
const TravelDetails = (props) => {
    var stylist = props.navigation.state.params.stylist
    const goBack = () => {
        props.navigation.goBack()
    }

    const [travelRadius, setRadius] = useState(null)
    const [fetchRadius, setFetched] = useState(false)
    const [radiusChanged, setChanged] = useState(false)

    if (fetchRadius==false){
        if (stylist.WorkingRadius==null){
            setRadius(5)
        } else {
            setRadius(parseInt(stylist.WorkingRadius))
        }
        setFetched(true)

    }

    const addRadius = () => {
        setRadius(travelRadius => travelRadius+1)
        setChanged(true)

    }
    const subtractRadius = () => {
        if (travelRadius>1){
            setRadius(travelRadius => travelRadius -1)
            setChanged(true)
        }
    }

    const submit = () => {
        //update radius 
        console.log("THE STYLIST ID")
        console.log(stylist.id)
        console.log("THE TRAVEL RADIUS")
        console.log(travelRadius)
        updateStylistRadius(stylist.id,travelRadius, (result)=> {
            if (result==null){
                Alert.alert("Network error" ,"Failed to update your working radius", [
                    {
                        text: "Try Again"
                    }, {
                        text: "Go Back",
                        onPress: () => props.navigation.goBack()

                    }
                ])
            } else {
                props.navigation.goBack()
            }
        })

    }



    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <Text  style={{fontWeight:'600', color: '#1A2232', marginLeft:20, fontSize:22, marginTop:20}}>Travel Details</Text>
            <View style={{ paddingTop:30,
            marginLeft:20,
            marginRight:20,
            display: 'flex',
            justifyContent: 'flex-end',
            }}>
           
            <Text>Your Travel Radius is {travelRadius} </Text>
            <Text style={{fontSize:11}}>*You recieve appointments from clients within a 5 mile radius from you by default</Text>
            </View>
            <View style={{flexDirection:'row', alignSelf: 'center', marginTop:Dimensions.get('window').height*0.1}}>
                <TouchableOpacity onPress={()=> addRadius()}>
                <View style={styles.circle}>
                    <Text style={{alignSelf:'center', justifyContent: 'center', marginTop:Dimensions.get('window').width*0.02}}>+</Text>
                </View>
                </TouchableOpacity>
                <TextInput
                value={travelRadius}
                style={styles.input}>
                    <Text style={{padding:10, fontSize:18}}>
                    {travelRadius}
                    </Text>

                </TextInput>
                <TouchableOpacity onPress={()=> subtractRadius()}>
                <View style={styles.circle}>
                    <Text style={{alignSelf:'center', justifyContent: 'center', marginTop:Dimensions.get('window').width*0.02}}>-</Text>
                </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{
                 flexDirection: "row",
                 alignItems: "center",
                 textAlign: "center",
              
                 justifyContent: 'center',
              
                 height:Dimensions.get('window').height*0.08,
                 
                 alignSelf: 'center',
                 backgroundColor: "#1A2232",
                 display: radiusChanged==true?"flex":"none",
                 
                position: 'absolute',
                bottom:0,
                 width: Dimensions.get('window').width,
            }}  onPress={()=>submit()}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },
    circle: {
        borderRadius:100,
        height:Dimensions.get('window').width*0.1,
        width:Dimensions.get('window').width*0.1,
        borderWidth:1, 
        borderColor: "#1A2232",
        marginLeft:20,
        marginRight:20
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },

})
export default TravelDetails