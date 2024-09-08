import { EC2Client  } from "@aws-sdk/client-ec2";

export const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const client_ec2 = new EC2Client({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },  
});

export default client_ec2;
