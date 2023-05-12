const express = require("express");
var mysql = require('mysql');

app = express()

app.use(express.json())

var cors = require('cors')
app.use(cors())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aravind@72',
    database: 'formdata'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// Insert Users into the database

app.post('/insert', (req, res) => {
    console.log(req.body)
    connection.query(`insert into contactUs (firstname,lastname,email,contact,message)values (?,?,?,?,?)`, [req.body.firstname, req.body.lastname, req.body.email, parseInt(req.body.contact), req.body.message], function (error, results) {
        if (error); {
            console.log(error);
        }
        console.log('results ' + JSON.stringify(results));

        res.end(JSON.stringify(results));

        //   connection.end();

    });
})

// Get all Users in screen

app.get('/users', (req, res) => {
    console.log(req.query)
    connection.query('SELECT * from contactUs where isDeleted=0', function (error, results) {
        if (error); {
            console.log(error);
        }
        console.log('The solution is: ', results);

        res.end(JSON.stringify(results));
    });

})

// Get Datas to Forms

app.get("/getbyid/:id", (req, res) => {
    console.log('inside get')
    connection.query(`select * from contactUs where id=?`
        , [req.params.id],
        function (error, results) {
            if (error) {
                console.log(error);
            }
            console.log("selected records successfully by using ");
            console.log(results);

            res.json(results);

        }

    );

});

// Update

app.put('/update/:id', (req, res) => {
    console.log('inside upadteeeeeeeeeeeeeeeeeeeee', req.params.id)
    console.log('inside upadteeeeeeeeeeeeeeeeeeeee', req.body)
    connection.query('update contactUs set firstname = ?, lastname = ?, email = ?, contact = ?, message = ? where id = ?',[req.body.firstname, req.body.lastname,req.body.email,req.body.contact,req.body.message,req.params.id], function(err,res){
       if(err){
        console.log("errorrrrrrrrrrrr",err.message)
       }
       console.log("successssssssssss",res)
    })

})

// app.put('/update/:id', (req, res) => {
//     console.log(req.params.id)
//     console.log('inside upadte')
//     connection.query('update contactUs set firstname=?,lastname=?,email=?,contact=?,message=? where id=?',function (error, results) {
//             if (error) {
//                 console.log("error", error)
//             }
//             res.json(results)
//             console.log("result",results);            
//         });

// })

// 

app.put('/delete', (req, res) => {
    connection.query('update contactUs set isDeleted=? where id= ?',[1,req.body.id], function (error, results) {
            if (error) {
                console.log("error", error)
            }
            console.log("delete sucessfully");
            console.log(results)
            res.json(results)
        });

})


app.listen(5000, () => {
    console.log("listening on port 5000");
})
