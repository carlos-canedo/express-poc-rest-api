const HttpError = require("../utils/HttpError");
const Task = require("../models/Task");

function getAll(req, res) {
  res.json(Task.getAll().map((t) => t.getObject()));
}
function getById(req, res) {
  const { id } = req.params;

  const task = Task.getById(id);

  if (task) {
    res.json(task.getObject());
    return;
  }

  throw new HttpError(404, "task not found");
}
function create(req, res) {
  const { subject, description } = req.body;

  if (subject && description) {
    try {
      const task = Task.create(new Task(subject, description));
      res.status(201).json(task.getObject());
      return;
    } catch (error) {
      throw new HttpError(400, error.message);
    }
  }
  throw new HttpError(400, "subject or description not provided");
}
function update(req, res, next) {
  const { id } = req.params;
  const { subject, description } = req.body;

  const fields = {
    subject: subject ? subject : null,
    description: description ? description : null,
  };

  if (subject || description) {
    try {
      const task = Task.update(id, fields);

      if (task) {
        res.status(200).json(task.getObject());
        return;
      }
      next(new HttpError(404, "task not found"));
    } catch (error) {
      throw new HttpError(400, error.message);
    }
  }
  throw new HttpError(400, "no task field provided");
}
function remove(req, res) {
  const { id } = req.params;

  const task = Task.remove(id);

  if (task) {
    res.status(200).json(task.getObject());
    return;
  }
  throw new HttpError(404, "task not found");
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
