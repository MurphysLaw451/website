import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { toLower } from 'lodash'
import fetch from 'node-fetch'
import { DynamoDBHelper } from '../helpers/ddb/dynamodb'
import { createReturn } from '../helpers/return'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const { tokenAddress } = event.pathParameters || {}
    const db = new DynamoDBHelper({ region: 'eu-west-1' })

    const resultRaw = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
    )
    let result = (await resultRaw.json()) as any

    let fromCache = true

    // read from cache
    if (!result?.pairs) {
        console.log('from cache')
        const _dbResult = await db.query({
            TableName: process.env.DB_TABLE_NAME_DEXSCREENER_TOKEN_CACHE,
            KeyConditionExpression: `#TokenKey = :TokenKey`,
            ExpressionAttributeNames: {
                [`#TokenKey`]: `TokenKey`,
            },
            ExpressionAttributeValues: {
                [`:TokenKey`]: toLower(tokenAddress),
            },
            ConsistentRead: true,
        })

        if (_dbResult.Items && _dbResult.Items.length >= 1)
            result = JSON.parse(_dbResult.Items[0].result)
    } else if (result.pairs) {
        console.log('NOT from cache')
        // write to cache
        await db.batchWrite({
            RequestItems: {
                [process.env.DB_TABLE_NAME_DEXSCREENER_TOKEN_CACHE!]: [
                    {
                        PutRequest: {
                            Item: {
                                TokenKey: toLower(tokenAddress),
                                result: JSON.stringify(result),
                                ttl: 86400,
                            },
                        },
                    },
                ],
            },
        })
        fromCache = false
    }

    return createReturn(200, JSON.stringify(result), 0, {
        'From-Cache': fromCache,
    })
}
