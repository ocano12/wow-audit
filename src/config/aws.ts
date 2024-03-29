import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

console.log(process.env.AWS_SECRET);
const dynamoDB = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET as string,
    },
});

export { dynamoDB };
