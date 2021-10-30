import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import SchedualeHeader from '../../Headers/scheduale'
import {ProgressBar, Colors} from 'react-native-paper'
import {postLicenseForStylist} from '../../Database/functions'

const Step3_1 = (props) => {
    var stylistPayload = props.navigation.state.params.stylistPayload
    var formattedNum = props.navigation.state.params.formattedNum
    var optional = props.navigation.state.params.optional
    console.log("IN STEP 3_1")
    console.log(optional)
    const [license, setLicense] = useState("")
    const [disable, setDisable] = useState(!optional)
    console.log("IN STEP 3")
    console.log(props)
    const goBack = () => {
        props.navigation.goBack()
    }

    const editLicense = (input) => {
        if (input.length>0 && disable==true){
            setDisable(false)
            
        }else if (input.length==0 && disable==false){
            setDisable(true)
        }
        setLicense(input)
    }
    const submit = () => {
        if (license!=""){
            postLicenseForStylist(license)
            stylistPayload["license"] = license

        } else {
            stylistPayload["license"] = null 
        }
        const {navigate} = props.navigation
        navigate("Step 3_2", {
            stylistPayload: stylistPayload,
            formattedNum: formattedNum,
            isNew: true
        })


    }
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 3 
                </Text>



                <ProgressBar progress={1} color={"#1A2232"} style={styles.progressBar}/>
            </View>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Enter in License Information</Text>
                {optional && <Text style={styles.subTitle}>(Optional)</Text>}
                
            </View>
            <View style={styles.inputBox}>
                <TextInput style={styles.input} value={license} onChangeText={editLicense}></TextInput>
            </View>
            <TouchableOpacity style={{
                 flexDirection: "row",
                 alignItems: "center",
                 textAlign: "center",
                 justifyContent: 'center',
                 height:Dimensions.get('window').height*0.08,
                 position:'absolute',
                 bottom:0,
                 
                 alignSelf: 'center',
                 backgroundColor: disable?"grey":"#1A2232",
                 width: Dimensions.get('window').width ,
            }} disabled={disable} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Next</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column"

    },
    stepHeader: {
        marginTop:20,
        alignSelf: 'center',
        width: 200
        
        

    },
    stepText: {
        fontSize:18,
        fontWeight:'600',
        alignSelf: 'center',
        marginBottom:10
    },
    progressBar: {
        width: '100%'
    },
    title: {
        
        fontSize:22,
        fontWeight:'500',
       
        marginBottom:20
    },
    subTitle: {
        paddingTop: 5,
        
        fontWeight:'400'
    },
    titleBox: {
        marginTop:'15%',
        flexDirection: 'row',
        paddingLeft:20,
        paddingRight:20,
        justifyContent: 'space-between',
        
    },
    inputBox: {
        width: '100%',
        height: 100,
      

    },
    inputText: {
        color: "#1A2232",
        fontFamily: "Lato-Semibold",
        fontSize:22,
        marginBottom:10,
        fontWeight: '600'
    },
    input: {
        width:Dimensions.get('window').width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        fontSize:12,
        marginTop:2.5,
        fontSize:18
        
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
       
        borderRadius:5,
        height:50,
      
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        
        width: Dimensions.get('window').width -40,
       
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:'5%'
       
       
       
    },
    
})
export default Step3_1