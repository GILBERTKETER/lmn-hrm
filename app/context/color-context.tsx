import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";

interface ColorControlContextType {
  saturation: number;
  setSaturation: (value: number) => void;
  hue: number;
  setHue: (value: number) => void;
  position: { x: number; y: number };
  setPosition: (value: { x: number; y: number }) => void;
  resetColors: () => void;
}

const defaultValues: ColorControlContextType = {
  saturation: 100,
  setSaturation: () => {},
  hue: 0,
  setHue: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
  resetColors: () => {},
};

const ColorControlContext =
  createContext<ColorControlContextType>(defaultValues);

export const useColorControl = () => useContext(ColorControlContext);

// Helper functions for cookies
const getCookieValue = (key: string, defaultValue: any) => {
  try {
    const saved = Cookies.get(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from cookies:`, error);
    return defaultValue;
  }
};

const setCookieValue = (key: string, value: any) => {
  try {
    Cookies.set(key, JSON.stringify(value), {
      domain: ".lmn.co.ke",
      expires: 7,
    });
  } catch (error) {
    console.error(`Error saving ${key} to cookies:`, error);
  }
};

interface ColorControlProviderProps {
  children: ReactNode;
}

export const ColorControlProvider: React.FC<ColorControlProviderProps> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInitialized) {
      const defaultPosition = {
        x: window.innerWidth - 80,
        y: 100,
      };

      setSaturation(getCookieValue("colorControlSaturation", 100));
      setHue(getCookieValue("colorControlHue", 0));
      setPosition(getCookieValue("colorControlPosition", defaultPosition));

      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setCookieValue("colorControlSaturation", saturation);
    }
  }, [saturation, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setCookieValue("colorControlHue", hue);
    }
  }, [hue, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setCookieValue("colorControlPosition", position);
    }
  }, [position, isInitialized]);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.style.filter = `saturate(${
      saturation / 100
    }) hue-rotate(${hue}deg)`;
    return () => {
      rootElement.style.filter = "";
    };
  }, [saturation, hue]);

  const resetColors = () => {
    setSaturation(100);
    setHue(0);
  };

  return (
    <ColorControlContext.Provider
      value={{
        saturation,
        setSaturation,
        hue,
        setHue,
        position,
        setPosition,
        resetColors,
      }}
    >
      {children}
    </ColorControlContext.Provider>
  );
};
