import express from 'express';
import { SOME_THING_WENT_WRONG } from '../constant/index.js';
import db from '../models/index.js';
import { authorizeValidation, generateServerErrorCode } from '../utils/validation.js';

const Category = db.categories;
const categoryController = express.Router();

categoryController.post('/', (req, res) => {
  try {
    const { title, description } = req.body
    const category = new Category({
      title,
      description
    });
    category
      .save(category)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

categoryController.put('/:categoryId', authorizeValidation, (req, res) => {
  try {
    const { title, description } = req.body;
    const { categoryId } = req.params;
    const updateData = { title, description };
    Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: updateData },
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send({
            error,
            message: "Some error occurred while updating the category.",
          });
        }
      })
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

categoryController.delete('/:categoryId', authorizeValidation, (req, res) => {
  try {
    const { categoryId } = req.params;
    Category.findByIdAndRemove({ _id: categoryId })
      .then(() => {
        res.send({
          success: true,
          data: {}
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the category.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

categoryController.get('/', authorizeValidation, (req, res) => {
  Category.find({}, null, { sort: { updatedAt: -1 } }, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while getting the categories.",
      });
    }
    res.status(200).json({
      data: result,
    });
  });
});

export default categoryController;