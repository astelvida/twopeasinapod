'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Save, Trash2, X, Download } from 'lucide-react'
import { DownloadButton } from '@/components/download-button'

interface GenerationModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isGenerating: boolean
  progress: number
  currentImage: string | null
  discardImage: () => void
  saveImage: () => void
}

export function GenerationModal({
  isOpen,
  onOpenChange,
  isGenerating,
  progress,
  currentImage,
  discardImage,
  saveImage,
}: GenerationModalProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 })

  useEffect(() => {
    const updateImageSize = () => {
      const width = Math.min(window.innerWidth * 0.4, 500)
      const height = Math.min(window.innerHeight * 0.6, 500)
      setImageSize({ width, height })
    }
    updateImageSize()
    window.addEventListener('resize', updateImageSize)
    return () => window.removeEventListener('resize', updateImageSize)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='w-[95vw] max-w-[1200px]'>
        <div className='flex max-h-[80vh] items-center justify-center gap-8 overflow-y-auto'>
          {isGenerating ? (
            <div className='w-full text-center'>
              <p className='mb-4'>Generating your pop art masterpiece...</p>
              <Progress value={progress} className='mx-auto w-[250px]' />
            </div>
          ) : currentImage ? (
            <div className='flex flex-col items-center'>
              <h3 className='font-comic-sans mb-2 text-center text-xl'>Generated Image</h3>
              <img
                src={currentImage}
                alt='Generated image'
                style={{
                  maxWidth: `${imageSize.width}px`,
                  maxHeight: `${imageSize.height}px`,
                  width: 'auto',
                  height: 'auto',
                }}
                className='mb-4 cursor-pointer rounded-lg object-contain'
                onClick={() => setZoomedImage(currentImage)}
              />
              <div className='flex space-x-2'>
                <Button variant='default' size='sm' onClick={saveImage}>
                  <Save className='mr-2 h-4 w-4' />
                  Save
                </Button>
                <Button variant='destructive' size='sm' onClick={discardImage}>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Discard Image
                </Button>
                <DownloadButton image={currentImage} />
              </div>
            </div>
          ) : (
            <p>No image generated yet.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={discardImage} disabled={isGenerating || !currentImage}>
            Discard Image
          </Button>
          <Button onClick={saveImage} disabled={isGenerating || !currentImage}>
            Save to Gallery
          </Button>
        </DialogFooter>
      </DialogContent>
      {zoomedImage && (
        <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
          <DialogContent className='h-auto max-h-none w-auto max-w-none p-0'>
            <div className='relative'>
              <img src={zoomedImage} alt='Zoomed image' className='h-auto w-auto object-contain' />
              <Button
                variant='secondary'
                size='icon'
                className='absolute right-2 top-2'
                onClick={() => setZoomedImage(null)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}
