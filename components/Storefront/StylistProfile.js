import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator} from 'react-native';
import {getStylistId, getStylist, setStylistProfilePic} from '../../Database/functions'
import {Feather} from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {putDisplayPhoto} from '../../S3/functions'
import TitleModal from './titleModal'
import Svg, {SvgXml} from 'react-native-svg';
import axios from 'axios'

import * as ImageManipulator from 'expo-image-manipulator'

const StylistProfile = (props) => {
    console.log("STYLIST PROFILE TITLES")
    console.log(props.titles)
    //console.log("STYLIST PROFILE")
    //console.log(props.titles)
    var id = props.id
    console.log("THE STYLIST PROFILE ID PASSED 2")
    console.log(id)
    const [titleModal, setModal] = useState(null)
    const [stylist, getstylist] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [titles, setTitles] = useState(props.titles)
    const [firstName, setFirst] = useState(props.firstName)
    const [lastName, setLast] = useState(props.lastName)
    const [profilePicUrl, setprofilePic] = useState(null)
    const [image, setImage] = useState(null)
    const [signedURL,setURL] = useState(null)
    const [fetchImage, setfetchImage] = useState(false)
    const [loading, setLoading] = useState(false)

    if (titles.length!= props.titles.length){
        //assuming this means we reloaded
        setTitles(props.titles)
    }


    console.log("THE PAGE REFRESHED 2")
    console.log(image)

    // const fetchProfilePic = () => {
    //     setImage(`https://stylist-profile-pic.s3.amazonaws.com/${id}/profile_photo.png`)
       
    // }

    // const fetchInformation = (response) => {
    //     if (response.data!=null){
    //         var res = response.data[0]
    //         setFirst(res.FirstName)
    //         setLast(res.LastName)
    //         setTitles(res.Titles)
    //     }

    // }
    const fetchProfilePic = () => {
        //console.log("WE ARE IN THE FETCH PROFILE PIC")
        // try {
            //console.log("IN TRY STATEMENT")
        console.log("Fetch profile pic 2", id);
        try {
        axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/fetchprofilePic?stylistId=${id}`, {
        //axios.get(`http://localhost:6000/fetchprofilePic?stylistId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'cache'
            }
        }).then(response=> {
            console.log("FETCH PROFILE PIC RESPONSE 5")
            console.log(response)
            setImage(profilePicUrl=> response.data.url)
            setLoading(false)
        }).catch(err=> {
            console.log("FETCH PROFILE PIC ERROR 2")
            console.log(err)
        })
        setLoading(true)
        
    } catch(e) {
        console.log("PROFILE PIC STUCK")
        console.log(e)
    }
    setfetchImage(true)
        
    }

    if (fetchImage==false && profilePicUrl==true){
        ////console.log("FETCH IMAGE IS FALSE")
        fetchProfilePic()
    }
   

    const checkForProfilePic = () => {
        //console.log("IN CHECK PROFILE PICCCCCC")
        //console.log("THE STYLIST ID")
        //console.log(id)
        getStylist(id, (result)=> {
            if (result!=null){
                //console.log("IN CHECK FOR PROFILE PIC")
                //console.log(result.data)
                setStylist(result.data)
                if (result.data.length>0){
                    fetchProfilePic()

                }
               
                
            }
            setFetched(true)
        })

    }

    // if (stylist==null){
    //     checkForProfilePic()
    // }


     const requestUpload = async (uri) => {
        console.log("IN REQUEST UPLOADDDDDDDDDD")
        axios.get(`http://nodes3-env.eba-cmt4ijfe.us-east-1.elasticbeanstalk.com/profilePicUrl?stylistId=${id}`).then( async (res)=>{
            console.log("UPLOAD RESULTTTTTTT")
            res = res.data.url
            try {
                //console.log("IN TRY")
                var response = await fetch(uri)
                //console.log("FIRST RESPONSE")
                //console.log(response)
                var blob = await response.blob()
                fetch(res, {
                    method: 'PUT',
                    body: blob
                })
                setImage(profileImage=>uri)
                if (profilePicUrl==false){
                    setStylistProfilePic(id)
                }
            } catch (e){
                //console.log("error")
                //console.log(e)

            }
            //console.log(res)
            setURL(res)

        }).catch(e=> {
            //console.log("Request upload error")
            //console.log(e)
        })
        

    }
    const setDetails = (response) => {
        if (response!=null){
            //console.log("SET DETAILS RESPONSE")
            //console.log(response.data)
            var res = response.data[0]
            //console.log("RES")
            //console.log(res)
            //console.log(res.FirstName)
            //console.log(res.LastName)
            //console.log(res.Titles)
            //should always be the case
            setFirst(res.FirstName)
            setLast(res.LastName)
            setTitles(res.Titles)
            //console.log("THE PROFILE PIC URL")
            //console.log(res.ProfilePictureURL==null)
            if (res.ProfilePictureUrl==null){
                setprofilePic(false)
            } else {
                setprofilePic(true)
            }
           
            // setImage(profileImage=>`https://stylist-profile-pic.s3.amazonaws.com/${id}/profile_photo.png`)
            props.changeTitles(res.Titles)
            
        }

    }

    if (firstName==null && lastName==null && titles.length==0){
        getStylist(id,setDetails)
        //asume this all happens in the same case
        //we are not in the new case, need to fetch name from database

    }
    if (profilePicUrl==null){
        getStylist(id,setDetails)

    }
    // } else {
    //     //this is not a new case
    //     //fetch information
    //     fetchProfilePic()
    //     getStylist(id,fetchInformation)
        
    //     //in fetch information gather first name, last name and titles list


    // }
    

    


    // const setStylist = (stylistObj) => {
       
    //     //console.log("GOT STYLIST OBJECT")
    //     //console.log(stylistObj)
    //     if (stylistObj!=null && typeof(stylistObj)!=='undefined'){
    //         getStylist(stylist=>stylistObj)
    //         setFetched(true)
    //         // for (var title in stylistObj.Titles){
    //         //     setTitles(titles=>([...titles, stylistObj.Titles[title]]))

    //         // }
           
    //         setImage(profileImage=>stylistObj.ProfilePictureURL)
    //         setFirst(firstName=>stylistObj.FirstName)
    //         setLast(lastName=>stylistObj.LastName)
            

    //     } 
    // }
    // if (stylist==null && fetched==false){
    //     var stylistObj = getStylist(id, setStylist)
    //     //console.log("BEFORE REFRESH")
       
        
    // }

    

    const closeFunc = (titles_) => {
        console.log("TITLES AT CLOSE")
        console.log(titles_)
        //console.log("AT CLOSE FUNCCCCCCCCCC STYLIST PROFILE")
        //console.log("CURRENT TITLES")
        //console.log(titles)
        //console.log("NEW TITLES")
        //console.log(titles_)
        // setModal(titleModal=>null)
        // props.changeTitles(titles_)
      
        
        // for (var title in titles){
        //     if (!(titles_.includes(titles[title]))){
        //         setTitles(titles.filter(tit => tit != titles[title]))
        //     }
        // }
        // for (var title_ in titles_){
        //     if (!(titles.includes(titles_[title_]))){
        //         //console.log("TITLE DOES NOT INCLUDE")
        //         setTitles(titles=> ([...titles, titles_[title_]]))
        //     }
        
        // }
        
        

           
    
       }
    const changeTitles = (titles) => {
        console.log("IN CHANGE TITLES")
        console.log(titles)
        props.changeTitles(titles)


    }
    const showTitles = () => {
        props.showTitles()
        // setModal(titleModal => <TitleModal selectedTitles={titles} close={closeFunc} stylistId={id} changingTitles={changeTitles}/>)

    }

    const editProfilePic = async () => {
       console.log("IN EDIT PROFILE PIC")
        
        //console.log("IN EDIT PROFILE PIC")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:1,
            base64: true

        })
        //console.log(result)
        var file = {
            uri: result.uri,
            name: "main.jpg",
            type: "image/jpg"
        }
        if (!result.cancelled){
            console.log("RESULT WAS NOT CANCELLED")
            //console.log("WHAT PICK IMAGE RESULT LOOKS LIKE")
            //console.log(profilePicUrl)
           
            console.log("BEFORE IMAGE MANIPULATOR")
            const manipResult = await ImageManipulator.manipulateAsync(
                file.uri, 
                [{resize: {width: 120, height: 120}}],
                {format: 'jpeg'}
            
              
            )
            console.log("THE MANIPULATE RESULT")
            // var newFile = {
            //     uri: manipResult.uri, 
            //     name: "main.jpg",
            //     type: "image/jpg",       
            // }
            // console.log("THE NEW URI")
            // console.log(manipResult.uri)
            
            

            requestUpload(manipResult.uri)
            props.setProfilePhoto(manipResult.uri)
            
            // props.changeDisable("profile")
        }
        
        
       


    }
    var imageElem = null 
    const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    if (image==null){
        imageElem = <SvgXml  style={styles.camera} xml={xml} width={40} height={40}/>
    } else {
        //imageElem = <CachedImage style={{width:120,height:120, borderRadius: 100}} source={{uri:image}}/>
        imageElem = <Image source={{uri:image}} style={{width:Dimensions.get('window').height<=1000?100:150,height:Dimensions.get('window').height<=1000?100:150, borderRadius: 100, overflow:'hidden'}}/>
    }
    
    //pass stylist id as props to stylist profile

    console.log("STYLIST PROFILE TITLLESS")
    console.log(titles)
    
    return (
        <View style={styles.container}>
            {/* {titleModal} */}
            <TouchableOpacity onPress={()=>editProfilePic()}>
            <View style={styles.imgContainer}>
            
            {loading ?
            <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#1A2232"/>
            </View>
            :
            <View style={styles.imageBox}>
                <TouchableOpacity onPress={()=> editProfilePic()}>
                {imageElem}
                </TouchableOpacity>
            </View>
            }
             
                


            </View>
            </TouchableOpacity>
            <View style={styles.stylistBox}>
                <Text style={styles.name}>{firstName} {lastName}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{height:'auto'}}>
                {titles.map((title)=> {
                    return (
                        <Text style={styles.title}>{title}</Text>

                    )
                })}
                </View>
                <TouchableOpacity onPress={()=>showTitles()}>
                <View style={styles.editTitles}>
                    <Feather name={'edit-2'} size={15}/>
                </View>
                </TouchableOpacity>
                </View>
            
                

            </View>



        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '22%',
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        flexDirection: 'row',
        paddingTop:'7.5%',
        backgroundColor: 'white'

    },
    imgContainer: {
        
            marginLeft:10,
            marginRight:20
        
        

    },
    image: {
        height: 100,
        width: 100,
        borderRadius:100,
        
    },
    name: {
        fontWeight:'600',
        
        fontSize:20
    },
    title: {
        fontWeight:'300',
        fontSize:14,
        color: '#1A2232',
        marginTop:5
    },
    stylistBox: {
       flexDirection: 'column',
 
       paddingTop:'7.5%',
       width: '100%'
   
       
        
    },
    profilepicText: {
        alignSelf: 'center',
        marginTop:5,
        fontSize:11
    },
    editTitles: {
        marginLeft:5,
        marginTop:5
        
    },
    imageBox: {
        backgroundColor: '#dae0ee',
        borderRadius: 100,
        height: Dimensions.get('window').height<=1000?Dimensions.get('window').width*0.25:Dimensions.get('window').width*0.15,
        width:Dimensions.get('window').height<=1000?Dimensions.get('window').width*0.25:Dimensions.get('window').width*0.15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:20

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

})
export default StylistProfile