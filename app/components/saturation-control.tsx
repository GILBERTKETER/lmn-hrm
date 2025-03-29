import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  type PanInfo,
} from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Settings, Palette, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColorControl } from "@/context/color-context";

const SaturationControl = () => {
  const {
    saturation,
    setSaturation,
    hue,
    setHue,
    position,
    setPosition,
    resetColors,
  } = useColorControl();

  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);

  // Check screen size safely
  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controlRef.current &&
        !controlRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle drag end
  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    });
  };

  // Determine panel position (left or right) safely
  const isPanelOnLeft =
    typeof window !== "undefined" && position.x > window.innerWidth / 2;

  return (
    <motion.div
      ref={controlRef}
      className="fixed z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: position.x,
        y: position.y,
      }}
      drag={isDraggable}
      dragControls={dragControls}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
    >
      {/* Floating control panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={isPanelOnLeft ? "absolute right-full mr-3" : "mb-3"}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              transformOrigin: isPanelOnLeft
                ? "top right"
                : isMobile
                ? "bottom right"
                : "top right",
            }}
          >
            <div
              className="bg-background/95 backdrop-blur-lg rounded-lg border shadow-lg p-4 w-64"
              onMouseEnter={() => setIsDraggable(false)}
              onMouseLeave={() => setIsDraggable(true)}
              onTouchStart={() => setIsDraggable(false)}
              onTouchEnd={() => setIsDraggable(true)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm">Color Controls</h3>
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-4 h-4 rounded-full cursor-pointer"
                    style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                    title="Current hue color"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetColors}
                    className="h-6 w-6"
                    title="Reset colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div
                    className="cursor-move opacity-60 hover:opacity-100"
                    onPointerDown={(e) => {
                      setIsDraggable(true);
                      dragControls.start(e);
                      e.stopPropagation();
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Saturation control */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium">Saturation</label>
                    <span className="text-xs">{saturation}%</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={(value: any) => setSaturation(value[0])}
                    className="mt-1"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">0%</span>
                    <span className="text-xs text-muted-foreground">200%</span>
                  </div>
                </div>

                {/* Hue control */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium">Hue</label>
                    <span className="text-xs">{hue}°</span>
                  </div>
                  <div
                    className="h-2 rounded-full w-full mb-2"
                    style={{
                      background:
                        "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                    }}
                  />
                  <Slider
                    value={[hue]}
                    min={0}
                    max={360}
                    step={5}
                    onValueChange={(value: any) => setHue(value[0])}
                    className="mt-1"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">0°</span>
                    <span className="text-xs text-muted-foreground">360°</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center rounded-full shadow-lg cursor-grab active:cursor-grabbing ${
          isOpen
            ? "bg-primary text-primary-foreground"
            : "bg-background/95 text-foreground border"
        }`}
        style={{
          width: "48px",
          height: "48px",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Palette className="w-5 h-5" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Settings className="w-5 h-5 opacity-30" />
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default SaturationControl;
