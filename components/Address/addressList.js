import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';
import {getStylist, getStylistId, updateActiveAddress, deleteAddress, updateStylistAddressList} from "../../Database/functions"
import {getAddress, getAddressList} from "../../Database/functions"
import {SimpleLineIcons} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import SettingsHeader from '../../Headers/settings'
import ModifyAddress from '../../components/Address/modifyAddress'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
// import {useIsFocused} from '@react-navigation/stack';



const AddressList = ({navigation}) => {
    console.log("IN ADDRESS LIST")
    // const isFocused = useIsFocused()
    console.log("ADDRESS LIST RELOADED")
    var stylistId = navigation.state.params.stylistId 
    console.log("STYLIST ID IN ADDRESS LIST")
    console.log(stylistId)
    var visited = null
    if (navigation.state.params!=null && navigation.state.params.visited!=null){
        visited = navigation.state.params.visited 
    } else {
        visited: true
    }
   
    const [activeAddress, setactiveAddress] = useState(null)
    const [selected, setSelected] = useState(null)
    const [update, setUpdate] = useState(null)
    const [stylist, setStylist] = useState(null)
    const [addressList, setAddresses] = useState([])
    const [iteratorstart, startIterator] = useState(false)
    const [refresh, setRefresh] = useState(false)

  
    const [postDelete, setpostDelete] = useState(false)

    useEffect(()=> {
       
        getStylist(stylistId, (result)=> {
            console.log("ACTIVE ADDRESS GET STYLIST 2")
            var stylist_ = result.data[0]
            console.log(stylist_)
            setactiveAddress(stylist_.ActiveAddress)
            setSelected(stylist_.ActiveAddress)
            setStylist(stylist_)
            getAddressList((result)=> {
            if (result!=null){
                console.log("GET ADDRESS LIST RESPONSE")
                console.log(result.data.length)
                var stylistAddressList = []
                console.log("STYLIST ADDRESS LIST 1")
                console.log(stylist_.AddressList)
                for (var address in stylist_.AddressList){
                    var addressRecord = result.data.filter(elem => elem.id == stylist_.AddressList[address])[0]
                    if (addressRecord!=null){
                        stylistAddressList.push(addressRecord)

                    }
                    

                }
                console.log("THE STYLIST ADDRESS LIST RETURNED 1")
                console.log(stylistAddressList)
                setAddresses(stylistAddressList)
            }
        })

        })

    },[visited])


    


  
    if (postDelete==true){
        setpostDelete(false)
    }
    // const addressIterator = (count, addresses, tempList) => {
    //     console.log("ADDRESS ITERATOR COUNT")
    //     console.log(count)
    //     if (count==addresses.length){
    //         console.log("done")
           
    //     } else {
    //         var addressParam = addresses[count]
    //         console.log("THE ADDRESS PARAM 2")
    //         console.log(addressParam)
    //         getAddress(addressParam, (result)=> {
    //             console.log("RESULT FOR GET ADDRESS")
    //             console.log(result)
    //             var address = result[0]
    //             console.log("GETTING ADDRESS FOR FIRST TIME")
    //             console.log(address)
    //             console.log(addressList.includes(address))
    //             if (address!=null){
    //                 console.log("CURRENT ADDRESS IN LOOP")
    //                 console.log(address)
    //                 var includes = false
    //                 console.log("ADDRESS LISTTTT")
    //                 console.log(tempList)
    //                 console.log("CURRENT ADDRESS ID")
    //                 console.log(address.id)
    //                 console.log("TEMP LIST IN LOOOOOP")
    //                 console.log(tempList)
    //                 for (var address_ in tempList){
    //                     if (tempList[address_].id==address.id){
    //                         includes = true 
    //                         break
    //                     }

    //                 }
    //                 console.log("NEW ADDRESS")
    //                 console.log(address)
    //                 console.log("THE ADDRESS LIST")
    //                 console.log(addressList)
    //                 if (includes==false){
    //                     console.log("INCLUDES IS FALSE")
    //                     tempList.push(address)
    //                     var newCount = count +=1
    //                     if (!addressList.includes(address)){
    //                         console.log("ADDRESS NOT INCLUDED IN ADDRESS LIST")
    //                         console.log(address)
    //                         console.log("AND THE ADDRESS LIST")
    //                         console.log(addressList)
    //                         setAddresses(addressList=> ([...addressList, address]))
        
    //                     }
    //                     addressIterator(newCount, addresses, tempList)
                        


    //                 }

    //             }

                

             

    //         })



    //     }
    // }

    const updateStylist = () => {
        console.log("IN UPDATE STYLIST")
        getStylist(stylistId, (result)=> {
            console.log("GETTING THE SYTLIST")
            console.log(result)
            
            if (result!=null){
                console.log("RESULT DIFFERENT THAN NULL")
                setStylist(result.data[0])
                setSelected(result.data[0].ActiveAddress)
             
               

            }
            
        })

    }
    var addresses = [] 
   
   
    const submit = () => {
        console.log("IN SUBMIT")
        console.log("SELECTED AGAIN")
        console.log(selected)
        //need to implement API #9 
        
        //just update if active address changes
        if (activeAddress.id!=selected){
            console.log("SELECTED")
            console.log(selected)
            updateActiveAddress(selected, (result)=> {
                console.log(result)
            })
        }

        //props.navigation.goBack()

    }

    const backPage = () => {
        navigation.goBack()
    }

    const changeSelected = (address) => {
        console.log("AT CHANGE SELECTED")
        console.log(address.id)
        setSelected(address.id)
        if (update==null){
            setUpdate(update=> <TouchableOpacity style={styles.submitBtn} onPress={()=>submit()}><Text style={styles.submitText}>SAVE</Text></TouchableOpacity>)
        }
        updateActiveAddress(address.id, (result)=> {
            if (result==null){
                Alert.alert("Network Error", "Unable to update active address")

            }

        })
    }

    const editAddress = (address) => {
        const {navigate} = navigation
        navigate("Modify Address", {
            address: address,
            stylistId: stylistId,
            activeAddress:activeAddress,
            visited: !visited
        })
    }

    const deleteAddress_ = (address) => {
        var editedAddressList = addressList.filter(elem => elem!=address)
        var editedAddressId = []
        for (var add in editedAddressList){
            editedAddressId.push(editedAddressList[add].id)
        }
        //i dont think we can equate json objects -> maybe we can equate json objects - test it out first
        if (editedAddressList.length==0){
            //means we are deleting the only address we have 
            alert("You need to have at least one address. Either create a new one first or modify existing address")
        } else {
            //check if this address is the selected one 
            if (address.id==selected){
                //need to select new main address by default 
                var newMain = editedAddressId[0]
                updateActiveAddress(newMain, (result)=> {
                    if (result!=null){
                        //means no error happened
                        //now update the address list
                        updateStylistAddressList(address.id, editedAddressId, (result)=> {
                            if (result!=null){
                                deleteAddress(address.id, (result)=> {
                                    console.log("IN DELETE ADDRESS IN ADDRESS LIST")
                                    console.log(result)
                                    setpostDelete(true)
                                })

                                //updated stylist address list successfully
                                //now need to delete address object from address table 
                            } else {
                                //throw network error alert 
                                alert("Network Error: was unable to delete address")

                            }
                            setAddresses(addresses=> addresses.filter(elem => elem!=address))
                        })
                    } else {
                        //throw network error alert 
                        alert("Network Error: was unable to delete address")
                    }
                })
                //take the first element by default 
                //update main address for stylist first
            } else {
                console.log("UPDATING ADDRESS THAT IS NOT THE MAIN")
                
                updateStylistAddressList(address.id, editedAddressId, (result)=> {
                    if (result!=null){
                        deleteAddress(address.id, (result)=> {
                            console.log(result)
                            setpostDelete(true)
                        })
                        //updated stylist address list successfully
                        //now need to delete address object from address table 
                    } else {
                        //throw network error alert 
                        alert("Network Error: was unable to delete address")

                    }
                    console.log("IN UPDATE STYLIST ADDRESS ITER")
                    setAddresses(addresses=> addresses.filter(elem => elem!=address))
                })
                

            }
            //means we have another address
            //first edit 
           
        }


        //have to edit file directly

    }
    const addAddress = () => {
        const {navigate} = navigation
        navigate("Modify Address",{
        address:null,
        stylistId: stylistId,
        visited: !visited
    })

    }

    // if (props.navigation.state.params.visited!=null && props.navigation.state.params.visited==true){
    //     setRefresh(!refresh)
    // }

   
  
    if (navigation.state.params.visited!=null && navigation.state.params.visited!=visited){
        console.log("IN VISITED")
        getStylist(stylistId, (result) => {
            //get stylist again to get the new address list 
            if (result!=null){
                var addresses = result.data[0].AddressList 
                var tempList=[]
                setVisited(navigation.state.params.visited)
                setStylist(result.data[0])
                addressIterator(addresses.length-1, addresses, tempList)
                
                


            }
            

        })
        

    }
    
    return (
        <View style={styles.container}>
            <SettingsHeader back={backPage}/>
            <View style={styles.body}>
                <Text style={styles.title}>Your Saved Address</Text>
                <View style={styles.addAddressRow}>
                    <Text style={{alignSelf: 'center',fontSize:11}}>Add New Address</Text>
                    <TouchableOpacity onPress={()=>addAddress()}>
                <Ionicons name={"add"} size={30} />
                </TouchableOpacity>
                </View>
                <ScrollView style={{height:'100%'}}> 
                {addressList.map((address)=> {
                    console.log("IN ADDRESS LIST LOOP 3")
                    console.log(address)
                    console.log("AND THE LIST")
                    console.log(addressList)
                    console.log(address.id==selected)

                    var streetNameElem = null 
                    if (address.StreetName!=null){
                        streetNameElem = address.StreetName +","
                    }

                    // var addressNameElem = null 
                    // if (address.Name!=null){
                    //     addressNameElem = <Text>{address.Name}</Text>
                    // }
                  

                return(
                
               <View style={styles.addressRow}>
                    <TouchableOpacity style={styles.checkbox} onPress={()=>changeSelected(address)}>
                            <View style={{backgroundColor: (address.id==selected)?'#1A2232':'transparent', display:address.id==selected?'block':'none', width: 30,height:30,borderRadius: 20,}}> 
                            <Ionicons name='checkmark-outline' size={25} style={styles.check}></Ionicons>
                            </View>
    
                        </TouchableOpacity>
               
               
               <View style={styles.addressInfo}>
                   <Text style={styles.addressLabel}>{address.Name}</Text>
                   <View style={styles.addressBottomRow}>
                       <View style={styles.addressDescription}>
                           <Text>{streetNameElem} {address.City}, {address.State}</Text>
   
                       </View>
                       <View style={styles.addressModifiers}>
                           <TouchableOpacity onPress={()=>editAddress(address)}>
   

                           <Text style={styles.editModifier}>EDIT</Text>
                           </TouchableOpacity>

                            <TouchableOpacity onPress={()=>deleteAddress_(address)}>
                           <Text style={styles.deleteModifier}>DELETE</Text>
                           </TouchableOpacity>
   
   
                       </View>
   
                   </View>
               </View>
           </View>

                )})}

        </ScrollView>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={()=>submit()}><Text style={styles.submitText}>SAVE</Text></TouchableOpacity>
            {/* {update} */}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '100%'

    },
    body: {
       
        marginTop:20
    },
    addressRow: {
       
        width:'90%',
        marginRight:10,
       
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingRight:10,
        paddingLeft:10
        
    },
    addressIcon: {
        marginRight:5,
        marginTop:5
        
    },
    addressLabel: {
        color: '#1A2232',
        fontWeight: '600',
        fontSize:16

    },
    addressBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addressModifiers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addressDescription: {
        flexDirection: 'row',
        width:200,
        
        
        
    },
    editModifier: {
       
        marginRight:5,
        fontWeight:'600'
    },
    deleteModifier: {
        fontWeight:'600'
        
    },
    checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,
        marginTop:20
    
    },
    check: {
        color: 'white',
        alignSelf: 'center'
    },
    title: {
        marginLeft:10,
        fontWeight: '600',
        fontSize:18,
        marginBottom:10,
        
    },
    addAddressRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    addressInfo: {
        width:'100%',
        marginTop:20
   
    },
    submitBtn: {
      
        backgroundColor: '#1A2232',
        width:'100%',
        height:60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:0
    },
    submitText: {
        fontWeight:'600',
        color: 'white',
        alignSelf: 'center',
        fontSize:18
    },

})
export default AddressList