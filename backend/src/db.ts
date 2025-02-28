import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database;

export const initDb = async () => {
  db = await open({
    filename: './postcardDB.db',  // SQLite file path
    driver: sqlite3.Database,  // Using sqlite3 under the hood
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      finalImageUri TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized and table created');
};

export const getDb = () => db;

