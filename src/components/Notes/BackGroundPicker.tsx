"use client";

import Image from "next/image";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";

const preDefineBackgrounds = [
  { id: " none", name: Default, image: null },
  { id: "aroara", name: "Aroara", image: "/backgrounds/aroara.jpg" },
  { id: "bluedot", name: "Blue-Dot", image: "/backgrounds/bluedot.jpg" },
  { id: "blueline", name: "Blue-Line", image: "/backgrounds/blueline.jpg" },
  {
    id: "blueparticle",
    name: "Blue-Particle",
    image: "/backgrounds/blueparticle.jpg",
  },
  { id: "bluewave", name: "Blue-Wave", image: "/backgrounds/bluewave.jpg" },
  { id: "mistgreen", name: "Mist-Green", image: "/backgrounds/mistgreen.jpg" },
  { id: "orange", name: "Orange", image: "/backgrounds/orange.jpg" },
  { id: "pink", name: "Pink", image: "/backgrounds/pink.jpg" },
  {
    id: "pinkblueart",
    name: "Pink-Blue-Art",
    image: "/backgrounds/pinkblueart.jpg",
  },
  { id: "pinksky", name: "Pink-Sky", image: "/backgrounds/pinksky.jpg" },
  {
    id: "purplestring",
    name: "Purple-String",
    image: "/backgrounds/purplestring.jpg",
  },
  {
    id: "purplewave",
    name: "Purple-Wave",
    image: "/backgrounds/purplewave.jpg",
  },
  {
    id: "rainbowgradient",
    name: "Rainbow-Gradient",
    image: "/backgrounds/rainbowgradient.jpg",
  },
  { id: "redline", name: "Red-Line", image: "/backgrounds/redline.jpg" },
  { id: "round", name: "Round", image: "/backgrounds/round.jpg" },
  { id: "shine", name: "Shine", image: "/backgrounds/shine.jpg" },
  { id: "sky", name: "Sky", image: "/backgrounds/sky.jpg" },
  { id: "wave", name: "Wave", image: "/backgrounds/wave.jpg" },
  { id: "whiteart", name: "White-Art", image: "/backgrounds/whiteart.jpg" },
  { id: "whitefold", name: "White-Fold", image: "/backgrounds/whitefold.jpg" },
  {
    id: "whitepaint",
    name: "White-Paint",
    image: "/backgrounds/whitepaint.jpg",
  },
  {
    id: "whitesmoke",
    name: "White-Smoke",
    image: "/backgrounds/whitesmoke.jpg",
  },
];

type BackgroundPickerProps = {
  value: string | null;
  onchange: (backgroundId: string | null) => void;
};

const BackGroundPicker = ({ value, onchange }: BackgroundPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {preDefineBackgrounds.map((bg) => (
        <Button
          key={bg.id}
          type="button"
          onClick={() => onchange(bg.id === "none" ? null : bg.id)}
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
              <Checkbox className="size-4 text-white" />
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default BackGroundPicker;
