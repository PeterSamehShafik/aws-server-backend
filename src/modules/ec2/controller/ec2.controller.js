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
