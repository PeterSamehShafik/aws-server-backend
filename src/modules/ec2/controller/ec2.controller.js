import { asyncHandler } from "../../../middlewares/errorHandle.js";
import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import client_ec2 from "../../../services/AWS-EC2.js";

export const getInstances = asyncHandler(async (req, res, next) => {
  // Create the command to describe instances
  const command = new DescribeInstancesCommand({});
  // Send the command to the EC2 service
  const response = await client_ec2.send(command);

  // Extract instance information
  const instances = response.Reservations.flatMap((reservation) =>
    reservation.Instances.map((instance) => ({
      InstanceId: instance.InstanceId,
      State: instance.State.Name,
      InstanceType: instance.InstanceType,
      LaunchTime: instance.LaunchTime,
    }))
  );

  // Send the instances data as a JSON response
  res.status(200).json({ message: "done", data: instances });
});

export const manageEc2 = asyncHandler(async (req, res, next) => {
  const lambdaURL = process.env.LAMBDA_URL;
  const { action, instanceId } = req.query;
  if (!action || !instanceId) {
    return next(Error("Missing action or instanceId", { cause: 400 }));
  }

  const response = await fetch(
    `${lambdaURL}?action=${action}&instanceId=${instanceId}`
  );
  const result = await response.json();

  return res.status(response.status).json({ message: "done", result });
});
