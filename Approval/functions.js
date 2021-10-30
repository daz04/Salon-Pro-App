// import React, {useEffect, useState} from 'react';
// import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
// import AWS from 'aws-sdk'


// AWS.config.update({
//     region:'us-east-1',
//     accessKeyId: "AKIA4LZB5JKEPBSGGNQC",
//     secretAccessKey: "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",

// })
// var s3 = new AWS.S3()
// var bucketName = 'background-check-records'

// // const getWhiteSheet = (callback) => {
// //     var params = {
// //         Bucket: bucketName,
// //         Key: "whitelist.xlsx"
// //     }
// //     s3.getObject(params, (err,data)=> {
// //         if (err){
// //             console.log(err)
// //             callback(null)
// //         }
// //         let objectData = data.Body
// //         // console.log(typeof(data.Body))
// //         // console.log(data)
// //         var wb = XLSX.read(objectData,{type:"array"})
// //         console.log(wb)
// //         console.log("IN S3 GET OBJECT")
// //         console.log(objectData)
// //         callback(objectData)
// //     })

// // }

// export const approvalFunc = (firstName, lastName, birthdate, city, state) => {
//     console.log("IN APPROVAL FUNCTIONNNNNNNNNNNNNNNNNN")
//     // getWhiteSheet((result)=> {
//     //     console.log(result)
//     // })


// }
