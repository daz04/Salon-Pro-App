import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'
import moment from 'moment'
// import AWS from 'aws-sdk'
// import {getStylistJson} from '../S3/functions'
import axios from "axios"
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const getAddressList = (callback) => {
    //  axios.get(`http://localhost:3000/api/address/getAll`,{
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/address/getAll`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY GET ADDRESS LIST")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN GET ADDRESS LIST")
        console.log(error)
        callback(null)
    })

}

export const updateTransactionStatus = (transactionId, status, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/updateTransactionStatus?id=${transactionId}&status=${status}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY UPDATE TRANSACTION STATUS")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN UPDATE TRANSACTION STATUS")
        console.log(error)
        callback(null)
    })

}

export const updateStylistStatus = (stylistId, status, callback)=> {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylist/updateStatus?id=${stylistId}&status=${status}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY UPDATE STYLIST STATUS")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN UPDATE STYLIST STATUS")
        console.log(error)
        callback(null)
    })

}

export const updateStylistAddInitialAddress = (stylistId, addressId, addressList, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylist/addMainAddress?id=${stylistId}&addressId=${addressId}&addressList=${addressList}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY UPDATE STYLIST ADD INITIAL ADDRESS")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN ADD STYLIST INITIAL ADDRESS")
        console.log(error)
        callback(null)
    })

}


export const updateStylistCoordinates = (stylistId, coords, callback)=> {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylist/addCoords?id=${stylistId}&latitude=${coords['Latitude']}&longitude=${coords['Longitude']}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY UPDATE STYLIST COORDINATES")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN UPDATE STYLIST COORDINATES")
        console.log(error)
        callback(null)
    })

}

export const addresstoCoords = (addressPayload, callback) => {
    console.log("IN ADDRESS TO COORDS HERE")
    console.log(addressPayload)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/geocode/getUserCoordinatesFromAddress?address=${addressPayload}`,{
   //axios.get(`http:/localhost:3000/geocode/getUserCoordinatesFromAddress?address=${addressPayload}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("AT SUCCESSFULY GET STYLIST SCHEDUALE RESPONSE")
        console.log(response)
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN ADDRESS TO COORDS")
        console.log(error)
        callback(null)
    })
    
}

export const updateScheduale = (schedualeId, intervals, callback) => {
    // axios.get(`http://localhost:3000/api/scheduale/updateScheduale?schedualeId=${schedualeId}&intervals=${intervals}`, {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/scheduale/updateScheduale?schedualeId=${schedualeId}&intervals=${intervals}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    })
   
    .then(response => {
        console.log(`UPDATE SCHEDUALE FOR SCHEDUALE ID ${schedualeId} WORKED`)
        callback(true)
    }).catch(error=> {
        console.log(`UPDATE SCHEDUALE FOR SCHEDUALE ID ${schedualeId} FAILED`)
        console.log(error)
        callback(false)
    })

}

export const getSpecialtyList = (callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/specialties/getSpecialties`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response)
    }).catch(error => {
        callback(null)

    })


}

export const getReferrals = (callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/referral/getReferrals`, {
       
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
           
            callback(response)
        }).catch(error=> {
            console.log("GET REFERRALS FAILED")
            console.log(error)
            callback(null)
        })

}

export const getReferralsByStylistId = (stylistId,callback) => {
    //axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/referral/getReferralsByStylistId?stylistId=${stylistId}`, {
        axios.get(`http://localhost:3000/api/referral/getReferralsByStylistId?stylistId=${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
           
            callback(response)
        }).catch(error=> {
            console.log("GET REFERRALS BY STYLIST ID FAILED")
            console.log(error)
            callback(null)
        })

}

export const getStylists = (callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/getStylists`, {
       
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
           
            callback(response)
        }).catch(error=> {
            console.log("GET STYLISTS FAILED")
            console.log(error)
            callback(null)
        })

}

export const setStylistSubscription = (id, subscription, renewal) => {
    console.log("IN SET STYLIST SUBSCRIPTION 3")
    console.log(id)
    console.log(subscription)
    console.log(renewal)
   
    var params = {
        id: id,
        subscription: subscription,
        renewalDate: renewal

    }
    //axios.post(`http://localhost:3000/api/stylists/setSubscription`,params,{
    axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/setSubscription`,params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    })
    .then(response=> {
        console.log("Successfully posted stylist subscription 2")
        // callback(response)
    })
    .catch(error=> {
        console.log("Failed to post stylist subscription 2")
        console.log(error)
        // callback(null)
    })

}
export const updateStylistRadius = (id, radius, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/updateRadius?stylistId=${id}&radius=${radius}`, {
    //axios.get(`http://localhost:3000/api/stylists/updateRadius?stylistId=${id}&radius=${radius}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
            console.log("UPDATE STYLIST RADIUS SUCCESSFUL")
            callback(response)
        }).catch(error=> {
            console.log("UPDATE STYLIST RADIUS FAILED")
            console.log(error)
            callback(null)
        })
}
export const setStylistStripeId = (id, clientId) => {
    var params = {
        id: id,
        stripeId: clientId
    }
    axios.put(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/setStripeId`,params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
            if (response!=null){
                console.log("posted")
                
            }
        }).catch(error=> {
            console.log(error)
        })
}

export const getStylistByEmail = (email, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/getbyEmail?email=${email}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("GET STYLIST BY EMAIL RESPONSE")
        console.log(response)
        if (response.data.length>0){
            callback(false)
        } else {
            callback(true)
        }
    }).catch(error => {
        console.log(error)
        
    })
    
    

}

export const getPromotion = (id, callback) => {
    //axios.get(`http://localhost:3000/api/promotion/getbyId?id=${id}`, {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/promotion/getbyId?id=${id}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
       callback(response)
    }).catch(error => {
        console.log("GET PROMOTION ERROR")
        console.log(error)
        callback(null)
        
    })

}

export const getPromoCodeByName = (name, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/promocode/getByName?name=${name}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("GET PROMO CODE BY NAME RESPONSE")
        console.log(response)
       callback(response)
    }).catch(error => {
        console.log("GET PROMO CODE BY NAME ERROR")
        console.log(error)
        callback(null)
        
    })

}

export const getSubscriptions = (callback) => {
    //axios.get(`http://localhost:3000/api/subscriptions/getSubscriptions`, {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/subscriptions/getSubscriptions`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
       callback(response)
    }).catch(error => {
        console.log("GET SUBSCRIPTIONS ERROR 2")
        console.log(error)
        callback(null)
        
    })
}

export const getStylistObjByPhone = (phone, callback) => {
    console.log(phone)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/getbyPhone?phone=${phone}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("GET STYLIST BY PHONE RESPONSE")
        console.log(response.data.data)
        if (response.data.length>0){
            callback(response.data[0])
        } else {
            callback(null)
        }
    }).catch(error => {
        console.log(error)
        
    })

}

export const getStylistByPhone = (phone, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/getbyPhone?phone=${phone}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("GET STYLIST BY PHONE RESPONSE")
        console.log(response.data)
        if (response.data.length>0){
            callback(response.data[0])
        } else {
            callback(null)
        }
    }).catch(error => {
        console.log(error)
        
    })

}

export const updateAddress = (addressId, addressName, streetName, city, state, callback) => {
    console.log("IN UPDATE ADDRESS")
    console.log("CITY")
    console.log(city)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/address/updateAddress?addressId=${addressId}&addressName=${addressName}&streetName=${streetName}&city=${city}&state=${state}`, {
        // axios.get(`http://localhost:3000/api/address/updateAddress?addressId=${addressId}&addressName=${addressName}&streetName=${streetName}&city=${city}&state=${state}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("UPDATE ADDRESS WAS SUCCESSFUL")
        callback(response)

    }).catch(error=> {
        console.log("UPDATE ADDRESS FAILED")
        console.log(error)
        callback(null)
    })
}
export const addClientStripeId = (id, stripeId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylist/addStripeId?id=${id}&stripeId=${stripeId}`, {
       headers: {
           'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

       }
   }).then(response=> {
       console.log("ADD CLIENT STRIPE ID WAS SUCCESSFUL")
       console.log(response)
       callback(response)

   }).catch(error=> {
       console.log("ADD CLIENT STRIPE ID FAILED")
       console.log(error)
       callback(null)
   })

}

export const updatePaymentMethodEntry = (stripeId, mainPayment, paymentlist, callback) => {
    var params = {
        stripeId: stripeId,
        mainpaymentMethod: mainPayment,
        paymentMethodList: paymentlist
    }
    console.log("UPDATE PAYMENT METHOD ENTRY AGAIN")
    console.log(params)
axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/paymentMethods/updatePaymentMethod`,params, {
    //axios.post(`http://localhost:3000/api/paymentMethods/updatePaymentMethod`,params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response)
    }).catch(error=> {
        console.log("UPDATE PAYMENT METHOD ERROR")
        console.log(error)
        callback(null)
    })
    
}



export const createPaymentMethodEntry = (stripeId, mainPayment, paymentlist, callback) => {
    var params = {
        stripeId: stripeId,
        mainpaymentMethod: mainPayment,
        paymentMethodList: paymentlist
    }
    
    
    axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/paymentMethods/createPaymentMethod`,params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("CREATE PAYMENT METHOD ENTRY WAS SUCCESSFUL")
        callback(response)

    }).catch(error=> {
        console.log("CREATE PAYMENT METHOD ENTRY FAILED")
        console.log(error)
        callback(null)
    })


}
export const getTransactions = (stylistId, callback) => {
    //axios.get(`http://localhost:3000/api/transactions?stylistId=${stylistId}`, {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/transactions?stylistId=${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("IN GET TRANSACTIONS API CALL")
        console.log(response.data)
            callback(response)
        }).catch(error=> {
            console.log("GET TRANSACTIONS ERROR 1")
            console.log(error)
            callback(null)
        })
   
}
export const createTransaction = (payload, callback)=> {
    axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/transactions/createTransaction`,payload, {
            headers: {
                'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    
            }
        }).then(response=> {
            if (response!=null){

                console.log("CREATE TRANSACTION WAS SUCCESSFUL")
                console.log(response.data)
                callback(response)
                
            }
        }).catch(error=> {
            console.log(error)
            callback(null)
        })
}



export const deleteAddress = (addressId, callback) => {
    console.log("IN DELETE ADDRESS")
    console.log(addressId)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/address/deleteAddress?addressId=${addressId}`, {
    //axios.get(`http://localhost:3000/api/address/deleteAddress?addressId=${addressId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL DELETE ADDRESS RESPONSE")
        callback(response)
    }).catch(error=> {
        console.log("DELETE ADDRESS FAILED")
        console.log(error)
        callback(null)
    })

}

export const updateStylistAddressList = async (addressId, addressList, callback) => {
    var stylistId = await AsyncStorage.getItem('stylistId')
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/updateAddressList?stylistId=${stylistId}&addressList=${addressList}`, {
        // axios.get(`http://localhost:3000/api/stylists/updateAddressList?stylistId=${stylistId}&addressList=${addressList}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log(addressId)
        console.log(stylistId)
        console.log("UPDATE STYLIST ADDRESS LIST SUCCESSFUL")
        callback(response)
    }).catch(error=> {
        console.log("UPDATE STYLIST ADDRESS LIST FAILED")
        console.log(error)
        callback(null)

    })

}



export const postAddress = (addressObj, callback) => {
    var id = uuid.v4()
    var params = addressObj
    params['id'] = id
    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/address/postAddress/",params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("Post address response")
        callback(response)

    }).catch(error => {
        console.log("Post address error")
        console.log(error)
        callback(null)

    })
    }

const generateAddressObj = (city, state) => {
    var id = uuid.v4()
    return {
        id: id,
        city: city,
        state: state
    }


}
export const saveStylistAsync = async (id) => {
    try {
        await AsyncStorage.setItem(
            'stylistId',
            id
        )
    } catch (error) {
        console.log("SAVE STYLIST ASYNC ERROR")
        console.log(error)
    }

}

export const setStylistProfilePic = (stylistId) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/setprofilePic?stylistId=${stylistId}`,{

        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("Set stylist profile pic URL successfully")
    }).catch(error => {
        console.log("Failed to set stylist profile pic URL")
        console.log(error)
    })
}
export const getAppointmentList = (callback) => {
    
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/appointments/getAppointmentList`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
            callback(response)


        }).catch(error=> {
            console.log("GET APPOINTMENT LIST ERROR")
            console.log(error)
            callback(null)

        })


}
export const postStylist = (stylistPayload, callback) => {


    saveStylistAsync(stylistPayload.id)
   
    // var city = stylistPayload.city 
    // var state = stylistPayload.state
    // var addressObj = generateAddressObj(city,state)
    // var addressList = [String(addressObj.id)]
   
    var params = {
        id: stylistPayload.id,
        // activeAddress: String(addressObj.id),
        // addressList: addressList,
        birthDate: stylistPayload.birthdate,
        email: stylistPayload.email,
        firstName: stylistPayload.firstName,
        lastName: stylistPayload.lastName,
        phone: stylistPayload.phone,
        referralCode: stylistPayload.referralCode,
        status: "Pending"
    }
    console.log("THE PARAMS BEING PASSED IN POST STYLIST")
    console.log(params)
    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/postStylist", params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("POST STYLIST RESPONSE")
        console.log(response)
        callback(response)
        // postAddress(addressObj)
        // var id = response.data.id
        
        
    }).catch(error=> {
        console.log("AXIOS ERROR")
        console.log(error)
        callback(null)
    })

}


export const getService = (serviceId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getService?serviceId=${serviceId}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }}).then(response=> {
            callback(response)


        }).catch(error=> {
            console.log("GET SERVICE ERROR")
            console.log(error)
            callback(null)

        })
    
    //implement fetch api after: get service by service id

    // const serviceJson = require('../json/services.json')
    // var serviceList = serviceJson['services']
    // for (var service in serviceList) {
    //     if (serviceList[service].Id == serviceId){
    //         return serviceList[service]
    //     }
    // }
    // return null
}
export const updateService = (params, callback) => {
    axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/updateService`, params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response)
    }).catch(err=> {
        console.log("UPDATE SERVICE ERROR")
        console.log(err)
        callback(null)
    })

}
export const getServicesBySubCategory = async (stylistId, subcategory, callback)=> {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getServicesBySubategories?stylistId=${stylistId}&subcategory=${subcategory}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response.data)
    }).catch(err=> {
        callback(null)
    })

}
export const getServiceList = (stylistId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getServicesforStylist?stylistId=${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        if (response!=null){
            console.log("GET BOOKINGS RESPONSE")
            console.log(response)
            callback(response.data)

        }
       
    }).catch(err=> {
        console.log("ERROR IN GETTING BOOKINGS")
        console.log(err)
        callback(null)
    })
    // var apiCall = await axios.get("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/", {
    // },
    // { headers:{
    // "x-api-key": "jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r"

    // }
    // }).promise()
    // var apiBody = apiCall.Body
    // console.log("API BODY")
    // console.log(apiBody)

    // var returnList = []
    // //implement fetch api after: get all servives with stylist ID
    // const serviceJson = require('../json/services.json')
    // var serviceList = serviceJson['services']
    // for (var service in serviceList){
    //     if (serviceList[service].StylistId == stylistId){
    //         returnList.push(serviceList[service])

    //     }
    // }
    // return returnList
}


export const postPayoutRequest = (params, callback) => {
    var id = uuid.v4()
    params['id'] = id
    axios.post(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/payoutRequest/postRequest`,params, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("POST PAYOUT REQUEST RESPONSE")
        console.log(response)
        callback(response)
    }).catch(err=> {
        console.log("POST PAYOUT REQUEST ERROR")
        console.log(err)
        callback(null)
    })

}

export const fetchTransactionForBooking = (bookingId, callback) => {
    
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/transactions/fetchByBookingId?bookingId=${bookingId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response)
    }).catch(error=> {
        console.log("FETCH TRANSACTION FOR BOOKING ERROR")
        console.log(error)
        callback(null)

    })

}

export const getPaymentMethod = (stripeId, callback) => {
    console.log("GET PAYMENT METHOD ENDPOINT")
    
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/paymentMethods/getById?stripeId=${stripeId}`, {
    //axios.get(`http://localhost:3000/api/paymentMethods/getById?stripeId=${stripeId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("RESPONSE")
        console.log(response)
        callback(response)
    }).catch(error=> {
        console.log("GET PAYMENT METHOD ERROR")
        console.log(error)
        callback(null)

    })

}

//Stylist

export const getStylist = (stylistId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/stylist?stylistId=${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {

       
        callback(response)
    }).catch(err=> {
        console.log("ERROR IN GETTING BOOKINGS")
        console.log(err)
        callback(null)
    })

   
}

export const getServicesLength = (stylistId) => {
    
    

}
export const getAllServices = (callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getServices`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        console.log("GET SERVICES LIST RESPONSE")
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN GET SERVICES LIST")
        console.log(error)
        callback(null)
    })

}
export const addStylistIdAsync = (phoneNum, callback) => {
    console.log("IN ADD STYLIST ID ASYNC STORAGE")
    getStylistObjByPhone(phoneNum, (result)=> {
        console.log("RESULT FOR GET STYLIST BY PHONE")
        console.log(phoneNum)
        console.log(result)
        if (result==null){
            console.log('error in add stylist id async')
            callback(null)
        }
        AsyncStorage.setItem("@id",result.id)
        callback(result.id)
    })
    

}

export const addStylistAccountId = async (accountId,callback) => {
    var stylistId = await AsyncStorage.getItem('stylistId')
    console.log("BEFORE ADD STYLIST ACCOUNT ID")
    console.log()
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylist/addConnectAccountId?id=${stylistId}&accountId=${accountId}`, {
       
            headers: {
                'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    
            }
    }).then(response=> {
        callback(response)
    }).catch(error => {
        console.log("UPDATE BOOKING STATUS ERROR")
        console.log(error)
        callback(null)
    })

}

export const updateBookingStatus = (bookingId, status, callback) => {
    console.log("IN UPDATE BOOKING STATUS")
    console.log(bookingId)
   axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/bookings/setBookingStatus?bookingId=${bookingId}&status=${status}`, {
    //axios.get(`http://localhost:3000/api/bookings/setBookingStatus?bookingId=${bookingId}&status=${status}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
}).then(response=> {
    callback(response)
}).catch(error => {
    console.log("UPDATE BOOKING STATUS ERROR")
    console.log(error)
    callback(null)
})

}

export const getBookings = (stylistId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/bookings/getBookingsByStylist?stylistId=${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
}).then(response=> {
    console.log("GET BOOKINGS RESPONSE")
    console.log(response)
    callback(response)
}).catch(err=> {
    console.log("ERROR IN GETTING BOOKINGS")
    console.log(err)
    callback(null)
})
}

export const getAppointment = (appointmentId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/appointments/getAppointment?appointmentId=${appointmentId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        callback(response)

    }).catch(error=> {
        console.log("IN GET APPOINTMENT ERROR")
        console.log(error)
        callback(null)

    })


}

const bookingIterator = (bookingList, count, addressList, callback)=> {
    if (count==bookingList.length){
        callback(addressList)

    } else {
        var todayDate = moment().format('YYYY-MM-DD')
        var appointmentId = bookingList[count].AppointmentId
        console.log("CONFIRMED APPOINTMENT ID 2")
        console.log(appointmentId)
        const appointmentval = () => {
            getAppointment(appointmentId, (result)=> {
                console.log("IN GET APPOINTMENT NEW")
                if (result!=null){
                    console.log("GET APPOINTMENT NEW RESULT IS NOT NULL")
                    var appointment = result.data[0]
                    console.log("THE APPOINTMENT OBJ")
                    if (moment(appointment.Date).format('YYYY-MM-DD') >= todayDate){
                        console.log("ADDRESS LIST PUSH")
                        addressList.push(bookingList[count])
                       
                        
                    }
                }
                console.log("BEFORE BOOKING ITERATOR RECURSIVE")
                console.log(addressList)
                bookingIterator(bookingList, count+1, addressList, callback)
    })
    }
    appointmentval()

    }

}
export const getUpcomingConfirmed = (stylistId, callback) => {
    var finalarr = []
    console.log("STYLIST ID IN UPCOMING CONFIRMED")
    console.log(stylistId)
    if (stylistId==null){
        console.log("raise an error")
        return
    }

    //start with the implementation here 
    
    getBookings(stylistId, (result)=> {
        
        console.log(result)
        if (result!=null && result.data.length>0){
            var arr = []
            
            
            for (var elem in result.data){
                if (result.data[elem].Status=="Confirmed") {
                    arr.push(result.data[elem])
                }
            }
            console.log("CONFIRMED BOOKINGS 3")
            console.log(arr)
            bookingIterator (arr, 0, [], (result)=> {
                callback(result)

            })
          
    }
    })
}
//     var returnList = []
//     var todayDate = moment().format('YYYY-MM-DD')
//     const bookingsJson = require('../json/bookings.json')
//     const appointmentsJson = require('../json/appointments.json')
//     var appointmentList = appointmentsJson['appointments']
//     var bookingList = bookingsJson['bookings'];
//     for (var booking in bookingList){
//         if (bookingList[booking].Status=="confirmed"){
//         var id = bookingList[booking].AppointmentId
//         for (var appt in appointmentList){
//             var service = getServiceFromAppt(appointmentList[appt].Id)
//             if (service==null){
//                 //raise error
//                 return
//             }
//             var appointmentObj = getAppointment(appointmentList[appt].Id)
//             if (appointmentObj==null){
//                 //raise error
//                 return 
//             }
//             var date = moment(appointmentObj.Date).format('YYYY-MM-DD')

            
//             if (service.StylistId==stylistId && date>=todayDate){
//                 returnList.push(bookingList[booking])
                

//             }
          
//         }


//     }
//     return returnList

// }


export const getPendingConfirmed = (email) => {
    console.log("AT PENDING CONFIRMMED FUNCTION")
      
    var stylistId = getStylistId(email)
    if (stylistId==null){
        console.log("raise an error")
        return
    }
    var returnList = []
    var todayDate = moment().format('YYYY-MM-DD')
    const bookingsJson = require('../json/bookings.json')
    const appointmentsJson = require('../json/appointments.json')
    var appointmentList = appointmentsJson['appointments']
    var bookingList = bookingsJson['bookings'];
    console.log("BOOKINGS LIST")
    console.log(bookingList)
    for (var booking in bookingList){
        console.log("THE PENDING BOOKING LOOP")
        console.log(bookingList[booking])
        console.log(bookingList[booking].Status)
        if (bookingList[booking].Status=="pending"){
            console.log("AT PENDING")
            var id = bookingList[booking].AppointmentId
            for (var appt in appointmentList){
                var service = getServiceFromAppt(appointmentList[appt].Id)
                if (service==null){
                    //raise error
                    return
                }
                var appointmentObj = getAppointment(appointmentList[appt].Id)
                if (appointmentObj==null){
                    //raise error
                    return 
                }
                var date = moment(appointmentObj.Date).format('YYYY-MM-DD')

                
                if (service.StylistId==stylistId && date>=todayDate){
                    returnList.push(bookingList[booking])
                    

                }
            
            }


    }
   

}
return returnList



}

export const getStylistId = (email) => {
    //import api later
    var stylistsJson = require('../json/stylists.json')
    var stylistsList = stylistsJson['stylists']
    for (var stylist in stylistsList){
        if (stylistsList[stylist].Email==email){
            return stylistsList[stylist].Id
        }
    }
    return null
}
export const getStylistIdFromAppt = (apptId) => {


}

export const getSubcategories = (callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/subcategory/get`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=>{
        callback(response)
    }).catch(error=>{
        console.log("ERROR IN GET SERVICE NAMES")
        console.log(error)
        callback(null)
    })


}

export const getStylistCategories = (stylistId) => {
    var categoryList = []

    var services = getServiceList(stylistId)
    for (var service in services){
        if (!(services[service].Category in categoryList)){
            categoryList.push(services[service].Category)
        }
    }
    return categoryList

}
const getServiceFromAppt = (apptId) => {
    const appointmentsJson = require('../json/appointments.json')
    var appointmentList = appointmentsJson['appointments']
    const servicesJson = require('../json/services.json')
    var servicesList = servicesJson['services']

    for (var appt in appointmentList){
        if (appointmentList[appt].Id==apptId){
            var serviceId = appointmentList[appt].ServiceId
            for (var service in servicesList){
                if (servicesList[service].Id == serviceId){
                    return servicesList[service]
                }
            }


        }
    }
    return null
    
}

export const getPayoutByDateAndStylist = (date, stylistId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/getPayoutByDateAndStylist?date=${date}&stylistId${stylistId}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
        }
        }).then(response=>{
            callback(response)
    
    
       
    }).catch(error=> {
        console.log("GET PAYOUT BY DATE AND STYLIST")
        console.log(error)
        callback(null)
    
    })

}


export const createPayout = (stylistId, totalAmount, date, transactionsList, callback ) => {
    var payload = {
        stylistId: stylistId,
        id: uuid.v4(),
        date: date,
        total: totalAmount, 
        transactionsList: transactionsList

    }
    axios.post("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/addPayout",payload,{ 
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL CREATE PAYOUT")
        callback(response)
    }).catch(error=> {
        console.log("FAILED CREATE PAYOUT")
        console.log(error)
        callback(null)
    })

}

export const updateTransactionsStatus = (transactionList, status, callback) => {
    var params = {
        transactionList: transactionList,
        status: status

    }
    axios.post("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/updateTransactionListStatus",params,{ 
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL UPDATE TRANSACTION LIST STATUS")
        callback(response)
    }).catch(error=> {
        console.log("FAILED UPDATE TRANSACTION LIST STATUS")
        console.log(error)
        callback(null)
    })
   


}

export const getStylistEarnings = (email, date) =>{
    var id = getStylistId(email)
    if (id==null){
        //raise error
        return
    }
    console.log("AT GET STYLIST EARNINGS")
    console.log(id)
    var earningsList = require("../json/earnings.json")['earnings']
    for (var earning in earningsList){
        if (earningsList[earning].StylistId == id){
            var dates = earningsList[earning].Dates 
            var transactions = []
            for (var date_ in dates){
                console.log("IN DATES FOR LOOP")
                console.log(dates)
                if (dates[date_].date == date){
                    for ( var trans in dates[date_].transactions)
                    transactions.push(dates[date_].transactions[trans])
                    
                    
                }

            }
            console.log("TRANSACTION LIST")
            console.log(transactions)
            var sum = sumTransactions(transactions)
            return sum
        }
    }
    return 0


}

export const numberOfBookings = (email, date) => {
    var id = getStylistId(email)
  
    if (id==null){
        //raise error
        return
    }
    var earningsList = require("../json/earnings.json")['earnings']
    for (var earning in earningsList){
        if (earningsList[earning].StylistId == id){
            var dates = earningsList[earning].Dates 
            
            for (var date_ in dates){
                if (dates[date_].date == date){
                    return dates[date_].transactions.length
                   
                    
                    
                }

            }
           
        }
    }
    return 0


}

export const walletBalance = (email) => {
    var total = 0
    var id = getStylistId(email)
    if (id==null){
        //raise error
        return
    }
    console.log("AT WALLET BALANCE")
    var earningsList = require("../json/earnings.json")['earnings']
    for (var earning in earningsList){
        if (earningsList[earning].StylistId == id){
            var dates = earningsList[earning].Dates 
            
            for (var date_ in dates){
                for (var trans in dates[date_].transactions){
                    console.log("TRANS")
                    console.log(trans)
                    var transObj = getTransactionById(dates[date_].transactions[trans])
                    console.log("AT TRANSACTION OBJECT")
                    console.log(transObj)
                    if (transObj==null){
                        //raise error
                        return
                    }
                    if (transObj.withdrew==false){
                        total += transObj.Amount
                    }

                }
                
                    
                   
                    
                    
                

            }
            
           
        }
    }
    return total


}
const getTransactionById = (id) => {
    console.log("GET TRANSACTION BY ID")
    var transactionList = require('../json/transactions.json')['transactions']
    for (var trans in transactionList){
        if (transactionList[trans].Id == id){
            console.log("TRANSACTION FROM DATABASE")
            console.log(transactionList[trans])
            return transactionList[trans]
        }
    }
    return null

}
export const getClientList = (callback) => {
    
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/client/getClientList`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
        }
        }).then(response=>{
            callback(response)
    
    
       
    }).catch(error=> {
        console.log("GET CLIENT LIST ERROR")
        console.log(error)
        callback(null)
    
    })
}
export const getClient = (clientId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/client/getClient?id=${clientId}`, {
    headers: {
        'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    }
    }).then(response=>{
        callback(response)


   
}).catch(error=> {
    console.log("GET CLIENT ERROR")
    console.log(error)
    callback(null)

})

}
// export const getClient = (clientId) => {
//     var clientList = require('../json/clients.json')['clients']
//     for (var client in clientList){
//         if (clientList[client].Id == clientId){
//             return clientList[client]
//         }
//     }
//     return null
// }

export const getBookingsList = (id, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/bookings/getBookingsByStylist?stylistId=${id}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
        }

        }).then(response=>{
            console.log("GET BOOKINGS RESPONSE 2")
            console.log(response)
            callback(response)
       

    }).catch(error=> {
        console.log("GET  BOOKINGS ERROR")
        console.log(error)
        callback(null)

    })

}
export const getPendingBookings = (id, callback) => {
    console.log("IN GET PENDING BOOKINGS")
    var results = []
 
    console.log("STYLIST ID")
    console.log(id)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/bookings/getBookingsByStylist?stylistId=${id}`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
        }

        }).then(response=>{
            callback(response)
        //     console.log("GET PENDING BOOKINGS RESPONSE 2")
        //     console.log(response)
        // if (response!=null && response.data.length>0){
        //     var bookings = response.data
        //     console.log("BOOK")
        //     console.log(bookings)
        //     var pendingBookings = []
        //     for (var booking in bookings){
        //         console.log("PENDING BOOKINGS LOOP")
        //         console.log(bookings[booking])
        //         if (bookings[booking].Status=="Pending"){
        //             console.log("BOOKING HAS STATUS PENDING")
        //             pendingBookings.push(bookings[booking])
        //         }
        //     }
        //     console.log("PENDING BOOKINGS BEFORE CALLBACK")
        //     console.log(pendingBookings)
        //     callback(pendingBookings)

        // } else {
        //     callback(null)
        // }

    }).catch(error=> {
        console.log("GET PENDING BOOKINGS ERROR")
        console.log(error)
        callback(null)

    })
   


}

export const getClientFromBooking = (booking) => {

    var clientEmail = booking.ClientEmail 
    var clientList = require('../json/clients.json')['clients']
    for (var client in clientList){
        if (clientList[client].Email==clientEmail){
            return clientList[client]
        }
    }
    return null

}
export const getApptFromBooking = (booking) => {
    var apptId = booking.AppointmentId
    var apptList = require('../json/appointments.json')['appointments']
    for (var appt in apptList){
        if (apptList[appt].Id == apptId){
            return apptList[appt]
        }
    }
    return null
}

//storefront specific functions

export const updateAvailability = async (dates, callback) => {

    var monday = dates['Monday']
    var tuesday = dates['Tuesday']
    var wednesday = dates['Wednesday']
    var thursday = dates['Thursday']
    var friday = dates['Friday']
    var saturday = dates['Saturday']
    var sunday = dates['Sunday']
    console.log("AVAILABILITY UPDATE INPUT")
    console.log("SATURDAY")
    console.log(saturday)
    var stylistId = await AsyncStorage.getItem('stylistId')
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/availability/updateAvailability?stylistId=${stylistId}&monday=${monday}&tuesday=${tuesday}&wednesday=${wednesday}&thursday=${thursday}&friday=${friday}&saturday=${saturday}&sunday=${sunday}`, {
        //axios.get(`http://localhost:3000/api/availability/updateAvailability?stylistId=${stylistId}&monday=${monday}&tuesday=${tuesday}&wednesday=${wednesday}&thursday=${thursday}&friday=${friday}&saturday=${saturday}&sunday=${sunday}`, {
        //axios.post("http://localhost:3000/api/scheduale/postScheduale",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("UPDATE AVAILABILITY WORKED")
        callback(true)
    }).catch(error=>{
        console.log("UPDATE AVAILABILITY FAILED")
        console.log(error)
        callback(false)
    })
    
}

export const getAvailabilityForStylist = async (callback) => {
    console.log("IN GET AVAILABILITY FOR STYLIST")
    var stylistId = await AsyncStorage.getItem('stylistId')
    console.log("THE STYLIST ID")
    console.log(stylistId)

    //axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/availability/getAvailability?id=${stylistId}`,{
        axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/availability/getAvailability?id=${stylistId}`, {
        //axios.post("http://localhost:3000/api/scheduale/postScheduale",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    })
    .then(response=> {
        console.log("AVAILABILITY RESPONSE")
        console.log(response.data)
        callback(response.data)

    })
    .catch(error=> {
        console.log("AVAILABILITY ERROR")
        console.log(error)
    })
}

const postSchedualeDay = (params) => {
        axios.post("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/scheduale/postScheduale",params,{
        //axios.post("http://localhost:3000/api/scheduale/postScheduale",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL POST SCHEDUALE FOR STYLIST")
    }).catch(error=> {
        console.log("FAILED POST SCHEDUALE FOR STYLIST")
        console.log(error)
    })

}
export const getScheduale = (schedualeId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/scheduale/getSchedualeById?schedualeId=${schedualeId}`,{
    //axios.post("http://localhost:3000/api/scheduale/postScheduale",params,{
    headers: {
        'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

    }
    }).then(response=> {
        callback(response.data)
        
    }).catch(error=> {
        console.log("GET SCHEDUALE ERROR")
        console.log(error)
        callback(null)
    })

}
export const getSchedualeForStylist = async  (date,callback) => {
    console.log("IN GET SCHEDUALE FOR STYLIST")
    var stylistId = await AsyncStorage.getItem("stylistId")
    console.log("STYLIST ID")
    console.log(stylistId)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/scheduale/getScheduale?stylistId=${stylistId}&date=${date}`,{
    //axios.post("http://localhost:3000/api/scheduale/postScheduale",params,{
    headers: {
        'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

    }
    })
    .then(response=> {
        console.log("GET SCHEDUALE FOR STYLIST RESPONSE")
        console.log(response.data)
        callback(response.data)

    })
    .catch(error=> {
        console.log(error)
        callback(null)
    })




}
export const postSchedualeForStylist = async (availability, date) => {
    console.log("IN POST SCHEDUALE FOR STYLIST")
    var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var stylistId = await AsyncStorage.getItem("stylistId")
    for (var i=0; i<30;i++){
        var new_date = moment(date, 'YYYY-MM-DD').add(i,'days')
        var new_date_edit = moment(new_date).format('YYYY-MM-DD')
        // new_date = moment(new_date).format('YYYY-MM-DD')
        var weekDay = new_date.day()
        var slots = availability[dayList[weekDay]]
        console.log("NEW DATE")
      
        console.log(new_date_edit)
        console.log("WEEK DAY")
        console.log(weekDay)
        console.log("SLOTS")
        console.log(slots)
        //the slots for this weekday 
        var timeIntervals = []
        for (var slot in slots){
            console.log("SLOT IN SLOTS")
            console.log(slots[slot])
            if (slots[slot]=="Early"){
                timeIntervals.push("6-9AM")

            } else if (slots[slot]=="Morning"){
                timeIntervals.push("9-12PM")
            } else if (slots[slot]=="Noon"){
                timeIntervals.push("12-2PM")
            
            } else if (slots[slot]=="Afternoon"){
                timeIntervals.push("2-5PM")
            } else if (slots[slot]=="Evening"){
                timeIntervals.push("5-8PM")
            } else {
                timeIntervals.push("8-11PM")
            }
        }
        var params = {
            schedualeId: uuid.v4(),
            stylistId: stylistId,
            date: String(new_date_edit),
            weekDay: dayList[weekDay],
            availableIntervals: timeIntervals
        }
        console.log("PARAMS")
        console.log(params)
        postSchedualeDay(params)


    }
    

}
export const postAvailabilityForStylist = async (availability) => {
    var stylistId = await AsyncStorage.getItem("stylistId")
    //availability is gonna be of type dict
    var params = {
        id: stylistId,
        monday: availability['Monday'],
        tuesday: availability['Tuesday'],
        wednesday: availability['Wednesday'],
        thursday: availability['Thursday'],
        friday: availability['Friday'],
        saturday: availability['Saturday'],
        sunday: availability['Sunday']
        
    }
    console.log("POST AVAILABILITY PARAMS")
    console.log(params)
    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/availability/postAvailability",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL POST AVAILABILITY FOR STYLIST")
    }).catch(error=> {
        console.log("FAILED POST AVAILABILITY FOR STYLIST")
        console.log(error)
    })

}

export const getAvailability = (stylistId) => {

}
export const postLicenseForStylist = async(license) => {
    var stylistId = await AsyncStorage.getItem("stylistId")
    var params = {
        id: stylistId,
        license: license
    }

    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/setLicense",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("SUCCESSFUL POST LICENSE FOR STYLIST")
    }).catch(error=> {
        console.log("FAILED POST LICENSE FOR STYLIST")
        console.log(error)
    })
    
}
export const postTitlesForStylist = async (titles, callback) => {
    var stylistId = await AsyncStorage.getItem("stylistId")
    console.log("IN POST TITLES FOR STYLIST")
    console.log(stylistId)
    var params = {
        id: stylistId,
        titles: titles
    }
    console.log("POST TITLES FOR STYLIST PARAMS")
    console.log(params)
    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/setTitles",params,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("AT POST TITLES FOR STYLIST RESPONSE")
        console.log(response)
        callback(response)
    }).catch(error=> {
        console.log("AT POST TITLES FOR STYLIST ERROR")
        console.log(error)
        callback(null)
    })


}

export const getTitlesForStylist =  (email) => {
    console.log("GET TITLES FOR STYLIST")
    var id = getStylistId(email)
  
    if (id==null){
        //raise error
        return
    }
    console.log("STYLIST ID")
    console.log(id)
    //replace with API
   
    var stylistList = require("../json/stylists.json")['stylists']
    for (var stylist in stylistList){
        if (stylistList[stylist].Id == id){
            var titles = stylistList[stylist].Titles 
            console.log("STYLIST TITLES")
            console.log(titles)
            return titles 
        }
    }
    console.log("TITLES FOR STYLIST IS NULL")
    return null

}
export const addTitles = (email, titles) =>{
    var id = getStylistId(email)
    if (id==null){
        //raise error
        return
    }
    var stylistList = require("../json/stylists.json")['stylists']
    for (var stylist in stylistList){
        if (stylistList[stylist].Id==id){
            var stylistObj = stylistList[stylist]
            stylistObj.Titles = titles 
            stylistList[stylist] = stylistObj
            break
        }

    }
    console.log("ADD TITLES WORKED")
    // await writeJsonFile("../json/stylists.json",stylistList)


}
export const getTitles = (stylistId, callback) => {
    getStylist(stylistId, (result)=> {
        if (result!=null){
            console.log("IN GET TITLES FUNCCCCCCCCCCCCCCC 2")
            console.log(result)
            console.log("STYLIST TILESSSS")
            
            var titles = []
            for (var elem in result.data){
                console.log(result.data[elem].Titles)
                for (var title in result.data[elem].Titles){
                    if (!titles.includes(result.data[elem].Titles[title])){
                        titles.push(result.data[elem].Titles[title])
                    }
                }
                
            }
            console.log("THE TITLES CALLBACK")
            console.log(titles)
            callback(titles)

        } else {
            callback(null)
        }
       
       
        

    })
    
    
} 

export const getAddress = (addressId, callback) => {
    //replace with api
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/address/getAddress?addressId=${addressId}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response.data)

    }).catch(error=> {
        console.log("ERROR IN GET ADDRESS")
        console.log(error)
        callback(null)
    })

    
}

export const updateActiveAddress = async (addressId, callback) => {
    var stylistId = await AsyncStorage.getItem("stylistId")
    console.log("STYLIST ID")
    console.log(stylistId)
    console.log("ADDRESS ID IN UPDATE ACTIVE ADDRESS")
    console.log(addressId)
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/stylists/updateActiveAddress?stylistId=${stylistId}&activeAddress=${addressId}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log("UPDATE ACTIVE ADDRESS WAS SUCCESSFUL")
        callback(response)

    }).catch(error=> {
        console.log("UPDATE ACTIVE ADDRESS FAILED")
        console.log(error)
        callback(null)

    })


}

export const deleteService = (serviceId, callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/removeService?serviceId=${serviceId}`,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        console.log(response)
        callback(response)
    }).catch(error=> {
        console.log(error)
        callback(null)
    })
}

export const postService = (servicePayload, callback)=> {
    servicePayload['status'] = 'Active'
    console.log("SERVICE PAYLOAD BEFORE POST")
    console.log(servicePayload)
    axios.put("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/postService",servicePayload,{
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response => {
        console.log("AT POST SERVICE RESPONSE")
        console.log(response)
        callback(response)
    }).catch(error=> {
        console.log("AT POST SERVICE ERROR")
        console.log(error)
        callback(null)
    })

    
}

// export const addTitle = (email) => {
//     var id = getStylistId(email)
  
//     if (id==null){
//         //raise error
//         return
//     }


// }

export const getStylistName = (id,callback) => {
    axios.get(`http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/specialties/getSpecialties`, {
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'

        }
    }).then(response=> {
        callback(response)
    }).catch(error => {
        callback(null)

    })
    
}