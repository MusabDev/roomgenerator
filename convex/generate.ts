'use node'

import Replicate from 'replicate'
import { internal } from './_generated/api'
import { Id } from './_generated/dataModel'
import { internalAction } from './_generated/server'

export const generate = internalAction(
  async (
    { runMutation },
    { prompt, roomId }: { roomId: Id<'rooms'>; prompt: string },
  ) => {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        'Add REPLICATE_API_TOKEN to your environment variables: ' +
          'https://docs.convex.dev/production/environment-variables',
      )
    }
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    const output = (await replicate.run(
      'stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf',
      {
        input: {
          prompt,
          negative_prompt:
            'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
        },
      },
    )) as string[]

    await runMutation(internal.rooms.updateRoomResult, {
      roomId,
      image: output[0],
    })
  },
)
