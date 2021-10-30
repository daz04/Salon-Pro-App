import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Svg, {SvgXml} from 'react-native-svg';
import MenuBar from '../components/menuBar'
import {getStylistId} from '../Database/functions'
import {getStylist} from '../Database/functions'
import {getAddress} from '../Database/functions'
import {StackActions, NavigationActions} from 'react-navigation'
import SettingsHeader from '../Headers/settings'
import {SimpleLineIcons, MaterialIcons, FontAwesome} from 'react-native-vector-icons'
import {Feather} from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import OnboardingCompletionStatus from '../components/OnboardingCompletionStatus'
import { useFonts } from 'expo-font';

const SettingsOverview = (props) => {
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
    console.log("IN SETTINGS OVERVIEW")
    var isBack = null 
    if (props.navigation.state.params!=null && props.navigation.state.params.isBack!=null){
        isBack = props.navigation.state.params.isBack
    } else {
        isBack = true
    }
    console.log("IN SETTINGS OVERVIEW PROPS BACK")
    console.log(isBack)


    const [email, setEmail] = useState(null) 
    const [number, setNumber] = useState(null)
    const [firstName, setFirst] = useState(null)
    const [lastName, setLast] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [radius, setRadius] = useState(null)
    const [image, setImage] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [activeAdd, setactiveAdd] = useState(null)
    const [activeAddress, setactiveAddress] = useState(null)
    const [addressList, setAddressList] = useState([])
    const [addressObj, setAddressObj] = useState(null)
    const [stylist, setStylist] = useState(null)
    const [id,setId] = useState(null)
    const [loading, setLoading] = useState(null)
    const [activeId, setactiveId] = useState(null)
    const [spinner, setSpinner] = useState(false)
    // const [onboardingElement, setonboardingElement] = useState(null)


    var activeAddressElem = null


    useEffect(()=> {
        console.log("IN SETTINGS USE EFFECT")
        getId()
       
        setSpinner(false)

    }, [isBack])
    const onboardingRedirectLink = (screen) => {
        const {navigate} = props.navigation
        if (screen=="Add Credit Card"){
          navigate(screen, {
              next: 'Settings',
              isBack: isBack
          })
  
        }
    }

    
    const getId = async () => {
        var id_ = await AsyncStorage.getItem('stylistId') 
        setId(id_)
        setFetched(true)
        
    }
    if (id==null && fetched==false){
        getId()
    }
    if (stylist==null && id!=null){
        getStylist(id, (response)=> {
            console.log("GET STYLIST RESPONSE IN SETTINGS")
            if (response!=null){
                console.log(response)
                var stylist_ = response.data[0]
                setStylist(stylist_)

            }
           

        })
    }
    
  

    const editAddress = () => {
        const {navigate} = props.navigation
        navigate("Modify Address", {
            address: activeAddress
        })
    }
    const getAddressList = () => {
        console.log("IN GET ADDRESS LIST")
        const {navigate} = props.navigation
        if (activeAddress==null){
            getAddress(activeId, (result)=> {
                console.log("IN GET ADDRESS 2")
                console.log(result)
                if (result!=null){
                    setactiveAddress(result[0])
                    navigate("Address List",{
                        stylistId: id,
                        activeAddress: result[0]
                    })
                }
            })

        } else {
            navigate("Address List",{
                stylistId: id,
                activeAddress: activeAddress
            })

        }
        
      
        

    }
    const getPaymentMethods = () => {
        const {navigate} = props.navigation
        navigate("Payment Methods", {
            stylistId: id

        })
        
    }
    const removeAddress = () => {

    }
    if (stylist!=null && number==null && firstName==null && lastName==null && birthday==null){
        console.log("EMAIL")
        console.log(email)
        // var id = getStylistId(email)
        // getStylist(id, (result)=> {
        //     setStylist(stylist=>result)
        // })
        // var stylist = getStylist(id)
        // console.log("STYLIST ID")
        // console.log(id)
        // console.log("STYLIST BEFORE IF STATEMENT")
        // console.log(stylist)
        // console.log("STYLISTTTT")
        // console.log(stylist)
        if (stylist!=null){
            setNumber(stylist.Phone)
            setFirst(stylist.FirstName)
            setLast(stylist.LastName)
            setBirthday(stylist.Birthdate)
            setEmail(stylist.Email)
            console.log("STYLIST WORKING RADIUS")
            console.log(stylist.WorkingRadius)
            if (stylist.WorkingRadius==null){
                setRadius(5)
            } else {
                setRadius(stylist.WorkingRadius)

            }
            console.log("THE ACTIVE ADDRESS 12")
            setactiveId(stylist.ActiveAddress)
           
            //var activeId = stylist.ActiveAddress
          
           
            // for (var add in stylist.AddressList){
            //     var addressId = stylist.AddressList[add]
            //     console.log("ID")
            //     console.log(id)
            //     var address = getAddress(addressId)
            //     console.log("IN ADDRESS LIST LOOP")
            //     console.log(address)
            //     if (addressId!=null && address==null){
            //         throw error ("There is no address that matches address id")
            //     } else {
            //         console.log("ELSE CLAUSE")
            //         setAddressList(addressList=> ([...addressList,address]))
                    

            //     }
            // }
            

            

        }
    }
    if (activeAddress!=null && addressObj==null){
        setAddressObj( 
        <View style={styles.addressContainer}><View style={styles.addressRow}>
               
            <SimpleLineIcons name={'home'} size={25} style={styles.addressIcon}/>
            <View style={{width:'100%'}}>
                <Text style={styles.addressLabel}>{activeAddress.Label}</Text>
                <View style={styles.addressBottomRow}>
                    <View style={styles.addressDescription}>
                        <Text>{activeAddress.StreetNumber}, {activeAddress.StreetName}, {activeAddress.City} {activeAddress.State} {activeAddress.Zip}</Text>

                    </View>
                    
                    <View style={styles.addressModifiers}>
                        <TouchableOpacity onPress={()=>editAddress()}>

                       
                        <Text style={styles.editModifier}>EDIT</Text>
                        </TouchableOpacity>
                        <Text style={styles.deleteModifier}>DELETE</Text>


                    </View>
                    
                 
                   

                </View>
                <TouchableOpacity onPress={()=>getAddressList()} style={styles.changeAddContainer}>
                    <Feather name={"edit-2"} style={styles.editIcon}/>
                        <Text style={styles.changeAddText}>Change main address</Text>
                    </TouchableOpacity>
            </View>
            
                
            </View>
            
            

        </View>)
    }
    

   


    

    // useEffect(() => {
    //     (async () => {
    //       if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //           alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //       }
    //     })();
    //   }, []);

    const _handleBirthday = (input) => {
        if (input.length>birthday.length){
            if (input.length==2 || input.length==5){
                setBirthday(birthday => input+"-")
            } else {
                setBirthday(birthday=>input)
            }
        }
        if (input.length<birthday.length){
            if (birthday.charAt(birthday.length-1)=="-"){
                setBirthday(birthday=>birthday.slice(0,-2))
            } else {
                setBirthday(birthday=>input)
            }
        }

    }
    const _handleNumberChange = (input) => {
        if (input.length>number.length){
            if ((input.replace(/[-]/g,'').length) % 3==0  && number.replace(/[-]/g,'').length>0 && number.replace(/[-]/g,'').length <7){
                setNumber(number => input + "-")
            } else {
                setNumber(number => input)
            }
        }
        if (input.length<number.length){
            console.log("IN DELETE")
            if (number.charAt(number.length-1)=="-"){
                setNumber(number=>number.slice(0,-2))
            } else {
                setNumber(number=>input)
            }
        }

    }

    
    const viewAddresses = () => {
        const {navigate} = props.navigation 
        navigate("Address", {
            addressList: addressList
        })
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:1
        })
        if (!result.cancelled){
            setImage(result.uri)
        }

    }
    const backPage = () => {
        // props.navigation.goBack()
        console.log("AT GO BACK")
        props.navigation.goBack()
    }
    var imageElem = null 
    const xml =`<svg class="icon" height="512" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192-86.112-192-192-192z m0 320c-70.592 0-128-57.408-128-128s57.408-128 128-128 128 57.408 128 128-57.408 128-128 128z m96 160H160c-17.632 0-32-14.336-32-32V288c0-17.632 14.368-32 32-32h96c17.664 0 32-14.336 32-32s-14.336-32-32-32h-96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h416c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-64-576h320c17.664 0 32 14.368 32 32v256c0 17.696 14.304 32 32 32s32-14.304 32-32V288c0-52.928-43.072-96-96-96H512c-17.664 0-32 14.336-32 32s14.336 32 32 32z m224 80a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM320 160h128c17.696 0 32-14.304 32-32s-14.304-32-32-32H320c-17.696 0-32 14.304-32 32s14.304 32 32 32z m640 608h-96v-96c0-17.696-14.304-32-32-32s-32 14.304-32 32v96h-96c-17.696 0-32 14.304-32 32s14.304 32 32 32h96v96c0 17.696 14.304 32 32 32s32-14.304 32-32v-96h96c17.696 0 32-14.304 32-32s-14.304-32-32-32z" fill="#333333" ></path></svg>`
    if (image==null){
        imageElem = <SvgXml  style={styles.camera} xml={xml} width={50} height={50}/>
    } else {
        imageElem = <Image source={{uri:image}} style={{width:120,height:120, borderRadius: 100}}/>
    }
    const changeScreen = (screen) => {
        const {navigate} = props.navigation
        if (screen=="HOME"){
            navigate("Home")
 
        } else if (screen=="EARNINGS"){
            navigate("Earnings")
        } else if (screen=="PROFILE"){
            navigate("Profile", {
                isNew:false
            })
        }
    }

    const getSubscriptionSettings = () => {
      
        const {navigate} = props.navigation
        if (stylist!=null){
            navigate("Subscription Settings", {
                stylist: stylist,
                refresh: false
            })

        }

        
    }

    const getAccountDetails = () => {
        const {navigate} = props.navigation
        navigate("Account Details", {
            stylist: stylist
        })

    }

    const getTravelDetails = () => {
        const {navigate} = props.navigation
        navigate("Travel Details", {
            stylist: stylist
        })

    }

    const getReferralProgram = () => {
        const {navigate} = props.navigation 
        navigate("Referral", {
            stylist: stylist
        })
    }


    const signOut = () => {
        const {navigate} = props.navigation
        AsyncStorage.clear()
        navigate("Phone Form")
        const resetAction = StackActions.reset({
            index:0,
            actions: [NavigationActions.navigate({routeName: 'Phone Form'})]
        });
        props.navigation.dispatch(resetAction)

    }
    
    return (
        <View style={styles.container}>
             <Spinner 
            visible={spinner}
            />
            {/* <View style={styles.imageBox}>
                <TouchableOpacity onPress={()=> pickImage()}>
                {imageElem}
                </TouchableOpacity>
                
            </View> */}
            <SettingsHeader back={backPage}/>
        
           
           
            <View style={styles.body}>
           
                <View style={styles.box}>
                    <Text style={styles.title}>Account Details</Text>
                    <TouchableOpacity style={styles.tab} onPress={() => getAddressList()}>
                        {/* <FontAwesome name={"address-card-o"} size={18.5}/> */}
                        <Text style={{fontSize: 16, marginLeft:10}}>Addresses</Text>
                        

                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.tab} onPress={() => getPaymentMethods()}>
                        <MaterialIcons name={"payment"} size={25}/>
                        
                        <Text>Payments</Text>
                       

                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.tab} onPress={() => getSubscriptionSettings()}>
                        {/* <MaterialIcons name={"payment"} size={25}/> */}
                        
                        <Text style={{fontSize:16, marginLeft:10}}>Subscription</Text>
                       

                    </TouchableOpacity>
                </View>
                <View style={styles.box}> 
                {fontsLoaded &&
                    <Text style={{
                          fontWeight: '600',
                          fontSize:16,
                          marginLeft:10,
                          marginBottom:20,
                          fontFamily: 'Poppins-Medium'
                    }}>Settings</Text>
                }
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={()=> getReferralProgram()}>
                            <Text style={{fontSize:16, marginLeft:10}}>Referral Program</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={()=> getAccountDetails()}>
                            <Text style={{fontSize:16, marginLeft:10}}>Account Details</Text>
                        </TouchableOpacity>

                    </View>
                    {/* <View style={styles.tab}>
                        <TouchableOpacity onPress={()=> getTravelDetails()}>
                            <Text style={{fontSize:16, marginLeft:10}}>Travel Details</Text>
                        </TouchableOpacity>

                    </View> */}
                </View>

               
                
            </View>
            
           
           {/* {addressObj} */}
              
          
           
            {/* <TouchableOpacity style={styles.updateBox}>
                <Text style={styles.updateText}>UPDATE</Text>
            </TouchableOpacity> */}
            {fontsLoaded && 
            <View style={styles.bottomTab}>
                
                <Text style={{
                     fontFamily: 'Poppins-Medium',
                     alignSelf: 'center',
                     fontSize: 18,
                     marginBottom:10,
                     marginTop:20
                }}>Want to reach out?</Text>
            
                <Text style={{
                     marginLeft:20,
                     marginRight:20,
                     fontFamily: 'Poppins-Regular',
                     fontSize:14,
                     alignSelf:'center',
                     marginBottom:20
                    
                }}>Contact us at info@glamoapp.com</Text>
                <TouchableOpacity style={styles.signOutTab} onPress={() => signOut()}>
                    <Text style={{fontSize: 16, marginLeft:10, color: 'white', fontWeight: '600', alignSelf: 'center'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            }
           
            <MenuBar screen={'SETTINGS'} callback={changeScreen}/>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%"

    },
    title: {
        fontWeight: '600',
        fontSize:16,
        marginLeft:10,
        marginBottom:20

    }, 
    imageBox: {
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
    camera: {
        alignSelf: 'center'
    },
    body: {
        
        flexDirection: 'column',
        justifyContent: 'center',
       
        marginTop:20,
        
       
    },
    phone:{
        
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width:'100%',
        marginTop:5
       


    },
    ext: {
        width: 50,
        height:50,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,

        borderColor: 'lightgray'
    },
    extText: {
        fontWeight:'400',
        fontSize:18

    },
    numberInput: {
        height:50,
        width:Dimensions.get('window').width-90,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        
        marginBottom:20,
       
        fontSize: 18,
        paddingLeft:20
        
    },
    text: {
        color: '#1A2232',
        fontWeight: '500'
    },
    input: {
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        marginBottom:20,
       
        fontSize: 18,
        paddingLeft: 20,
        

    },
    updateBox: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        // flex: 1,
        justifyContent: 'center',
       
        position: 'absolute',
        bottom:Dimensions.get('window').height*0.075,
       
        padding:20,
        alignSelf: 'center',
        backgroundColor: "#1A2232",
        // height: 50,
        width:'100%',
        marginTop:'25%'
        
       
    },
    updateText: {
        color: 'white',
        fontWeight: '600',
        fontSize:16 
    },
    radiusInput: {
        width:50,
        height:50,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        marginBottom:20,
        fontSize:18,
        paddingLeft: 20
    },
    radiusBox: {
        flexDirection:'row',
        width:'100%',
        justifyContent: 'space-between',
        marginTop:20
    },
    name: {
        fontSize:18,
       
        
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom:10
    },
    addressBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor: "#1A2232",
        width:'100%',
        marginTop:20
    },
    arrow: {
        alignSelf: 'center'

    },
    emailBlock: {
        marginTop:20
    },
    radiusText: {
        alignSelf: 'center'
    },
    addressRow: {
       
        width:'90%',
        // marginRight:10,
        // marginLeft:10,
        flexDirection: 'row',
        justifyContent: "space-between",
        // paddingRight:10,
        // paddingLeft:10
        
    },
    addressContainer: {
        marginTop:50,
        marginLeft:10,
        marginRight:10,
        paddingRight:10,
        paddingLeft:10

    },
    addressLabel: {
        color: '#1A2232',
        fontWeight: '500',
        fontSize:20

    },
    addressDescription: {
        flexDirection: 'row',
        width:200
        
    },
    addressBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
   
    addressModifiers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addressIcon: {
        marginRight:10,
        marginTop:5
        
    },
    editModifier: {
        
        marginRight:5
    },
    deleteModifier: {
        
    },
    buttons: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius:50,
        width:25,
        height:25,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
      
    },
    btnText: {
        alignSelf: 'center'
    },
    qtyText: {
        fontSize:18,
        marginLeft: 10,
        marginRight:10
    },
    qtySelect: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    changeAddContainer: {
       
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    changeAddText: {
        fontSize:11
    },
    editIcon: {
        marginRight:5

    }, 
    bottomTab: {
        position: 'absolute',
        bottom:60,
        height:'auto'

    },
    signOutTab: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.08,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
      
       
        backgroundColor: '#1A2232',
        // position: 'absolute',
        // bottom:60

    },
    tab:{
        width: '100%',
        height: Dimensions.get('window').height*0.08,
        flexDirection:"row",
        alignItems: 'center',
        borderWidth:1,
        borderColor: 'lightgrey'

    },
    box:{
        width: '100%',
        height: 'auto',
        marginTop:20

    }


})
export default SettingsOverview