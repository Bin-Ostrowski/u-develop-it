const mysql = require('mysql2');
const express = require('express');
const { binaryExpression } = require('@babel/types');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username,
        user: 'root',
        //your Mysql password
        password: 'Mysql-0892',
        database: 'election'
    },
    console.log('Connected to the election database.')
);
// //GET all candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// //GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// //Detele a condidate
// db.query(`DELETE FROM candidates WHERE id =?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//Create a condidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
//The four placeholders must match the four values in params, 
//so we must use an array.
const params = [1, 'Ronald', 'Firbank', 1]; 

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

//default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});