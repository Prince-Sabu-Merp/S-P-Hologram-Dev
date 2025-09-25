// src/Presence_Detection/FaceDistanceOnly.jsx
import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

export default function FaceDistanceOnly({
  realEyeDistanceCm = 10,
  focalLength = 606,
  minRange = 60,
  maxRange = 90,
  showDistance = false, // toggle calibration display
  holdTime = 3000,      // ms a user must stay in range to count as "present"
  isVisible = false,    // video display style (usually hidden)
}) {
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);

  const mountedRef = useRef(true);
  const presenceRef = useRef(false); // single source of truth for "currently present"
  const timerRef = useRef(null);     // hold timer

  const [distance, setDistance] = useState(null);
  const [presence, setPresence] = useState(false); // only for optional UI

  useEffect(() => {
    mountedRef.current = true;

    function logLine(msg) {
      // Timestamped single-line console entry (creates a new line each time)
      console.log(`${new Date().toLocaleTimeString()} - ${msg}`);
    }

    function onResults(results) {
      if (!mountedRef.current) return;

      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const left = landmarks[33];
        const right = landmarks[263];

        const dx = (right.x - left.x) * 640;
        const dy = (right.y - left.y) * 480;
        const pixelDistance = Math.hypot(dx, dy);

        const estimatedDistance =
          pixelDistance > 0
            ? (realEyeDistanceCm * focalLength) / pixelDistance
            : Infinity;

        if (mountedRef.current) setDistance(estimatedDistance);

        // Presence logic (one-shot per visit)
        if (estimatedDistance >= minRange && estimatedDistance <= maxRange) {
          // user is in-range
          if (!presenceRef.current && !timerRef.current) {
            // start hold timer only if not currently present and no timer running
            timerRef.current = setTimeout(() => {
              // When timer fires, mark presence and log once
              presenceRef.current = true;
              if (mountedRef.current) setPresence(true);
              logLine("✅ Presence detected (user stayed in range)");
              timerRef.current = null;
            }, holdTime);
          }
          // if presenceRef.current === true, do nothing (already present)
        } else {
          // out-of-range -> reset timer & presence so next entry triggers again
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          if (presenceRef.current) {
            // only log once when presence ends
            logLine("❌ Presence ended (user left range)");
            presenceRef.current = false;
          }
          if (mountedRef.current) setPresence(false);
        }
      } else {
        // no face -> reset everything
        if (mountedRef.current) setDistance(null);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        if (presenceRef.current) {
          logLine("❌ Presence ended (no face)");
          presenceRef.current = false;
        }
        if (mountedRef.current) setPresence(false);
      }
    }

    // Initialize FaceMesh (local assets)
    const fm = new FaceMesh({
      locateFile: (file) => `/mediapipe/face_mesh/${file}`,
    });
    fm.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    fm.onResults(onResults);
    faceMeshRef.current = fm;

    // Initialize Camera
    const cam = new Camera(videoRef.current, {
      onFrame: async () => {
        if (faceMeshRef.current) {
          await faceMeshRef.current.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });
    cameraRef.current = cam;
    cam.start().catch((err) => {
      console.error("Camera start error:", err);
    });

    return () => {
      // cleanup
      mountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      try {
        if (cameraRef.current?.stop) cameraRef.current.stop();
      } catch (e) {
        console.warn("Camera stop error:", e);
      }
      try {
        if (faceMeshRef.current?.close) faceMeshRef.current.close();
      } catch (e) {
        console.warn("FaceMesh close error:", e);
      }
    };
    // NOTE: we intentionally do NOT include presence/presenceRef/timer in deps
    // so the effect runs only once on mount
  }, [realEyeDistanceCm, focalLength, minRange, maxRange, holdTime]);

  return (
    <div style={{ position: "relative" }}>
      {/* hidden video feed used as input only */}
      <video ref={videoRef} playsInline muted style={{ display: isVisible ? "block" : "none" }} />

      

      {/* optional on-screen distance for calibration/testing */}
      {showDistance && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "8px 12px",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            borderRadius: "6px",
            fontFamily: "monospace",
          }}
        >
          {distance && Number.isFinite(distance)
            ? `${distance.toFixed(1)} cm`
            : "No face"}
        </div>
      )}
    </div>
  );
}
