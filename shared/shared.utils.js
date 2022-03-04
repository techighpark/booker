import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const uploadObject = await new AWS.S3()
    .upload({
      Bucket: process.env.BUCKET,
      Key: objectName,
      ACL: process.env.PUBLIC_READ,
      Body: readStream,
    })
    .promise();
  return uploadObject.Location;
};
