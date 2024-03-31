import React, { useEffect, useState } from "react";

export default function CountDownTimeLast({ timeCheck, setView }) {
  var [timesecond, setTimeSecond] = useState(timeCheck);
  // eslint-disable-next-line
  useEffect(() => {
    if (timesecond > 0 && timesecond <= 180) {
      const timer = setTimeout(() => {
        let a = timesecond - 1;
        setTimeSecond(a);
      }, 1000); // Thời gian chờ được đặt là 1000 milliseconds (tương ứng với mỗi giây)
      return () => clearTimeout(timer); // Dừng vòng lặp khi component unmount hoặc timesecond thay đổi
    } else {
      setView();
    }
    // eslint-disable-next-line
  }, [timesecond]);

  return (
    <p className="font-medium">{`Vui lòng Chờ ${Math.floor(timesecond / 60)}:${
      timesecond % 60
    }s để gửi lại.`}</p>
  );
}
