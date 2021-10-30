import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements'
import {getServiceList} from '../../Database/functions'
import {Ionicons} from 'react-native-vector-icons'
import {FontAwesome} from 'react-native-vector-icons'
import { useFonts } from 'expo-font';
import ImagesModal from './imagesModal'

const StylistBody = (props) => {
    let [fontsLoaded] = useFonts({
        'Lato-Heavy': require('../../assets/fonts/Lato-Heavy.ttf'),
        'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
        'Lato-Semibold': require('../../assets/fonts/Lato-Semibold.ttf')
            
        
    })
    
    var id = props.id
    var category = props.category
    var services = getServiceList(id)
    var categoryOptions = []
    

    if (category=="Natural Hair Care"){
        categoryOptions = require("../../json/Subcategories/Natural-Hair-Care.json")['Natural Hair Care']

    } else if (category=="Braiding"){
        categoryOptions = require("../../json/Subcategories/Braids.json")['Braids']

    } else if (category=="Haircut"){
        categoryOptions = require("../../json/Subcategories/Haircut.json")['Haircut']
    } else if (category=="Weave"){
        categoryOptions = require("../../json/Subcategories/Weaves.json")['Weaves']
    } else if (category=="Makeup"){
        categoryOptions = require("../../json/Subcategories/Makeup.json")['Makeup']
    } else if (category=="Lashes"){
        categoryOptions = require("../../json/Subcategories/Lashes.json")['Lashes']
    } else if (category=="Nails"){
        categoryOptions = require("../../json/Subcategories/Nails.json")['Nails']
    } else if (category=="Barber"){
        categoryOptions = require("../../json/Subcategories/Barber.json")['Barber']
    }
    //we get category options
    
    
    //services are what they already do 
    services = services.filter((service)=> service.Category == category)
    const [registeredServices, registerServices] = useState({})
    const [modal, setModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [imageModal, setImage] = useState(null)
    
    
    for (var cat in categoryOptions){
        for (var service in services){
            if (services[service].Name == categoryOptions[cat] && services[service].onDisplay==true){
                registeredServices[categoryOptions[cat]] = services[service]
            }
        }
    }
 
   
    

    const updateService = (serviceObj) => {
        props.modifySelection(serviceObj)
    }
    const exit = () => {
        console.log("EXIT AT STYLIST BODY")
        console.log("modal")
        console.log(imageModal)
        setImage(imageModal=>null)
        
    }

    const editService = (serviceObj) => {
        var stylistId = serviceObj.StylistId
       
        if (select.includes(JSON.stringify(serviceObj))){
            var index = select.indexOf(JSON.stringify(serviceObj))
            select.splice(index,1)
            // isSelected[serviceObj['Id']] = false
            var obj = serviceObj['Id']
            var newDuration = totalDuration - serviceObj.Duration
            //store this in seperate variable it takes time to update totalDuration - async function
            setDuration(totalDuration=>newDuration)
            setIsSelected(isSelected=> ({...isSelected, obj: false}))
        } else {
            var stylistCoords = generateStylistCoords(stylistId)
           
            //new element adding to services we want
            var newDuration = totalDuration + serviceObj.Duration
            //store this in seperate variable it takes time to update totalDuration - async function
            setDuration(totalDuration=>newDuration)
            var failed = null
            var isAvailable = availabile(arrivalDate,arrivalTime,clientCoords, stylistId, newDuration, stylistCoords)
            if (isAvailable==true){
                var availableAgain = apptAvailability(arrivalDate, arrivalTime, stylistId, clientCoords, stylistCoords, newDuration)
                if (availableAgain==true){
                    select.push(JSON.stringify(serviceObj))
                    // isSelected[serviceObj['Id']] = true
                    var obj = serviceObj['Id']
                    setIsSelected(isSelected=> ({...isSelected, obj: true}))

                } else {
                    console.log("APPT AVAILABILITY RETURNED FALSE")
                    failed = true
                }
            } else {
                console.log("SCHEDUALE AVAILABILITY RETURNED FALSE")
                failed = true
            }
            if (failed==true){
                alert(`Service ${serviceObj.Name} can not be added to cart due to time confliction`)
            }
            
            
        
           

        }
        console.log("AFTER EDIT SERVICE FUNCTION")
        console.log(select)
        console.log(isSelected)
        updateService(serviceObj)
       

    }
    const computePrice = (price) => {
        var taxes = 0.06*price
        var finalPrice = price + taxes
        console.log("FINAL PRICE")
        console.log(String(finalPrice).split(".")[1].length)
        if (String(finalPrice).split(".")[1].length>=2){
            finalPrice = String(finalPrice).split(".")[0] +"."+ String(finalPrice).split(".")[1].substring(0,2)
    
        } else {
            finalPrice = String(finalPrice) + '0'
        }
        return finalPrice
    }
    const submit = () => {
        props.submit()
        
    }
   
    const editPhotos = (service) => {
        setImage(imageModal=><ImagesModal service={service} returnFunc={exit}/>)
       
       
        //edit photos for service

    }
    var bookButton = <View style={styles.bookBox}>
    <TouchableOpacity style={styles.bookButton} onPress={()=>submit()}>
        <Text style={styles.bookText}>Book Now</Text>
    </TouchableOpacity>
    </View>

    const removeService = (categoryOption) => {
        console.log("IN REMOVE SERVICE")
     
        registerServices(registeredServices=>({...registeredServices,categoryOption:null}))
    }
    

    
    


return (
    <View style={styles.container}>
        {imageModal}
      
        <ScrollView style={styles.scroll}> 
    
            {categoryOptions.map((categoryOption)=> {
                console.log("RE-RENDERED")
                console.log(registeredServices[categoryOption])
                if (registeredServices[categoryOption]!=null){
                    return (  
                        <View style={styles.serviceRow}>
                        <View style={styles.row1}>
                        <TouchableOpacity style={styles.checkbox} onPress={()=>removeService(categoryOption)}>
                            <View style={{backgroundColor: registeredServices[categoryOption]!=null?'#1A2232':'transparent', display:registeredServices[categoryOption]!=null?'block':'none', width: 30,height:30,borderRadius: 20,}}> 
                            <Ionicons name='checkmark-outline' size={25} style={styles.check}></Ionicons>
                            </View>
    
                        </TouchableOpacity>
                        <View style={styles.innerRow}>
                            <View style={styles.row}>

                            
                            <Text style={styles.serviceName}>{categoryOption}</Text>
                           
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <FontAwesome name="pencil-square-o" size={15} style={styles.descriptionIcon}/>
                            
                           <TextInput
                           placeholder={"Add description"}
                           style={styles.descriptionInput}
                           value={registeredServices[categoryOption].Description}>
                               

                           </TextInput>
                           </View>
                           <View style={styles.imagesRow}>
                            <TouchableOpacity onPress={()=>editPhotos(registeredServices[categoryOption])}>
                            <FontAwesome name={"camera"} size={20} style={styles.cameraIcon}/>
                            </TouchableOpacity>
                            <View style={styles.imageGalleryRow}>
                                {registeredServices[categoryOption].Media.map((image)=> {
                                    return (
                                        <Image source={{uri: image}} style={styles.imageBox}/>
                                    )
                                })}

                            </View>

                        </View>
                           
    
                        </View>
                      
                        </View>
                        <View>
                            <View style={styles.durationBox}>
                                <Text style={styles.setDurationText}>Set Duration</Text>
                            <View style={styles.durationRow}>
                                    <TextInput value={registeredServices[categoryOption].Duration}/>
                                    <Text style={{fontSize:11, alignSelf:'center',marginLeft:5}}>min</Text>
                                    <Ionicons name={"time-outline"} size={15} style={{marginLeft:5}}/>
                            </View>
                            </View>
                            <View style={styles.priceBox}>
                                <Text style={styles.setPriceText}>Set Price</Text>
                                <View style={styles.priceRow}>
                                    <Text style={{marginRight:5}}>$</Text>
                                <TextInput value={registeredServices[categoryOption].Price}></TextInput>
                                </View>
                            </View>
                        </View>
    
                    </View>
                        )

                } else {
                    return (
                        <View style={styles.serviceRow}>
                        <View style={styles.row1}>
                        <TouchableOpacity style={styles.checkbox}>
                            <View style={{backgroundColor: registeredServices[categoryOption]!=null?'#1A2232':'transparent', display:registeredServices[categoryOption]!=null?'block':'none', width: 30,height:30,borderRadius: 20,}}> 
                            <Ionicons name='checkmark-outline' size={25} style={styles.check}></Ionicons>
                            </View>
    
                        </TouchableOpacity>
                        <View style={styles.innerRow}>
                            <View style={styles.row}>

                            
                            <Text style={styles.serviceName}>{categoryOption}</Text>
                           
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <FontAwesome name="pencil-square-o" size={15} style={styles.descriptionIcon}/>
                            
                           <TextInput
                           placeholder={"Add description"}
                           style={styles.descriptionInput}>
                               

                           </TextInput>
                           </View>
                           
    
                        </View>
                        </View>
                        <View>
                            <View style={styles.durationBox}>
                                <Text style={styles.setDurationText}>Set Duration</Text>
                            <View style={styles.durationRow}>
                                    <TextInput placeholder="30"/>
                                    <Text style={{fontSize:11, alignSelf:'center',marginLeft:5}}>min</Text>
                                    <Ionicons name={"time-outline"} size={15} style={{marginLeft:5}}/>
                            </View>
                            </View>
                            <View style={styles.priceBox}>
                                <Text style={styles.setPriceText}>Set Price</Text>
                                <View style={styles.priceRow}>
                                    <Text style={{marginRight:5}}>$</Text>
                                <TextInput placeholder="0.00"></TextInput>
                                </View>
                            </View>
                        </View>
    
                    </View>
                        
                    )
                }
                


            })
        }           

        </ScrollView>
        {bookButton}

    </View>
)
        }
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:Dimensions.get('window').height,
       

    },
    scroll: {
        width: '100%',
        height:'100%'
    },
    serviceRow: {
        width:'100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:20,
        
    },
    checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,
    
    },
    check: {
        color: 'white',
        alignSelf: 'center'
    },
    serviceName: {
        color: "#1A2232",
        fontSize:18,
        
        fontFamily: 'Lato-Heavy'
    },
    descriptionText: {
        fontWeight:'300',
        fontSize:14,
        color: '#1A2232',
        marginTop:2.5

    },
    serviceTime: {
      
        
    },
    row1: {
        flexDirection: 'row'
    },
    time: {
        flexDirection: 'row',
       
    },
    price: {
        alignSelf: 'flex-end',
        color: "#1A2232",
        marginTop:2.5
    },
    duration: {
        marginRight:5,
        fontSize:11,
        fontWeight: '300',
        color: "#1A2232",
        alignSelf: 'center'
    },
    clock: {
        color: "#1A2232"
    },
    bookButton: {
        width: '100%',
        height:180,
        
    
        backgroundColor: "#1A2232",
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    bookText: {
        color: "white",
        paddingTop: 12,
        fontWeight: '600',
        fontFamily: 'Lato-Heavy'
    },
    bookBox: {
       
        position: 'absolute',
        bottom:120,
        flexDirection: 'row',
        
    },
    descriptionIcon: {
        alignSelf:'center'
    },
    descriptionInput: {
        marginLeft:5
    },
    durationRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    priceRow:{
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    row: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    setPriceText: {
        fontWeight:'300',
        fontSize:12,
        alignItems: 'flex-end'
        
    },
    setDurationText: {
        fontSize:12
    },
    priceBox: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    
    imageBox: {
        width:30,
        height:30,
        borderRadius:5
    },
    imageGalleryRow: {
        flexDirection:"row"
    },
    imagesRow: {
        marginTop:5,
        flexDirection: 'row'
    },
    cameraIcon: {
        marginRight:5,
        alignSelf:'center',
        marginTop:5
    }

})
export default StylistBody