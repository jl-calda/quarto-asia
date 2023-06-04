import React, { forwardRef } from "react"

import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { DropdownMenuItem } from "../../ui/dropdown-menu"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

const LoginDialog: React.FC = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-2xl">Login to your account</DialogTitle>
        <DialogDescription>
          Enter your email below to create your account
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline">
          {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
          Github
        </Button>
        <Button variant="outline">
          {/* <Icons.google className="mr-2 h-4 w-4" /> */}
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
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>

      <DialogFooter>
        <Button className="w-full">Create account</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default LoginDialog
