/* A hook that will hold the current device type (either "mobile" or "desktop"). */
import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("unknown");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;
