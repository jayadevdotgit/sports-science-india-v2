const sharp = require('sharp');
const path = require('path');

const inputPath = path.resolve('C:/Users/jayad/.gemini/antigravity/brain/cf0f49c8-b406-48c4-b20f-285bb872521e/.user_uploaded/media_1787947032107.jpg');
const outputPath = path.resolve('public/images/hero/ssi-performance-training.jpg');

async function enhanceImage() {
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  // 1. Crop ceiling & bottom edges to remove distractions and frame the athlete & coach perfectly
  const cropTop = Math.round(metadata.height * 0.07);
  const cropBottom = Math.round(metadata.height * 0.02);
  const cropLeft = Math.round(metadata.width * 0.01);
  const cropRight = Math.round(metadata.width * 0.01);
  
  const extractWidth = metadata.width - cropLeft - cropRight;
  const extractHeight = metadata.height - cropTop - cropBottom;

  // 2. Perform color grading, contrast enhancement, vibrant sports saturation & clarity sharpening
  await sharp(inputPath)
    .extract({
      left: cropLeft,
      top: cropTop,
      width: extractWidth,
      height: extractHeight,
    })
    .modulate({
      brightness: 1.05,  // Lift exposure slightly
      saturation: 1.28,  // Enrich blues, greens and skin tones
      hue: 0,
    })
    .linear(1.16, -10)   // Deeper blacks and punchier highlights (contrast curve)
    .sharpen({
      sigma: 1.3,
      m1: 1.2,
      m2: 2.5,
      x1: 2.0,
      y2: 12.0,
    })
    .jpeg({
      quality: 96,
      chromaSubsampling: '4:4:4',
      mozjpeg: true,
    })
    .toFile(outputPath);

  console.log('Done! Enhanced image saved to:', outputPath);
}

enhanceImage().catch(console.error);
