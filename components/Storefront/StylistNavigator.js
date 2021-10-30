import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {getServiceList, getTitlesForStylist} from '../../Database/functions'
import { useFonts } from 'expo-font';
import {getTitles} from '../../Database/functions'
import axios from 'axios'


const StylistNavigator = (props) => {
    console.log("STYLIST NAVIGATOR PROPS 5")
    console.log(props)
    console.log(props.selectedSub)
    console.log(props.titles)
    console.log(props.subcategories)
    var stylistId = props.id
    const [selectedSub, setSelected] = useState(props.selectedSub)
    // const [subcategories, setSubcategories] = useState([])
    // const [titles, setTitles] = useState(props.titles)

  

    // var tempSubcategories = []
   
    // const [fetched, setFetched] = useState(false)
    // var totalAvailableServices = null 

    // const setCategories = (results) => {
    //     var subCat = null
        
    //     var serviceList = []
    //     var Ids = []
    //     if (results!=null){
    //         subcCat = results[0].SubCategory
    //         for (var result in results){
    //             if (results[result].SubCategory==subCat){
    //                 serviceList.push(results[result].Name)
    //                 Ids.push(results[result].id)

    //             }
                
                

    //         }
    //         setCategory(subCat)
    //         setServices(serviceList)
    //         setserviceIds(Ids)
    //         setFetched(true)
    //         //subcategory is set to first subcategory in list 
    //         //services are set to service names that have the corresponding subcategory
    //         //service Ids are set to correspond to every service name in the services list 
            
    //     }

    // }
    // const callback = (category) => {
    //     console.log("IN STYLIST NAVIGATOR CALLBACK")
    //     //props.callback(category)
    // }
    // const setIds = (results) => {
    //     var ids_ = []
    //     if (results!=null){
    //         for (var service in sesrvice){
    //             for (var result in results){
    //                 if (results[result].Name==services[service]){
    //                     ids_.push(results[result].id)
                        
    //                     //can only be one to one

    //                 }
    //             }
    //         }
    //         setserviceIds(ids_)
    //         //set matching service ids in corresponding for each service name in the same order 
    //     }

    // }
   

    // const setSubCategories = (results) => {
    //     console.log("IN SET SUBCATEGORIES 4")
    //     console.log(results)
    //     if (results!=null){
    //         setTitles(titles=>results)

    //     } else {
    //         setTitles([])
    //     }

       

    // }

    // const fetchTitles = () => {
    //     console.log("IN FETCH TITLES")
    //     getTitles(stylistId,setSubCategories)
    // }


    // const fetchTitleServices = (title, callback) => {
    //     console.log("in fetch title services")
    //     console.log(title)
    //     axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/subcategory/getBySpecialty?specialty=${title}`, {
    //         headers: {
    //             'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    
    //         }})
    //     .then(response=>{
    //         console.log("FETCH TITLE SERVICES RESPONSE")
    //         console.log(response)
    //         if (response.data.length>0){
    //             var data = response.data
    //             var nameList = []
    //             // for (var elem in subcategories){
    //             //     nameList.push(subcategories[elem])
    //             // }
    //             console.log("NAME LIST BEFORE PUSH")
    //             console.log(nameList)
    //             for (var elem in data){
    //                 nameList.push(data[elem].name)
    //                 console.log("the data elem")
    //                 console.log(data[elem])
                   
    //                 //tempSubcategories.push(data[elem].name)
                    
    //                 //store list of subcategories for current specialty title in specialtyServices
                    
    //             }
    //             callback(nameList)
    //             //setSubcategories(nameList)
    //             //console.log(tempSubcategories)
    //             //setSubCategories()
    //             //setSubCategories(subcategories=>tempSubcategories)
    //             //setServices(specialtyServices=>([...specialtyServices, "Other..."]))
                
    //         }
    //         callback(null)
    
    //     })
    //     .catch(error=> {
    //         console.log(error)
    //         throw (error)
    //         callback(null)
    //     })

    // }

    // const titleIterator = (count, titleList, callback) => {
        
    //     if (count == props.titles.length){
    //         console.log("TITLE ITERATOR RETURN")
    //         console.log(titleList)
    //         callback(titleList)

    //     } else {
    //         console.log("ITERATOR COUNT")
    //         console.log(count)
    //         var title = props.titles[count]
    //         console.log("ITERATOR TITLE")
    //         console.log(titleList[count])
    //         fetchTitleServices(title, (result)=> {
    //             if (result!=null){
    //                 for (var elem in result){
    //                     if (!(titleList.includes(result[elem]))){
    //                         titleList.push(result[elem])

    //                     }
                        
    //                 }

    //             }
                
    //             titleIterator(count+1,titleList, callback)
    //         })

    //     }
    // }

    return (
        <View style={styles.container}>
           
            <ScrollView 
            horizontal={true}
            style={styles.scroll}>
               
                
                {props.subcategories.map((cat)=>{
                    console.log("subcategory map 2")
                    console.log(cat)
                    
                    return (
                       
                        <TouchableOpacity onPress={()=>{
                            setSelected(cat)
                            props.callback(cat)}}>
                        <View style={{borderBottomColor: props.selectedSub==cat?"#C2936D":'transparent', borderBottomWidth:1}}>
                        <Text style={styles.category}>{cat}</Text>
                        </View>
                        </TouchableOpacity>

                    )
                    
                })}
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:'6%',
        paddingLeft:20,
        backgroundColor: 'white'

    },
    scroll: {
        width: '100%',
        flexDirection: 'row',
       
        height:200


    },
    category: {
        padding: 20,
        // fontFamily: 'Lato-Regular',
        color: "#1A2232",
        fontWeight:'600'
    }
})

export default StylistNavigator
