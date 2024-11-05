import pg from "pg";
import dotenv from "dotenv";


dotenv.config();

console.log("Database configuration:", {
    user: process.env.PG_USER,
   
});
 

const db = new pg.Client({
    user: process.env.PG_USER,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT
})



db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.stack);
    } else {
        console.log('Successfully connected to the database');
    }
});

db.on('error', (err) => {
    console.log('Unexpected error on idle client', err)
    process.exit(-1)
})

export const query = (text, params ) => db.query(text,params)