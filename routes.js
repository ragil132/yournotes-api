/* eslint-disable no-console */
const express = require("express");
const {
  addNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("./handlers");

const router = express.Router();

router.post("/note", addNote);

router.get("/notes", getAllNotes);

router.get("/note/:id", getNote);

router.put("/note/:id", updateNote);

router.delete("/note/:id", deleteNote);

module.exports = router;
