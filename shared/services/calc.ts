export const calcPlayerSize = (): { w: number; h: number } => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 450;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 650;

  const paddingX = vw < 640 ? 16 : 24;
  const paddingY = vw < 640 ? 24 : 32;

  const maxW = Math.min(480, vw - paddingX * 2);
  const maxH = Math.min(760, vh - paddingY * 2);

  const targetRatio = 450 / 650;
  let w = maxW;
  let h = Math.round(w / targetRatio);

  if (h > maxH) {
    h = maxH;
    w = Math.round(h * targetRatio);
  }

  return { w, h };
};
