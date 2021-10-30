import axios from "axios"

export const getServicesByStylistId = async (stylistId, callback) => {
    console.log("THE STYLIST ID BOOM")
    console.log(stylistId)
    axios({
        method: 'get',
        url: "http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getServicesforStylist",
        headers: {
            'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r',
           
            "x-amz-content-sha256": "UNSIGNED-PAYLOAD"
        },
        params: {
            stylistId: Number(stylistId)
        }
    }).then(res => {
        console.log("SUCCESS")
        console.log(res)
    }).catch(err=> {
        console.log("ERROR")
        console.log(err)
    })
    // axios.get("http://testenviornment-env.eba-jgnzpph2.us-east-1.elasticbeanstalk.com/api/services/getServicesforStylist", {
    // //data
    // stylistId: stylistId
    // }, {
    //     headers: {
    //         'x-api-key': 'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r',
    //         'Authorization':'jaehgouieyr8943y23tryuwefg6723ryuhdfgv6y7we3r'
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(error=> {
    //     console.log("AT ERROR")
    //     console.log(error)
    // })

}