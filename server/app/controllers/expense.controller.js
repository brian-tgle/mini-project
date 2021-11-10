import express from 'express';
import { validationResult } from 'express-validator';
import {
  generateServerErrorCode,
  expenseValidation,
  authorizeValidation
} from '../utils/validation.js';
import { SOME_THING_WENT_WRONG } from '../constant/index.js';
import db from '../models/index.js';

const Expense = db.expenses;

const expenseController = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

/**
 * POST/
 * Create an expense
 */
expenseController.post('/', expenseValidation, (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  try {
    const { category, title, date, value } = req.body;
    const user = req.user;
    const expense = new Expense({
      category,
      title,
      date,
      value,
      createdBy: user.id
    });
    expense
      .save(expense)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the expense.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

expenseController.put('/:expenseId', expenseValidation, (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  try {
    const { expenseId } = req.params;
    const updateData = {...req.body};
    Expense.findOneAndUpdate(
      { _id: expenseId },
      { $set: updateData },
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send({
            error,
            message: "Some error occurred while updating the expense.",
          });
        }
      })
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

expenseController.delete('/:expenseId', authorizeValidation, (req, res) => {
  try {
    const { expenseId } = req.params;
    const user = req.user;
    Expense.findByIdAndRemove({ _id: expenseId, createdBy: user.id })
      .then(() => {
        res.send({
          success: true,
          data: {}
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the expense.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

expenseController.get('/', authorizeValidation, (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const user = req.user;
  const condition = { createdBy: user.id }
  const populate = [
    {
      path: "category",
      select: "title",
      model: "category"
    },
    {
      path: "createdBy",
      select: "fullname",
      model: "user"
    }
  ];
  const sort = { 'updatedAt': -1 }
  Expense.paginate(condition, { offset, limit, populate, sort }).then(data => {
    res.status(200).send({
      totalItems: data.totalDocs,
      data: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving expense.",
    });
  });
});

export default expenseController;