import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import DatePicker from 'react-native-datepicker'
import SchedualeHeader from '../Headers/scheduale'

const AccountDetails = (props)=> {
    var stylist = props.navigation.state.params.stylist
    const [keyboardHeight, setkeyboardHeight] = useState(0)

    const goBack = () => {
        props.navigation.goBack()
    }


    useEffect(()=> {
        Keyboard.addListener("keyboardDidShow",_keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
    })

    const _keyboardDidHide = (e)=> {
        setkeyboardHeight(0)
    }
    const _keyboardDidShow = (e) => {
        setkeyboardHeight(e.endCoordinates.height)
    }
    
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <Text  style={{fontWeight:'600', color: '#1A2232', marginLeft:20, fontSize:22, marginTop:20}}>Account Details</Text>
            <View style={{ width: '100%',height: '100%',flexDirection: "column"}}>
           <View style={{height:Dimensions.get('window').height-80}}>

           
           
            
        <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}} >
       
        <View style={{ paddingTop:30,
        marginLeft:20,
        marginRight:20,
        display: 'flex',
        justifyContent: 'flex-end',
        flex:1,
        height: Dimensions.get('window').height*0.65-keyboardHeight}}>
            <ScrollView style={{ 
        flex:1,
        height: Dimensions.get('window').height*0.65-keyboardHeight}}>
            <View style={{marginBottom:20}}>
            <Text style={styles.inputText}>Personal Information</Text>
            <Text style={{fontSize:11}}>*Your first name, last name and birthdate are used to verify your identity. If you wish to change any of these values, contact our Glamo team directly</Text>
            </View>
           
            {/* <ScrollView style={{height:Dimensions.get('window').height*0.65,display:'flex',justifyContent:'flex-end'}} scrollEnabled={true}> */}
            <View style={styles.signupOptions}>
            <View style={styles.inputBox}>
            <Text style={styles.inputText}>First Name</Text>
            <Text style={styles.value}>{stylist.FirstName}</Text>
            {/* <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setfirstName}
                
               
                placeholder={"Enter in first name"}
                returnKeyType={'done'}
               
            ></TextInput> */}

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Last Name</Text>
            <Text style={styles.value}>{stylist.LastName}</Text>
                {/* <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setlastName}
                placeholder={"Enter in last name"}
                returnKeyType={'done'}
               
                ></TextInput> */}

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Birthday</Text>
            <Text style={styles.value}>{stylist.Birthdate}</Text>
           

           </View>
           <View style={styles.inputBox}>
            <Text style={styles.inputText}>Email</Text>
            <Text style={styles.value}>{stylist.Email}</Text>
                {/* <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
               
                placeholder={"Enter in email"}
                returnKeyType={'done'}
                
                ></TextInput> */}

           </View>
           <View style={styles.inputBox}>
           <Text style={styles.inputText}>Phone</Text>
            <Text style={styles.value}>{stylist.Phone}</Text>
                {/* <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
               
                placeholder={"Enter in email"}
                returnKeyType={'done'}
                
                ></TextInput> */}

           </View>
           

            </View>
            </ScrollView>
        
            </View>
            </KeyboardAvoidingView>
           
            
           
           
           
           
            {/* <View style={styles.footer}>
                <Text style={styles.haveaccountText}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>login()}>
                <Text style={styles.loginText}>Login instead</Text>
                </TouchableOpacity>


            </View> */}
            </View>
           
           
        </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },
    inputText: {
        color: "#1A2232",
        // fontFamily: "Lato-Semibold",
        fontSize:16,
        marginBottom:5,
        
        fontWeight: '600'
    },
    value: {
        marginBottom:Dimensions.get("window").height*0.05
    }


})
export default AccountDetails