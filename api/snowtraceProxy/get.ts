import fetch from 'node-fetch'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createReturn } from '../helpers/return'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const qs = event.queryStringParameters || {}

  const resultRaw = await fetch(
    `https://api.snowtrace.io/api?module=${qs.module}&action=${qs.action}&contractaddress=${qs.contractaddress}&address=${qs.address}&apikey=${process.env.SNOWTRACE_API_KEY}`
  )
  const result = (await resultRaw.json()) as any
  return createReturn(200, JSON.stringify(process.env.SNOWTRACE_API_KEY))

  if (result.message === 'OK') {
    return createReturn(200, JSON.stringify(result))
  }

  return createReturn(403, JSON.stringify(result))
}
