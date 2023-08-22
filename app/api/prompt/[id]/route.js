import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'
// GET (read)

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { staus: 200 })
  } catch (error) {
    return new Response('failed to fetch prompts', { staus: 500 })
  }
}

// PATCH (edit)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('failed to update prompts', { staus: 500 })
  }
}

// DELETE

export const DELETE = async (req, { params }) => {
  try {

    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)
    return new Response('Prompt deleted',{status:200})
  } catch (error) {
    return new Response('failed to delete prompt', { staus: 500 })

  }
}