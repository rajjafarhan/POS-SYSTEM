import React, { useRef } from "react";
import { useState, useEffect } from "react";

const CircularProgress = ({ size, progress, totalCount }) => {
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progressOffset = ((totalCount - progress) / totalCount) * circumference;
    setOffset(progressOffset);
  }, [circumference, progress, totalCount]);

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#07393c"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#07393c"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          transition: "stroke-dashoffset 0.5s ease 0s",
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="33"
        fontWeight="bold"
        fill="#07393c"
        className="font-italic "
      >
        {progress}+
      </text>
    </svg>
  );
};

const MyCircularProgress = ({ totalCount }) => {
  console.log(totalCount)
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const duration = 3000; // 3 seconds
const steps = 100; // Total number of steps
const increment = duration / steps; // Calculate the increment


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
              if (prevProgress >= totalCount) {
                clearInterval(interval);
                return totalCount;
              } else {
                return prevProgress + 2; // Increment by 1
              }
            });
          }, increment);
      }
    });
    observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, [totalCount]);

  return (
    <div ref={progressRef}>
      <CircularProgress size={140} progress={progress} totalCount={totalCount} />
    </div>
  );
};

export default MyCircularProgress;
