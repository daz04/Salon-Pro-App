import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity , Picker} from 'react-native';
import Modal from 'react-native-modal'
import {Ionicons} from 'react-native-vector-icons'
import Svg, {SvgXml} from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker'

// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

// import {RNS3} from 'react-native-aws3'
// import S3 from 'react-aws-s3'
import {getServiceMedia} from '../../S3/functions'



const ImagesModal = (props) => {
    
    const [postLink, setLink] = useState(null)
    const [linkFetched, setlinkFetched] = useState(null)
    var service = props.service
    var id = service.Id
    console.log("THE SERVICE ID")
    console.log(id)
    const getMedia = () => {
        getServiceMedia(service.Id, (result)=> {
            setQueue(result)
            setMain(result[0])
        })
    }
    
    
    const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    var imageElem = <SvgXml style={styles.camera} xml={xml} width={50} height={50}/>
    const [newImage, addImage] = useState(imageElem)
    const [imagesQueue, setQueue] = useState([])
    const [mainImage, setMain] = useState(0) 
    const [bucketName, setBucketName] = useState("services")
    const [visible, setVisibile] = useState(true)
    var file = null
    const region = "us-east-1"
    if (imagesQueue.length==0){
        getMedia()
    }
    
   

    const pickImage = async() => {
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
        file = {
            uri: result.uri,
            name: String(imagesQueue.length)+".png",
            type: "image/png"
        }
        // const BUCKET_NAME = "service-media"
        // const IAM_USER_KEY = "AKIA4LZB5JKED4DCDXIB"
        // const IAM_USER_SECRET = "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"
        
        // AWS.config.update({
        //     accessKeyId: IAM_USER_KEY,
        //     secretAccessKey: IAM_USER_SECRET
        // })
        // var myBucket = new AWS.S3({
        //     params: {Bucket: "service-media"},
        //     region: "us-east-1"
        // })
        
        // const params = {
        //     ACL: 'public-read',
        //     Key: file.name,
        //     ContentType: file.type,
        //     Body: file.base64
        // }
        // myBucket.listObjects((err,data)=> {
        //     if (err){
        //         console.log(err)
        //     } else {
        //         console.log("IN LIST OBJECTS FOR BUCKET")
        //         console.log(data)
        //     }
        // })
        // myBucket.putObject(params).send((err)=> {
        //     if (err){
        //         console.log(err)
        //     }
        // })
        // RNS3.put(file, {
        //     keyPrefix:id+"/",
        //     bucket: 'service-media',
        //     region: 'us-east-1',
        //     accessKey: 'AKIA4LZB5JKED4DCDXIB',
        //     secretKey: "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",
        //     successActionStatus: 201,
        //     acl: 'public'
        // }).progress((progress) =>{
        //     console.log("progress")
        //     console.log(progress)

        //     }
            
        // )
      
        // .then((response)=> {
        //     console.log(response)
        // })
        setQueue(imagesQueue=> ([...imagesQueue,result.uri]))
        
       
        // const config = {
        //     bucketName: BUCKET_NAME,
        //     region: "us-east-1",
        //     accessKeyId: IAM_USER_KEY,
        //     secretAccessKey: IAM_USER_SECRET
        // }
        // const ReactS3Client = new S3(config)
        // const newFileName = 'test-file'
        // ReactS3Client.uploadFile(file, newFileName).then(
        //     data=>console.log(data)
        // )
        // .catch(err=> console.error(err))
        
        // RNS3.put(file,options).then(response=> {
        //     console.log("RESPONSE")
        //     console.log(response)
        //     if (response.status !== 201){
        //         throw new Error("Failed to upload image")
        //     }
        // })

    }
    const exit = () => {
        console.log("IN EXIT FUNCTION")
        console.log(props)
        setVisibile(false)
        props.returnFunc()
    }
    
    return (
        <View style={styles.overview}>
            <Modal
            isVisible={visible}>
                <View style={styles.body}>
                <ScrollView scrollEnabled={true} style={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.uploadImage}>
                        <TouchableOpacity onPress={()=>pickImage()}>
                            {newImage}

                        </TouchableOpacity>

                    </View>
                    <View style={styles.images}>
                        {imagesQueue.map((image)=>{
                            return (
                                <View style={styles.imageFrame}>
                                <TouchableOpacity style={styles.iconBox}>
                                    <Ionicons name="md-close-circle-outline" size={25} style={styles.imageClose}/>
                                </TouchableOpacity>
                                <Image source={{uri:image}} style={styles.imageBox}/>
                                <Text style={{display: image==mainImage?"block":"none", alignSelf: 'center'}}>Main Image</Text>
                                </View>
                            )

                        })}

                    </View>
                    
                </View>
                
                </ScrollView>
                <TouchableOpacity style={styles.updateBox} onPress={()=>exit()}>
                    <Text style={styles.updateText}>SAVE</Text>
                </TouchableOpacity>
                </View>
                

            </Modal>
        </View>
    )

}
const styles = StyleSheet.create({
  
    container: {
        flexDirection: 'column',
        // width: '90%',
        // height:'50%',
        backgroundColor: "white",
      

    },
    scroll: {
        width:'100%',
        height: '40%',
        flex:1
    },
    body: {
        height: '50%',
        width:'90%',
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imageFrame:{
        padding:7,
        
        
    },
    imageBox: {
        height:100,
        width:100,
        borderRadius:20

    },
    imageClose: {
        
    },
    iconBox: {
        
        alignSelf:'flex-end',
        top:10,
        backgroundColor: "white",
        width:23,
        height:23,
        borderRadius:100,
        zIndex: 1
        

    },
    uploadImage: {
        backgroundColor: '#dae0ee',
        borderRadius: 100,
        height: 120,
        width:120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:20
    },
    updateBox: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
       
        position: 'absolute',
        bottom:0,
        borderRadius:0,
        padding:20,
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        // height: 50,
        width:'100%'
    },
    updateText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16
    }

})
export default ImagesModal