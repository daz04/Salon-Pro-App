import {getPaymentMethod, getAvailabilityForStylist} from '../../../Database/functions'

export const determineRedirectScreen = (stylist, callback) => {
    console.log("IN DETERMINE REDIRECT SCREEN")
    var stripeId = stylist.StripeId 

    if (stylist.Subscription==null){
        console.log("STYLIST SUBSCRIPTION IS NULL")
        callback("Subscription")
    } 
    if (stylist.Titles == null || stylist.Titles.length==0){
        callback("Titles")
    }
    if (stylist.License==null){
        //come back to licensing regulation and how exactly we will be testing for everyone
        callback("License")
    }
    getAvailabilityForStylist(stylist.id, (result)=> {
        if (result==null || result.data.length==0){
            callback("Availability")
        } else {
            if (stripeId!=null){
                getPaymentMethod(stripeId, (result)=> {
                    if (result!=null){
                        if (result.data.length>0){
                            callback("Home")
            
                        } else {
                            callback("Payment Screen")
                            
                        }
             
                    }
                })

            } else {
                callback("Payment Screen")
            }
            
        

        }

    })
    
    
    
    

}