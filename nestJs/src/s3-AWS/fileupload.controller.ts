import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { FileUploadService } from './fileupload.service';

@Controller('fileupload')

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
 
@Post()
@UseInterceptors(FileInterceptor('file'))
async upload(@UploadedFile() file) {

  return await this.fileUploadService.upload(file);
}


 
}















// import { Controller, Post, Req, Res, UseInterceptors } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { ImageUploadService } from "./fileupload.service";

// @Controller('fileupload')
// export class ImageUploadController {
//     constructor(
//         private readonly imageUploadService : ImageUploadService
//     ){}

//     @Post('/upload')
//     @UseInterceptors(FileInterceptor('file'))
//     async create (@Req() request, @Res() response) {
//         try{
//             await this.imageUploadService.fileupload(request, response);
//         } catch (error) {
//             return response
//             .status(500)
//             .json(`Failed to upload image file: ${error.message}`);
//         }
//     }
// }
