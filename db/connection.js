import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "",
  database: "election",
});

export default db;
