import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { cn, colors, rooms, themes } from '~/lib/utils'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

const formSchema = z.object({
  room: z.string(),
  theme: z.string(),
  color: z.string().optional(),
  prompt: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export function GeneratePanel({
  setRoomIds,
}: {
  setRoomIds: (roomIds: Id<'rooms'>[]) => void
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const createRoomMutation = useMutation(api.rooms.createRoom)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values: FormSchema) => {
          const roomId = await createRoomMutation(values)
          // @ts-ignore
          setRoomIds((currentRoomIds) => [...currentRoomIds, roomId])
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Room Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rooms.map((room, index) => (
                    <SelectItem value={room} key={index}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose Room Theme</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                  {themes.map((theme, index) => (
                    <div key={index} className="relative">
                      <button
                        type="button"
                        className={cn(
                          'block aspect-square min-h-[20px] w-full overflow-hidden rounded-md border',
                          field.value === theme && 'ring-2 ring-primary',
                        )}
                      >
                        <Image
                          src={`/themes/${theme.toLocaleLowerCase()}.png`}
                          alt={theme}
                          width={120}
                          height={120}
                          className={cn('h-full w-full')}
                          onClick={() => field.onChange(theme)}
                        />
                      </button>
                      <p className="mt-1.5 text-center text-xs font-medium">
                        {theme}
                      </p>
                      {field.value === theme && (
                        <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground">
                          <Check width={16} height={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose Room Color (optional)</FormLabel>
              <FormControl>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                  {colors.map((color, index) => (
                    <div key={index} className="relative">
                      <div
                        className={cn(
                          'aspect-square min-h-[20px] overflow-hidden rounded-md border',
                          field.value === color && 'ring-2 ring-primary',
                        )}
                      >
                        <button
                          type="button"
                          className={cn('h-full w-full')}
                          style={{ backgroundColor: color }}
                          onClick={() => field.onChange(color)}
                        />
                      </div>
                      <p className="mt-1.5 text-center text-xs font-medium">
                        {color}
                      </p>
                      {field.value === color && (
                        <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded bg-primary text-primary-foreground">
                          <Check width={12} height={12} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagine (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. a table with some chairs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate room</Button>
      </form>
    </Form>
  )
}
