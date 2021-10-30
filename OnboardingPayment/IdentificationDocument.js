import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import CreditCardHeader from '../Headers/CreditCardHeader'
import Svg, {SvgXml} from 'react-native-svg';
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import FastImage from "react-native-fast-image"


const IdentificationDocument = ({navigation}) => {
    var validDocumentList = ["Passport", "Passport card","Driver license","State issued ID card", "Resident permit ID / U.S. Green Card", "US Visa Card", "Birth certificate"]
    const [uploadUrl, setuploadUrl] = useState(null)
    const [imageSrc, setimageSrc] = useState(null)


    useEffect(()=> {
        computeSignedUrl




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

    const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
        'Lato-Regular': require("../assets/fonts/Lato-Regular.ttf"),
        'Lato-Medium': require("../assets/fonts/Lato-Medium.ttf"),
        'Lato-Semibold': require("../assets/fonts/Lato-Semibold.ttf"),
        'Lato-Heavy': require("../assets/fonts/Lato-Heavy.ttf")

    });
    const addImage = async () => {
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
            setimageSrc(imageSrc=> file.uri)
        
        }
    }
     return (
    <View style={styles.container}>
        <CreditCardHeader/>
        {fontsLoaded && 
        <View style={styles.body}>
             <Text style={{
                    fontFamily: 'Poppins-Medium',
                    alignSelf: 'center',
                    fontSize: 18,
                    marginBottom:10,
                    marginTop:20
                }}>Upload a valid form of ID</Text>
             <Text style={{
                   fontFamily: 'Poppins-Regular',
                   alignSelf: 'center',
                   marginBottom:20
               }}>We need this information to verify your identity</Text>
            
               <View style={styles.imgRectangle}>
                          {imageSrc==null && 
                            
                        <View style={styles.imgContainer}>
                        <View style={styles.imageBox}>
                            <TouchableOpacity onPress={()=> addImage()} style={{flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                            <SvgXml  style={{alignSelf:'center'}} xml={xml} width={40} height={40}/>
                            </TouchableOpacity>
                        
                        </View>
                    
                        
                        </View>
                }
                {imageSrc!=null && 
                <TouchableOpacity onPress={()=>addImage()} style={{width:'100%',height:'100%', alignSelf:'center'}}>
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
                      
                        console.log("IN ON LOAD")
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                   
                />
            </TouchableOpacity>

                }
                </View>
                <View style={{
                    marginTop:20
                }}>
                <Text style={{
                   fontFamily: 'Poppins-Regular',
                   alignSelf: 'center'
               }}>Examples of valid documents:</Text>
               {validDocumentList.map((document)=>
               <Text style={{
                   marginLeft:20,
                   marginRight:20,
                   fontFamily: 'Poppins-Regular',
                   fontSize:12,
                   
               }}>• {document}</Text>
               )}
               </View>
        </View>
        }
          <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                display: imageSrc==null?'none':'flex',
                justifyContent: 'center',
                bottom: Dimensions.get('window').height<=1000?Dimensions.get('window').height*0.05:Dimensions.get('window').height*0.15,
                padding:'2%',
                alignSelf: 'center',
                backgroundColor: "black",
                height: Dimensions.get('window').height*0.08,
                width: Dimensions.get('window').width
            }} onPress={()=>initializeAccount()}>
                <Text style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'white',


                }}>Continue</Text>
            </TouchableOpacity>


    </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'

    },
    body: {
        marginRight:20,
        marginLeft:20,
        height:'85%'
     
    },
    imgRectangle: {
        alignSelf:'center',
        flexDirection: 'column',
        justifyContent:'center',

        height:315,
        width:Dimensions.get('window').width,
        borderWidth:0.5,
        borderColor:'lightgrey'
    },
    imageFill: {
        width:'100%',
        height:'100%',
        alignSelf:'center'
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

})
export default IdentificationDocument