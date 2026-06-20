import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

function useTypewriter(
  text,
  speed = 38,
  startDelay = 600
) {

  const [displayed, setDisplayed] =
    useState("");

  const [done, setDone] =
    useState(false);

  useEffect(() => {

    let timeout;

    timeout = setTimeout(() => {

      let index = 0;

      const interval =
        setInterval(() => {

          index++;

          setDisplayed(
            text.slice(0, index)
          );

          if (
            index >= text.length
          ) {

            clearInterval(
              interval
            );

            setDone(true);
          }

        }, speed);

    }, startDelay);

    return () => {
      clearTimeout(timeout);
    };

  }, [text, speed, startDelay]);

  return {
    displayed,
    done
  };
}

export default function AurenHero() {

  const videoRef =
    useRef(null);

  const [isMobileMenuOpen,
    setIsMobileMenuOpen] =
    useState(false);

  const [services,
    setServices] =
    useState([]);

  const {
    displayed,
    done
  } = useTypewriter(
    "Auren understands\nhumans beyond words."
  );

  const options = [
    "Emotional Intelligence",
    "Psychology Engine",
    "Memory System",
    "Manipulation Detection",
    "Voice AI",
    "AI Agents"
  ];

  const toggleService =
    (service) => {

      setServices((prev) => {

        if (
          prev.includes(service)
        ) {

          return prev.filter(
            (s) =>
              s !== service
          );
        }

        return [
          ...prev,
          service
        ];

      });

    };

  useEffect(() => {

    const video =
      videoRef.current;

    if (!video)
      return;

    if (
      window.innerWidth < 1024
    ) {

      video.autoplay = true;

      video.play().catch(() => {});

      return;
    }

    let previousX = 0;

    const handleMove =
      (event) => {

        if (
          !video.duration
        )
          return;

        const currentX =
          event.clientX;

        const delta =
          currentX -
          previousX;

        previousX =
          currentX;

        let targetTime =
          video.currentTime +
          (
            delta /
            window.innerWidth
          ) *
          0.8 *
          video.duration;

        targetTime =
          Math.max(
            0,
            Math.min(
              video.duration,
              targetTime
            )
          );

        video.currentTime =
          targetTime;
      };

    window.addEventListener(
      "mousemove",
      handleMove
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMove
      );

    };

  }, []);
