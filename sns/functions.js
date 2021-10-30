import axios from 'axios'

export const sendClientConfirmation = (phoneNum, stylistName, serviceName, date, time) => {
    console.log("IN SEND CLIENT CONFIRMATION")
    console.log(phoneNum)
    axios.get(`http://snsclient-env.eba-inzr32am.us-east-1.elasticbeanstalk.com/confirmation/sendtoClient?phone=${phoneNum}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}`).then(response=> {
       console.log("SEND CLIENT CONFIRMATION RESPONSE")
       console.log(response)

    }).catch(error=> {
        console.log("SEND CONFIRMATION MESSAGE ERROR 2")
        console.log(error)
       
    })

    
}

export const sendClientCancelledMsg = (phoneNum, stylistName, serviceName, date, time) => {
    console.log("IN SEND CLIENT CONFIRMATION")
    console.log(phoneNum)
    axios.get(`http://snsclient-env.eba-inzr32am.us-east-1.elasticbeanstalk.com/cancellation/sendtoClient?phone=${phoneNum}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}`).then(response=> {
       console.log("SEND CLIENT CANCELLATION RESPONSE")
       console.log(response)

    }).catch(error=> {
        console.log("SEND CANCELLATION MESSAGE ERROR")
        console.log(error)
       
    })

}