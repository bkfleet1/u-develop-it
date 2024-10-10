import express from "express";
const router = express.Router();
import db from "../../db/connection";
import inputCheck from "../../utils/inputCheck";

// GET all voters.
router.get("/voters", (_, res) => {
  const sql = `SELECT voters.id, voters.first_name, voters.last_name, voters.email, FROM_UNIXTIME(voters.created_at) AS created_datetime FROM voters ORDER BY voters.last_name DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get single voter.
router.get("/voter/:id", (req, res) => {
  const sql = `SELECT voters.id, voters.first_name, voters.last_name, voters.email, FROM_UNIXTIME(voters.created_at) AS created_datetime FROM voters WHERE voters.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// POST route to add voter.
router.post("/voter", ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, "first_name", "last_name", "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;

  const params = [body.first_name, body.last_name, body.email];

  db.query(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// PUT route to update voter email address.
router.put("/voter/:id", (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Voter not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// DELETE route to remove voter by id.
router.delete("/voter/:id", (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Voter not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;
