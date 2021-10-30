// import React, {useEffect, useState} from 'react';
// import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
// import { useFonts } from 'expo-font';
// import ImageCarasoul from './imageCarasoul'
// import SchedualeHeader from '../../Headers/scheduale'
// import uuid from 'react-native-uuid'

// import {postService, getService, getServiceList, deleteService, updateService} from '../../Database/functions'
// import {Ionicons} from 'react-native-vector-icons'
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const Item = (props) => {
//     //what do we need in item props 

//     let [fontsLoaded] = useFonts({
//         'Poppins-Regular': require("../../assets/fonts/Poppins-Regular.ttf"),
//         'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf"),
//         'Poppins-Black': require("../../assets/fonts/Poppins-Black.ttf"),
//         "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
//         'Poppins-Medium': require("../../assets/fonts/Poppins-Medium.ttf"),
//         'Lato-Medium': require("../../assets/fonts/Lato-Medium.ttf"),
     
//      });


//     var stylistPayload = props.navigation.state.params.stylistPayload
//     var phoneNum = props.navigation.state.params.phoneNum 
//     var serviceName = props.navigation.state.params.service
//     var isNew = props.navigation.state.params.isNew
//     var isRegistered = props.navigation.state.params.isRegistered
//     var registeredService = props.navigation.state.params.registeredService
//     console.log("THE REGISTERED SERVICE IN ITEM")
//     console.log(registeredService)
//     console.log("IS NEW PROPS IN ITEM")
//     console.log(isNew)
//     var categoryOption = props.navigation.state.params.categoryOption
//     var category = props.navigation.state.params.category
//     var visited = props.navigation.state.params.visited
//     var formattedNum = props.navigation.state.params.formattedNum
//     const [description, setDescription] = useState("")
//     const [price, setPrice] = useState("")
//     const [duration, setDuration] = useState("")
//     const [imgSrc, setSrc] = useState(null)
//     const [imageFetched, setFetched] = useState(false)
//     const [databaseFetch, setdatabaseFetch] = useState(false)
//     const [serviceId, setserviceId] = useState(null)
//     const [signedURL,setURL] = useState(null)
//     const [imageSent,setimageSent] = useState(false)
//     const [fileURI, setUri] = useState(null)
//     const [id, setId] = useState(null)
//     const [service, setService] = useState(null)
//     const [disable, setDisable] = useState(true)


//     // useEffect(()=> {
//     //     if (isRegistered){
//     //         //we already have our registered service
//     //         setserviceId(registeredService.id)
//     //         setService(registeredService)
//     //         setDuration(registeredService.Duration)
//     //         setPrice(registeredService.Price)
//     //         setDescription(registeredService.Description)
//     //         //means service is already registered, fetch the service by id 
//     //     }


//     // }, [])

//     if (isRegistered && duration=="" && description=="" && price=="" && service==null){
//         //we already have our registered service
//         setserviceId(registeredService.id)
//         setService(registeredService)
//         setDuration(registeredService.Duration)
//         setPrice(registeredService.Price)
//         setDescription(registeredService.Description)
//         //means service is already registered, fetch the service by id 
//     }

//     if ((service!=null && disable==true) || (fileURI!=null && description!="" && price!="" && duration!="" && disable==true)){
//         setDisable(false)
//     }

  
    


//     const getId = async () => {
//         var id_ = await AsyncStorage.getItem('stylistId') 
//         setId(id_)
      
        
//     }

//     // if (id==null){
//     //     getId()
        
//     // }
//     console.log("THE SERVICE ID")
//     console.log(serviceId)


//     console.log("IN ITEM CHECK IS NEW")
//     console.log(isNew)

//     const fetchPic = (src) => {
//         console.log("WE ARE IN THE FETCH PROFILE PIC 2")
//         console.log("SRC IN FETCH PIC")
//         console.log(src)
//         console.log("ID IN FETCH PIC")
//         console.log(serviceId)
//         if (serviceId!=null && src!=null) {
//             console.log("IN TRY STATEMENT NEW 16")
//             console.log(serviceId)
//             console.log(src)
            
//             axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceImage?serviceId=${serviceId}&photoName=${src}`).then(response=> {
//                 console.log("FETCH PROFILE PIC RESPONSE NEW 3")
//                 console.log(response)
//                 setSrc(response.data.url)
//             }).catch(err=> {
//                 console.log("FETCH PROFILE PIC ERROR")
//                 console.log(err)
//             })

//         } 
//         setFetched(true)
        
//     }


//     // if (isNew==false && imageFetched==false){
//     //     fetchPic()

//     // } 



//     const findService = (serviceList) => {
//         console.log("IN FIND SERVICE 22")
//         console.log(id)
//         console.log(serviceList)
//         for (var service in serviceList){
//             if (serviceList[service].Name==categoryOption){
//                 setService(serviceList[service])
//                 console.log(serviceList[service].Price)
//                 console.log(serviceList[service].Duration)
//                 setserviceId(serviceList[service].id)
//                 setPrice(price => String(serviceList[service].Price))
//                 setDescription(serviceList[service].Description)
//                 setDuration(duration => String(serviceList[service].Duration))
//                 if (serviceList[service].MainImage!=null){
//                     console.log("MAIN PIC SERVICE PIC")
//                     setSrc(serviceList[service].MainImage)
//                     //fetchPic(serviceList[service].MainImage)
                   

//                 }
                
                
//             }
//         }
//         setdatabaseFetch(true)

//     }
//     // if (databaseFetch==false){
//     //     //search in database
//     //     getServiceList(id, findService)
//     // }
//     // const [disable,setDisable] = useState(true)

//     // if (price.length>0 && description.length>0 && duration.length>0){
//     //     if (disable==true){
//     //         setDisable(false)
//     //     }
//     // }else {
//     //     if (disable==false){
//     //         setDisable(true)
//     //     }
//     // }

//     const removeService = () => {
//         console.log("AT REMOVE SERVICE")
//         deleteService(service.id)
//         props.navigation.navigate(
//             "Profile", {
//                 isNew: isNew,
//                 stylistPayload: stylistPayload,
//                 formattedNum: formattedNum,
//                 phoneNum: phoneNum,
//                 visited: visited
//             }

//         )

//     }

//     const goBack = () => {
//         const {navigate} = props.navigation
//         // navigate("Profile", {
//         //     stylistPayload: stylistPayload,
//         //     formattedNum: props.navigation.state.params.formattedNum,
//         //     // refresh: true
//         // })
//         navigate(
//             "Profile", {
//                 isNew: isNew,
//                 stylistPayload: stylistPayload,
//                 formattedNum: formattedNum,
//                 phoneNum: phoneNum,
//                 visited: visited
//             }

//         )
        
//     }

//     const returnImgSrc = (imgSrc) => {
//         console.log("IN SET IMAGE SRC")
//         setUri(imgSrc)
//     }
//     const requestUpload = async (imageName, serviceId) => {
//         console.log("IN THE REQUEST UPLOAD FUNCTION 1")
//         console.log(fileURI)
//         // axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${serviceId}&imgName=${imageName}`).then( async (res)=>{
//             axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${serviceId}&imgName=${imageName}`).then( async (res)=>{
//             //axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/identificationUrl?stylistId=${id}`).then(async (res)=>{
           
//             res = res.data.url
       
           
//             try {
//                 console.log("IN TRY STATEMENT")
//                 console.log("FILE URI 2")
//                 console.log(fileURI)
//                 var response = await fetch(fileURI)
//                 var blob = await response.blob()
//                 console.log("THE BLOB")
//                 console.log(blob)
               
//                 fetch(res, {
//                 method: 'PUT',
//                 body: blob
//                 })
          
//         } catch (e){
//             console.log("POST SERVICE IMAGE ERROR 1")
//             console.log(e)

//         }
//         props.navigation.goBack()
        
//             // setURL(res)
        

//         }).catch(e=> {
//             console.log("Request upload error")
//             console.log(e)
//         })

//     }

    

//     const postServiceImage = async (imgName, serviceId) => {
//         console.log("IN POST SERVICE IMAGE")
//         console.log("SIGNED URL")
//         console.log(signedURL)
//         console.log("THE IMAGE NAME 2")
//         console.log(imgName)
//         if (signedURL==null){
//             requestUpload(imgName, serviceId)
//         }
         
//         // setURL(null)
//         // var file = {
//         //     uri: imgSrc,
//         //     name: imgName+".jpg",
//         //     type: "image/jpg"
//         // }
//         // try {
//         //     var response = await fetch(file.uri)
//         //     console.log("FIRST RESPONSE")
//         //     console.log(response)
//         //     var blob = await response.blob()
          
//         //     await Storage.put(`${serviceId}/${imgName}.jpg`,blob, {
//         //         contentType: 'image/jpg',
//         //         region: 'us-east-1',
//         //         bucket: 'service-media',
//         //         progressCallback(progress) {
//         //             console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
//         //     },
//         //     });
           
            
            
//         // } catch (err){
//         //     console.log("Error uploading file:",err)
//         // }
//         // RNS3.put(file, {
//         //     keyPrefix:`${serviceId}/`,
//         //     bucket: 'service-media',
//         //     region: 'us-east-1',
//         //     accessKey: 'AKIA4LZB5JKED4DCDXIB',
//         //     secretKey: "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",
//         //     successActionStatus: 201
//         // }).progress((progress) =>{
//         //     console.log("progress")
//         //     console.log(progress)

//         //     }
            
//         // )
      
//         // .then((response)=> {
//         //     console.log(response)
//         // })

//     }
//     const submit = () => {
//         var priceNum = parseFloat(price)
//         var durationNum = parseInt(duration)
//         console.log(typeof(priceNum))

//         console.log(isNaN(priceNum))
//         if (!(typeof(priceNum)=='number')){
           
//             alert("Insert a valid value for service price")
//             return
//         }
//         if (!(typeof(priceNum)=='number')){
//             alert("Insert a valid value for service duration")
//             return
//         }

//         //need to post media to s3 bucket first
//         //how can i post to s3 bucket if I 
//         if (isNew==true){
//         var imgName = uuid.v1()
//         var serviceId = uuid.v4()
//         setserviceId(serviceId)
        
       
//         var servicePayload = {
//         "id": serviceId,
//         "stylistId": props.navigation.state.params.stylistId,
//         "name": categoryOption,
//         "duration":duration,
//         "description":description,
//         "price":price,
//         "category": category,
//         "mainImage":imgName+".jpg"
        
          


//         }
//         console.log("THE SERVICE PAYLOADDDDDDDDDD")
//         console.log(servicePayload)
//         console.log(props.navigation.state.params)
//         console.log("hey")
//         postService(servicePayload, (result)=> {
//             if (result!=null){
//                 //post service was successful
//                 postServiceImage(imgName, serviceId)
//                 props.navigation.navigate(
//                     "Profile", {
//                         isNew: !isNew,
//                         stylistPayload: stylistPayload,
//                         formattedNum: formattedNum,
//                         phoneNum: phoneNum,
//                         visited: visited
//                     }
        
//                 )


//             } else {
//                 alert("Network error: failed to upload service")
//             }
//         })
       
//     } else {
//         //duration can change
//         //image src can change
//         //description can change
//         //price can change
//         console.log("IN THE NOT NEW SUBMIT BUTTON")
//         console.log(imgSrc)
//         console.log(fileURI)
        
//         if (fileURI!=null && imgSrc!=fileURI){
            
//             var imageName = service.MainImage.slice(0,-4)
//             console.log("THE PARSED IMAGE NAME")
//             console.log(imageName)
//             postServiceImage(imageName, service.id)
//         }

//         console.log("IN SERVICE UPDATE DESCRIPTION")
//         console.log(description)
//         var params = {
//             id: service.id,
//             duration: duration, 
//             description: description, 
//             price: price, 
//             mainImage: imgSrc, 
//         }
//         console.log("THE UPDATE PARAMS")
//         console.log(params)
//         updateService(params, (result)=> {
//             if (result==null){
//                 alert("Error occured while making updates")
//                 return
//             } else {
//                 props.navigation.navigate(
//                     "Profile", {
//                         isNew: !isNew,
//                         stylistPayload: stylistPayload,
//                         formattedNum: formattedNum,
//                         phoneNum: phoneNum,
//                         visited: visited
//                     }
        
//                 )
//             }
//         })
//     }
// }

//     var deleteElem = null
//     if (databaseFetch==true && serviceId!=null){
//         deleteElem =  <View style={styles.imageBox}>
//         <TouchableOpacity onPress={()=> removeService()}>
//          <Ionicons name={'trash-outline'} size={30}/>
//          </TouchableOpacity>
//      </View>
//     }
  
//     //there is a list of radio buttons and once they click on them then they are passed the phone number, will fix in caching
//     //after that we have to see if service exists for client or not so search a service element in services table where 
//     //this is a new stylist but by the time they are at their storefront they already have to be signed up -> so create a new stylist


//     console.log('BEFORE THE RETURN STATEMENT 1')
//     console.log(duration)
//     console.log(price)


//     return (
//         <View style={styles.container}>
//             <SchedualeHeader backwards={goBack}/>
            
//             <ImageCarasoul isNew={!isRegistered} id={serviceId} service={registeredService} callback={returnImgSrc}/>
            
            
//             <View style={styles.body}>
//                 <Text style={{
//                     color: "#1A2232",
//                     fontSize:20,
                
                    
//                     paddingLeft:20,
//                     paddingTop:10
//                 }}>{categoryOption}</Text>
//             <View style={styles.inputBox}>
//             <Text style={{
//                   color: "#1A2232",
//                   fontFamily: "Poppins-Regular",
//                   fontSize:14,
//                   marginBottom:10,
                  
//                   fontWeight: '600'

//             }}>Description</Text>
//                 <TextInput
//                 style={styles.input}
//                 value={description}
//                 onChangeText={setDescription}
               
//                 placeholder={"Enter description"}
//                 returnKeyType={'done'}


                
//                 ></TextInput>

//            </View>
//            <View style={styles.inputBox}>
//                <View style={styles.rowBox}>

//                <View>
//                 <Text style={{ 
//                 color: "#1A2232",
//                 fontFamily: "Poppins-Regular",
//                 fontSize:14,
//                 marginBottom:10,
                
//                 fontWeight: '600'}}>
//             Price</Text>
//                     <TextInput
//                     style={styles.smallInput}
//                     value={price}
//                     onChangeText={setPrice}
//                     keyboardType={'numeric'}
//                     placeholder={"0.00"}
//                     returnKeyType={'done'}
                    
//                     ></TextInput>
//                 </View>
//                 <View>
//                     <Text style={{
//                         color: "#1A2232",
//                         fontFamily: "Poppins-Regular",
//                         fontSize:14,
//                         marginBottom:10,
                        
//                         fontWeight: '600',
//                     }}>Duration</Text>
//                     <View style={{flexDirection:'row'}}>
//                     <TextInput
//                     style={styles.smallInput}
//                     value={duration}
//                     onChangeText={setDuration}
//                     keyboardType={'numeric'}
                
//                     placeholder={"0"}
//                     returnKeyType={'done'}
                    
//                     ></TextInput>
//                     <Text style={{ paddingTop:35,fontSize:13,marginLeft:5}}>min</Text>
//                     </View>

//                 </View>
//             </View>
//            </View>
//            <View>

//            </View>
           

//             </View>
//            {deleteElem}
//             <TouchableOpacity style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 textAlign: "center",
//                 justifyContent: 'center',
//                 height:60,
//                 alignSelf: 'center',
//                 backgroundColor: disable?"grey":"#1A2232",
//                 width: Dimensions.get('window').width,
//                 position: 'absolute',
//                 bottom:0,
//                 marginBottom:20
//             }} disabled={disable} onPress={()=>submit()}>
//                 <Text style={styles.confirmText}>Submit</Text>
//             </TouchableOpacity>


//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height:'100%'
//     },
//     rowBox: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop:30
        
//     },
//     inputBox: {
//         width: '100%',
//         height: 100,
//         paddingTop:30,
//         paddingLeft:20,
//         paddingRight:20
        
      

//     },
//     inputText: {
//         color: "#1A2232",
//         fontFamily: "Lato-Semibold",
//         fontSize:14,
//         marginBottom:10,
        
//         fontWeight: '600',
        
        
//     },
//     input: {
//         width:Dimensions.get("window").width-40,
//         alignSelf: 'center',
//         height:50,
//         backgroundColor: 'white',
//         borderWidth:1,
//         borderColor: 'lightgray',
//         marginTop:10,
        
//         marginBottom:20,
//         fontSize:18,
//         paddingLeft: 10
//     },
//     smallInput: {
//         width:Dimensions.get("window").width*0.2,
//         alignSelf: 'center',
//         height:50,
       
//         borderBottomWidth:1,
//         borderBottomColor: 'grey',
       
        
//         marginBottom:20,
//         fontSize:18,
       
        

//     },
//     confirm: {
//         flexDirection: "row",
//         alignItems: "center",
//         textAlign: "center",
//         // flex: 1,
//         justifyContent: 'center',
//         height:50,
     
      
//         alignSelf: 'center',
//         backgroundColor: "#1A2232",

//         width: Dimensions.get('window').width,
//         position: 'absolute',
//         bottom:0,
       
        
        


//     },
//     confirmText: {
//         color: 'white',
//         fontWeight: '600',
//         fontSize:16
//     },
//     confirmBox: {
       
      
        
//         marginBottom:20,
//         height:50,
       
//     },
//     serviceName: {
//         color: "#1A2232",
//         fontSize:20,
        
//         fontFamily: 'Lato-Heavy',
//         paddingLeft:20,
//         paddingTop:10
//     },
//     imageBox: {
//         backgroundColor: '#dae0ee',
//         borderRadius: 100,
//         height: 50,
//         width:50,
    
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'flex-end',
//         marginTop:20,
        
//         bottom:90,
//         right:20,
//         position:'absolute'

//     },

// })
// export default Item


import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import ImageCarasoul from './imageCarasoul'
import SchedualeHeader from '../../Headers/scheduale'
import uuid from 'react-native-uuid'

import {postService, getServiceList, deleteService, updateService} from '../../Database/functions'
import {Ionicons} from 'react-native-vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'


const Item = (props) => {
    //what do we need in item props 
        let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Medium': require("../../assets/fonts/Lato-Medium.ttf"),
        'Lato-Regular': require("../../assets/fonts/Lato-Regular.ttf")
     
     });

    var stylistPayload = props.navigation.state.params.stylistPayload
    var phoneNum = props.navigation.state.params.phoneNum 
    var serviceName = props.navigation.state.params.service
    var isNew = props.navigation.state.params.isNew
    var isRegistered = props.navigation.state.params.isRegistered
    var registeredService = props.navigation.state.params.registeredService
    console.log("IS NEW PROPS IN ITEM")
    console.log(isNew)
    var categoryOption = props.navigation.state.params.categoryOption
    var category = props.navigation.state.params.category
    var visited = props.navigation.state.params.visited
    var formattedNum = props.navigation.state.params.formattedNum


    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [imgSrc, setSrc] = useState(null)
    const [imageFetched, setFetched] = useState(false)
    const [databaseFetch, setdatabaseFetch] = useState(false)
    const [serviceId, setserviceId] = useState(null)
    const [signedURL,setURL] = useState(null)
    const [imageSent,setimageSent] = useState(false)
    const [fileURI, setUri] = useState(null)
    const [id, setId] = useState(null)
    const [service, setService] = useState(null)
    const [serviceFetched, setserviceFetched] = useState(false)
    const [disable, setDisable] = useState(true)
    const [spinner, setSpinner] = useState(true)
    const [keyboardHeight, setkeyboardHeight] = useState(0)

    useEffect(()=> {
        Keyboard.addListener("keyboardDidShow",_keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
        if (fontsLoaded && spinner==true){
            setSpinner(false)
        }
    }, [fontsLoaded])
    const _keyboardDidHide = (e)=> {
        setkeyboardHeight(0)
    }
    const _keyboardDidShow = (e) => {
        setkeyboardHeight(e.endCoordinates.height)
    }

    if ((service!=null && disable==true) || (fileURI!=null && description!="" && price!="" && duration!="" && disable==true)){
        setDisable(false)
    }

  
    


    const getId = async () => {
        var id_ = await AsyncStorage.getItem('stylistId') 
        setId(id_)
      
        
    }

    if (id==null){
        getId()
        
    }
    console.log("THE SERVICE ID")
    console.log(serviceId)


    console.log("IN ITEM CHECK IS NEW")
    console.log(isNew)

    const fetchPic = (src) => {
        console.log("WE ARE IN THE FETCH PROFILE PIC 2")
        console.log("SRC IN FETCH PIC")
        console.log(src)
        console.log("ID IN FETCH PIC")
        console.log(serviceId)
        if (serviceId!=null && src!=null) {
            console.log("IN TRY STATEMENT NEW 16")
            console.log(serviceId)
            console.log(src)
            
            axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceImage?serviceId=${serviceId}&photoName=${src}`).then(response=> {
                console.log("FETCH PROFILE PIC RESPONSE NEW 3")
                console.log(response)
                setSrc(response.data.url)
            }).catch(err=> {
                console.log("FETCH PROFILE PIC ERROR")
                console.log(err)
            })

        } 
        setFetched(true)
        
    }


    // if (isNew==false && imageFetched==false){
    //     fetchPic()

    // } 



    const findService = (serviceList) => {
        console.log("IN FIND SERVICE 22")
        console.log(id)
        console.log(serviceList)
        for (var service in serviceList){
            if (serviceList[service].Name==categoryOption){
                setService(serviceList[service])
                console.log(serviceList[service].Price)
                console.log(serviceList[service].Duration)
                setserviceId(serviceList[service].id)
                setPrice(price => String(serviceList[service].Price))
                setDescription(serviceList[service].Description)
                setDuration(duration => String(serviceList[service].Duration))
                if (serviceList[service].MainImage!=null){
                    console.log("MAIN PIC SERVICE PIC")
                    setSrc(serviceList[service].MainImage)
                    //fetchPic(serviceList[service].MainImage)
                   

                }
                
                
            }
        }
        setdatabaseFetch(true)

    }
    if (databaseFetch==false){
        //search in database
        getServiceList(id, findService)
    }
  
    const removeService = () => {
        console.log("AT REMOVE SERVICE")
        deleteService(service.id, (result)=> {


            if (result!=null){
                //service was successfully deleted
                axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/deleteserviceFromS3?serviceId=${serviceId}`).then(async (res)=>{
                    if (res['message']==true){
                        props.navigation.navigate(
                            "Profile", {
                                isNew: !isNew,
                                stylistPayload: stylistPayload,
                                formattedNum: formattedNum,
                                phoneNum: phoneNum,
                                visited: visited
                            }
                
                        )


                } else {
                    Alert.alert("Network Error", "Unable to delete service")
                    
                }
                
            })

            } else {
                Alert.alert("Network Error", "Unable to delete service")
            }
        })
        

    }

    const goBack = () => {
        const {navigate} = props.navigation
      
        navigate(
            "Profile", {
                isNew: !isNew,
                stylistPayload: stylistPayload,
                formattedNum: formattedNum,
                phoneNum: phoneNum,
                visited: visited
            }

        )
        
    }
    const returnImgSrc = (imgSrc) => {
        setUri(imgSrc)
      

    }


    const requestUpload = async (imageName, serviceId) => {
        console.log("IN REQUEST UPLOADDDDDDDDDD")
        console.log("IMAGE NAME 2")
        console.log(imageName)
        console.log("THE SERVICE ID")
        console.log(serviceId)
      
        // axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${serviceId}&imgName=${imageName}`).then( async (res)=>{
            axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${serviceId}&imgName=${imageName}`).then( async (res)=>{
            //axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/identificationUrl?stylistId=${id}`).then(async (res)=>{
            console.log("UPLOAD RESULTTTTTTT")
            res = res.data.url
            console.log(res)
           
           
            try {
                console.log("IN TRY STATEMENT")
                console.log("FILE URI 2")
                console.log(fileURI)
                var response = await fetch(fileURI)
                // response.blob().then(result=> {
                //     console.log("RESULT IN BLOB")
                //     console.log(result)
                // })
                
                var blob = await response.blob()
                console.log("THE BLOB")
                console.log(blob)
               
                fetch(res, {
                method: 'PUT',
                body: blob
                })
            // }).then(sresponse=> {
            //     console.log("PUTTING SERVICE IMAGE RESPONSE")
            //     console.log(response)
            // }).catch(error=> {
            //     console.log("PUTTING SERVICE IMAGE ERROR")
            //     console.log(error)
            // })
            
            //setURL(res)
        } catch (e){
            console.log("POST SERVICE IMAGE ERROR")
            console.log(e)

        }
        props.navigation.goBack()
        
            // setURL(res)
        

        }).catch(e=> {
            console.log("Request upload error")
            console.log(e)
        })

    }

    

    const postServiceImage = async (imgName, serviceId) => {
        console.log("IN POST SERVICE IMAGE")
        console.log("SIGNED URL")
        console.log(signedURL)
        console.log("THE IMAGE NAME 2")
        console.log(imgName)
        if (signedURL==null){
            requestUpload(imgName, serviceId)
        }
     
    }
    const submit = () => {
    
        var priceNum = parseFloat(price)
        var durationNum = parseInt(duration)
        console.log(typeof(priceNum))

        console.log(isNaN(priceNum))
        if (!(typeof(priceNum)=='number')){
           
            alert("Insert a valid value for service price")
            return
        }
        if (!(typeof(priceNum)=='number')){
            alert("Insert a valid value for service duration")
            return
        }

        //need to post media to s3 bucket first
        //how can i post to s3 bucket if I 
        if (isNew==true){
        var imgName = uuid.v1()
        var serviceId = uuid.v4()
        setserviceId(serviceId)
        
       
        var servicePayload = {
        "id": serviceId,
        "stylistId": props.navigation.state.params.stylistId,
        "name": categoryOption,
        "duration":duration,
        "description":description,
        "price":price,
        "category": category,
        "mainImage":imgName+".jpg"
        
          


        }
        console.log("THE SERVICE PAYLOADDDDDDDDDD")
        console.log(servicePayload)
        console.log(props.navigation.state.params)
        console.log("hey")
        postService(servicePayload, (result)=> {
            if (result!=null){
                //post service was successful
                postServiceImage(imgName, serviceId)
                props.navigation.navigate(
                    "Profile", {
                        isNew: !isNew,
                        stylistPayload: stylistPayload,
                        formattedNum: formattedNum,
                        phoneNum: phoneNum,
                        visited: visited
                    }
        
                )


            } else {
                alert("Network error: failed to upload service")
            }
        })
       
    } else {
        //duration can change
        //image src can change
        //description can change
        //price can change
        if (imgSrc!=null){
            var imageName = service.MainImage.slice(0,-4)
            console.log("THE PARSED IMAGE NAME")
            console.log(imageName)
            postServiceImage(imageName, service.id)
        }

        console.log("IN SERVICE UPDATE DESCRIPTION")
        console.log(description)
        

        var params = {
            id: service.id,
            duration: duration, 
            description: description, 
            price: price, 
            mainImage: imgSrc, 
        }
        console.log("THE UPDATE PARAMS")
        console.log(params)
        updateService(params, (result)=> {
            if (result==null){
                alert("Error occured while making updates")
                return
            } else {
                props.navigation.navigate(
                    "Profile", {
                        isNew: !isNew,
                        stylistPayload: stylistPayload,
                        formattedNum: formattedNum,
                        phoneNum: phoneNum,
                        visited: visited
                    }
        
                )
            }
        })

        //we are updating an existing service here

    }
}

    var deleteElem = null
    if (databaseFetch==true && serviceId!=null){
        deleteElem =  <View style={styles.imageBox}>
        <TouchableOpacity onPress={()=> removeService()}>
         <Ionicons name={'trash-outline'} size={30}/>
         </TouchableOpacity>
     </View>
    }
  
    //there is a list of radio buttons and once they click on them then they are passed the phone number, will fix in caching
    //after that we have to see if service exists for client or not so search a service element in services table where 
    //this is a new stylist but by the time they are at their storefront they already have to be signed up -> so create a new stylist

   console.log('THE SERVICE IN ITEM SCREEN BEFORE RETURN STATEMENT')
   console.log(service)

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
            <Spinner 
            visible={spinner}
            />
            <SchedualeHeader backwards={goBack}/>
            <ScrollView style={{ 
            height: Dimensions.get('window').height}}
            contentContainerStyle={{
                paddingBottom:'10%'
            }}
            
            >
                {databaseFetch && service!=null && 
            <ImageCarasoul isNew={!isRegistered} id={service.id} src={service.MainImage} callback={returnImgSrc}/>    
                }
                {databaseFetch && service==null && 
            <ImageCarasoul isNew={!isRegistered} id={null} src={null} callback={returnImgSrc}/>    
                }
         
            <View style={styles.body}>
                <Text style={{
                    color: "#1A2232",
                    fontSize:20,
                    fontFamily: 'Poppins-Medium',
                    paddingLeft:20,
                    paddingTop:10
                }}>{categoryOption}</Text>
            <View style={styles.inputBox}>
            <Text style={{
                color: "#1A2232",
                fontFamily: "Poppins-Regular",
                fontSize:14,
                marginBottom:10,
                
                fontWeight: '600',
            }}>Description</Text>
                <TextInput
                style={{
                    width:Dimensions.get("window").width-40,
                    alignSelf: 'center',
                    height:50,
                    backgroundColor: 'white',
                    borderWidth:1,
                    borderColor: 'lightgray',
                    marginTop:10,
                 
                    marginBottom:20,
                    fontSize:18,
                    paddingLeft: 10
                }}
                value={description}
                onChangeText={setDescription}
               
                placeholder={"Enter description"}
                returnKeyType={'done'}


                
                ></TextInput>

           </View>
           <View style={styles.inputBox}>
               <View style={styles.rowBox}>

               <View>
                <Text style={{
                     color: "#1A2232",
                     fontFamily: "Poppins-Regular",
                     fontSize:14,
                     marginBottom:10,
                     fontWeight: '600',
                }}>Price</Text>
                    <TextInput
                    style={{
                
                        width:Dimensions.get("window").width*0.2,
                        alignSelf: 'center',
                        height:50,
                        borderBottomWidth:1,
                        borderBottomColor: 'grey',
                        marginBottom:20,
                        fontSize:18,
                    }}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType={'numeric'}
                    placeholder={"0.00"}
                    returnKeyType={'done'}
                    
                    ></TextInput>
                </View>
                <View>
                 
                    <Text style={{
                        color: "#1A2232",
                        fontFamily: "Poppins-Regular",
                        fontSize:14,
                        marginBottom:10,
                        
                        fontWeight: '600',
                    }}>Duration</Text>
                    
                    <View style={{flexDirection:'row'}}>
                    <TextInput
                   
                    style={{
                       
                        width:Dimensions.get("window").width*0.2,
                        alignSelf: 'center',
                        height:50,
                        borderBottomWidth:1,
                        borderBottomColor: 'grey',
                        marginBottom:20,
                        fontSize:18,
                    }}
                    
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType={'numeric'}
                
                    placeholder={"0"}
                    returnKeyType={'done'}
                    
                    ></TextInput>
                    <Text style={{ paddingTop:35,fontSize:13,marginLeft:5, fontFamily: 'Poppins-Regular'}}>min</Text>
                    </View>

                </View>
            </View>
           </View>
           <View>

           </View>
           

            </View>
            </ScrollView>
            
        
           {deleteElem}
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                height:60,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                width: Dimensions.get('window').width,
                position: 'absolute',
                bottom:0,
                marginBottom:20
            }} disabled={disable} onPress={()=>submit()}>
                <Text style={styles.confirmText}>Submit</Text>
            </TouchableOpacity>

           
        
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:'100%'
    },
    rowBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:30
        
    },
    inputBox: {
        width: '100%',
        height: 100,
        paddingTop:30,
        paddingLeft:20,
        paddingRight:20
        
      

    },
    inputText: {
        color: "#1A2232",
        fontFamily: "Lato-Semibold",
        fontSize:14,
        marginBottom:10,
        
        fontWeight: '600',
        
        
    },
    input: {
        width:Dimensions.get("window").width-40,
        alignSelf: 'center',
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        
        marginBottom:20,
        fontSize:18,
        paddingLeft: 10
    },
    smallInput: {
        width:Dimensions.get("window").width*0.2,
        alignSelf: 'center',
        height:50,
       
        borderBottomWidth:1,
        borderBottomColor: 'grey',
       
        
        marginBottom:20,
        fontSize:18,
       
        

    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        height:50,
     
      
        alignSelf: 'center',
        backgroundColor: "#1A2232",

        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom:0,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
       
      
        
        marginBottom:20,
        height:50,
       
    },
    serviceName: {
        color: "#1A2232",
        fontSize:20,
        
        fontFamily: 'Lato-Heavy',
        paddingLeft:20,
        paddingTop:10
    },
    imageBox: {
        backgroundColor: '#dae0ee',
        borderRadius: 100,
        height: 50,
        width:50,
    
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop:20,
        
        bottom:90,
        right:20,
        position:'absolute'

    },

})
export default Item