"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { set } from "date-fns"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
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

import { Button } from "../../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"

const formSchema = z
  .object({
    name: z.string().min(4, { message: "minimum 4 characters" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "minimum 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const RegisterDialog: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    axios
      .post("/api/user/register", {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      })
      .then(() =>
        toast({
          title: "Account created",
          description: "We've created your account for you.",
        })
      )
      .then(() =>
        signIn("credentials", { email: data.email, password: data.password })
      )
      .catch((err: AxiosError) => {
        toast({
          title: "Error Occured",
          variant: "destructive",
          description: `${err.response?.data}`,
        })
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-2xl">Create an account</DialogTitle>
        <DialogDescription>
          Enter your email below to create your account
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline" onClick={() => signIn("github")}>
          <Icons.github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline" onClick={() => signIn("google")}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col flex space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center h-5">
                  <FormLabel>Name</FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center h-5">
                  <FormLabel>Email</FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center h-5">
                  <FormLabel>Password</FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    variant="ghost"
                    className="m-0 p-0 h-auto absolute top-2 right-4 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Icons.eye /> : <Icons.eyeOff />}
                  </Button>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-[96px]">
                <div className="flex flex-row justify-between items-center h-5">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    variant="ghost"
                    className="m-0 p-0 h-auto absolute top-2 right-4 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Icons.eye /> : <Icons.eyeOff />}
                  </Button>
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}

export default RegisterDialog
