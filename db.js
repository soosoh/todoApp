import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getTasks() {
    const [tasks] = await pool.query(`
    SELECT * FROM tasks
    `);
    return tasks;
}

export async function deleteTask(name) {
    await pool.query(`
    DELETE FROM tasks
    WHERE name = ?
    `, [name]);
}

export async function addTask(task) {
    if(!(task === null) && task.length < 20){
    await pool.query(`
    INSERT INTO tasks (name)
    VALUES (?)
    `, [task]);
    console.log(task + " task added");
    }
}