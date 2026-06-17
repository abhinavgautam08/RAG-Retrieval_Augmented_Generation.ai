const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const BASE_DIR = __dirname;
const UPLOAD_FOLDER = path.join(BASE_DIR, 'uploads');
const DB_FOLDER = path.join(BASE_DIR, 'database');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}
if (!fs.existsSync(DB_FOLDER)) {
  fs.mkdirSync(DB_FOLDER, { recursive: true });
}

const Config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  NODE_ENV: process.env.FLASK_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  UPLOAD_FOLDER,
  DB_FOLDER,
  MAX_CONTENT_LENGTH: parseInt(process.env.MAX_CONTENT_LENGTH || '20971520', 10),
  ALLOWED_EXTENSIONS: ['pdf', 'txt', 'docx', 'md', 'png', 'jpg', 'jpeg'],
  DEFAULT_CHUNK_SIZE: 500,
  DEFAULT_CHUNK_OVERLAP: 100,
  EMBEDDING_MODEL_NAME: 'reon-v10',
  DEFAULT_TOP_K: 3,
  USE_MYSQL: (process.env.USE_MYSQL || '').toLowerCase() === 'true',
  DB_HOST: process.env.DB_HOST || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || ''
};

module.exports = Config;
