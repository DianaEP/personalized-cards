import { Request, Response, Router } from 'express';
import { getDb } from '../db';
import { v4 as uuidv4 } from 'uuid';


const postcardRoutes = Router();

// Create a new image
postcardRoutes.post('/', async (req: Request, res: Response): Promise<any> => {
    const { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, svgData } = req.body;
  
    if (!finalImageUri) {
      return res.status(400).json({ message: 'finalImageUri is required' });
    }

    
  console.log('textPosition:', textPosition);
  console.log('svgData after update:', svgData);
  
    const newId = uuidv4();
    try {
      const db = getDb();
      await db.run(
        `INSERT INTO images (id, finalImageUri, originalImageUri, overlayText, textPositionX, textPositionY, textFont, textFontSize, svgData) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
          newId,
          finalImageUri,
          originalImageUri,
          overlayText,
          textPosition.x, 
          textPosition.y,
          textFont,
          textFontSize,
          JSON.stringify(svgData),
        ]);
      res.status(201).json({ 
        message: 'Image added successfully', 
        id: newId, 
        finalImageUri,
        originalImageUri,
        overlayText,
        textPosition,
        textFont,
        textFontSize,
        svgData,

    });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting image', error });
    }
  });

// Get all images
postcardRoutes.get('/', async (req: Request, res: Response) => {
    try {
      const db = getDb();
      const images = await db.all('SELECT * FROM images');

      if (!images || images.length === 0) {
        console.warn("⚠️ No images found in the database.");
      }

      images.forEach(image => {
        try {
          image.textPosition = { x: image.textPositionX, y: image.textPositionY }; // Rebuild textPosition object
          image.svgData = JSON.parse(image.svgData);  // Ensure svgData is parsed as JSON
        } catch (e) {
          console.error("Error parsing JSON for image data:", e);
        }
      });

      res.json(images);
    } catch (error) {
      console.error("Database fetch error:", error);
      res.status(500).json({ message: 'Error fetching images', error });
    }
  });

// Get image
postcardRoutes.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const db = getDb();
    const image = await db.get('SELECT * FROM images WHERE id = ?', [id]);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.textPosition = { x: image.textPositionX, y: image.textPositionY };
    image.svgData = JSON.parse(image.svgData);

    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error });
  }

})


// Update image
postcardRoutes.put('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, svgData } = req.body;
  if (!finalImageUri) {
    return res.status(400).json({ message: 'finalImageUri is required' });
  }
  try{
    const db = getDb();
    const statement = await db.prepare(
      `UPDATE images 
      SET finalImageUri = ?, originalImageUri = ?, overlayText = ?, textPositionX = ?, textPositionY = ?, textFont = ?, textFontSize = ?, svgData = ?
      WHERE id = ?`);
    const result = await statement.run( 
      finalImageUri,
      originalImageUri,
      overlayText,
      textPosition.x, 
      textPosition.y,
      textFont,
      textFontSize,
      JSON.stringify(svgData),
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    console.log('Received ID:', id);
    console.log('Received data:', { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, svgData });

    res.json({message: 'Image updated successfully', 
      id,
      finalImageUri,
      originalImageUri,
      overlayText,
      textPosition,
      textFont,
      textFontSize,
      svgData,
    })
  }catch(error){
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Server error", error });
  }
})




postcardRoutes.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    
    try {
      const db = getDb();
      const result = await db.run('DELETE FROM images WHERE id = ?', [id]);
      
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting image', error });
    }
});

  
export default postcardRoutes;