import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { dynamoDB } from '../config/aws';

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export const put = async (table: string, data: any): Promise<ApiResponse> => {
    try {
        const response = await dynamoDB.send(
            new PutItemCommand({
                TableName: table,
                Item: {
                    id: { S: '123' }, // replace with the actual user ID
                    data: { S: data },
                },
            })
        );

        console.log('Item added successfully:', response);

        return {
            success: true,
            message: 'Item added successfully',
            data: response, // Include any additional data you want to send back
        };
    } catch (error: any) {
        throw new Error(`Error adding item to DynamoDB:${error.message}`);
    }
};
