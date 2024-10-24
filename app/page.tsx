import { ImageGenerator } from '@/components/image-generator'
import { Gallery } from '@/components/gallery'
import { Suspense } from 'react'
import { GallerySkeleton } from '@/components/gallery-skeleton'

export default async function Page() {
  return (
    <main className='container mx-auto flex-grow space-y-8 p-4'>
      <div className='mb-2 text-center'>
        <h1 className='mb-2 text-6xl font-bold' style={{ fontFamily: "'Rubik Mono One', sans-serif" }}>
          POP ART AI
        </h1>
        <h2
          className='text-2xl font-semibold text-muted-foreground'
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          A tribute to Roy Lichtenstein
        </h2>
      </div>
      <ImageGenerator />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
    </main>
  )
}
