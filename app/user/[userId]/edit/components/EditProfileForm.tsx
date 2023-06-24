"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { AlertDialog, AlertDialogAction } from "@radix-ui/react-alert-dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
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

import VerifyEmailDialog from "./VerifyEmailDialog"

const profileFormSchema = z.object({
  image: z.string(),
  name: z.string(),
  email: z.string(),
  contactNo: z.string(),
  description: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface EditProfileFormProps {
  currentUser: User | null
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ currentUser }) => {
  const [activeDialog, setActiveDialog] = useState("")
  const params = useParams()
  const { userId } = params
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      image: currentUser?.image || "",
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      contactNo: currentUser?.contactNo || "",
      description: currentUser?.description || "",
    },
    mode: "onChange",
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data)
    setIsLoading(true)
    axios
      .post(`/api/user/${userId}/update`, data)
      .then((data: any) => {
        toast({
          variant: "default",
          title: "Success!",
          description: "Your profile has been updated.",
        })
      })
      .then(() => {
        router.refresh()
      })
      .catch((err) =>
        toast({
          title: "Something Went Wrong!",
          description: "Please check your inputs and try again",
        })
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <Dialog modal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No.</FormLabel>
                <div className="flex flex-row gap-x-2 item-center">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Provide contact information. Include the country code."
                      {...field}
                    />
                  </FormControl>
                  {!currentUser?.contactNo ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="gap-x-2">
                          <Icons.phoneMissed className="h-4 w-4" />
                          <span>Verify</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          Update your contact number first before verifying.
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Okay</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    !currentUser?.emailVerified && (
                      <DialogTrigger
                        asChild
                        onClick={() => setActiveDialog("contactNo")}
                      >
                        <Button variant="outline" className="gap-x-2">
                          <Icons.phoneMissed className="h-4 w-4" />
                          <span>Verify</span>
                        </Button>
                      </DialogTrigger>
                    )
                  )}
                </div>
                <FormDescription>
                  {!currentUser?.contactNo
                    ? "You don't have any contact number."
                    : currentUser?.emailVerified
                    ? "Your contact number is verified"
                    : "Your contact number is not verified"}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex flex-row gap-x-2 item-center">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  {!currentUser?.emailVerified && (
                    <DialogTrigger
                      asChild
                      onClick={() => setActiveDialog("email")}
                    >
                      <Button variant="outline" className="gap-x-2">
                        <Icons.mailQuestion className="h-4 w-4" />
                        <span>Verify</span>
                      </Button>
                    </DialogTrigger>
                  )}
                </div>
                <FormDescription>
                  {currentUser?.emailVerified
                    ? "Your email is verified"
                    : "Your email is not verified"}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="provide some description"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <Button className="" type="submit">
            Update
          </Button>
        </form>
      </Form>
      {activeDialog === "contactNo" && (
        <DialogContent className="max-w-2xl h-full sm:h-1/2">
          <DialogHeader>Verify your contact number</DialogHeader>
          <p>Six digit code will be send to this number</p>
          <p>{currentUser?.email}</p>
        </DialogContent>
      )}
      {activeDialog === "email" && (
        <VerifyEmailDialog currentUser={currentUser} />
      )}
    </Dialog>
  )
}

export default EditProfileForm
