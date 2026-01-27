"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseAudioOptions {
    loop?: boolean;
    volume?: number;
    autoPlay?: boolean;
}

/**
 * 音频播放 Hook
 */
export function useAudio(src: string, options: UseAudioOptions = {}) {
    const { loop = false, volume = 1, autoPlay = false } = options;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // 初始化音频
    useEffect(() => {
        if (typeof window === "undefined") return;

        let audio: HTMLAudioElement | null = null;

        try {
            audio = new Audio();
            audio.src = src;
            audio.loop = loop;
            audio.volume = volume;
            audio.preload = "auto";
            audioRef.current = audio;

            // 监听播放状态
            const handlePlay = () => {
                console.log("✓ Audio playing:", src);
                setIsPlaying(true);
            };
            const handlePause = () => {
                console.log("Audio paused:", src);
                setIsPlaying(false);
            };
            const handleEnded = () => {
                console.log("Audio ended:", src);
                setIsPlaying(false);
            };
            const handleError = () => {
                console.warn("⚠ Audio file not found or invalid:", src);
                console.warn("Please check if the audio file exists in the public folder");
                setIsPlaying(false);
            };
            const handleCanPlay = () => {
                console.log("✓ Audio ready:", src);
            };

            audio.addEventListener("play", handlePlay);
            audio.addEventListener("pause", handlePause);
            audio.addEventListener("ended", handleEnded);
            audio.addEventListener("error", handleError);
            audio.addEventListener("canplay", handleCanPlay);

            // 自动播放
            if (autoPlay) {
                audio.play().catch((error) => {
                    console.warn("Auto-play prevented by browser:", error.message);
                });
            }

            return () => {
                if (audio) {
                    audio.removeEventListener("play", handlePlay);
                    audio.removeEventListener("pause", handlePause);
                    audio.removeEventListener("ended", handleEnded);
                    audio.removeEventListener("error", handleError);
                    audio.removeEventListener("canplay", handleCanPlay);
                    audio.pause();
                    audio.src = "";
                }
            };
        } catch (error) {
            console.error("Failed to initialize audio:", src, error);
            return undefined;
        }
    }, [src, loop, volume, autoPlay]);

    // 播放
    const play = useCallback(() => {
        if (audioRef.current) {
            try {
                if (!isMuted) {
                    audioRef.current.muted = false;
                }
                audioRef.current.play().catch((error) => {
                    // 静默处理播放失败，不影响用户体验
                    if (error.name !== "NotAllowedError") {
                        console.warn("Play failed:", error.message);
                    }
                });
            } catch (error) {
                console.warn("Play error:", error);
            }
        }
    }, [isMuted]);

    // 暂停
    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }, []);

    // 切换播放/暂停
    const toggle = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, play, pause]);

    // 静音/取消静音
    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const newMuted = !prev;
            if (audioRef.current) {
                audioRef.current.muted = newMuted;
                // 如果取消静音且之前在播放，继续播放
                if (!newMuted && isPlaying) {
                    audioRef.current.play().catch(console.warn);
                }
            }
            return newMuted;
        });
    }, [isPlaying]);

    // 设置音量
    const setVolume = useCallback((vol: number) => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, vol));
        }
    }, []);

    return {
        play,
        pause,
        toggle,
        toggleMute,
        setVolume,
        isPlaying,
        isMuted,
    };
}

/**
 * 音效播放 Hook（不循环，每次都重新播放）
 */
export function useSoundEffect(src: string, volume: number = 0.5) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let audio: HTMLAudioElement | null = null;

        try {
            audio = new Audio();
            audio.src = src;
            audio.volume = volume;
            audio.preload = "auto";
            audioRef.current = audio;

            const handleError = () => {
                console.warn("⚠ Sound effect file not found or invalid:", src);
            };
            const handleCanPlay = () => {
                console.log("✓ Sound effect ready:", src);
            };

            audio.addEventListener("error", handleError);
            audio.addEventListener("canplay", handleCanPlay);

            return () => {
                if (audio) {
                    audio.removeEventListener("error", handleError);
                    audio.removeEventListener("canplay", handleCanPlay);
                    audio.pause();
                    audio.src = "";
                }
            };
        } catch (error) {
            console.error("Failed to initialize sound effect:", src, error);
            return undefined;
        }
    }, [src, volume]);

    const play = useCallback(() => {
        if (audioRef.current && !isMuted) {
            try {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((error) => {
                    // 静默处理，不影响用户体验
                    if (error.name !== "NotAllowedError") {
                        console.warn("Sound effect failed:", error.message);
                    }
                });
            } catch (error) {
                console.warn("Sound effect error:", error);
            }
        }
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => !prev);
    }, []);

    return { play, toggleMute, isMuted, setIsMuted };
}
