import sharp from 'sharp'
import { Router } from 'express'

export const routerCompressed = Router()
// Новый маршрут для сжатия изображений
routerCompressed.get('/:imageName', async (req, res) => {
  const { imageName } = req.params
  const imagePath = `assets/${imageName}`

  try {
    // Чтение оригинального изображения
    const imageBuffer = await sharp(imagePath).toBuffer()

    // Сжатие изображения
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 10 })
      .toBuffer()

    // Отправка сжатого изображения клиенту
    res.type('image/jpeg').send(compressedImageBuffer)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

// npm remove memory-cache
// import sharp from 'sharp'
// import cache from 'memory-cache';
// import { Router } from "express"

// const cacheMiddleware = (duration) => (req, res, next) => {
//   const key = `__express__${req.originalUrl || req.url}`;
//   const cachedBody = cache.get(key);

//   if (cachedBody) {
//     res.send(cachedBody);
//     return;
//   } else {
//     res.sendResponse = res.send;
//     res.send = (body) => {
//       cache.put(key, body, duration * 1000);
//       res.sendResponse(body);
//     };
//     next();
//   }
// };

// export const routerCompressed = Router()
// routerCompressed.get('/:imageName', cacheMiddleware(3600), async (req, res) => {
//   const { imageName } = req.params;
//   const imagePath = `assets/${imageName}`;

//   try {
//     const imageBuffer = await sharp(imagePath).toBuffer();
//     const compressedImageBuffer = await sharp(imageBuffer)
//       .resize({ width: 10 })
//       .toBuffer();

//     res.type('image/jpeg').send(compressedImageBuffer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });