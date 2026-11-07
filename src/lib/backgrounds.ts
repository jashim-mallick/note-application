export const BACKGROUNDS: Record<string, string> = {
  aurora: "/backgrounds/aurora.jpg",
  "blue-dot": "/backgrounds/bluedot.jpg",
  "blue-line": "/backgrounds/blueline.jpg",
  "blue-particle": "/backgrounds/blueparticle.jpg",
  "blue-wave": "/backgrounds/bluewave.jpg",
  "mist-green": "/backgrounds/mistgreen.jpg",
  orange: "/backgrounds/orange.jpg",
  pink: "/backgrounds/pink.jpg",
  "pink-blue-art": "/backgrounds/pinkblueart.jpg",
  "pink-sky": "/backgrounds/pinksky.jpg",
  "purple-string": "/backgrounds/purplestring.jpg",
  "purple-wave": "/backgrounds/purplewave.jpg",
  "rainbow-gradient": "/backgrounds/rainbowgradient.jpg",
  "red-line": "/backgrounds/redline.jpg",
  round: "/backgrounds/round.jpg",
  shine: "/backgrounds/shine.jpg",
  sky: "/backgrounds/sky.jpg",
  wave: "/backgrounds/wave.jpg",
  "white-art": "/backgrounds/whiteart.jpg",
  "white-fold": "/backgrounds/whitefold.jpg",
  "white-paint": "/backgrounds/whitepaint.jpg",
  "white-smoke": "/backgrounds/whitesmoke.jpg",
};

export function getBackgroundImage(id: string | null): string | null {
  if (!id) return null;
  return BACKGROUNDS[id] ?? null;
}
