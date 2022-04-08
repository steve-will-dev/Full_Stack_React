const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'portfolio' // database name MYSQL_HOST_IP: mysql_db
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hi There')
});

app.get('/get', (req, res) => {
    const SelectQuery = "SELECT * FROM portfolio_name";
    db.query(SelectQuery, (err, result) => {
        res.send(result)
        if (err) console.log("error: ", err)
    })
})

app.post("/insert", (req, res) => {
    console.log("body 1", req.body)
    console.log("body 1", req.body.firstName)
    console.log("body 2", req.body.lastName)

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const InsertQuery = "INSERT INTO portfolio_name (first_name, last_name) VALUES (?, ?)";
    db.query(InsertQuery, [firstName, lastName], (err, result) => {
        console.log("result: ", result)
        if (err) console.log("error: ", err)
        res.send(result)

    })
})

app.delete("/delete/:Id", (req, res) => {
    const Id = req.params.Id;
    const DeleteQuery = "DELETE FROM portfolio_name WHERE id = ?";
    db.query(DeleteQuery, Id, (err, result) => {
        if (err) console.log(err);
        res.send(result)

    })
})

app.put("/update/:Id", (req, res) => {
    console.log(req.body.lastNameUpdate)
    const lastName = req.body.lastNameUpdate;
    const Id = req.params.Id;
    const UpdateQuery = "UPDATE portfolio_name SET last_name = ? WHERE id = ?";
    db.query(UpdateQuery, [lastName, Id], (err, result) => {
        if (err) console.log(err)
        res.send(result)

    })
})

app.listen('3001', () => { })