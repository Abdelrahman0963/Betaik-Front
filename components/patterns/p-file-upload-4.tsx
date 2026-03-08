"use client"

import { useState } from "react"
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Spinner } from "@/components/ui/spinner"

import {
  ImageIcon,
  ZoomInIcon,
  XIcon,
  CircleAlertIcon,
} from "lucide-react"

import { LuUpload } from "react-icons/lu"

interface GalleryUploadProps {
  maxFiles?: number
  maxSize?: number
  accept?: string
  multiple?: boolean
  className?: string
  onFilesChange?: (files: FileWithPreview[]) => void
}

export function Pattern({
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
  accept = "image/*",
  multiple = true,
  className,
  onFilesChange,
}: GalleryUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  )

  const [isPreviewLoading, setIsPreviewLoading] = useState(false)

  const defaultImages: FileMetadata[] = []

  const [
    { files, isDragging, errors },
    {
      removeFile,
      clearFiles,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: defaultImages,
    onFilesChange,
  })

  const isImage = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type
    return type.startsWith("image/")
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Area */}
      <div
        onClick={openFileDialog}
        className={cn(
          "w-full rounded-lg relative cursor-pointer outline-dashed outline-2 outline-[#739EFD] p-12 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="hidden" />

        <div className="flex flex-col items-center gap-4">
          <LuUpload className="h-12 w-12 text-gray-400" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              <span className="text-blue-600">Click to upload </span>
              or drag and drop
            </h3>

            <p className="text-muted-foreground text-xs">
              PNG or JPG up to {formatBytes(maxSize)}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Stats */}
      {files.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h4 className="text-sm font-medium">
              Gallery ({files.length}/{maxFiles})
            </h4>

            <div className="text-muted-foreground text-xs">
              Total:{" "}
              {formatBytes(
                files.reduce((acc, file) => acc + file.file.size, 0)
              )}
            </div>
          </div>

          <Button onClick={clearFiles} variant="outline" size="sm">
            Clear all
          </Button>
        </div>
      )}

      {/* Gallery Grid */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((fileItem) => (
            <div
              key={fileItem.id}
              className="group/item relative aspect-square"
            >
              {isImage(fileItem.file) && fileItem.preview ? (
                <>
                  {loadingImages[fileItem.id] !== false && (
                    <div className="bg-muted/50 rounded-lg absolute inset-0 flex items-center justify-center border">
                      <Spinner className="text-muted-foreground size-6" />
                    </div>
                  )}

                  <img
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    onLoad={() =>
                      setLoadingImages((prev) => ({
                        ...prev,
                        [fileItem.id]: false,
                      }))
                    }
                    className={cn(
                      "rounded-lg h-full w-full border object-cover transition-all group-hover/item:scale-105",
                      loadingImages[fileItem.id] !== false
                        ? "opacity-0"
                        : "opacity-100"
                    )}
                  />
                </>
              ) : (
                <div className="bg-muted rounded-lg flex h-full w-full items-center justify-center border">
                  <ImageIcon className="text-muted-foreground h-8 w-8" />
                </div>
              )}

              {/* Overlay */}
              <div className="bg-black/50 absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover/item:opacity-100">
                {fileItem.preview && (
                  <Button
                    onClick={() => {
                      setSelectedImage(fileItem.preview!)
                      setIsPreviewLoading(true)
                    }}
                    variant="secondary"
                    size="icon"
                    className="size-7"
                  >
                    <ZoomInIcon />
                  </Button>
                )}

                <Button
                  onClick={() => removeFile(fileItem.id)}
                  variant="secondary"
                  size="icon"
                  className="size-7"
                >
                  <XIcon />
                </Button>
              </div>

              {/* File Info */}
              <div className="rounded-b-lg absolute right-0 bottom-0 left-0 bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-medium">
                  {fileItem.file.name}
                </p>
                <p className="text-xs text-gray-300">
                  {formatBytes(fileItem.file.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="w-full border-none bg-transparent p-0 shadow-none sm:max-w-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-center">
            {selectedImage && (
              <>
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="size-8 text-white" />
                  </div>
                )}

                <img
                  src={selectedImage}
                  alt="Preview"
                  onLoad={() => setIsPreviewLoading(false)}
                  className={cn(
                    "rounded-lg h-full w-auto object-contain transition-opacity duration-300",
                    isPreviewLoading ? "opacity-0" : "opacity-100"
                  )}
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}