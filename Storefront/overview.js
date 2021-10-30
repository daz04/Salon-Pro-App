import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment'
import {getTitlesForStylist} from '../Database/functions'
import TitleModal from '../components/Storefront/titleModal'
import StylistProfile from '../components/Storefront/StylistProfile'
import StylistNavigator from '../components/Storefront/StylistNavigator'
import StylistBody from '../components/Storefront/StylistBody'
import {getStylistId, getSubcategories} from '../Database/functions'
import {getStylistCategories, getStylist} from '../Database/functions'
import {getTitles} from '../Database/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'



const StorefrontOverview = (props) => {
    //pass into store front existing services and options to add services
    //given stylist id we check fr
    
    const [email,setEmail] = useState(null)
    const [id,setId] = useState(null)
    const [visited, setVisited] = useState(false)
    const [stylist, setStylist] = useState(null)
    const [subcategoryList, setsubcategoryList] = useState([])
    const [spinner, setSpinner] = useState(true)
    
    var isNew = props.navigation.state.params.isNew
    
    const [fetched,setFetched] = useState(false)
    const [refresh,setRefresh] = useState(false)
    var [titleModal, setModal] = useState(null)
    var [imageModal, setImage] = useState(null)
    const [profilePic, setPic] = useState(null)
    const [titles,setTitles] = useState([])
    const [subcategorySelect, setCatSelect] = useState(null)
    const [disable, setDisable] = useState(isNew)
    const [servicesSelected, setservicesSelected] = useState(!isNew)
    const [profilephotoSelected, setphotoSelected] = useState(!isNew)
    const [count, setCount] = useState(0)
    const [photoSet, setphotoSet] = useState(false)


    useEffect(()=> {
        console.log("in storefront use effect")
        if (id==null){
            getId()
        }
        if (id!=null && stylist==null){
            console.log("ID IS DIFFERENT THAN NULL")
            getStylist(id, (result)=> {
                if (result!=null){
                    console.log("THE RESULT IN GET STYLIST")
                    console.log(result.data[0])
                    setStylist(result.data[0])
                    setTitles(result.data[0].Titles)
                    if (titles.length>0 && subcategoryList.length==0){
                        console.log("THE TITLES LENGTH IS GREATER THAN 0 HERE 2")
                        console.log(titles)
                        getSubcategories((result)=> {
                            if (result!=null){
                                console.log("GET SUB CATEGORIES RESULT")
                                console.log(result.data)
                                
                                
                                var subcategorySelectList = []
                                for (var record in result.data){
                                    if (titles.includes(result.data[record].SpecialtyName)){
                                        subcategorySelectList.push(result.data[record].name)
                                    }
                                }
                                console.log("THE SUBCATEGORY SELECT LIST 1")
                                console.log(subcategorySelectList)
                                setSpinner(false)
                                setsubcategoryList(subcategorySelectList)
                                setCatSelect(subcategorySelectList[0])
                                
                                
                            }
                        })
            
                    }
                }

            })


        } else if (id!=null && stylist!=null){
            getSubcategories((result)=> {
                if (result!=null){
                    console.log("GET SUB CATEGORIES RESULT")
                    console.log(result.data)
                    
                    
                    var subcategorySelectList = []
                    for (var record in result.data){
                        if (titles.includes(result.data[record].SpecialtyName)){
                            subcategorySelectList.push(result.data[record].name)
                        }
                    }
                    console.log("THE SUBCATEGORY SELECT LIST 1")
                    console.log(subcategorySelectList)
                    setSpinner(false)
                    setsubcategoryList(subcategorySelectList)
                    setCatSelect(subcategorySelectList[0])
                    
                    
                }
            })
        }
        

      
        




    }, [id, titles])
   

    // if (props.navigation.state.params.refresh!=null && count==0){
    //     setRefresh(!refresh)
    //     setCount(1)
    // }
   


    var stylistPayload = null 
    var formattedNum = null 
    
    var subcategoryKeys = []
    var newSubList = []
    var firstName = null 
    var lastName = null
    var subcategories = []
    var titles_ = null
 

    const getId = async ()=> {
        console.log("IN GET ID")
        var id = await AsyncStorage.getItem("stylistId")
        setId(id)

    }
   
   const modifyTitles = (titles_) => {
       console.log("IN THE MODIFY TITLES")
       setTitles(titles=>titles_)
       setRefresh(!refresh)
   }
  
 
const goToOption = (categoryOption, isNew, registered, registeredRecord) => {       
    const {navigate} = props.navigation
    navigate("Item", {
        registeredService: registeredRecord,
        isRegistered: registered,
        stylistPayload: stylistPayload,
        formattedNum: formattedNum,
        categoryOption: categoryOption,
        category: subcategorySelect,
        isNew: isNew,
        stylistId: id,
        visited: !visited
        
    })
}
   
    const modifyCategory = (category) => {
        console.log("IN MODIFY CATEGORY 3")
        setCatSelect(subcategorySelect=>category)

    }
    
    const changeMenu = (menuItem) => {
        const {navigate} = props.navigation 
        if (menuItem=="HOME"){
            navigate("Home")
        } else if (menuItem=="EARNINGS"){
            navigate("Earnings")
        } else if (menuItem=="SETTINGS"){
            navigate("Settings")
        }

    }

    const goToHome = () => {
        const {navigate} = props.navigation 
        props.navigation.pop(1)
        navigate("Home",{
            phoneNum: props.navigation.state.params.phoneNum
        })
    }

    const goToPending = () => {
        const {navigate} = props.navigation
        navigate("Approval Status", {
            phone: formattedNum,
            status: "Pending"
        })
    }

    const setStylistPhoto = (url) => {
        console.log("IN SET STYLIST PHOTO")
        setPic(url)
        setphotoSet(true)

    }
    const refreshPage = () => {
        console.log("AT PARENT REFRESH PAGE")
        setRefresh(!refresh)
    }

    const closeFunc = (titles_) => {
        console.log("AT CLOSE FUNCCCCCCCCCC STYLIST PROFILE 2")
        console.log(titles_)
        setTitles(titles_)
        
        setModal(titleModal=>null)
    }
       
      

    const editDisable = (input) => {
        if (input=="services"){
            setservicesSelected(true)

        } else if (input=="profile"){
            setphotoSelected(true)
        }

    }
    if (servicesSelected==true && profilephotoSelected==true && disable==true){
        setDisable(false)
    }

    console.log("BEFORE NEXT RENDER")
    console.log(subcategorySelect)

    const addTitles = (titles) => {


    }
    const removeTitles = (titles) => {

    }
    const changeTitles = (titleslist) => {
        console.log("IN CHANGE TITLES 2")
        //we are changing titles
        for (var title in titles){
           if (!(titleslist.includes(titles[title]))){
               //in this case we removed certain services
               setTitles(titles=> titles.filter(title_ => title_!=titles[title]))
           }
        }
        //we have to go back now to step 2 selection 

    }

    const showModal = () => {
        setModal(titleModal => <TitleModal selectedTitles={titles} close={closeFunc} stylistId={id} addedTitles={addTitles} removedTitles={removeTitles} changingTitles={changeTitles}/>)


    }

   
    
    
    return (
        <View style={styles.container}>
           
             <Spinner 
            visible={spinner}
            />
           
            
            {titleModal}
            {spinner==false &&
            <StylistProfile  titles={titles} firstName={firstName} lastName={lastName} id={id} setProfilePhoto={setStylistPhoto} disable={disable} changeDisable={editDisable} changeTitles={modifyTitles} showTitles={showModal}/>
            }
            {spinner==false &&
            <StylistNavigator id={id} callback={modifyCategory} selectedSub={subcategorySelect} subcategories={subcategoryList}/> }
            {spinner==false && 
                <StylistBody id={id} selectedSub={subcategorySelect} navigateItem={goToOption} callback={changeMenu} isNew={isNew} disable={disable} changeDisable={editDisable} submit={goToHome} visited={visited} profilePhotoSet={photoSet}/>
            }
            
        </View>
      
    )

}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
   

    },
    topRow: {
        width:'100%',
        height:'100%'
        
      
        

    }

})
export default StorefrontOverview