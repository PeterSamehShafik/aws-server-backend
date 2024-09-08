import {LambdaClient} from "@aws-sdk/client-lambda";

const region = process.env.AWS_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Create Lambda client
const client_lambda = new LambdaClient({
  region: region, // Your AWS region
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default client_lambda;
