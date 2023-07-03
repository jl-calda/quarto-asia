"use client"

import React, { forwardRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "date-fns"
import { ro } from "date-fns/locale"
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
import { Label } from "../../ui/label"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const LoginDialog: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }).then((callback) => {
        if (callback?.error) {
          toast({
            title: "Error",
            description: callback?.error,
          })
          setErrorMessage(callback?.error)
        } else {
          setErrorMessage(null)
          toast({
            title: "Success",
            description: "Logged in successfully",
          })
          router.push("/")
        }
      })
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.error,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-2xl">Login to your account</DialogTitle>
        <DialogDescription>
          Enter your email below to create your account
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-6">
        <Button onClick={() => signIn("github")} variant="outline">
          <Icons.github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button onClick={() => signIn("google")} variant="outline">
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
                  <FormMessage className="text-xs">{errorMessage}</FormMessage>
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

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}

export default LoginDialog
