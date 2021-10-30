import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { getStylistEarnings ,setStylistSubscription, getSubscriptions, getPromoCodeByName, getPromotion} from '../Database/functions';
import SchedualeHeader from '../Headers/scheduale'
import { useFonts } from 'expo-font';


const Subscription = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
     });
    console.log("AT SUBSCRIPTION")
    console.log(props.navigation.state.params.stylistPayload.id)
    // var options = ['Free','Plus','Pro']
    // var prices = [0, 49.99,99.99]
    // var description = {'Free': ['30% Comission Fee','30 monthly bookings in your area'], 'Plus': ['25% Comission Fee','Orders from Partners (hotels, cruises,..)','Multiple area availability'],
    // 'Pro': ['20% Comission Fee','Glamo Conference Access','Glamo Merch', 'Hotspot for high demand areas']}
    const [keyboardHeight, setkeyboardHeight] = useState(0)
    const [selectedOption, setSelected] = useState(null)
    const [disable,setDisable] = useState(true)
    const [options, setOptions] = useState([])
    const [prices, setPrices] = useState([])
    const [description, setDescriptions] = useState({})
    const [scopes, setScopes] = useState({})
    const [intervals, setIntervals] = useState({})
    const [percentage, setPercentage] = useState(0)
    const [promoCode, setCode] = useState(null)

    useEffect(()=> {
        Keyboard.addListener("keyboardDidShow",_keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
    })

    const _keyboardDidHide = (e)=> {
        setkeyboardHeight(0)
    }
    const _keyboardDidShow = (e) => {
        setkeyboardHeight(e.endCoordinates.height)
    }

    if (options.length==0){
        getSubscriptions((result)=> {

            console.log("IN GET SUBSCRIPTIONS ANSWER")
            console.log(result)
            var subscriptionList = result.data 
            console.log("THE SUBSCRIPTION LIST")
            console.log(subscriptionList)
            var preNames = []
            var names = []
            var priceList = {}
            var scopesList ={}
            var descriptionList = {}
            var intervalList = {}
            for (var sub in subscriptionList){
                preNames.push(subscriptionList[sub])
                priceList[subscriptionList[sub].Name] = subscriptionList[sub].Price
                if (subscriptionList[sub].Description!=null){
                    descriptionList[subscriptionList[sub].Name] = subscriptionList[sub].Description
                }
                intervalList[subscriptionList[sub].Name] = subscriptionList[sub].RenewalInterval
                scopesList[subscriptionList[sub].Name] = subscriptionList[sub].Scopes
                

            }
            preNames = preNames.sort((a,b)=> {
                return a.Precedence>b.Precedence
            })
            console.log("THE PRENAMES 3")
            console.log(preNames)
            for (var elem in preNames){
                names.push(preNames[elem].Name)
            }
            // priceList = priceList.sort((a,b)=> priceList[a]<priceList[b])
            // names = []
            // for (var elem in priceList){
            //     names.push(elem)
                
            // }
            setOptions(names)
            setPrices(priceList)
            setDescriptions(descriptionList)
            setScopes(scopesList)
            setIntervals(intervalList)
        })
    }



    const selectSubscription = (option) => {
        setSelected(option)
        setDisable(false)
    }
    const goBack = () => {
        props.navigation.goBack()
    }
    const submit = () => {
        const {navigate} = props.navigation
        if (selectedOption==null){
            alert("Select a subscription option before proceeding")
        }else {
            var interval = intervals[selectedOption]
            var currentDate = moment().format("YYYY-MM-DD")
            var renewal = moment(currentDate).add(interval, 'M').format("YYYY-MM-DD")


            setStylistSubscription(props.navigation.state.params.stylistPayload.id,selectedOption,renewal )
            //Alert.alert("Referral Code", "Enter in referral code of the stylist that recommended Glamo to you")
            if (selectedOption!="Free"){
                //here they have to pay
                //redirect to payment screen
                var index = options.indexOf(selectedOption)
                var params = {
                    "Option": selectedOption,
                    "Price": prices[index]
                }
                navigate("Subscription Payment",{
                    params: params, 
                    stylistPayload: props.navigation.state.params.stylistPayload,
                    formattedNum: props.navigation.state.params.formattedNum,
                    discount: percentage,
                    subscriptionFlag: true,
                    subscriptionOption:selectedOption,
                    next: "Step 2"
                })
                

            } else {
                navigate("Step 2", {
                    stylistPayload: props.navigation.state.params.stylistPayload,
                    formattedNum: props.navigation.state.params.formattedNum
                })
            }
        }
    }


    const updateCode = (code_) => {
        var code_2 = code_.split(" ")
        console.log("THE CODE_2")
        console.log(code_2)
        var newStr = ""
        for (var char in code_2){
            if (code_2[char]!=""){
                newStr+= code_2[char]
            }
        }
        console.log("NEW STR")
        console.log(newStr)
        console.log(newStr.length)
       
        
        setCode(newStr)
    }

    const checkPromo = () => {
        getPromoCodeByName(promoCode, (result)=> {
            console.log("GET PROMO CODE BY NAME RESULT 2")
            console.log(promoCode)
            console.log(result)
            if (result!=null && result.data.length>0){
                var promotionId = result.data[0].PromotionId
                var percentage_ = result.data[0].Percentage
                console.log("PROMOTION ID")
                console.log(promotionId)
                getPromotion(promotionId, (result)=> {
                    console.log("GET PROMOTION RESULT")
                    console.log(result)
                    if (result!=null && result.data.length>0){
                        var promotion = result.data[0]
                        var expireDate = promotion.EndDate 
                        var expireTime = promotion.EndTime

                        console.log("THE CURRENT DATE 2")
                        console.log(moment().format("YYYY-MM-DD"))
                        console.log(moment(expireDate, "YYYY-MM-DD"))
                       
                        if (moment(expireDate, "YYYY-MM-DD").isAfter(moment().format('YYYY-MM-DD'))){
                            setPercentage(percentage_)
                            
                        } else if (expireDate==moment('YYYY-MM-DD')){
                            if (moment(expireTime, "h:mm A").isAfter(moment('h:mm A'))){
                                setPercentage(percentage_)
                            } else {
                                Alert.alert("Expired Code", "Promo Code provided is expired")
                            }
                        } else {
                            Alert.alert("Expired Code", "Promo Code provided is expired")
                        }
                    } else {
                        Alert.alert("Network Error", "Unable to verify promo code")

                    }
                    //check if expired
                    //if expired -> return error message 
                    //if not expired -> set percentage and apply percentage on submit on checkout
                })


            } else if (result==null){
                Alert.alert("Network Error", "Unable to verify promo code")
            } else if (result.data.length==0){
                Alert.alert("Incorrect Promo Code", "This promo code is invalid")
            }
        })

    }
    return (
        <View style={styles.container}>
            <SchedualeHeader backwards={goBack}/>
            <View style={styles.titleBox}>
            <Text style={{
                 fontWeight: '600',
                 fontSize:18,
                 fontFamily: 'Lato-Regular'
            }}>Select a Subscription Plan</Text>
            <Text>Modifying your subscription plan is permissable after registering</Text>
            </View>
            {/* <View style={styles.body}> */}
            <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}} >
            <View style={{height:Dimensions.get('window').height}}>
            <ScrollView style={{paddingRight:0,marginRight:0,paddingTop:30, height:Dimensions.get('window').height}}>
            <View style={{height:Dimensions.get('window').height*0.9}}>
            {options.map(option=> {
                console.log("IN OPTIONS MAP")
                console.log(option)
                console.log(prices[options.indexOf(option)])
                return (
                    <TouchableOpacity onPress={() => selectSubscription(option)}>
                    <View style={{backgroundColor:selectedOption==option?"#1A2232":"white", height:120,width:Dimensions.get('window').width-40,margin:10,borderRadius:20,flexDirection:'row', justifyContent: 'space-between', alignSelf: 'center',borderWidth:option=="Plus"?2:0,borderColor:option=="Plus"?"#1A2232":"transparent"}}>
                       <View style={{marginBottom:10,marginLeft:20,alignSelf:'center'}}>
                        <Text style={{color:selectedOption==option?"white":"#1A2232",fontWeight:'600',fontSize:24, justifyContent: 'flex-end', justifyContent: 'flex-end', maxWidth:120}}>{option}</Text>
                       
                        </View>
                        <View style={styles.optionDescription}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap',alignSelf:'flex-end', color:selectedOption==option?"white":"#1A2232", fontWeight:'500', maxWidth:'100%', marginRight:20}}>
                        <Text style={{color:selectedOption==option?"white":"#1A2232", fontWeight:'600'}}>${prices[option]}/</Text>
                        {intervals[option]>1 && <Text style={{color:selectedOption==option?"white":"#1A2232", marginRight:70}}>{intervals[option]} months</Text>}
                        {intervals[option]==1 && <Text style={{color:selectedOption==option?"white":"#1A2232"}}>month</Text>}
                        
                        </View>
                        <Text style={{color:'grey',fontSize:11,display:option=="Plus"?"flex":"none",alignSelf:'flex-end', justifyContent: 'flex-end',marginRight:20,marginBottom:5,marginTop:5}}>*Recommended</Text>
                        {scopes[option] !=null && 
                        scopes[option].map(des=> {
                            return (
                                <Text  style={{color:selectedOption==option?"white":"#1A2232",marginRight:20, justifyContent:'flex-end',alignSelf: 'flex-end'}}>{des}</Text>
                            )
                        })
                        }
                         {description[option]!= null && 
                        <Text style={{color:selectedOption==option?"white":"#1A2232", flexDirection:'row',  flexWrap: 'wrap', maxWidth: '70%', justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft:'10%'}}>{description[option]}</Text>
                        }
                       


                        
                        </View>
                        
                        

                    </View>
                    </TouchableOpacity>
                )
            })}
            {/* <View style={{width:Dimensions.get('window').width-40,margin:20}}>
                <Text>Enter Promo Code</Text>
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.inputCity} value={promoCode} onChangeText={updateCode}/>
                <TouchableOpacity style={{
                    backgroundColor: "#1A2232",
                    width:Dimensions.get("window").width*0.2,
                    height: 30,
                    borderRadius:20,
                    marginLeft: '5%',
                    marginTop:10
                    


                }} onPress={()=> checkPromo()}>
                    <Text style={{color:'white', alignSelf: 'center',fontWeight:'500', justifyContent: 'center', marginTop:5 }}>Compute</Text>

                </TouchableOpacity>
                </View>

               
                <Text>You have recieved a {percentage}% discount</Text>
            </View> */}
            
            </View>
           </ScrollView>
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
            }} disabeled={disable} onPress={()=>submit(
            
            )}>
               <Text style={styles.confirmText}>Submit</Text>
           </TouchableOpacity>
           </View>
           </KeyboardAvoidingView>
            {/* </View> */}
           
           
         
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
    },
    body: {
        paddingTop:40,
        marginLeft:10,
        marginRight:20,
        flexDirection:"row",
        justifyContent:'center',
       
        flexWrap: 'wrap'
    },
    signup: {
        fontWeight: '600',
        fontSize:18
        

    },
    titleBox: {
        paddingTop:40,
        marginLeft:20,
        marginRight:20
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
    optionDescription: {
       flexDirection:'column',
       alignSelf:'center',
       justifyContent: 'flex-end'
       
    },
    inputCity: {
        width:Dimensions.get("window").width*0.4,
        alignSelf: 'flex-start',
        height:30,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgray',
        marginTop:10,
        borderRadius:20,
        marginBottom:10,
       
        fontSize:18,
        paddingLeft: 20

    },


})
export default Subscription