import AsyncStorage from '@react-native-async-storage/async-storage'

export const getEmail = async() => {
    var email = await AsyncStorage.getItem("@email")
    return email

}