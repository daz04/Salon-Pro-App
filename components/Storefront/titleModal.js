import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal'
import {Ionicons} from 'react-native-vector-icons'
import {addTitles, getStylistCategories, postTitlesForStylist} from '../../Database/functions'
import {getStylist} from '../../Database/functions'
import {getStylistJson} from '../../S3/functions'
import {putStylistTitles} from '../../S3/functions'


const TitleModal = (props) => {
    console.log("BEFORE GET STYLIST JSON")
    
    
    const bucketName = "stylists"
    const accessKey = "AKIA4LZB5JKED4DCDXIB"
    const secretKey = "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"
    var preSelected = props.selectedTitles
    var stylistId = props.stylistId
    var titleList = []
    for (var option in preSelected){
        titleList.push(preSelected[option])
    }
   
    console.log("AT TITLE MODAL")
    const titles = ["Makeup Artist", "Nail Technician","Cosmetologist","Lash Tech","Barber"]
    const [select,setSelected] = useState(titleList)
    const editTitle = (title) => {
        if (!(select.includes(title))){
            setSelected(select=>([...select,title]))
        } else {
            setSelected(select.filter(title_ => title_!=title))
        }

    }
    const submit = () => {
        //check to make sure list is not empty - stylist needs to have at least one title 
        if (select.length==0){
            Alert.alert("Enter at least one specialty title before proceeding")
            return
        }
        // if (stylistId!=null){
        //     var stylist = getStylist(stylistId)
        // }
        // putStylistTitles(stylistId,select)
        var addedElems = []
        var removedElems = []
        if (select!=preSelected){
            for (var elem in select){
                if (!(preSelected.includes(select[elem]))){
                    //means we are adding an elem
                    addedElems.push(select[elem])
                }
            }
            for (var elem in preSelected){
                if (!(select.includes(preSelected[elem]))){
                    //we removed an elem 
                    removedElems = []
                }

            }

        }
        console.log("BEFORE CHANGING TITLES 2")
        console.log(select)
        props.changingTitles(select)
        // props.addedTitles(addedElems)
        // props.removedTitles(removedElems)

        // console.log("SUBMIT FUNCTION")
        // // addTitles(select)
        // console.log("AT SUBMIT IN MODAL")
        // console.log("THE PROPS")
        // console.log(props)
        //props.changingTitles(select)
        postTitlesForStylist(select,(result)=> {
            if (result!=null){
                props.close(select)

            } else {
                Alert.alert("Network Error", "Unable to update titles due to network error")
            }
        })
        
    }
    return (
        <View>
            <Modal
            isVisible={true}
            animationIn ='slideInUp'
            animationOut='slideOutDown'
            style={styles.modal}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Select one or more specialties</Text>
                    {titles.map(title=> {
                        return (
                            <View style={styles.row}>
                            <TouchableOpacity style={styles.checkbox} onPress={()=>editTitle(title)}>
                                <View style={{backgroundColor: select.includes(title)?'#1A2232':'transparent', display:select.includes(title)?'flex':'none', width: 30,height:30,borderRadius: 20,}}>
                                    <Ionicons name='checkmark-outline' size={25} style={styles.check}/>

                                </View>

                            </TouchableOpacity>
                            <Text style={styles.titleText}>{title}</Text>
                            </View>
                        )
                    })}
                    <TouchableOpacity style={styles.submitBox} onPress={()=>submit()}>
                        <Text style={styles.submitText}>SUBMIT</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )

}
const styles = StyleSheet.create({
    
    modal:{

    },
    container: {
        backgroundColor: "white",
       
        width: '80%',
        height: 'auto',
        // height: '75%',
        flexDirection: 'column',
        alignSelf: 'center',
       

    },
   
    checkbox: {
        width: 30,
        height:30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor: "#1A2232",
        marginRight:10,

    },
    check: {
        color: 'white',
        alignSelf: 'center'
    },
    submitBox: {
        width: '100%',
        height:50,
        backgroundColor: '#1A2232',
        alignSelf: 'center',
        borderRadius:2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20
    },
    submitText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize:14

    }, 
    row: {
        flexDirection: 'row',
      
        padding:10
    }, 
    title: {
        fontWeight: '600',
        color: '#1A2232',
        fontSize:14,
        marginBottom:10,
        marginLeft:10,
        marginTop:10
    },
    titleText: {
        alignSelf: 'center'
    }

})
export default TitleModal