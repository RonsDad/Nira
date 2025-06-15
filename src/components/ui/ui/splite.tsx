"use client"

import { Suspense, lazy, forwardRef } from "react"
import type { Application } from "@splinetool/runtime"
const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (spline: Application) => void
}

export const SplineScene = forwardRef<HTMLDivElement, SplineSceneProps>(({ scene, className, onLoad }, ref) => {
  return (
    <div ref={ref} className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline 
          scene={scene} 
          onLoad={onLoad}
          onSplineMouseDown={(e) => console.log('Mouse down:', e)}
          onSplineMouseUp={(e) => console.log('Mouse up:', e)}
          onSplineMouseHover={(e) => console.log('Mouse hover:', e)}
        />
      </Suspense>
    </div>
  )
})

SplineScene.displayName = "SplineScene"

