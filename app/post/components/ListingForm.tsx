"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { houses, rooms } from "@/config/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/Icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

import DatePick from "./DatePick"
import ImageUpload from "./ImageUpload"
import LocationSearch from "./LocationSearch"

const listingFormSchema = z.object({
  images: z.array(z.string()),
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(60, {
      message: "Title must not be longer than 30 characters.",
    }),
  price: z.coerce.number().min(0),
  location: z.string(),
  unit: z.string().optional(),
  availability: z.date(),
  description: z.string().max(160).min(4),
  house: z.string(),
  room: z.string(),
  tenants: z.coerce
    .number()
    .min(1)
    .max(6, { message: "Maximum allowed as HDB is 6 registered tenants" }),
  roommates: z.coerce
    .number()
    .min(1)
    .max(6, { message: "Maximum allowed as HDB is 6 registered tenants" }),
})

type ProfileFormValues = z.infer<typeof listingFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  images: [],
  title: "",
  price: 0,
  location: "",
  unit: "",
  availability: new Date(),
  description: "",
  house: "",
  room: "",
  tenants: 1,
  roommates: 1,
}

const ListingForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: { ...defaultValues },
    mode: "onChange",
  })
  function onSubmit(data: ProfileFormValues) {
    console.log("data", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div className="w-full sm:h-full h-[60vh] mb-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="h-full flex-1 flex flex-col">
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Upload maximum of 6 images
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Listing Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Room for rent ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-2 relative">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          className="pl-8"
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                        <Icons.dollar className="absolute w-4 h-4 top-[37px] left-2 text-gray-400" />
                      </>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Rent per month
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-3 mb-4">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <LocationSearch
                      value={field.value}
                      onSetValue={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-2 mb-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit No.</FormLabel>
                    <FormControl>
                      <Input placeholder="Whats the unit number?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <DatePick
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell something about your listing"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter a short description of your listing. Enter house rules
                    if any.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-2 mb-4">
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Type of house" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {houses.map((house) => (
                          <SelectItem key={crypto.randomUUID()} value={house}>
                            {house}
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
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            key={crypto.randomUUID()}
                            placeholder="Type of room"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={crypto.randomUUID()} value={room}>
                            {room}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2 mb-4">
              <FormField
                control={form.control}
                name="tenants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Person in Unit</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Includes the future tenant of the unit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roommates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Person in Room</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Includes the future tenant of the unit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ListingForm
