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
      'stability-ai/sdxl:8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
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
