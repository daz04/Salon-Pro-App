import axios from 'axios'


export const sendTeamConfirmation = (clientName, stylistName, serviceName, date, time, appointmentId, callback) => {
    console.log("SEND TEAM CONFIRMATION MESSAGE")
    console.log(clientName)
    console.log(stylistName)
    console.log(serviceName)
    console.log(date)
    console.log(time)
    console.log(appointmentId)
    
    axios.get(`http://twilio-env.eba-2nupxgye.us-east-1.elasticbeanstalk.com/sendTeamConfirmation?clientName=${clientName}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}&appointmentId=${appointmentId}`).then(response=> {
    //    axios.get(`http://localhost:7000/sendTeamConfirmation?clientName=${clientName}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}&appointmentId=${appointmentId}`).then(response=> {
        callback(response)

    }).catch(error=> {
        console.log("SEND APPOINTMENT CONFIRMATION TO TEAM HAD AN ERROR")
        console.log(error)
        callback(null)
    })
    
}
export const sendTeamCancellation = (clientName, stylistName, serviceName, date, time, appointmentId, callback) => {
    
    axios.get(`http://twilio-env.eba-2nupxgye.us-east-1.elasticbeanstalk.com/sendTeamCancellation?clientName=${clientName}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}&appointmentId=${appointmentId}`).then(response=> {
    //    axios.get(`http://localhost:7000/sendTeamCancellation?clientName=${clientName}&stylistName=${stylistName}&serviceName=${serviceName}&date=${date}&time=${time}&appointmentId=${appointmentId}`).then(response=> {
        callback(response)

    }).catch(error=> {
        console.log("SEND APPOINTMENT CANCELLATION TO TEAM HAD AN ERROR")
        console.log(error)
        callback(null)
    })

}

export const sendVerificationEmail = (email, code, callback) => {
    console.log("BEFORE SEND VERIFICATION EMAIL")
    console.log(email)
    axios.get(`http://localhost:5000?email=${email}&code=${code}`).then(response=> {
    //axios.get(`http://twilio-env.eba-2nupxgye.us-east-1.elasticbeanstalk.com/?email=${email}&code=${code}`).then(response=> {
        callback(response)

    }).catch(error=> {
        console.log("SEND VERIFICATION EMAIL ERROR")
        console.log(error)
        callback(null)
    })

}

export const sendSubscriptionConfirmation = (email, name, price, date, callback) => {
    axios.get(`http://twilio-env.eba-2nupxgye.us-east-1.elasticbeanstalk.com/?email=${email}&subscriptionName=${name}&price=${price}&renewalDate=${date}`).then(response=> {
        callback(response)

}).catch(error => {
    console.log("SEND SUBSCRIPTION CONFIRMATION ERROR")
    console.log(error)
    callback(null)

})
}

