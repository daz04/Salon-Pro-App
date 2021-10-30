import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneNumberForm from './Auth/SignIn/PhoneForm'
import HomeOverview from './Home/overview'

const LoadingScreen = ({setIsLoading})=> {
    
    //const [loadScreen] = useContext()
    const [screen, setScreen] = useState(null)
    const [screenFetched, setFetched] = useState(false)
    const [client, setClient] = useState(false)
    const [clientFetched, setclientFetched] = useState(false)
    
    
    useEffect(()=> {
      loadNavigationState().then(()=> {
        setFetched(true)
      }).catch((e)=> {
        console.log("LoadingScreen: ", e.message)
        setFetched(true)
      })
  
    }, [])

    const loadClientId = async () => {
        await AsyncStorage.getItem("clientId").then((res)=> {
            if (res!=null){
                setClient(true)
                
            } 
            setclientFetched(true)
            

        }).catch(e=> {
            setclientFetched(true)

        })

    }

    if (screenFetched==true && screen==null &&clientFetched==false){
        loadClientId()
      
        //check for client id
    }

    
    return (
        screen!=null ? screen : client==true ? <HomeOverview/> : <PhoneNumberForm/>
    )
    
  }

export default LoadingScreen