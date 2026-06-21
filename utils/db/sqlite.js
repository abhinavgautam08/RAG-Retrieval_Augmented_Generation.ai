const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../../config');

let dbInstance = null;

function openConnection() {
  const dbPath = path.resolve(config.DB_PATH || './data/rag.db');
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);
      resolve(db);
    });
  });
}

function createTable(db) {
  const sql = `CREATE TABLE IF NOT EXISTS vectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_name TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => (err ? reject(err) : resolve(db)));
  });
}

async function getSqliteDb() {
  if (dbInstance) return dbInstance;
  const db = await openConnection();
  dbInstance = await createTable(db);
  return dbInstance;
}

module.exports = { getSqliteDb };
