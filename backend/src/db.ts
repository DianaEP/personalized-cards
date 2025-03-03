import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database;

export const initDb = async () => {
  db = await open({
    filename: './postcardDB.db',  // SQLite file path
    driver: sqlite3.Database,  // Using sqlite3 under the hood
  });
  // await db.exec('DROP TABLE IF EXISTS images');
  await db.exec(`
    CREATE TABLE IF NOT EXISTS images (
      id TEXT PRIMARY KEY,
      finalImageUri TEXT NOT NULL,
      originalImageUri TEXT,
      overlayText TEXT,
      textPositionX INTEGER,  
      textPositionY INTEGER,
      textFont TEXT,
      textFontSize INTEGER,
      svgData TEXT, 
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized and table created');
};

export const getDb = () => db;

