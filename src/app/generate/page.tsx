'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

const formSchema = z.object({
  room: z.string(),
  theme: z.string(),
  color: z.string().optional(),
  prompt: z.string().optional(),
})

export default function Generate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function generateRoom(values: z.infer<typeof formSchema>) {}

  return (
    <div className="container py-8">
      <div className="flex flex-1 w-full justify-center gap-8 sm:flex-row flex-col">
        <div className="sm:w-[440px] w-full flex flex-col gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(generateRoom)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Room Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                                'aspect-square min-h-[20px] rounded-md border overflow-hidden w-full block',
                                field.value === theme && 'ring-2 ring-primary',
                              )}
                            >
                              <Image
                                src={`/themes/${theme.toLocaleLowerCase()}.png`}
                                alt={theme}
                                width={120}
                                height={120}
                                className={cn('w-full h-full')}
                                onClick={() => field.onChange(theme)}
                              />
                            </button>
                            <p className="text-center text-xs font-medium mt-1.5">
                              {theme}
                            </p>
                            {field.value === theme && (
                              <div className="absolute top-1 right-1 w-5 h-5 rounded bg-primary text-primary-foreground flex items-center justify-center">
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
                                'aspect-square min-h-[20px] rounded-md border overflow-hidden',
                                field.value === color && 'ring-2 ring-primary',
                              )}
                            >
                              <button
                                type="button"
                                className={cn('w-full h-full')}
                                style={{ backgroundColor: color }}
                                onClick={() => field.onChange(color)}
                              />
                            </div>
                            <p className="text-center text-xs font-medium mt-1.5">
                              {color}
                            </p>
                            {field.value === color && (
                              <div className="absolute top-1 right-1 w-4 h-4 rounded bg-primary text-primary-foreground flex items-center justify-center">
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
                      <Input
                        placeholder="e.g. a table with some chairs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Generate room</Button>
            </form>
          </Form>
        </div>
        <div className="w-[-webkit-fill-available]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis ex
          similique quaerat, quisquam officiis accusamus illo iusto incidunt
          deserunt amet. Sapiente fuga quas aspernatur perferendis, nemo laborum
          odio id nisi.
        </div>
      </div>
    </div>
  )
}
