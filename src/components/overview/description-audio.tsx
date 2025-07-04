"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Volume2, Play, Pause, RotateCcw } from "lucide-react"


// Dummy data - would come from API in real implementation
const dummyData = {
    quarter: "Q1 2025",
    duration: 324, // in seconds (5:24)
    sentiment: "Positive",
    summary:
        "The earnings call reflected a strong overall performance with record-breaking revenue and growth in services and emerging markets. However, challenges in China and a decline in wearables revenue presented some areas of concern.",
    audioUrl: "/arabic.mp3", // This would be a real URL in production
}

export default function DescriptionAudioPlayer() {
    // Audio state
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.7)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(dummyData.duration)
    const [playbackRate, setPlaybackRate] = useState(1.0)

    // Create audio element
    useEffect(() => {
        const audio = new Audio(dummyData.audioUrl)
        audioRef.current = audio
        audio.volume = volume
        audio.playbackRate = playbackRate

        // Set up event listeners
        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("ended", handleEnded)
        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration)
        })

        // Cleanup
        return () => {
            audio.pause()
            audio.removeEventListener("timeupdate", updateProgress)
            audio.removeEventListener("ended", handleEnded)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update audio when volume or playback rate changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate
        }
    }, [playbackRate])

    // Handle play/pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Update progress
    const updateProgress = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    // Handle end of audio
    const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        if (audioRef.current) {
            audioRef.current.currentTime = 0
        }
    }

    // Handle seeking
    const handleSeek = (value: number[]) => {
        const newTime = value[0]
        setCurrentTime(newTime)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
        }
    }

    // Handle volume change
    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0]
        setVolume(newVolume)
    }

    // Handle restart
    const handleRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            setCurrentTime(0)
            if (!isPlaying) {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    // Handle playback rate change
    const handlePlaybackRateChange = () => {
        const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
        const currentIndex = rates.indexOf(playbackRate)
        const nextIndex = (currentIndex + 1) % rates.length
        setPlaybackRate(rates[nextIndex])
    }

    // Format time (seconds to MM:SS or HH:MM:SS format)
    // const formatTime = (timeInSeconds: number) => {
    //     const hours = Math.floor(timeInSeconds / 3600)
    //     const minutes = Math.floor((timeInSeconds % 3600) / 60)
    //     const seconds = Math.floor(timeInSeconds % 60)

    //     if (hours > 0) {
    //         return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    //     }

    //     return `${minutes}:${seconds.toString().padStart(2, "0")}`
    // }

    // Format time with milliseconds for display
    const formatDetailedTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600)
        const minutes = Math.floor((timeInSeconds % 3600) / 60)
        const seconds = Math.floor(timeInSeconds % 60)

        return `${hours > 0 ? hours + ":" : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-md">
            <CardContent className="p-6">
                <div className="space-y-4">
                    {/* Header with title and volume control */}
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">{dummyData.quarter}</h3>
                        <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <Slider value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} className="w-24" />
                        </div>
                    </div>

                    {/* Playback controls */}
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full px-3 bg-gray-800 text-white"
                            onClick={handlePlaybackRateChange}
                        >
                            {playbackRate.toFixed(1)}x
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full p-0 w-14 h-14 flex items-center justify-center bg-orange-500 hover:bg-orange-600 border-none"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white ml-1" />}
                        </Button>

                        <Button variant="outline" size="sm" className="rounded-full p-2" onClick={handleRestart}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                        <Slider
                            value={[currentTime]}
                            max={duration}
                            step={0.1}
                            onValueChange={handleSeek}
                            className="cursor-pointer"
                        />
                        <div className="text-right text-sm text-gray-500">{formatDetailedTime(currentTime)}</div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold">Earnings Call Sentiment</h2>
                            <span className="ml-2 text-green-500 font-medium">{dummyData.sentiment}</span>
                        </div>

                        <p className="text-sm text-gray-700">{dummyData.summary}</p>

                        <div className="text-right">
                            <Button variant="link" className="text-blue-500 p-0 h-auto">
                                Read More&gt;
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
