/* eslint-disable no-console */
const { ObjectId } = require("mongodb");
const { logger } = require("./utils/logger");

const addNote = async (req, res, next) => {
  const { notesCollection } = req.app.locals;
  const { title } = req.body;

  try {
    if (!title) {
      logger.error(`${req.originalUrl} - ${req.ip} - title is missing `);
      throw new Error("title is empty!");
    }

    const result = await notesCollection.insertOne(req.body);
    const objResult = result;
    logger.info(`${req.originalUrl} - ${req.ip} - Data successfully saved`);
    res
      .status(200)
      .json({ message: "Data successfully saved", _id: objResult.insertedId });
  } catch (error) {
    logger.error(`${req.originalUrl} - ${req.ip} - ${error} `);
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  const { notesCollection } = req.app.locals;
  try {
    // find all Notes
    const result = await notesCollection.find().sort({ _id: -1 }).toArray();
    logger.info(`${req.originalUrl} - ${req.ip} - All notes retrieved`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`${req.originalUrl} - ${req.ip} - ${error} `);
    next(error);
  }
};

const getNote = async (req, res, next) => {
  const { notesCollection } = req.app.locals;
  try {
    // find Notes based on id
    const result = await notesCollection.findOne({
      _id: ObjectId(req.params.id),
    });
    logger.info(`${req.originalUrl} - ${req.ip} - Notes retrieved`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`${req.originalUrl} - ${req.ip} - ${error} `);
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  const { notesCollection } = req.app.locals;
  const { title, note } = req.body;
  try {
    if (!title) {
      logger.error(`${req.originalUrl} - ${req.ip} - title is missing `);
      throw new Error("title is empty!");
    }
    await notesCollection.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { title, note } }
    );
    logger.info(`${req.originalUrl} - ${req.ip} - Data successfully updated`);
    res.status(200).json("Data successfully updated");
  } catch (error) {
    logger.error(`${req.originalUrl} - ${req.ip} - ${error} `);
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  const { notesCollection } = req.app.locals;
  try {
    // delete data collection
    await notesCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    logger.info(`${req.originalUrl} - ${req.ip} - Data successfully deleted`);
    res.status(200).json("Data successfully deleted");
  } catch (error) {
    logger.error(`${req.originalUrl} - ${req.ip} - ${error} `);
    next(error);
  }
};

module.exports = { addNote, getAllNotes, getNote, updateNote, deleteNote };
