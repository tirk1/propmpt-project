import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async(req, res) => {
 try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompts),{staus: 200})
 } catch (error) {
    return new Response('failed to fetch prompts',{staus: 500})
 }
}