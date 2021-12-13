var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Priya@123",
  database:"Blog_App"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE Blog_App", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE registration (id INT AUTO_INCREMENT PRIMARY KEY ,username VARCHAR(255), password VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });



// con.connect(function(err){
//       if (err) throw err;
//       console.log("database connected");
//       var sql = "CREATE TABLE POST (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(320) NOT NULL,title VARCHAR(200) NOT NULL ,text VARCHAR(5000) NOT NULL)"
//       con.query(sql,(err,result)=>{
//           if (err) throw err;
//           console.log("table created");
//       })
//   })





// con.connect(function(err){
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE options (id INT NOT NULL, username VARCHAR(320) NOT NULL,likes INT(255) NOT NULL DEFAULT (0) ,dislikes INT(255) NOT NULL DEFAULT(0))"
//     con.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log("table created");
//     })
// })




// con.connect(function(err){
//   if (err) throw err;
//   console.log("database connected");
//   var sql = "DROP TABLE POST"
//   con.query(sql,(err,result)=>{
//       if (err) throw err;
//       console.log("table deleted");
//   })
// })


module.exports = con
