"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "./footer";
import AudioPlayer from "./AudioPlayer";

export default function Component() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [currentInterval, setCurrentInterval] = useState(0);
  const audioPlayerRef = useRef<{ playAudio: () => void } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime - 1 === 0) {
            setIsActive(false);
            if (audioPlayerRef.current) {
              audioPlayerRef.current.playAudio(); // Toca o áudio quando o tempo acabar
            }
            return 25 * 60; // Reset to 25 minutes
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    setCurrentInterval(Math.floor((25 * 60 - time) / (5 * 60)));
  }, [time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-64 h-64">
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="absolute inset-2 rounded-full bg-white flex items-center justify-center text-4xl font-bold"
          animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            isActive
              ? {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }
              : {}
          }
        >
          {formatTime(time)}
        </motion.div>
      </div>
      <div className="mt-8 flex space-x-2">
        {[0, 1, 2, 3, 4].map((interval) => (
          <motion.div
            key={interval}
            className="w-4 h-4 rounded-full bg-gray-300"
            animate={{
              scale: interval === currentInterval ? 1.2 : 1,
              backgroundColor: interval === currentInterval ? "#22c55e" : "#d1d5db",
            }}
          />
        ))}
      </div>
      <Button className="mt-8" onClick={toggleTimer}>
        {isActive ? "Stop" : "Start"}
      </Button>
      {/* Passa a ref para o componente AudioPlayer */}
      <AudioPlayer ref={audioPlayerRef} />
      <Button className="mt-8" onClick={audioPlayerRef.current?.playAudio}>
        Test Sound
      </Button>
      <Footer />
    </div>
  );
}
