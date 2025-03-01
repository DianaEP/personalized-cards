import { Request, Response, Router } from 'express';
import { getDb } from '../db';
import { v4 as uuidv4 } from 'uuid';


const postcardRoutes = Router();

// Create a new image
postcardRoutes.post('/', async (req: Request, res: Response): Promise<any> => {
    const { finalImageUri } = req.body;
  
    if (!finalImageUri) {
      return res.status(400).json({ message: 'finalImageUri is required' });
    }
  
    const newId = uuidv4();
    try {
      const db = getDb();
      await db.run('INSERT INTO images (id, finalImageUri) VALUES (?, ?)', [newId, finalImageUri]);
      res.status(201).json({ 
        message: 'Image added successfully', 
        id: newId, 
        finalImageUri: finalImageUri
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

      res.json(images);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching images', error });
    }
  });

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