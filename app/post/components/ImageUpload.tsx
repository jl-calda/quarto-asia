"use client"

import { error } from "console"
import { on } from "events"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { set } from "date-fns"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"

interface ImageCarouselProps {
  images: string[]
  onChange: (value: string[]) => void
}
const ImageGrid: React.FC<ImageCarouselProps> = ({ images, onChange }) => {
  const [loading, setLoading] = useState(false)
  const [dialogImage, setDialogImage] = useState("")
  const [display, setDisplay] = useState(images)

  const handleUpload = useCallback(
    async (error: any, result: any) => {
      if (error) return
      if (result.event === "success") {
        onChange([...images, result.info.secure_url])
        setDisplay([...images, result.info.secure_url])
      }
    },
    [onChange, images]
  )

  const dummyPhotoArr = Array.from({ length: 6 - images.length }, (v, i) => i)

  const handleDelete = useCallback(
    async (image: string) => {
      const updateImages = async () =>
        onChange(images.filter((img) => img !== image))
      await updateImages()
    },
    [onChange, images]
  )
  return (
    <Dialog>
      <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-3 sm:grid-rows-6 gap-x-2 gap-y-2 h-full w-full">
        {!loading &&
          display.map((image) => (
            <div
              key={crypto.randomUUID()}
              className="relative w-full flex-1 h-full flex flex-col"
            >
              <DialogTrigger>
                <Image
                  src={image}
                  fill
                  onClick={() => setDialogImage(image)}
                  className="object-cover object-center rounded-md"
                  alt="posting image"
                />
              </DialogTrigger>
              <Button
                onClick={() => handleDelete(image)}
                variant="secondary"
                className="p-2 bg-transparent m-0 absolute h-auto w-auto top-0 right-0 hover:scale-105 rounded-full"
              >
                <Icons.closeCircle className="w-4 h-4" color="white" />
              </Button>
            </div>
          ))}
        {dummyPhotoArr.map((item) => (
          <CldUploadWidget
            key={crypto.randomUUID()}
            onUpload={handleUpload}
            options={{ maxFiles: images.length }}
            uploadPreset="quarto-preset"
          >
            {({ open }) => {
              return (
                <div className="relative w-full h-full">
                  <Image
                    onClick={() => open()}
                    src={"/images/placeholder-image.png"}
                    fill
                    className="object-cover object-center bg-accent cursor-pointer"
                    alt="posting image"
                  />
                </div>
              )
            }}
          </CldUploadWidget>
        ))}
      </div>
      <DialogContent className="m-4">
        <div
          key={crypto.randomUUID()}
          className="relative w-full h-[400px] p-6"
        >
          <Image
            src={dialogImage}
            fill
            className="object-cover object-center bg-accent"
            alt="posting image"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [available, setAvailable] = useState(6 - value.length)

  useEffect(() => {
    setAvailable(() => 6 - value.length)
  }, [value])

  const [loading, setLoading] = useState(false)
  const handleUpload = useCallback(
    async (error: any, result: any) => {
      if (error) return
      if (result.event === "success") {
        onChange([...value, result.info.secure_url])
      }
    },
    [onChange, value]
  )
  return (
    <CldUploadWidget
      onOpen={() => setLoading(true)}
      onUpload={handleUpload}
      options={{ maxFiles: value.length }}
      uploadPreset="quarto-preset"
      onClose={() => setLoading(false)}
    >
      {({ open }) => {
        if (value.length > 0 && !loading)
          return <ImageGrid images={value} onChange={onChange} />
        return (
          <div
            className="w-full border rounded-md flex-1 h-full items-center justify-center flex bg-accent/50 hover:bg-accent hover:ring-2 hover:ring-ring hover:ring-offset-2 cursor-pointer"
            onClick={() => open()}
          >
            <Button variant="ghost">
              <Icons.imageUpload className="w-12 h-12" color="gray" />
            </Button>
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
