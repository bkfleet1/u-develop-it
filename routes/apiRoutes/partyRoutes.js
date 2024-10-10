import express from "express";
import db from "../../db/connection.js";

const router = express.Router();

router.get("/parties", (_req, res) => {
  const sql = `SELECT * FROM parties`;
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

// get a party
router.get("/party/:id", (_req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [_req.params.id];
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

// delete record by Id
router.delete("/party/:id", (_req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [_req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Party not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: _req.params.id,
      });
    }
  });
});

module.exports = router;
