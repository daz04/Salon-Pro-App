import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import moment from 'moment'
import { validate } from 'uuid';
import {ProgressBar, Colors} from 'react-native-paper'
import SchedualeHeader from '../../Headers/scheduale'
import {getSpecialtyList, postTitlesForStylist} from '../../Database/functions'
import {Ionicons} from 'react-native-vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {approval} from '../../Approval/functions'
const Step2 = (props) => {
    
    
    const [selectedSpecialties, setSpecialties] = useState([])
    const [specialtyOptions, setOptions] = useState([])
    const [specialtyBody, setSpecialtyBody] = useState([])
    const [fetched, setFetched] = useState(false)
    const [submitSpecialties, setSpecialtiesSubmit] = useState(false)
    const [specialtyServices, setServices] = useState([])
    const [savedServices, setsavedServices] = useState({})
    const [other, setOther] = useState("")
    const [finished, setFinished] = useState(false)
    const [postedStyles, setpostedStyles] = useState(false)
    const [stylistId, setId] = useState(null)
    const [disable, setDisable] = useState(true)



    const licenseOptional = () => {
        console.log("IN COMPUTING IF LICENSE IS OPTIONAL")
        var len = selectedSpecialties.length
        console.log(selectedSpecialties)
        var count = 0
        if (selectedSpecialties.includes("Braids")){
            count +=1
            if (count <len){
                for (var key in savedServices){
                    if (key=="Makeup"){
                        count +=1
                        return true
                    }
                }

            } else if (count==len){
                return true
            }
            
        }
        console.log(count)
        
        return false
    }

    const postOtherService = () => {
        console.log("AT POST OTHER SERVICE")
        var params = {
            "name": other,
            "specialtyName":specialtyBody[0]
        }
        axios.put(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/subcategory/insert`, params,{
            headers: {
                'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    
            }}).then((response)=> {
                console.log("successful")
                setOther("")
            }).catch((error)=> {
                console.log(error)
                // throw (error)
                setOther("")
            })

    }
    

    const addSpecialty = (option) => {
        console.log("IN ADD")
        console.log(option)
        //adding a subcategory to our selected specialties list to be stored for later 
        console.log(selectedSpecialties)
        if (!(selectedSpecialties.includes(option))){
            setDisable(false)
            
            console.log("SELECTED SPECIALTIES DOES NOT INCLUDE")
            console.log(option)
            setSpecialties(selectedSpecialties=> ([...selectedSpecialties, option]))

        } else {
            //we are about to remove
            if (selectedSpecialties.length==1){
                setDisable(true)
            }
           
            setSpecialties(selectedSpecialties.filter(specialty => specialty!=option))
        }
       
        
    }
    const getId = async () => {
        var id = await AsyncStorage.getItem("stylistId")
        setId(id)

    }
    if (specialtyOptions.length==0 && fetched==false){
        getSpecialtyList((result=> {
            if (result!=null){
                for (var elem in result.data){
                    if (!(specialtyOptions.includes(result.data[elem].name))){
                        console.log("IN FOR LOOP FOR SPECIALTIES")
                        console.log(result.data[elem])
                        setOptions(specialtyOptions => ([...specialtyOptions,result.data[elem].name]))

                    }
                    
                }
                setFetched(true)
            }
        }))

    } else {
        if (stylistId==null){
            getId()
    
        }

    }
   

    
    //get specialties list dynamically, store them in dynamodb table 
    const submit = () => {
        if (postedStyles==false){
            postTitlesForStylist(selectedSpecialties)
            setpostedStyles(true)
            

        }
        if (submitSpecialties==false && selectedSpecialties.length>0){
            //specialty titles are about to be submitted and more than one specialty title was selected
            setSpecialtiesSubmit(true)
            var selected = selectedSpecialties
            
            //now set specialty body as selected specialties
            if (specialtyBody.length==0){
                setSpecialtyBody(specialtyBody=>selected)

            }
            
            
                        
            //set selected specialties as none for the next round 
            

            
           
        } else if (submitSpecialties==false && selectedSpecialties.length==0){
            alert("Select at least one specialty that describes you")
        } else if (submitSpecialties==true){
            //make sure if this creates an empty services array

            //remove first element out of specialty body
            console.log("The SPECIALTY SERVICES AT POINT A")

            console.log(selectedSpecialties)
            setServices(specialtyServices=> [])
            var firstElem = specialtyBody[0]
            if (specialtyBody.length>1){
                setSpecialtyBody(specialtyBody => specialtyBody.filter(elem => elem!=firstElem))

            }else {
                const {navigate} = props.navigation
                var stylistPayload = props.navigation.state.params.stylistPayload
                
               
                var formattedNum = props.navigation.state.params.formattedNum
                stylistPayload['specialties'] = selectedSpecialties
                stylistPayload['subcategories'] = savedServices
                console.log("THE SELECTED SPECIALITIESSSSSSS 1111111111")
                console.log(selectedSpecialties)
                console.log("THE CATEGORIESSSSSS 11111111111")
                console.log(savedServices)

                stylistPayload['id'] = stylistId
                var optional = licenseOptional()

                
                navigate("Step 3_1", {
                    stylistPayload: stylistPayload,
                    formattedNum: formattedNum,
                    optional: optional
                })
            }
            
            console.log("SPECIALTY BODY AFTER FIRST SERVICE SELECTION")
            console.log(specialtyBody)
            savedServices[firstElem] = selectedSpecialties
            
           
            if (other!=""){
                postOtherService()
                //send post request and in this post request make other none

            } else {
                setOther("")
            }

            //if submit specialties is true it means we got our services and are submitting our services choice
            //remove top choice out of specialty body


        }

    }
    const goBack = () => {
        props.navigation.goBack()
    }
    var bodyContainer = null
const generateSpecialtyServices = (specialty) => {
   
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/subcategory/getBySpecialty?specialty=${specialty}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }})
    .then(response=>{
        console.log("AXIOS GET SPECIALTY")
        if (response.data.length>0){
            var data = response.data 
            for (var elem in data){
                //store list of subcategories for current specialty title in specialtyServices
                setServices(specialtyServices=>([...specialtyServices, data[elem].name]))
            }
            // setServices(specialtyServices=>([...specialtyServices, "Other..."]))
            if (selectedSpecialties.length>0){
                setSpecialties(specialtyServices=>[])
            }
        }

    })
    .catch(error=> {
        console.log(error)
        throw (error)
    })
    




}
if (submitSpecialties==true){
    
    
    //we are dealing with subcategories now 
    console.log("THE SPECIALTY BODYYYYYYYYYY ")
    console.log(specialtyBody)
    if (specialtyBody.length>0 && specialtyServices.length==0){
        //pop off first specialty we want to find the subcategories to
        var specialty = specialtyBody[0]
        if (disable==false){
            setDisable(true)
            generateSpecialtyServices(specialty)
    
        }
        
        //get a list of subcategories for this specialty title 

        
        
        
        
    } else if (specialtyBody.length>0 && specialtyServices.length>0){
        
        //we have a list of subcategories for our specialty title 
        var specialty = specialtyBody[0]
        bodyContainer=<View style={styles.bodyContainer}>
        <Text style={styles.title}>{specialty} Services</Text>
        <Text style={styles.subTitle}>Choose one or more</Text>
        
        {specialtyServices.map(option=> {
            return (
                <View style={styles.checkoutContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={()=> addSpecialty(option)}>
                <View style={{backgroundColor: selectedSpecialties.includes(option)?'#1A2232':'transparent',  display:selectedSpecialties.includes(option)?"flex":"none" ,width: 30,height:30,borderRadius: 20,}}> 
                <Ionicons name='checkmark-outline' size={25} style={{color: selectedSpecialties.includes(option)?"white":"black"}}></Ionicons>
               
                </View>
                
    
            </TouchableOpacity>
            <View>
            <Text style={styles.optionText}>{option}</Text>
            <View style={{display: option=='Other...'?"flex":"none"}}>
                {/* {otherElem} */}
            </View>
            </View>
            </View>
    
            )
        })}
        
    </View>
    } else {
        const {navigate} = props.navigation
        var stylistPayload = props.navigation.state.params.stylistPayload
        var formattedNum = props.navigation.state.params.formattedNum
        stylistPayload['specialties'] = selectedSpecialties
        stylistPayload['subcategories'] = savedServices
        console.log("THE SPECIALTIESSSSSSSSSSS")
        console.log(selectedSpecialties)
        console.log("THE SUBCATEGORIESSSSSSSSS")
        console.log(savedServices)

        
        navigate("Step 3_1", {
            stylistPayload: stylistPayload,
            formattedNum: formattedNum
        })

    }
} else {
    bodyContainer = <View style={styles.bodyContainer}>
    <Text style={styles.title}>What describes you best?</Text>
    <Text style={styles.subTitle}>Choose one or more</Text>
    
    {specialtyOptions.map(option=> {
        return (
            <View style={styles.checkoutContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={()=> addSpecialty(option)}>
            <View style={{backgroundColor: selectedSpecialties.includes(option)?'#1A2232':'transparent',  display:selectedSpecialties.includes(option)?"flex":"none" ,width: 30,height:30,borderRadius: 20,}}> 
            <Ionicons name='checkmark-outline' size={25} style={{color: selectedSpecialties.includes(option)?"white":"black"}}></Ionicons>
           
            </View>
            

        </TouchableOpacity>
        <Text style={styles.optionText}>{option}</Text>
        </View>

        )
    })}
    
</View>
}
    return (
        <View style={styles.container}>
             <SchedualeHeader backwards={goBack}/>
             <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 2 
                </Text>

                <ProgressBar progress={0.66} color={"#1A2232"} style={styles.progressBar}/>
            </View>
            {bodyContainer}
           
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
              height:Dimensions.get('window').height*0.08,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                width: Dimensions.get('window').width ,
                marginTop:'25%',
                bottom:0,
                position: 'absolute',
                
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
    checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,
    
    },
    checkoutContainer: {
        flexDirection: 'row',
        paddingLeft:20,
        marginTop:20
        
    },
    optionText: {
        
        fontWeight: '400',
        fontSize:14,
        paddingTop:'1%'
    },
    bodyContainer: {
        marginTop: '15%'
    },
    title: {
        fontSize:22,
        fontWeight:'500',
        marginLeft:20,
        marginBottom:5
        
    },
    subTitle:{
        fontSize:16,
        marginBottom:20,
        marginLeft:20,
        marginBottom:20
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
       
       
        height:60,
      
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        
        width: Dimensions.get('window').width ,
        marginTop:'25%',
        bottom:0,
        position: 'absolute',
        marginBottom:20
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:'25%',
       
       
       
       
       
    },
    inputBox: {
        width: '100%',
        height: 100,
      

    },
    inputText: {
        color: "#1A2232",
        fontFamily: "Lato-Semibold",
        fontSize:14,
        marginBottom:10,
        
        fontWeight: '600'
    },
    input: {
        width:200,
       
        height:20,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        fontSize:12,
        marginTop:2.5
        
    },

})
export default Step2