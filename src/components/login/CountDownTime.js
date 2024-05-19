import React, { useState, useEffect } from "react";

export default function CountDownTime({ setIsCountDown }) {
  const [time, setTime] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setIsCountDown(false);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Xoá timer khi component unmount
    return () => clearInterval(timer);
  }, [setIsCountDown]);

  return <p>{"Gửi lại sau " + time + " giây"}</p>;
}
