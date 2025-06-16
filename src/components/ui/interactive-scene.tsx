"use client"

import { useEffect, useState, useRef } from "react"
import { SplineScene } from "@/components/ui/ui/splite"
import { FlashlightController } from "./flashlight-controller"
import { FlashlightBeam } from "./flashlight-beam"
import { useIsMobile } from "@/hooks/use-mobile"
import { safePlayVideo } from "../../utils/video-helpers"
import type { Application } from "@splinetool/runtime"

// Define types for Spline objects
interface SplineObject {
  name: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  scale?: {
    set: (x: number, y: number, z: number) => void;
  };
  traverse: (callback: (object: SplineObject) => void) => void;
}

interface SplineScene {
  findObjectByName: (name: string) => SplineObject | null;
}

interface InteractiveSceneProps {
  className?: string
  onLoad?: () => void
}

export function InteractiveScene({ className, onLoad }: InteractiveSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const splineRef = useRef<Application | null>(null)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoElements = useRef<HTMLVideoElement[]>([])

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      onLoad?.()

      // Try to play any videos in the scene
      const videos = document.querySelectorAll("video")
      videos.forEach((video) => {
        videoElements.current.push(video)
        safePlayVideo(video)
      })

      // Ensure flashlight is visible by focusing on container
      if (containerRef.current) {
        containerRef.current.focus()
      }
    }, 1000) // Reduced timeout for faster loading

    return () => clearTimeout(timer)
  }, [onLoad])

  // Function to handle Spline scene load
  const handleSplineLoad = (splineApp: Application) => {
    splineRef.current = splineApp
    console.log("Spline scene loaded", splineApp)

    // Attempt to find and animate the robot
    try {
      // Wait for camera pan out and scene to fully load
      setTimeout(() => {
        console.log("Looking for robot objects...")
        
        // Find the scene object first (following the pattern from flashlight-controller)
        const scene = splineApp.findObjectByName("Scene")
        
        if (!scene) {
          console.log("Scene object not found")
          return
        }
        
        // Store references to robot parts
        let robotObject: any = null
        let robotArm: any = null
        let robotHand: any = null
        const animatableObjects: any[] = []
        
        // Traverse the scene to find robot-related objects
        if (scene && typeof (scene as any).traverse === 'function') {
          (scene as any).traverse((object: any) => {
            const name = object.name?.toLowerCase() || ''
            console.log("Found object:", object.name)
            
            // Look for robot-related objects
            if (name.includes('robot') || name.includes('ron')) {
              robotObject = object
              animatableObjects.push(object)
            }
            if (name.includes('arm') || name.includes('hand')) {
              if (name.includes('arm')) robotArm = object
              if (name.includes('hand')) robotHand = object
              animatableObjects.push(object)
            }
            
            // Also look for any object that might be animatable
            if (name.includes('wave') || name.includes('animate')) {
              animatableObjects.push(object)
            }
          })
        } else {
          console.log("Scene traverse not available, using fallback object detection")
          // Fallback: try to access objects directly if possible
          robotObject = scene
          animatableObjects.push(scene)
        }
        
        console.log("Robot object:", robotObject?.name || "not found")
        console.log("Robot arm:", robotArm?.name || "not found")
        console.log("Animatable objects count:", animatableObjects.length)
        
        // Try different animation approaches
        
        // Approach 1: Use Spline Events (if the scene has pre-made animations)
        if (splineApp.emitEvent) {
          // Try common animation event names
          const eventNames = ['wave', 'Wave', 'robotWave', 'animate', 'play', 'start']
          eventNames.forEach(eventName => {
            try {
              if (splineApp.emitEvent) {
                // Try with different parameter combinations
                (splineApp.emitEvent as any)(eventName)
              }
              console.log(`Tried event: ${eventName}`)
            } catch (e) {
              // Silent fail
            }
          })
        }
        
        // Approach 2: Use Spline's animation API if available
        if (splineApp.setVariable) {
          try {
            // Try setting animation variables
            splineApp.setVariable('wave', true)
            splineApp.setVariable('animate', true)
            splineApp.setVariable('robotWave', 1)
          } catch (e) {
            console.log("setVariable not available")
          }
        }
        
        // Approach 3: Manual animation using position/rotation if accessible
        const targetObject = robotArm || robotHand || robotObject
        
        if (targetObject) {
          console.log("Starting manual wave animation on:", targetObject.name)
          
          // Try to access transform properties
          let hasRotation = false
          let hasPosition = false
          
          // Check what properties are available
          if (targetObject.rotation !== undefined) {
            hasRotation = true
            console.log("Object has rotation property")
          }
          if (targetObject.position !== undefined) {
            hasPosition = true
            console.log("Object has position property")
          }
          
          // Store original values if available
          const originalRotation = hasRotation ? {
            x: targetObject.rotation.x || 0,
            y: targetObject.rotation.y || 0,
            z: targetObject.rotation.z || 0
          } : null
          
          const originalPosition = hasPosition ? {
            x: targetObject.position.x || 0,
            y: targetObject.position.y || 0,
            z: targetObject.position.z || 0
          } : null
          
          // Animation variables
          let waveTime = 0
          const waveDuration = 3000 // 3 seconds
          const startTime = Date.now()
          
          const waveInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            
            if (elapsedTime >= waveDuration) {
              clearInterval(waveInterval)
              
              // Reset to original values
              if (hasRotation && originalRotation) {
                targetObject.rotation.x = originalRotation.x
                targetObject.rotation.y = originalRotation.y
                targetObject.rotation.z = originalRotation.z
              }
              if (hasPosition && originalPosition) {
                targetObject.position.x = originalPosition.x
                targetObject.position.y = originalPosition.y
                targetObject.position.z = originalPosition.z
              }
              
              console.log("Wave animation completed")
              return
            }
            
            // Create wave motion
            waveTime += 0.1
            const waveAngle = Math.sin(waveTime * 2) * 0.3
            const waveOffset = Math.sin(waveTime * 2) * 10
            
            // Apply animation based on available properties
            if (hasRotation) {
              // For arm/hand, rotate on Z axis
              if (robotArm === targetObject || robotHand === targetObject) {
                targetObject.rotation.z = (originalRotation?.z || 0) + waveAngle
              } else {
                // For full robot, rotate on Y axis with slight Z tilt
                targetObject.rotation.y = (originalRotation?.y || 0) + waveAngle * 0.5
                targetObject.rotation.z = (originalRotation?.z || 0) + Math.sin(waveTime * 4) * 0.1
              }
            }
            
            if (hasPosition && (robotArm === targetObject || robotHand === targetObject)) {
              // Add slight position movement for hand/arm
              targetObject.position.y = (originalPosition?.y || 0) + waveOffset * 0.5
            }
            
          }, 16) // ~60 FPS
        } else {
          console.log("No suitable object found for animation")
          
          // Approach 4: Try to trigger any built-in animations via Spline's API
          console.log("Attempting to find animations in spline app...")
          
          // Log available methods on splineApp for debugging
          console.log("SplineApp methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(splineApp)))
        }
      }, 2500) // Wait 2.5 seconds for camera pan out
      
    } catch (error) {
      console.error("Error in robot animation:", error)
    }
  }

  // Handle resize for better mobile experience
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Force re-render of container size
        const height = isMobile ? window.innerHeight * 0.5 : window.innerHeight
        containerRef.current.style.height = `${height}px`
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

  // Handle visibility changes to pause/play videos when tab is hidden/visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause videos when tab is not visible
        videoElements.current.forEach((video) => {
          if (!video.paused) {
            video.pause()
          }
        })
      } else {
        // Resume videos when tab becomes visible again
        videoElements.current.forEach((video) => {
          safePlayVideo(video)
        })
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-white overflow-hidden ${className}`}
      style={{ height: isMobile ? "50vh" : "100%" }}
      tabIndex={0} // Make container focusable
      onMouseMove={() => {
        // Make sure flashlight is active on any mouse movement
        if (containerRef.current) {
          containerRef.current.focus()
        }
      }}
    >
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white">
          <div className="loader"></div>
        </div>
      )}

      {/* Flashlight controller wraps everything for coordinated effects */}
      <FlashlightController>
        {/* Spline 3D scene with robot */}
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          onLoad={handleSplineLoad}
        />
        
        {/* Alternative: CSS-based wave animation overlay */}
        {isLoaded && (
          <div 
            className="robot-wave-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}

        {/* Flashlight beam overlay */}
        <FlashlightBeam />
        
        {/* Instruction overlay (only shown briefly on initial load) */}
        {isLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0.8, animation: "fadeOut 3s forwards" }}
          >
            <div className="bg-gray-200/80 text-gray-800 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              Move your cursor to control the flashlight
            </div>
          </div>
        )}
      </FlashlightController>
      
      {/* Add animation for instruction fade-out and robot wave */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.8; }
          20% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        
        @keyframes robotWave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
          100% { transform: rotate(0deg); }
        }
        
        .wave-animation {
          animation: robotWave 0.5s ease-in-out 6;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

