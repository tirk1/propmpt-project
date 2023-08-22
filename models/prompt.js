import {Schema, model, models} from 'mongoose'

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is requred']
    },
    tag: {
        type: String,
        required: [true, '#Tag is requred']
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt