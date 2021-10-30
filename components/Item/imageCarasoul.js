// import React, {useEffect, useState} from 'react';
// import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator} from 'react-native';
// import { useFonts } from 'expo-font';
// import ImageItem from './image';
// import Svg, {SvgXml} from 'react-native-svg';
// import * as ImagePicker from 'expo-image-picker'
// import {getService} from '../../Database/functions'
// import axios from 'axios';
// import * as ImageManipulator from 'expo-image-manipulator'
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// // import ImagePicker from 'react-native-image-crop-picker';


// // import {RNS3} from 'react-native-aws3'

// const ImageCarasoul = (props) => {
//     var isNew = props.isNew 
//     var id = props.id
//     var service = props.service

//     console.log("BACK IN IMAGE CARASOUL")
 
   
//     const [imageSrc, setImage] = useState(null)
//     const [uploadUrl, setURL] = useState(null)
//     const [imageFetched, setFetched] = useState(false)
//     const [loading, setLoading] = useState(true)
//     const [refresh, setRefresh] = useState(false)


//     useEffect(()=> {
//         console.log("IN IMAGE CARASOUL 12345")
//         console.log(isNew)
//         if (isNew==false){
//             //means that this service that the stylist offers already exists
//             computeSignedUrl((result)=> {
//                 if (result!=null){
//                     console.log("IN COMPUTE THE SIGNED URL RESULT")
//                     console.log(result)
//                     setURL(result)
//                 }
//             })
//         }
       
//         if (uploadUrl!=null && imageSrc==null){
//             console.log("ABOUT TO FETCH PIC 2")
//             fetchPic((result)=> {
//                 if (result!=null){
//                     console.log("IN FETCH PIC RESULT CALLBACK IS NOT NULL 3")
//                     setImage(result)
//                     setRefresh(!refresh)
//                 }
//             })
            

//         }
        



//     },[uploadUrl])
   

//     const computeSignedUrl = async (callback) => {
//         var imageSrcForService = service.MainImage 
//         //if a service is registered -> then by default it has a main image 
//         axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${service.id}&imgName=${imageSrcForService}`).then(response=> {
//                 console.log("FETCH SERVICE PIC RESPONSE")
//                 console.log(response)
//                 callback(response.data.url)
                
//             }).catch(err=> {
//                 console.log("FETCH SERVICE PIC ERROR")
//                 console.log(err)
//                 callback(null)
//             })
      
  
    
//     }
  
    


//     const fetchPic = (callback) => {
      
//             axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceImage?serviceId=${service.id}&photoName=${service.MainImage}`).then(response=> {
//                 console.log("FETCH PROFILE PIC RESPONSE WIN")
//                 console.log(response.data.url)
//                 callback(response.data.url)
                
//             }).catch(err=> {
//                 console.log("FETCH PROFILE PIC ERROR HERE")
//                 console.log(err)
//                 callback(null)
//             })
//             // setLoading(false)
//     }

       
        
    

  

//     const addImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             aspect: [4,3],
//             quality:1,
//         })
        
//         console.log(result)
//         var imageWidth = result.width
//         var imageHeight = result.height 
//         var heightWidthRatio = imageHeight/imageWidth
//         var adjustedHeight = 600 
//         if (heightWidthRatio>1){
//             console.log("THE HEIGHT TO WIDTH RATIO")
//             console.log(heightWidthRatio)
//             //means height is greater than width
//             adjustedHeight = 600 * heightWidthRatio 
//             console.log("ADJUSTED HEIGHT")
//             console.log(adjustedHeight)
//         }
//         console.log("ORIGINAL IMAGE WIDTH AND HEIGHT 1234")
//         console.log(imageWidth)
//         console.log(imageHeight)
//         var file = {
//             uri: result.uri,
//             name: "image.png",
//             type: "image/png"
//         }


  
//         if (!result.cancelled){
//             console.log("RESULT URI")
//             console.log(result.uri)
//             const manipResult = await ImageManipulator.manipulateAsync(
//                 file.uri, 
//                 // [{crop: { originX:0, originY:imageHeight/2, width:imageWidth, height:imageHeight}}],
//                 [{resize: {width: 600 , height: adjustedHeight}}],

//                {compress:1},
//                 {format: 'jpeg'}
            
              
//             )
          
//             setImage(imageSrc=> file.uri)

//             props.callback(manipResult.uri)

//         }
//     }
 

//     var imageElem = null 
//     const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    
//     if (imageSrc==null){
       
//         var imageElem = 
//         <View style={styles.imageBox}>
//         <TouchableOpacity onPress={()=> addImage()} style={{flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
//         <SvgXml  style={{alignSelf:'center'}} xml={xml} width={40} height={40}/>
//         </TouchableOpacity>
//         </View>

//     } else {
//         console.log("IMAGE SRC IS NOT AN EMPTY STRING")
//         console.log(imageSrc)
//         imageElem = <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%', alignSelf:'center'}}><Image source={{uri:imageSrc}} style={styles.imageFill}/>
//         </TouchableOpacity>
//     }
//     var images = [imageElem]
    
    
//     //if isNew we are not going to fetch in the database for existing images
    

//     //handle case if it's not new
//     console.log("THE IMAGE SRC BEFORE THE RETURN STATEMENT")
//     console.log(imageSrc)
//     return (
//         <View style={{width:'100%'}}>
//             <ScrollView horizontal={true} style={{width:'100%'}}>
//                 <View style={styles.imgRectangle}>  
//                 <View style={styles.imgContainer}>
//                     {images.map(image=> {
//                          <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%', alignSelf:'center'}}>
//                          <Image source={{uri:imageSrc}} style={styles.imageFill}/>
//                      </TouchableOpacity>

//                     })}
//                 {/* {imageSrc!=null &&
//                    <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%', alignSelf:'center'}}>
//                        <Image source={{uri:imageSrc}} style={styles.imageFill}/>
//                    </TouchableOpacity>
                  
//                 } */}
//                 {
//                     imageSrc==null && service==null && 
//                     <View style={styles.imageBox}>
//                     <TouchableOpacity onPress={()=> addImage()} style={{flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
//                     <SvgXml  style={{alignSelf:'center'}} xml={xml} width={40} height={40}/>
//                     </TouchableOpacity>
//                     </View>


//                 }
//                 </View> 
//                 </View>

                


//             </ScrollView>

//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         width:'100%',
//         height:200
//     },
//     loadingBox: {

//         height: 100,
//         width:100,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop:20

//     }, 
//     imageBox: {
//         backgroundColor: '#dae0ee',
//         borderRadius: 100,
//         height: 100,
//         width:100,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop:20

//     },
   
//     imgRectangle: {
//         alignSelf:'center',
//         flexDirection:'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height:315,
//         width:Dimensions.get('window').width,
//         borderWidth:1,
//         borderColor:'grey'
//     },
//     imageFill: {
//         width:'100%',
//         height:'100%',
//         alignSelf:'center'
//     }

// })
// export default ImageCarasoul

import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useFonts } from 'expo-font';
import ImageItem from './image';
import Svg, {SvgXml} from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker'
import {getService} from '../../Database/functions'
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from "react-native-fast-image"

const ImageCarasoul = (props) => {
    var isNew = props.isNew 
    var phoneNum = props.phoneNum
    var id = props.id
    var src = props.src
    console.log("IMAGE CARASOUL DETAILS 2")
    console.log(id)
    console.log(src)
    console.log("CHECKING IS NEW IN IMAGE CARASOUL")
    console.log(isNew)

    console.log("THE LINK TO SEND OUT 12345")
    console.log(`https://service-media.s3.amazonaws.com/${id}/${src}`)
    
    console.log("IN IMAGE CARASOUL")
    console.log(id)
    console.log(src)
    var url = `https://service-media.s3.amazonaws.com/${id}/${src}`
    console.log(`https://service-media.s3.amazonaws.com/${id}/${src}`)

    const [imageSrc, setImage] = useState("")
    const [uploadUrl, setURL] = useState(null)
    const [imageFetched, setFetched] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        console.log("IN USE EFFECT FOR IMAGE CARASOUL 2")
        console.log(src)
        if (src!=null){
            setImage(`https://service-media.s3.amazonaws.com/${id}/${src}`)

        }
       
    },[])


    const computeSignedUrl = async () => {
        if (id!=null && src!=null){
            
            axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceUrl?serviceId=${id}&imgName=${src}`).then(response=> {
                console.log("FETCH SERVICE PIC RESPONSE")
                console.log(response)
                setURL(response.data.url)
            }).catch(err=> {
                console.log("FETCH SERVICE PIC ERROR")
                console.log(err)
            })
           
           
        }
        
    
    }
  
    


    const fetchPic = () => {
        if (id!=null && src!=null){
            console.log("IN FETCH PIC IMAGE CARASOUL SRC 2")
            console.log(src)

        
        try {
            console.log("IN TRY STATEMENT")
            axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/serviceImage?serviceId=${id}&photoName=${src}`).then(response=> {
                console.log("FETCH PROFILE PIC RESPONSE")
                console.log(response)
                setImage(response.data.url)
            }).catch(err=> {
                console.log("FETCH PROFILE PIC ERROR")
                console.log(err)
            })
           

        } catch (e) {
            console.log(e)

        }
        setFetched(true)
    }
        
    }

    console.log("THE IMAGE ELEM")
    console.log(imageElem)


    const addImage = async () => {
        // console.log("IN ADD IMAGE 456")
        // ImagePicker.openPicker({
        //     width:240,
        //     height: 255,
        //     cropping:true
        // }).then(image=> {
        //     console.log("OPEN PICKER RESULT")
        //     console.log(image)

        // })
        // launchImageLibrary({maxHeight:255, maxWidth:240}, ((result)=> {
        //     console.log("LAUNCH IMAGE LIBRARY RESULT")
        // }))


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4,3],
            quality:1,
         
          

        })
        
        console.log(result)
        var imageWidth = result.width
        var imageHeight = result.height 
        var heightWidthRatio = imageHeight/imageWidth
        var adjustedHeight = 600 
        if (heightWidthRatio>1){
            console.log("THE HEIGHT TO WIDTH RATIO")
            console.log(heightWidthRatio)
            //means height is greater than width
            adjustedHeight = 600 * heightWidthRatio 
            console.log("ADJUSTED HEIGHT")
            console.log(adjustedHeight)
        }
        console.log("ORIGINAL IMAGE WIDTH AND HEIGHT 1234")
        console.log(imageWidth)
        console.log(imageHeight)
        var file = {
            uri: result.uri,
            name: "image.png",
            type: "image/png"
        }
        if (!result.cancelled){
            console.log("RESULT URI")
            console.log(result.uri)
            const manipResult = await ImageManipulator.manipulateAsync(
                file.uri, 
                // [{crop: { originX:0, originY:imageHeight/2, width:imageWidth, height:imageHeight}}],
                [{resize: {width: 600 , height: adjustedHeight}}],

               {compress:1},
                {format: 'jpeg'}
            
              
            )
          
            setImage(imageSrc=> file.uri)

           
            props.callback(manipResult.uri)
           
            

        
        }
    }

    const onLoadCallback = (response) => {
        console.log("IN ON LOAD CALLBACK 1")
    }
  

    var imageElem = null 
    console.log("THE IMAGE SRC IN CARASOUL")
    console.log(imageSrc)
    if (imageSrc==""){
        console.log("THE IMAGE SRC IS EMPTY")
        const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
        var imageElem = 
        <View style={styles.imageBox}>
        <TouchableOpacity onPress={()=> addImage()} style={{flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
        <SvgXml  style={{alignSelf:'center'}} xml={xml} width={40} height={40}/>
        </TouchableOpacity>
    </View>

    } else {
        
        imageElem = <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%', alignSelf:'center'}}>
            <FastImage
                style={{
                    height:'100%',
                    width:Dimensions.get('window').width
                }}
                source={{
                    uri: imageSrc,
                    priority: FastImage.priority.high,
                }}
                onLoad={(event)=> {
                    console.log("IN FAST IMAGE ON LOAD EVENT")
                    setLoading(false)
                    console.log("IN ON LOAD")
                }}
                resizeMode={FastImage.resizeMode.cover}
               
            />
        </TouchableOpacity>
    }
    var images = [imageElem]

    return (
        <View style={{width:'100%'}}>
            <ScrollView horizontal={true} style={{width:'100%'}}>
                {images.map(image=> {
                    return (
                        <View style={styles.imgRectangle}>
                            {loading ? 
                             <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color="#1A2232"/>
                            </View>
                            :
                            
                        <View style={styles.imgContainer}>
                       
                            {/* <View style={styles.imageBox}>
                                <TouchableOpacity onPress={()=> addImage()}> */}
                                {image}
                                {/* </TouchableOpacity>
                            </View> */}
                        
                        </View>
                    }
                        
                        </View>
                
                       
                    )
                })}


            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:200
    },
    imgContainer: {
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingBox: {

        height: 100,
        width:100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:20

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
        marginTop:20

    },
   
    imgRectangle: {
        alignSelf:'center',
        flexDirection: 'column',

        height:315,
        width:Dimensions.get('window').width,
        borderWidth:0.5,
        borderColor:'lightgrey'
    },
    imageFill: {
        width:'100%',
        height:'100%',
        alignSelf:'center'
    }

})
export default ImageCarasoul