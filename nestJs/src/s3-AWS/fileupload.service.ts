import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import { Axios } from "axios";
import * as fs from 'fs';
let axios = new Axios()
import * as FormData from "form-data";
import { buffer } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {Readable} from 'stream'
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {

    async upload(file: any) {
        try {
            const { originalname } = file;
           // console.log(file);
            const bucketS3 = 'owens-images';
            return await this.uploadS3(file.buffer, bucketS3, originalname);
        } catch (err) {
            console.log(err)
        }
    }

    async uploadS3(file: any, bucket: string, name: string) {
        try {
            const s3 = this.getS3();
            const params = {
                Bucket: bucket,
                Key: String(name),
                Body: file,
            };

            console.log(params)
            return new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    console.log(data, err)
                    if (err) {
                        Logger.error(err);
                        reject(err.message);
                    }

                    resolve(data);
                });
            });
        } catch (err) {
            console.log(err)
        }
    }

    getS3() {
        try {
            
            return new S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
        } catch (err) {
            console.log(err)
        }
    }
    
    
    
    
    
    async uploadToIpfs(file:any) {
      try {
       // const dataBuffer = fs.createReadStream('D:/Desktop/marketplace/uploads/mew.jpg');
        console.log("path",file.path);

        let formData: any = new FormData();

        //formData.append( 'file', dataBuffer );
        const path = require('path');
        formData.append('file', fs.createReadStream(path.join('uploads', 'mew.jpg')))
        console.log(path.join('uploads', 'mew.jpg'));

       // console.log("buffer",dataBuffer);
        
       const http = new HttpService();

        const res = await http.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, formData, {
          maxBodyLength: 2000000000,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'PINATA_API_KEY': '99db25b32d1c97f93429',
                    'PINATA_SECRET_API_KEY': '7113fdaf6aaf7905fd066543af71e93caafb399c4641a89f4137d40daefa90c1'

          },
        }
        
        ).toPromise()

        console.log(res);
        // const fs1 = require('fs-extra');

        
        // fs1.remove('/upload/mew.jpg',(err) =>{
        //   console.log(err);

        // })
        fs.unlink('uploads/mew.jpg', function(){
          console.log("deleted");
        });


      }
      catch (err) {
        console.log("error1",err);
      }
    }
    




  }




















// import { Injectable, Req, Res } from '@nestjs/common';
// import * as AWS from 'aws-sdk';
// import multer from 'multer';
// import * as multerS3 from 'multer-s3';



// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// const s3 = new AWS.S3();
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.REGION
    
//   });

//   @Injectable()
//   export class ImageUploadService {
//     constructor(){}

//     async fileupload(@Req() req, @Res() res) {
//         try {
//             this.upload(req, res, function(error) {
//                 if(error) {
//                     console.log("1",error);
//                     return res.status(404).json(`Failed to upload image file: ${error}`);

//                 } 
//                 return res.status(201).json(req.files[0].location);
//             });
//         } catch (error) {
//             console.log("2",error);
//             return res.status(500).json(`Failed to upload image file: ${error}`);
//         }
        
//     }


//     upload = multer({
//         storage: multerS3({
//           s3: s3,
//           bucket: process.env.AWS_S3_BUCKET_NAME,
//           acl: 'public-read',
//           key: function(request, file, cb) {
//             cb(null, `${Date.now().toString()} - ${file.originalname}`);
//           },
//         }),
//       }).array('upload', 1);


//   }



