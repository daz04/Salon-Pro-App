import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity, Alert, Linking, TouchableHighlight, GestureReco } from 'react-native';
// import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'
import AppointmentDetails from './Components/AppointmentDetails'
import Modal from 'react-native-modal'
import {getService, fetchTransactionForBooking} from '../../../Database/functions'
import { useFonts } from 'expo-font';
import GestureRecognizer from 'react-native-swipe-gestures';


const AppointmentCard = ({appointment, booking, client, requestClose}) => {
    console.log("PARAMETERS PASSED TO APPOINTMENT CARD")
    console.log(appointment)
    console.log(booking)
    console.log(client)

    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require("../../../assets/fonts/Poppins-Regular.ttf"),
        'Poppins-Bold': require("../../../assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Black': require("../../../assets/fonts/Poppins-Black.ttf"),
        "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf")
     });
    console.log("IN APPOINTMENT CARD 2")
    console.log(JSON.parse(appointment.ClientCoords))
    const [service, setService] = useState(null)
    const [transaction, setTransaction] = useState(null)
    useEffect(()=> {
        if (service==null){
            console.log("IN FETCHING SERVICE")
            getService(appointment.ServiceId, (result)=> {
                if (result!=null){
                    console.log("THE GET SERVICE RESULT 3")
                    console.log(result.data[0])
                    setService(result.data[0])
    
                }
            })
            // setFetched(true)
        }
        if (transaction==null){
            console.log("IN FETCHING TRANSACTION 2")
            console.log(booking.id)
            fetchTransactionForBooking(booking.id, (result)=> {
                if (result!=null){
                    setTransaction(result.data[0])
                }
            })

        }
    }, [])
    console.log("IN APPOINTMENT CARD POST DATABASE FETCH")
    console.log(service)
    console.log(transaction)
    return (
        <View>
        <GestureRecognizer
        style={{flex: 1}}
        onSwipeDown={ () => requestClose() }
        >
            
        <Modal
        isVisible={true}
       
        animationIn ='slideInUp'
        animationOut='slideOutDown'

      
        style={styles.modal}
        onRequestClose={() => requestClose()}
        backdropOpacity={0}>
            <View style={styles.container}>
            <View style={styles.topThird}>
              
            {/* <MapView provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={
                styles.map
            }
            initialRegion={{
                latitude: JSON.parse(appointment.ClientCoords).Latitude, 
                longitude: JSON.parse(appointment.ClientCoords).Longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035
            }}>
                 
                
                <Marker
                coordinate={{latitude: JSON.parse(appointment.ClientCoords).Latitude, longitude: JSON.parse(appointment.ClientCoords).Longitude}}
                description={appointment.ClientAddress}>
        
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                            <Text>
                                {appointment.ClientAddress}
                            </Text>
                            </View>
                        </View>
                    
                    </Callout>
                    

        
                </Marker>
              
            
            </MapView> */}
             </View>
            <View style={styles.bottomTwoThird}>
                {service!=null && transaction!=null && 
                <AppointmentDetails appointment={appointment} client={client} service={service} transaction={transaction}/>
                }
            </View>
           
            </View>
        </Modal>
        </GestureRecognizer>
        </View>
        
        
    )

}
const styles = StyleSheet.create({
    map: {
        height:'100%',
       
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: "#fff",
        borderRadius:6,
        borderColor: "#ccc",
        borderWidth:0.5,
        padding:15
    },
    container: {
        height:'75%',
        width:'100%',
      
    },
    topThird: {
        height:'33%'
    },
    bottomTwoThird: {
        height:Dimensions.get('window').height*0.66,
        width: '100%',
        
    },
    modal:{
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.66,
       
        flexDirection: 'column',
        alignSelf: 'center'
    },
    

})

export default AppointmentCard
