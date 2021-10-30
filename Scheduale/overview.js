import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity} from 'react-native';
import CalendarView from '../components/Scheduale/calendar'

import SchedualeHeader from '../Headers/scheduale'
import Availability from '../components/Scheduale/availability'


const SchedualeOverview = (props) => {
    const [viewState, setviewState] = useState("Scheduale")

    
    
    const backwards = () => {
        props.callback()
    }
    const background = () => {
        props.navigation.goBack()

    }
    const back = () => {
        props.navigation.goBack()
        
        
    }
    const changeView = () => {
        if (viewState=="Scheduale"){
            setviewState("Availability")

        } else {
            setviewState("Scheduale")
        }
    }

    const modifyDates = (dates) => {

        //pass dates as a dict object in the format 'YYYY-MM-DD': [{'I': (timeslot)]}
        for (var date in dates){
            if (!updatedDates.includes(date)){
                updatedDates[date] = dates[date]
            } else {
                for (var elem in dates[date]){
                    if (!updatedDates[date].includes(elem)){
                        updatedDates[date].push(elem)
                    } else {
                        //if date already includes that element - check it's flag (I/D)

                    }
                }
                
            }
        }
        setUpdatedDates(updatedDates)


        
    }

    

    var mainElem = <Availability goBack={background}/>
    // if (viewState=="Scheduale"){
    //     mainElem = <CalendarView callback={background} goBack={back} type={'Scheduale'}/>

    // }else {
    //     mainElem = <Availability/>

    // }

    
    return (
        <View style={styles.container}>
             <SchedualeHeader backwards={back} />
             {/* <Switch 
                buttonContent={viewState=='Scheduale'?'Scheduale':'Availability'}
                trackColor={{ false: "#1A2232", true: "white" }}
                thumbColor={viewState=='Scheduale'?'#1A2232':'white'}
                ios_backgroundColor="#1A2232"
                value={viewState=='Scheduale'}
                onValueChange={()=>changeView()}
                /> */}
            <View style={styles.switchWrapper}>
             {/* <Switch
           
            value={true}
            activeText={'Calendar'}
            inActiveText={'Availability'}
            backgroundActive={'#1A2232'}
            backgroundInactive={'#1A2232'}
            renderActiveText={viewState=='Scheduale'}
            renderInActiveText={viewState=='Availability'}
            disabled={false}
            value={viewState=='Scheduale'?true:false}
            onValueChange={()=>changeView()}
            style={styles.switch}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            innerCircleStyle={{alignItems: 'flex-end',justifyContent:'flex-end'}}
            switchWidthMultiplier={4}
            
           // style for inner animated circle for what you (may) be rendering inside the circle
        
            
            ></Switch> */}
            </View>
            
            {mainElem}
            


        </View>
    )
}
const styles= StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },
    switch: {
        alignSelf: "center",
        alignItems:'center',
        marginTop:10
       
    },
    switchWrapper: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }
})
export default SchedualeOverview