import React, {forwardRef, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {SimpleLineIcons} from 'react-native-vector-icons'
import {AntDesign} from 'react-native-vector-icons'
import {FontAwesome} from 'react-native-vector-icons'

const MenuBar = (props) => {
    const selectedScreen = props.screen 
    const [selectedItem, setselectedItem] = useState(0)
    const [items, setitems] = useState(['HOME','PROFILE','EARNINGS','SETTINGS'])
    const forward = (item) => {
        if (item=="HOME"){
            props.callback('HOME')
        } else if (item=="EARNINGS"){
            props.callback('EARNINGS')
        } else if (item=="PROFILE"){
            props.callback("PROFILE")
        } else {
            props.callback("SETTINGS")
        }

    }
    return (
        <View style={styles.container}>
            {items.map((item)=>{
               
                var icomElem = null 
                var name = null 
                var size = null 
                if (item=='HOME'){
                    name='home'
                    size = 32
                    iconElem = <SimpleLineIcons name={'home'} size={size} style={{marginTop:2}}/>
                }
                else if (item=='PROFILE'){
                    name = 'person-outline'
                    size = 34.5
                    iconElem = <Ionicons name={name} size={size} color={selectedScreen==item?"#C2936D":"black"}/>

                }
                else if (item=="EARNINGS"){
                    name = 'dollar'
                    // iconElem= <View style={{borderColor: 'black',borderWidth: 1,borderRadius:50, color:selectedScreen==item?"#C2936D":"black", height:36.5, width:36.5, flexDirection: 'column',justifyContent: 'center'}}>
                    //     <FontAwesome name={name} size={30} style={{alignSelf: 'center', color:selectedScreen==item?"#C2936D":"black"}}/>
                    //     </View>
                    iconElem = <Image source={require("../assets/Icons/dollarsign.png")} style={styles.icons}></Image>
                }
                 else {
                    name="settings-sharp"
                    size = 32
                    // iconElem = <Ionicons name={name} size={size} color={selectedScreen==item?"#C2936D":"black"}/>
                    iconElem = <Image source={require('../assets/Icons/settings.png')} style={styles.icons}></Image>
                }
                return (
                    <TouchableOpacity style={styles.menuItem} onPress={()=>forward(item)}>
                        {iconElem}
                       
                    </TouchableOpacity>
                )
            })
            
            }

        </View>

    )
}
const styles = StyleSheet.create({
    
        container: {
            position: 'absolute',
            bottom:0,
            height: Dimensions.get('window').height*0.075,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
         
            backgroundColor: '#f2f2f2',
            paddingTop:5,
            borderTopColor: 'lightgray',
            borderTopWidth: 1
        },
        menuItem: {
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft:20,
            marginRight:20
    
        },
        title: {
            fontWeight: '600',
            marginTop:5,
            fontSize:12
        },
        selectedTitle: {
            fontWeight: '600',
            marginTop:5,
            fontSize:12,
            color: '#C2936D'
    
        },
    
    
    circle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:50
    },
    dollarSign: {
        alignSelf: 'center'
    },
    icons:{
        width:40,
        height:40
    }
})
export default MenuBar