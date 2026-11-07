"use client";

import { Check } from "lucide-react";
import Image from "next/image";

const predefinedBackgrounds = [
  { id: "none", name: "Default", image: null },
  { id: "aurora", name: "Aurora", image: "/backgrounds/aurora.jpg" },
  { id: "blue-dot", name: "Blue Dot", image: "/backgrounds/bluedot.jpg" },
  { id: "blue-line", name: "Blue Line", image: "/backgrounds/blueline.jpg" },
  {
    id: "blue-particle",
    name: "Blue Particle",
    image: "/backgrounds/blueparticle.jpg",
  },
  { id: "blue-wave", name: "Blue Wave", image: "/backgrounds/bluewave.jpg" },
  { id: "mist-green", name: "Mist Green", image: "/backgrounds/mistgreen.jpg" },
  { id: "orange", name: "Orange", image: "/backgrounds/orange.jpg" },
  { id: "pink", name: "Pink", image: "/backgrounds/pink.jpg" },
  {
    id: "pink-blue-art",
    name: "Pink Blue Art",
    image: "/backgrounds/pinkblueart.jpg",
  },
  { id: "pink-sky", name: "Pink Sky", image: "/backgrounds/pinksky.jpg" },
  {
    id: "purple-string",
    name: "Purple String",
    image: "/backgrounds/purplestring.jpg",
  },
  {
    id: "purple-wave",
    name: "Purple Wave",
    image: "/backgrounds/purplewave.jpg",
  },
  {
    id: "rainbow-gradient",
    name: "Rainbow Gradient",
    image: "/backgrounds/rainbowgradient.jpg",
  },
  { id: "red-line", name: "Red Line", image: "/backgrounds/redline.jpg" },
  { id: "round", name: "Round", image: "/backgrounds/round.jpg" },
  { id: "shine", name: "Shine", image: "/backgrounds/shine.jpg" },
  { id: "sky", name: "Sky", image: "/backgrounds/sky.jpg" },
  { id: "wave", name: "Wave", image: "/backgrounds/wave.jpg" },
  { id: "white-art", name: "White Art", image: "/backgrounds/whiteart.jpg" },
  { id: "white-fold", name: "White Fold", image: "/backgrounds/whitefold.jpg" },
  {
    id: "white-paint",
    name: "White Paint",
    image: "/backgrounds/whitepaint.jpg",
  },
  {
    id: "white-smoke",
    name: "White Smoke",
    image: "/backgrounds/whitesmoke.jpg",
  },
];

type BackgroundPickerProps = {
  value: string | null;
  onChange: (backgroundId: string | null) => void;
};

const BackgroundPicker = ({ value, onChange }: BackgroundPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {predefinedBackgrounds.map((bg) => (
        <button
          key={bg.id}
          type="button"
          onClick={() => onChange(bg.id === "none" ? null : bg.id)}
          className={`relative h-12 w-12 overflow-hidden rounded-md border-2 transition-all ${
            value === bg.id || (bg.id === "none" && value === null) ?
              "border-primary ring-primary/30 ring-2"
            : "border-border hover:border-muted-foreground"
          }`}
          aria-label={`Use ${bg.name} background`}
          title={bg.name}>
          {bg.image ?
            <Image
              src={bg.image}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          : <div className="bg-muted h-full w-full" />}
          {value === bg.id && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Check className="size-4 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BackgroundPicker;
