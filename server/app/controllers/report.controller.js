import express from 'express';
import db from '../models/index.js';
import { authorizeValidation } from '../utils/validation.js';

const Category = db.categories;
const reportController = express.Router();

reportController.get('/', authorizeValidation, (_, res) => {
  const populate = [
    {
      path: "expensesInCategory",
      select: "value",
      model: "expense"
    }
  ];
  Category.find({}, null, { sort: { updatedAt: -1 }, populate }, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while getting the report.",
      });
    }
    res.status(200).json({
      data: result,
    });
  });
});

export default reportController;