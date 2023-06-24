"use client"

import React from "react"
import { User } from "@prisma/client"
import formData from "form-data"
import Mailgun from "mailgun.js"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const mailgun = new Mailgun(formData)

interface VerifyEmailDialogProps {
  currentUser: User | null
}

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({
  currentUser,
}) => {
  const onSubmit = async () => {
    console.log("sending")

    const client = mailgun.client({
      username: "api",
      key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY as string,
    })

    if (!currentUser?.email) {
      return
    }

    const messageData = {
      from: `quarto.asia<me@quartoasia.noreply>`,
      to: currentUser?.email,
      subject: "Verify your email",
      text: `Please click the link below to verify your email `,
      html: `<a href="https://localhost:3000/api/user/${
        currentUser.id
      }/email/${crypto.randomUUID()}">LINK</a>`,
    }

    await client.messages.create(
      process.env.NEXT_PUBLIC_MAILGUN_DOMAIN!,
      messageData
    )
  }
  return (
    <DialogContent className="max-w-2xl h-full sm:h-1/2">
      <DialogHeader>
        <DialogTitle className="font-bold text-center border-b pb-4">
          Verify your Email
        </DialogTitle>
      </DialogHeader>
      <p>Six digit code will be send to this email</p>
      <p>{currentUser?.email}</p>
      <DialogFooter>
        <Button onClick={onSubmit}>Send</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default VerifyEmailDialog
