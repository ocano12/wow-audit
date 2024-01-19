import { dynamoDB } from '../config/aws';

export default async function put(table: string, data: any) {
    const params = {
        TableName: table, // replace with your DynamoDB table name
        Item: {
            id: { S: '123' }, // replace with the actual user ID
            data: { M: { tanks: { L: [] }, healers: { L: [] } } },
        },
    };

    try {
        const command = new PutItemCommand(params);
        const response = await dynamoDB.send(command);
        console.log('Item added successfully:', response);
    } catch (error) {
        console.error('Error adding item to DynamoDB:', error);
    }
}
