import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

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



