const fs = require('fs');

function resizeImage(imagePath, newImagePath, quality) {
  // Read the original image file
  const originalImage = fs.readFileSync(imagePath);

  // Mimic "resizing" by reducing quality: convert binary data to string
  // and reduce its length based on the provided quality parameter
  let resizedImage = '';
  for (let i = 0; i < originalImage.length; i++) {
    if (i % quality === 0) {
      resizedImage += String.fromCharCode(originalImage[i]);
    }
  }

  // Convert string back to binary data and write to the new file
  fs.writeFileSync(newImagePath, Buffer.from(resizedImage, 'binary'));
}

module.exports = resizeImage;
