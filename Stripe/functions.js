import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import qs from 'qs';


// export const uploadIdentificationFile = () => {
    
//     axios({
//         method:'POST',
//         url: `https://files.stripe.com/v1/files`,
//         headers: {
//             "Authorization": 'Bearer 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',
//             "Access-Control-Allow-Origin": '*',
//             'Content-Type': 'multipart/form-data'
//         }

        
//     })
// }

export const payout = (accountId, payoutAmount, callback) => {
    var payload = {
        amount: payoutAmount*100,
        currency: 'usd',
        destination: accountId,
        
    }
   
    axios({
        method:'POST',
        url: `https://api.stripe.com/v1/transfers`,
        headers: {
            "Authorization": 'Bearer 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',
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(payload)

        
    }).then(response=> {
        console.log("IN AXIOS TRANSFER RESPONSE")
        console.log([true,response.data.id])
      
        callback(response)
    }).catch(error=> {
        console.log("IN AXIOS TRANSFER ERROR")
        console.log(error.response.data)
        callback([false, error.response.data])
        callback(null)
    })

}
export const retrieveConnectAccount = (accountId, callback) => {
    axios({
        method:'GET',
        url: `https://api.stripe.com/v1/accounts/${accountId}`,
        headers: {
            "Authorization": 'Bearer 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',
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        
    }).then(response=> {
        console.log("IN AXIOS GET CONNECT ACCOUNT")
        console.log(response.data)
        console.log(response.data)
      
        callback(response.data)
    }).catch(error=> {
        console.log("IN AXIOS GET CONNECT ACCOUNT ERROR")
        console.log(error.response)
        callback(null)
    })
}


export const createBankAccount = (accountId, payload, callback) => {
    console.log("iN CREATE BANK ACCOUNT")
    console.log(accountId)
   
    axios({
        method:'POST',
        url: `https://api.stripe.com/v1/accounts/${accountId}/external_accounts`,
        headers: {
            "Authorization": 'Bearer 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',
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(payload)

        
    }).then(response=> {
        console.log("IN AXIOS CREATE BANK ACCOUNT RES")
        console.log([true,response.data.id])
      
        callback(true)
    }).catch(error=> {
        console.log("IN AXIOS CREATE BANK ACCOUNT ERR RES 1")
        console.log(error.response.data)
        callback([false, error.response.data])
    })

}


export const updateAccount = (accountId, payload, callback)=> {
    axios({
        method:'POST',
        url: `https://api.stripe.com/v1/accounts/${accountId}`,
        headers: {
            "Authorization": 'Bearer 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',
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(payload)

        
    }).then(response=> {
  
        callback([true,response.data.id])
    }).catch(error=> {
        console.log("IN AXIOS ERR")
        console.log(error.response.data)
        callback([false, error.response.data])
    })

}

export const createAccountWithBasicInfo = (payload, callback) => {

    axios({
        method:'POST',
        url: `https://api.stripe.com/v1/accounts`,
        headers: {
            "Authorization": 'Bearer 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',
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(payload)

        
    }).then(response=> {
        console.log("IN AXIOS RES 3")
        console.log(response.data.id)
      
        callback(response.data.id)
    }).catch(error=> {
        console.log("IN AXIOS ERR")
        console.log(error.response.data)
        callback(null)
    })
   

}

export const retrieveCard = (cardId, clientId, callback)=> {
    
    //axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/card/retrieve?paymentMethodId=${paymentId}`).then(response=> {
    axios.get(`http://localhost:5000/card/retrieve?cardId=${cardId}&clientId=${clientId}`).then(response=> {
        callback(response)


    }).catch(error=> {
        console.log("RETRIEVE CARD ERROR")
        console.log(error)
        callback(null)
    })

}

export const createCharge = (amount, cardId, customerId, callback) => {
   
    console.log("CREATE CHARGE AMOUNT")
    console.log(typeof(amount))
    console.log(amount)
    console.log("THE CREATE CHARGE PARAMETERS")
    console.log(amount)
    console.log(cardId)
    console.log(customerId)
    axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/charge/createCharge?amount=${amount}&cardId=${cardId}&customerId=${customerId}`).then(response=> {
            callback(response)
        }).catch(error=> {
            console.log("RETRIEVE PAYMENT METHOD ERROR")
            console.log(error)
            callback(null)
        })
}


export const fetchCustomerPaymentMethods = (id, callback) => {
    
    axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/customerPaymentMethods/retrieve?customerId=${id}`).then(response=> {
        if (response==null){
            callback(null)
        } else {
            callback(response)
        }
    }).catch(error=> {
        console.log("ERROR IN FETCH CUSTOMER STRIPE PAYMENT METHODS")
        console.log(error)
        callback(null)

    })
}


export const retrieveSubscriptionList = (stripeId, callback) => {
    axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/subscription/list?customerId=${stripeId}`).then(response=> {
        callback(response)

    }).catch(error=> {
        console.log("ERROR IN RETRIEVE SUBSCRIPTION LIST")
        console.log(error)
        callback(null)

    })

}
export const fetchSubscriptionRenewal = (email,callback) => {
    

}