"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Icons } from "@/components/Icons"

interface ImageCarouselProps {
  images: string[]
  onChange: (value: string[]) => void
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onChange }) => {
  const [activeImage, setActiveImage] = useState("")

  const handleUpload = useCallback(
    (result: any) => {
      images.push(result.info.secure_url)
      onChange(images)
    },
    [onChange]
  )

  const array = [0, 1, 2, 3, 4, 5]
  const handleDelete = useCallback(
    (image: string) => {
      const newImages = images.filter((img) => img !== image)
      onChange(newImages)
    },
    [onChange, images]
  )
  return (
    <Dialog>
      <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-3 sm:grid-rows-6 gap-x-2 gap-y-2 h-full w-full">
        {images.map((image) => (
          <DialogTrigger>
            <div
              onClick={() => setActiveImage(image)}
              className="relative w-full flex-1 h-full flex flex-col"
            >
              <Image
                src={image}
                fill
                className="object-cover object-center rounded-md"
                alt="posting image"
              />
              <Button
                onClick={() => handleDelete(image)}
                variant="secondary"
                className="p-0 m-0 absolute h-auto w-auto top-0 right-0 hover:bg-red-200 rounded-full"
              >
                <Icons.closeCircle className="w-4 h-4" color="gray" />
              </Button>
            </div>
          </DialogTrigger>
        ))}
        {array.map((item) => (
          <CldUploadWidget
            onUpload={handleUpload}
            options={{ maxFiles: 1 }}
            uploadPreset="quarto-preset"
          >
            {({ open }) => {
              return (
                <div onClick={() => open()} className="relative w-full h-full">
                  <Image
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
      <DialogContent className="">
        <div
          key={crypto.randomUUID()}
          className="relative w-full h-[400px] p-6"
        >
          <Image
            src={activeImage}
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
  const handleUpload = useCallback(
    (result: any) => {
      value.push(result.info.secure_url)
      onChange(value)
      console.log(value)
    },
    [onChange]
  )
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{ maxFiles: 6 }}
      uploadPreset="quarto-preset"
    >
      {({ open }) => {
        if (value.length > 0)
          return <ImageCarousel images={value} onChange={onChange} />
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
