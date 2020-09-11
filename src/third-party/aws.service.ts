import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AwsService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
      signatureVersion: 'v4',
    })
    const myFile = file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]
    try {
      const data = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${process.env.AWS_BUCKET_POST_FOLDER}/${uuidv4()}.${fileType}`,
          Body: file.buffer,
          ContentType: `image/${fileType}`,
          ACL: 'public-read',
        })
        .promise()
      return data.Location
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
