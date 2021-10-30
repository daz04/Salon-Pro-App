import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
// import {CheckBox} from 'react-native-elements'
import {getServiceList, getAllServices, getServicesBySubCategory} from '../../Database/functions'
import {Ionicons} from 'react-native-vector-icons'
import {FontAwesome} from 'react-native-vector-icons'
import { useFonts } from 'expo-font';
import ImagesModal from './imagesModal'
import MenuBar from '../menuBar'
import {getServiceMedia} from '../../S3/functions'
import * as ImagePicker from 'expo-image-picker'
import {getServicesByStylistId} from '../../API/functions'
// import { TextElement } from 'react-native-elements/dist/text/Text';
import axios from "axios"
import {AntDesign} from 'react-native-vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'




const StylistBody = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../../assets/fonts/Poppins-Medium.ttf"),
     });

    console.log("IN STYLISY BODYY")

    
    // let [fontsLoaded] = useFonts({
    //     'Lato-Heavy': require('../../assets/fonts/Lato-Heavy.ttf'),
    //     'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
    //     'Lato-Semibold': require('../../assets/fonts/Lato-Semibold.ttf')
  
    // })
    
    var id = props.id
    
    var isNew = props.isNew
    var profilePhotoSet = props.profilePhotoSet
 
  
    const [selectedSub, setselectedSub] = useState(props.selectedSub)
    const [servicesList, setservicesList] = useState([])
    const [selectedServices, setselectedServices] = useState([])
    const [registeredServices, registerServices] = useState([])
    const [servicesForSelectedCategory, setservicesForSelectedCategory] = useState([])
    const [serviceImages, setImages] = useState({})
    const [modal, setModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [imageModal, setImage] = useState(null)
    const [tempServices, setTemp] = useState({})
    const [maxId, setMax] = useState(20)
    const [refreshState, setrefreshState] = useState(0)
    const [statefulImages, setstatefulImages] = useState({})
    const [fetched, setFetched] = useState(false)
    const [visited, setVisited] = useState(false)
    const [disable, setDisable] = useState(false)
    const [spinner, setSpinner] = useState(true)


    useEffect(()=> {
        if (spinner==false){
            setSpinner(true)
        }
        console.log("IN STYLIST BODY USE EFFECT AGAIN 4")
        getAllServices((result)=> {
            
            var servicesForSelectNames = []

            if (result!=null){
                console.log("IN GET ALL SERVICES SELECTED SUB 1")
                console.log(props.selectedSub)
                for (var record in result.data){
                
                    if (result.data[record].Category==props.selectedSub && !(servicesForSelectNames.includes(result.data[record].Name))){
                        //push list of possible service names that match the given category
                        servicesForSelectNames.push(result.data[record].Name) 
                    }
                }
                
                
                var registeredServices = result.data.filter(record=> servicesForSelectNames.includes(record.Name) && record.StylistId == id)
                //registered Services stores service objects that match that category selected and  stylist id 
                console.log("THE REGISTERED SERVICES LIST IN STYLIST BODY 1")
                console.log(registeredServices)
                registerServices(registeredServices)
                setservicesForSelectedCategory(servicesForSelectNames)
                setservicesList(result.data)
                setSpinner(false)


               
            }
        })
    },[props.selectedSub, isNew])




    if (isNew==true && profilePhotoSet==false && disable==false){
        setDisable(true)
    } else if (profilePhotoSet==true && isNew==true && disable==true){
        setDisable(false)
    }
    //will be null in the non-onboarding case

    console.log("BODYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
    console.log(selectedSub)
 
    


    const getselectedServices = (response) => {
        console.log("IN GET SELECTED SERVICES")
        console.log(response)
        var services_ = []
        for (var elem in response){
            if (response[elem].Category==props.selectedSub){
                services_.push(response[elem].Name)

            }
            

        }
        setselectedServices(selectedServices=>services_)
        if (services_.length>0){
            props.changeDisable("services")

        }

    }
    const getavailableServices = (thesubcat) => {
        console.log("In get available services")
        axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/serviceselection/getBySubCategory?subcategory=${thesubcat}`,{
            headers: {
                'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    
            }}).then(response=> {
                console.log("API RESPONSE")
                console.log(response.data)
                console.log(selectedSub)
                if (response.data!=null){
                    var newList = []
                    for (var elem in response.data){
                        newList.push(response.data[elem].name)
                        console.log("PRINTING THE SERVICES LIST")
                        console.log(response.data[elem].name)
                        console.log(servicesList)

                        // setservicesList(serviceList=> ([...servicesList,response.data[elem].name]))
                    }
                    
                    setservicesList(serviceList=>newList)
                    setFetched(true)
                    setselectedSub(props.selectedSub)
                } else {
                    servicesList=newList
                    setservicesList(serviceList=>newList)
                    setFetched(true)
                    setselectedSub(props.selectedSub)
                }
                
            }).catch(error=> {
                console.log(error)
            })
            
            

    }
    
    // if (selectedSub!=null && fetched==false){
    //     console.log("SELECTED SERVICES")
    //     console.log(selectedServices)
    //     getServiceList(id,getselectedServices)
    //     getavailableServices(selectedSub)
    //     //fetch possible service options for this subcategory
    // }
    // if (selectedSub!=props.selectedSub){
    //     getServiceList(id,getselectedServices)
    //     //getServicesBySubCategory(id, props.selectedSub, getselectedServices)
    //     getavailableServices(props.selectedSub)

    // }

    // if (props.visited!=null && props.visited!=visited){
    //     getServiceList(id, getselectedServices)
    //     getavailableServices(props.selectedSub)
    //     setVisited(props.visited)

    // }

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
    const modifyPhotos = (service, images) => {

    }
   
    const editPhotos = (service) => {
        setImage(imageModal=><ImagesModal service={service} returnFunc={exit} callback={modifyPhotos}/>)
       
       
        //edit photos for service

    }
    const addPhoto = async (categoryName) => {
        console.log("AT ADD PHOTO")
        console.log(tempServices[categoryName])
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:1,
            base64: true

        })
        if (!result.cancelled){
            console.log("WHAT PICK IMAGE RESULT LOOKS LIKE")
            console.log(result)
        }
        var len = null 
        if (tempServices[categoryName]==null){
            len="01"
        } else {
            len = String(Number(tempServices[categoryName].media.length))
        }
        var file = {
            uri: result.uri,
            name: len +'.png',
            type: "image/png"
        }

        
        tempServices[categoryName].media.push(<Image source={{uri: result.uri}} style={styles.imageBox}/>)
        setTemp(({...tempServices}))
        console.log("THE TEMP SERVICES")
        console.log(tempServices)
        //add photo

    }
    const returnImageElem = (categoryName) => {
        var elem = null
        console.log("AT RETURN IMAGE ELEM")
        console.log(tempServices)
        if (tempServices[categoryName]!=null && tempServices[categoryName].media.length>0){
            console.log("IN RETURN IMAGE ELEM 123441151525151515")
            console.log(tempServices[categoryName].media)

            elem = tempServices[categoryName].media
            return elem

        } else {
            elem = <Text style={{marginTop:7}}>Add Media</Text>
            return elem
        }
        
    }


    const addRegisteredServices = (categoryName) => {
        console.log("AT ADD REGISTERED SERVICES")
        
        //need to create a new service as well, register it under the stylist name -> get to integration later
        //come back to back end integration later
        var temp = tempServices[categoryName]
        console.log(temp)
        if (temp.media.length>0 && temp.price!=null && temp.duration!=null && temp.description!=null){
            console.log("PASSED IF STATEMENT")
            var urls = []
            for (var media in temp.media){
                urls.push(temp.media[media].props.source.uri)
            }
            var newService = {
                id: maxId,
                StylistId: id,
                Name: categoryName,
                Price: temp.price,
                Duration: temp.duration,
                Description: temp.description,
                Utilities: [],
                Category: category,
                SubCategory: null,
                Gender: "F",
                Media: urls,
                onDisplay: true
            }
            console.log("THE NEW SERVICE")
            console.log(newService)
            registeredServices[categoryName] = newService
            statefulImages[categoryName] = temp.media 
            if (statefulImages[categoryName]==null){
                setstatefulImages({...statefulImages})

            }
            setrefreshState(refreshState=>refreshState+1)
            
            

            registerServices(({...registeredServices}))
        }
       
        
    }
    const redirect = (screen) => {
        
        props.callback(screen)
    }
    const modifySelection = (categoryOption) => {
        console.log("IN MODIFY SELECTION")
        console.log(categoryOption)
        if (!(selectedServices.includes(categoryOption))){
            console.log("LOOP 1")
            setselectedServices(selectedServices=> ([...selectedServices,categoryOption]))
           
        } else {
            setselectedServices(selectedServices=>selectedServices.filter(service=> service!=categoryOption))
        }
    }
    const navigateToItem = (categoryOption, isNew) => {
        console.log("IN NAVIGATE TO ITEM PARAMS")
        console.log(categoryOption)
        var isRegistered = false 
        var registeredService = null
        for (var record in registeredServices){
            if (registeredServices[record].Name == categoryOption){
                isRegistered = true 
                registeredService = registeredServices[record]
                break
            }
        }
        //is registered is a bool that represents if the specific service title is already being offered by the stylist
        //registered service is an object or null: if null it means that the service title selected is not currently offered by the stylist
        //but if it is -> to return that record 
        props.navigateItem(categoryOption,!isNew, isRegistered, registeredService)
        //need to navigate to Item element with category Option and stylist id as well 
    }

    console.log("THE SERVICES LISTTTTTTTTTTTT 131314")
    
    console.log(fetched)

    var submitButton = null
    if (isNew==true){
        submitButton =   <View style={styles.confirmBox}>
            
        <TouchableOpacity style={{flexDirection: "row",alignItems: "center",textAlign: "center",justifyContent: 'center',height:50,alignSelf: 'center',backgroundColor: disable?"gray":"#1A2232",flex:1,
    width: Dimensions.get('window').width, height:Dimensions.get('window').height*0.08,}} disabled={disable} onPress={()=>submit()}>
           <Text style={styles.confirmText}>Submit</Text>
       </TouchableOpacity>
       </View>

    }

   

 
    
    


return (

    <View style={styles.container}>
         <Spinner 
            visible={spinner}
            />

    {props.selectedSub!=null && 
        // {imageModal}
        <View style={styles.body}>
            <ScrollView style={styles.scroll} scrollEnabled={true}>
                {servicesForSelectedCategory.map((service=> {
                    
                    console.log("THE SERVICE IN SERVICE CATEGORIES 1")
                    console.log(registeredServices)
                    console.log()
                    var registered = false 
                    for (var registered_ in registeredServices){
                        if (registeredServices[registered_].Name==service){
                            registered = true
                            break
                        }
                    }
                    console.log("IN SERVICES FOR SELECTED CAT GETTING MAPPED")
                    console.log(service)
                    console.log(registered)
                    
                    return (
                    <View style={styles.serviceRow}>
                    <View style={styles.row1}>
                    <View style={styles.checkbox} onPress={()=>addRegisteredServices(service)}>
                        <View style={{backgroundColor: registered?'#1A2232':'transparent', display:registered?'flex':'none', width: 30,height:30,borderRadius: 20,}}> 
                        <Ionicons name='checkmark-outline' size={25} style={styles.check}></Ionicons>
                        </View>
                    </View>
                    <View style={styles.innerRow}>
                        <View style={styles.row}>

                        {fontsLoaded && 
                        <Text style={{
                            color: "#1A2232",
                            fontSize:18,
                            
                            fontFamily: 'Poppins-Medium'
                        }}>{service}</Text>
                    }

                       
                        </View>
                
                       
                     
                       

                    </View>
                    
                    </View>
                    <TouchableOpacity onPress={()=>navigateToItem(service, registered)}>

                    <AntDesign name={'arrowright'} size={25}/>
                    </TouchableOpacity>

                   

                </View>
                    )

                }))}
            </ScrollView>
        </View>
}
        {props.selectedSub==null &&
        <Text style={styles.selectCategory}>Select a category</Text>}
         <MenuBar selectedScreen={'PROFILE'} callback={redirect}/>
      {/* {submitButton} */}
            
    </View>
            


)

        }
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:Dimensions.get('window').height,
        flex:1
       
       

    },
    scroll: {
        width: '100%',
        height: '100%',
      
       
       
    
        
    },
    body: {
        height:'90%'
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
        bottom:0
       
  
        
        
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
        justifyContent: 'flex-end',
       

    },
    row: {
        width:200,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        // marginTop:20,
        // marginBottom:20,
        // height:60,
        bottom:0,
        position: 'absolute'
       
    },
    selectCategory: {
        alignSelf: 'center',
        marginTop:'50%',
        fontSize:14
    }

})
export default StylistBody