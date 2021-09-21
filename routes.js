/* eslint-disable no-console */
const express = require("express");
const passport = require('passport');

require('./utils/auth');
const {
  addNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  register,
  login,
} = require("./handlers");

const router = express.Router();

//notes
router.post("/note", passport.authenticate('jwt', { session: false }), addNote);
router.get("/notes", passport.authenticate('jwt', { session: false }), getAllNotes);
router.get("/note/:id", passport.authenticate('jwt', { session: false }), getNote);
router.put("/note/:id", passport.authenticate('jwt', { session: false }), updateNote);
router.delete("/note/:id", passport.authenticate('jwt', { session: false }), deleteNote);

//auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;
