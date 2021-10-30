// import axios from 'axios'
// import AWS from 'aws-sdk'
// import {Buffer} from 'buffer'




// var bucketName = 'background-check-records'
// var bucketRegion = 'us-east-1'
// var IdentityPoolId = "us-east-1_UUYnG1z8w"
// AWS.config.update({
//     region:bucketRegion,
//     accessKeyId: "AKIA4LZB5JKEPBSGGNQC",
//     secretAccessKey: "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",

// })
// var s3 = new AWS.S3()






// export const getServiceMedia = (serviceId, callback) => {
//     var urlList = []
//     console.log("SERVICE ID")
//     console.log(serviceId)
//     // var obj = s3.listObjects({Bucket: 'service-media',Prefix: serviceId+'/'}).promise()
//     // console.log(obj.Body)
//     s3.listObjects({Bucket: 'service-media',Prefix: serviceId+'/'}, function(err, data){
//         if (err){
//             console.log("AT ERROR")
//             console.log(err)

            
//         } else {
//             console.log("IN OBJECT FUNCTION")
//             console.log(data)
//             console.log(data.Contents)
//             var contents = data.Contents
//             for (var obj in contents){
//                 var key = contents[obj].Key 
//                 var url = 'https://service-media.s3.amazonaws.com/'+ key
//                 urlList.push(url)
//             }
//             callback(urlList)





//         }


      
//         // let objectData = data.Body.toString('utf-8')
//         // console.log(objectData)

//     })

// }
// export const putStylistTitles = async (stylistId, stylistTitle) => {
//     //come back to this cause s3.putObject giving 501 status error 
//     // var stylistJson = await getStylistJson(stylistId)
//     // console.log("IN PUT STYLIST TITLES")
//     // stylistJson['Titles'] = stylistTitle
//     // var stringJson = JSON.stringify(stylistJson)
//     // var buf = Buffer.from(stringJson)
//     // console.log("the buff")
//     // console.log(buf)
//     // var params = {
//     //     ACL: 'private',
//     //     Body: stringJson,
//     //     Bucket: 'stylists',
//     //     Key: 'stylists.json',
//     //     ContentType: 'application/json'
       
//     // }
//     // console.log("RIGHT BEFORE REQUEST")
//     // s3.putObject(params, ((err, data)=> {
//     //     console.log("IN BODY")
//     //     console.log(err)
//     // })).on("httpHeaders", ((headers)=> {
//     //     console.log("HTTP HEADERS")
//     //     console.log(headers)
//     // }))
//     // s3.putObject(params).on('httpUploadProgress', ((progress)=> {
//     //     console.log(progress.loaded + " of " + progress.total + " bytes");

//     // }))
//     // request.on("httpError", ((err)=> {
//     //     console.log("IN HTTP ERROR")
//     // }))
//     // request.on("httpHeaders", ((status)=> {
//     //     console.log(status)
//     // }))
//     // console.log("AFTER REQUEST")
//     // request.on('httpUploadProgress', function (progress) {
//     //     console.log(progress.loaded + " of " + progress.total + " bytes");
//     //   });
//     //   request.send();

    
    
// }

// export const getStylistJson = async (stylistId) => {
   
//     // s3.listObjectsV2({Bucket: 'service-media'}, (err,data)=> {
//     //     console.log("LIST OBJECTS")
//     //     console.log(data)

//     // })

//     // s3.getObject({Bucket: 'stylists',Key: 'stylists.json'}, function(err, data){
        
//     //     console.log("IN OBJECT FUNCTION")
//     //     let objectData = data.Body.toString('utf-8')
//     //     console.log(objectData)

//     // })
//     const stylists = await s3.getObject({Bucket: 'stylists',Key: 'stylists.json'}).promise()
   
//     var binaryJson = stylists.Body
//     var str = String.fromCharCode.apply(String,binaryJson)
//     var json = JSON.parse(str)
//     console.log("AT GET STYLIST JSON")
//     console.log(json)
//     return json
    
// }

// export const putDisplayPhoto = (image) => {
//     console.log("IN PUT DISPLAY PHOTO")
//     console.log(image.file.base64)
//     let bytes = Buffer.from(image.file.base64, 'base64')
//     console.log(bytes)
//     console.log("after bytes")
//     var upload = new AWS.S3.ManagedUpload({
//         params:{
//             Bucket: bucketName,
//             Key: image.pathName,
//             Body: bytes
//         }

//     });
//     var promise = upload.promise()
//     console.log("after promise")
//     promise.then((data)=> {
//         console.log("AT DATA SECTION")
//         console.log("Successfully uploaded photo")

//     }), (err)=> {
//         console.log("AT ERROR")
//         console.log(err)
//     }
   
//     // const params = image
//     // axios.post('http://localhost:3000/uploadImage',params, {
//     //     "headers": {
//     //         'content-type': 'application/json'
//     //     }
//     // }).then((response)=> {
//     //     console.log(response)
//     // }).catch((err)=> {
//     //     console.log(err)
//     // })
//     // axios({
//     //     method: 'post',
//     //     // url: "http://s3serve-env.eba-tnn9thma.us-east-1.elasticbeanstalk.com/uploadImage",
//     //     url: "http://localhost:3000/uploadImage",
//     //     data: {
//     //         name: "Dana"
//     //         // bucket: image.bucketName,
//     //         // pathName:image.pathName,
//     //         // file: image.file

//     //     }
//     // }).then((response)=> {
//     //     console.log("AT RESPONSE")
//     //     console.log(response)
//     // }), (error) => {
//     //     console.log("AT ERROR")
//     //     console.log(error)
//     // }
    
//     // fetch("http://localhost:3000/uploadImage", {
//     //     method: 'POST',
//     //     headers: {
//     //         Accept: 'application/json',
//     //         'Content-Type': 'application/json'
//     //     },
//     //     body: 
//     //         JSON.stringify({
//     //             bucket: image.bucketName,
//     //             pathName: image.pathName,
//     //             file: image.file

//     //         })
        
//     // })
//     // const requestOptions = {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ title: 'React POST Request Example' })
//     // };
//     // fetch('http://localhost:3000/uploadImage', requestOptions)
//     //     .then(response => response.json())
//     //     .then(data => this.setState({ postId: data.id }));

// }

// // export const postStylistProfilePic = (stylistId) => {
// //     //just importing stylist id here so I don't have to get it again from async storage
// //     RNS3.put(file, {
// //         keyPrefix:'/',
// //         bucket: 'service-media',
// //         region: 'us-east-1',
// //         accessKey: 'AKIA4LZB5JKED4DCDXIB',
// //         secretKey: "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",
// //         successActionStatus: 201
// //     }).progress((progress) =>{
// //         console.log("progress")
// //         console.log(progress)

// //         }
        
// //     )
  
// //     .then((response)=> {
// //         console.log(response)
// //     })


// // }
