import axios from 'axios'
import {addClientStripeId} from '../../Database/functions'

export const createStripeClient = (card, email, callback) => {
    console.log("IN CREATE STRIPE CLIENT")
    axios.get(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/customer/createCustomer?email=${email}`).then(response=> {
        console.log("CREATE CLIENT RESPONSE")
        console.log(response)
        if (response!=null){
         
            callback(response.data)
            
            

        }
    }).catch(error=> {
        console.log("CREATE STRIPE CLIENT FAILED")
        console.log(error)
        callback(null)
    })
}

export const createPaymentMethod = (token,clientId, callback)=> {
    console.log("IN CREATE PAYMENT METHOD")
    console.log(token)
    console.log(clientId)
    var params = {
        token: token,
        id: clientId
        
    }
    axios.post(`http://anothertest-env.eba-pueedx5b.us-east-1.elasticbeanstalk.com/card/createCard`,params).then(response=> {
    //axios.post(`http://localhost:5000/card/createCard`,params).then(response=> {
        if (response!=null){
            console.log("RESULT IN CREATE PAYMENT METHOD 4")
            console.log(response)
            console.log(response.data.id)
            callback(response.data.id)
           
            // setStripeCard(response.data)
            // createPrice()
        }
    }).catch(error=> {
        console.log(error)
        console.log("IN CREATE PAYMENT METHOD ERROR")
        callback(null)
        
    })

}

export const addStripeId = (stylistId, stripeId, callback) => {
   
    addClientStripeId(stylistId, stripeId, (response)=> {
        if (response==null){
            console.log("IN ADD STRIPE ID FAILED")
           
            callback(false)
        } else {
            callback(true)
        }
    })

}


