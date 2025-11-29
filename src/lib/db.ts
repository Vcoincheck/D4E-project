import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

// Database initialization for SQLite (you can replace with PostgreSQL if needed)
const DB_PATH = path.join(process.cwd(), 'data', 'app.db');

let db: sqlite3.Database | null = null;

export function getDB(): sqlite3.Database {
  if (!db) {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to SQLite database at:', DB_PATH);
        initializeTables();
      }
    });
  }
  return db;
}

export async function initializeTables() {
  const database = getDB();
  
  return new Promise<void>((resolve, reject) => {
    // Users table
    database.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) console.error('Error creating users table:', err);
      }
    );

    // Sessions table
    database.run(
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        refresh_token TEXT UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) console.error('Error creating sessions table:', err);
      }
    );

    // DAOs table
    database.run(
      `CREATE TABLE IF NOT EXISTS daos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        logo_url TEXT,
        treasury_address TEXT,
        members_count INTEGER DEFAULT 0,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )`,
      (err) => {
        if (err) console.error('Error creating daos table:', err);
      }
    );

    // DAO members table
    database.run(
      `CREATE TABLE IF NOT EXISTS dao_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dao_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        role TEXT DEFAULT 'member',
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dao_id) REFERENCES daos(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(dao_id, user_id)
      )`,
      (err) => {
        if (err) console.error('Error creating dao_members table:', err);
        resolve();
      }
    );
  });
}

export function runQuery(
  sql: string,
  params: any[] = []
): Promise<any> {
  return new Promise((resolve, reject) => {
    const database = getDB();
    database.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve({ changes: database.changes });
    });
  });
}

export function getOne(
  sql: string,
  params: any[] = []
): Promise<any> {
  return new Promise((resolve, reject) => {
    const database = getDB();
    database.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getAll(
  sql: string,
  params: any[] = []
): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const database = getDB();
    database.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export function closeDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) reject(err);
        else {
          db = null;
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}
