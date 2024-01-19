import { dynamoDB } from '../config/aws';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

export async function put(table: string, data: any) {
    try {
        const response = await dynamoDB.send(
            new PutItemCommand({
                TableName: table, // replace with your DynamoDB table name
                Item: {
                    id: { S: '123' }, // replace with the actual user ID
                    data: { S: data },
                },
            })
        );
        console.log('Item added successfully:', response);
    } catch (error) {
        console.error('Error adding item to DynamoDB:', error);
    }
}
