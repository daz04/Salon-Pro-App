import {getAvailabilityForStylist, getPaymentMethod, getStylist} from '../Database/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const computeStylistTakeHomeAmountforTransaction = (comissionPercentage, taxesPrice, travelCost, servicePrice ) => {
    console.log("COMPUTE STYLIST TAKE HOME PARAMS")
    console.log(comissionPercentage)
    console.log(taxesPrice)
    console.log(travelCost)
    console.log(servicePrice)
    var percentTakeHome = (100-Number(comissionPercentage))/100 * Number(servicePrice)
    console.log("THE SERVICE PRICE CALCULATION")
    console.log(percentTakeHome)
    return percentTakeHome + taxesPrice + travelCost

}

//stylist registration function
export const checkIfStylistRegisteredLicense = (stylist) => {
    if (stylist.License==null){
        return false

    }
    return true
    


}
export const checkIfStylistRegisteredTitles = (stylist) => {
    if (stylist.Titles==null || stylist.Titles.length==0){
        return false
    }
    return true
}

export const checkIfStylistSetAvailabilityScheduale = (callback) => {
    getAvailabilityForStylist((result)=> {
        if (result==null || result.data.length==0){
            callback(false)
        } else {
            callback(true)
        }
    })

}

export const checkIfStylistSetPaymentOption = (stylist, callback) => { 
    var stripeId = stylist.StripeId
    if (stripeId!=null){
    getPaymentMethod(stripeId, (result)=> {
        if (result!=null){
            if (result.data.length>0){
                callback(true)

            } else {
                callback(false)
                
            }
 
        }
    })

} else {
    callback(false)
}

}


export const checkForPaymentMethod = async (callback) => {
    console.log("IN CHECK FOR PAYMENT METHOD FUNCTION")
    var stylistId = await AsyncStorage.getItem('stylistId')
    console.log(stylistId)
    getStylist(stylistId, (result)=> {
        if (result!=null){
            console.log("THE GET STYLIST IN FETCH PAYMENT METHOD RESULT")
            console.log(result.data[0])
            var stylist = result.data[0]
            var stripeId = stylist.StripeId 
            console.log("THE STYLIST STRIPE ID")
            console.log(stripeId)
            if (stripeId==null){
                callback(false)
            } else {
                getPaymentMethod(stripeId, (result)=> {
                    if (result!=null){
                        if (result.data[0].MainPaymentMethod!=null){
                            callback(true)
                        } else {
                            callback(false)
                        }

                    } else {
                        callback(false)
                    }
                })

            }

        } else {
            callback(false)
        }
    })


}