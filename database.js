import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function getNotas(){
  const [data] = await pool.query("SELECT * FROM notas");

  return data;
}

export async function getNota(id){
  const [nota] = await pool.query(`SELECT * FROM notas WHERE id = ?`, [id]);

  return nota[0];
}

export async function createNota(titulo, contenido){
  const respuesta = await pool.query(`INSERT INTO notas (titulo, contenido) VALUES (?, ?)`, [titulo, contenido]);
  let id = respuesta[0].insertId;

  return getNota(id);
}