import {checkIfStylistRegisteredLicense, checkIfStylistRegisteredTitles, checkIfStylistSetAvailabilityScheduale, checkIfStylistSetPaymentOption} from '../Scripts/functions'

export const redirectToNextScreen = (startScreen, nextScreen, stylist, callback) => {
    //redirect to next screen function checks if user is currently on an onboarding screen and if so
    //depending on variables the stylist has already filled out determine what screen they should be redirected to
    //if stylist is not on in an onboarding screen -> automatically direct them to the next screen
    if (startScreen=="Sign")
    if (startScreen=="Subscription") {
        var stylistRegisteredTheirSpecialtyTitles = checkIfStylistRegisteredTitles(stylist)
        if (stylistRegisteredTheirSpecialtyTitles==false){
            callback("Step 2")
        }
        var stylistHasLicense = checkIfStylistRegisteredLicense(stylist)
        if (stylistHasLicense==false){
            callback("Step 3_1")
        }
        checkIfStylistSetAvailabilityScheduale((result)=> {
            if (result==false){
                callback("Scheduale")

            } else {
                checkIfStylistSetPaymentOption(stylist, (result)=> {
                    if (result==false){
                        callback("Payment Methods")
                    } else {
                        callback(nextScreen)
                    }
                })



            }
        })

        

    } else if (startScreen=="Step 2"){
        var stylistHasLicense = checkIfStylistRegisteredLicense(stylist)
        if (stylistHasLicense==false){
            callback("Step 3_1")
        }
        checkIfStylistSetAvailabilityScheduale((result)=> {
            if (result==false){
                callback("Scheduale")

            } else {
                checkIfStylistSetPaymentOption(stylist, (result)=> {
                    if (result==false){
                        callback("Payment Methods")
                    } else {
                        callback(nextScreen)
                    }
                })



            }
        })

    } else if (startScreen=="Step 3_1"){
        checkIfStylistSetAvailabilityScheduale((result)=> {
            if (result==false){
                callback("Scheduale")

            } else {
                checkIfStylistSetPaymentOption(stylist, (result)=> {
                    if (result==false){
                        callback("Payment Methods")
                    } else {
                        callback(nextScreen)
                    }
                })



            }
        })

    } else if (startScreen=="Scheduale"){
        checkIfStylistSetPaymentOption(stylist, (result)=> {
            if (result==false){
                callback("Payment Methods")
            } else {
                callback(nextScreen)
            }
        })

        
    } else {
        callback(nextScreen)
    }

}