"use client"

import React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/Icons"

interface ImageCarouselProps {
  images: string[] | undefined
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (!images) {
    return null
  }

  const onNext = () => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0)
      return
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }
  const onPrevious = () => {
    if (activeIndex === 0) {
      setActiveIndex(images.length - 1)
      return
    } else {
      setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="relative w-full h-full">
        <Image
          src={images[activeIndex]}
          fill
          className="object-cover object-center rounded-md ease-linear transition-all duration-150"
          alt="Listing image"
        />
        {images.length > 1 && (
          <div className="absolute inset-y-1/2 w-full flex flex-row justify-between px-2">
            <Button
              className="rounded-full h-12 w-12 opacity-70 p-0 m-0"
              variant="secondary"
              onClick={onPrevious}
            >
              <Icons.chevronLeft className="w-6 h-6" />
            </Button>

            <Button
              className="rounded-full h-12 w-12 opacity-70 p-0 m-0"
              variant="secondary"
              onClick={onNext}
            >
              <Icons.chevronRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex flex-row space-x-2 items-center justify-center">
          {Array.from({ length: images.length }, (_, i) => i + 0).map((i) => (
            <Button
              key={crypto.randomUUID()}
              onClick={() => setActiveIndex(i)}
              className={`w-4 h-4 rounded-full border p-0 m-0`}
              variant={i === activeIndex ? "default" : "outline"}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
