"use client"

import { ForwardRefRenderFunction as FRef, forwardRef } from "react"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  Dialog as DialogShacdn,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { DropdownMenuItem } from "./ui/dropdown-menu"

interface DialogProps {
  children: React.ReactNode
  ismenu?: boolean
  isbutton?: any
  label: string
}

const Dialog: FRef<any, DialogProps> = (
  { children, ismenu, label, ...props },
  ref
) => {
  return (
    <DialogShacdn>
      <DialogTrigger asChild>
        {ismenu ? (
          <div {...props} ref={ref}>
            {label}
          </div>
        ) : (
          <Button ref={ref}>{label}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </DialogShacdn>
  )
}
export default forwardRef(Dialog)
