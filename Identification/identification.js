import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import SchedualeHeader from '../Headers/scheduale'
import {ProgressBar, Colors} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Svg, {SvgXml} from 'react-native-svg';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

const Identification = (props) => {
  
    var stylistPayload = props.navigation.state.params.stylistPayload
    console.log("AT STYLIST PAYLOAD IDENTIFICATION")
    console.log(stylistPayload)
    // var stylistId = stylistPayload.id
    var phoneNum = stylistPayload.phone
    const [stylistId, setId] = useState(null)
    const [imageSrc, setImage] = useState("")
    const [disable, setDisable] = useState(true)
    const [file,setFile] = useState(null)
    const [signedURL, setURL] = useState(null)
    const getId = async () => {
        var id = await AsyncStorage.getItem("stylistId")
        console.log("ID FIXED")
        console.log(id)
        setId(id)

    }

    if (stylistId==null){
        getId()

    }


    const requestUpload = async () => {
        console.log("IN REQUEST UPLOADDDDDDDDDD")
        axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/identificationUrl?stylistId=${stylistPayload.id}`).then(res=>{
            console.log("UPLOAD RESULTTTTTTT")
           
            
            res = res.data.url
            console.log(res)
            setURL(res)

        }).catch(e=> {
            console.log("Request upload error")
            console.log(e)
        })

    }

    if (signedURL==null){
        requestUpload()
    }
    console.log("IN SIGNED URL AFTER")
    console.log(signedURL)

    const uploadImageToS3 = async (file) => {
        console.log("THE IMAGE SIZE")
        Image.getSize(file.uri, (width,height)=> {
            console.log(width)
            console.log(height)
        })
        try {
            console.log("IN UPLOAD IMAGE TO S33")
            console.log(file.uri)
            var response = await fetch(file.uri)
            console.log("FIRST RESPONSE 4")
            console.log(signedURL)
            console.log(response)
            var blob = await response.blob()

            //var blob = file.base64.frombase64String()
            
            // console.log("THE BLOB BASE 64")
            // console.log(blob.toBase64())
            // console.log("THE ORIGINAL BLOB")
            // console.log(file.base64)
            // axios.put(signedURL, blob, {
            //     // headers: {
            //     //     'Content-Type':'application/octet-stream'
            //     // }
            // }).then(response=> {
            //     console.log("AXIOS RESPONSE 2")
            //     console.log(response)
                
                
            

            // }).catch(error=> {
            //     console.log("SIGNED URL PUT ERROR")
            //     console.log(error)

            // })
            fetch(signedURL, {
                method: 'PUT',
                body: blob
            })
            const {navigate} = props.navigation

                navigate("Subscription", {
                    stylistPayload: stylistPayload,
                    formattedNum: phoneNum
                })
           
           
            

        } catch (e){
            console.log("ERROR IN UPPLOAD IMAGE TO S3")
            console.log(e)

        }
        
    //     try {
    //         var response = await fetch(file.uri)
    //         console.log("FIRST RESPONSE")
    //         console.log(response)
    //         var blob = await response.blob()
    //         // Storage.put('test.txt','File Content',{
    //         //     region: 'us-east-1',
    //         //     bucket: 'stylist-identification',
    //         //     accessKeyId: "AKIA4LZB5JKED4DCDXIB",
    //         //     secretAccessKey: "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",
    //         //     progressCallback(progress) {
    //         //         console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    //         // },
                
    //         // })
    //         await Storage.put(`${stylistId}/identification.jpg`,blob, {
    //             contentType: 'image/jpg',
    //             region: 'us-east-1',
    //             bucket: 'stylist-identification',
    //             progressCallback(progress) {
    //                 console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    //         },
    //         });
           
            
            
    //     } catch (err){
    //         console.log("Error uploading file:",err)
    //     }

    //     // RNS3.put(file, {
    //     //     keyPrefix:`${stylistId}/`,
    //     //     bucket: 'stylist-identification',
    //     //     region: 'us-east-1',
    //     //     accessKey: 'AKIA4LZB5JKED4DCDXIB',
    //     //     secretKey: "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",
    //     //     successActionStatus: 201
    //     // }).progress((progress) =>{
    //     //     console.log("progress")
    //     //     console.log(progress)

    //     //     }
            
    //     // )
      
    //     // .then((response)=> {
    //     //     console.log(response)
    //     // })
    //     // .catch((error)=> {
    //     //     console.log("ERROR")
    //     //     console.log(error)
    //     // })
     }
    const addImage = async () => {
        console.log("THE SIGNING URL")
        console.log(signedURL)     
        console.log("IN ADD IMAGE")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:1,
            base64: true

        })
        
        console.log("THE RESULT BASE64")
        console.log(result.base64)
        var file = {
            uri: result.uri,
            name: "identification.jpg",
            type: "image/jpg",
            
        }
        if (!result.cancelled){
            const manipResult = await ImageManipulator.manipulateAsync(
                file.uri, 
                [{resize: {width: 640, height: 480}}],
                {format: 'jpeg'}
            
              
            )
            console.log("THE MANIPULATED RESULT 2")
            console.log(manipResult)
            console.log(file.uri)
            var newFile = {
                uri: manipResult.uri, 
                name: "identification.jpg",
                type: "image/jpg",       
            }
          
            setImage(imageSrc=> manipResult.uri)
            setFile(newFile)
            // setImage(imageSrc=> file.uri)
            // setFile(file)
            setDisable(false)
            
           
           
            

        
        }




    }
    const goBack = () => {
        props.navigation.goBack()
    }

    const submit = () => {
        if (imageSrc==""){
            alert("Upload iamge before proceeding")

        } else {
            const {navigate} = props.navigation
            uploadImageToS3(file)
            
            
        }
    }
    //at this level should include stylist id as well
    var imageElem = null 
    if (imageSrc==""){
        const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
        var imageElem = 
        <View style={styles.imageBox}>
        <TouchableOpacity onPress={()=> addImage()}>
        <SvgXml  style={styles.camera} xml={xml} width={40} height={40}/>
        </TouchableOpacity>
    </View>

    } else {
        
        imageElem = <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%'}}><Image source={{uri:imageSrc}} style={styles.imageFill}/>
        </TouchableOpacity>
    }
  

    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.stepHeader}>
                <Text style={styles.stepText}>
                    Step 1 
                </Text>
                <ProgressBar progress={0.33} color={"#1A2232"} style={styles.progressBar}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.signup}>ENTER IN A FORM OF IDENTIFICATION</Text>
                <Text>Upload an image of a form of ID (passport, driver's license, etc...)</Text>
                  
                <View style={styles.imgRectangle}>
                            
                            <View style={styles.imgContainer}>
                           
                                {/* <View style={styles.imageBox}>
                                    <TouchableOpacity onPress={()=> addImage()}> */}
                                    {imageElem}
                                    {/* </TouchableOpacity>
                                </View> */}
                            
                            </View>
                            
                            </View>
            </View>
            <View style={styles.confirmBox}>
            
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: 'center',
                height:Dimensions.get('window').height*0.08,
                alignSelf: 'center',
                backgroundColor: disable?"grey":"#1A2232",
                flex:1,
                width: Dimensions.get('window').width,
            }} disabled={disable} onPress={()=>submit()}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>
           </View>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'

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
    signup: {
        fontWeight: '600',
        

    },
    imageBox: {
        backgroundColor: '#dae0ee',
        borderRadius: 100,
        height: 100,
        width:100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:40

    },
    // imgContainer: {
    //     marginLeft:20,
    //     marginRight:20
    // },
    imgRectangle: {
        // marginLeft:20,
        marginTop:'20%',
        height:Dimensions.get('window').width*0.5,
        width:Dimensions.get('window').width-40,
        borderWidth:1,
        borderColor:'grey'
    },
    imageFill: {
        width:'100%',
        height:'100%'
    },
    confirm: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
        
       
        // position: 'absolute',
        // bottom:0,
        height:50,
        
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        
        flex:1,
        width: Dimensions.get('window').width,
       
        
        


    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    },
    confirmBox: {
      
        marginTop:20,
        
    
        bottom:0,
        position: 'absolute'
       
    },
    body: {
        paddingTop:40,
        marginLeft:20,
        marginRight:20

    },


})
export default Identification 