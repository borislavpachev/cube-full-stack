import { AWS_BUCKET_NAME } from '@/constants';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../config/awsConfig';

export const uploadFileToBucket = async (folderName: string, file: File) => {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${folderName}/${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;

    return url;
  } catch (error) {
    console.error('Upload error:', error);
  }
};

export const getFrontCoverFromBucket = async (folderName: string) => {
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${folderName}/Front.png`,
  };

  try {
    await s3Client.send(new GetObjectCommand(getParams));

    const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${getParams.Key}`;
    return url;
  } catch (error) {
    console.error('Upload error:', error);
  }
};
