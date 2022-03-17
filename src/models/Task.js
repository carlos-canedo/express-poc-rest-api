const uuid = require("uuid");

class Task {
  static #tasks = [];

  static getAll() {
    return this.#tasks;
  }
  static getById(id) {
    const task = this.#tasks.find((t) => t._id === id);
    return task ? task : null;
  }
  static create(task) {
    if (task instanceof Task) {
      this.#tasks.push(task);
      return task;
    }
    return null;
  }
  static update(id, fields) {
    const idx = this.#tasks.findIndex((t) => t._id === id);

    if (idx !== -1) {
      for (const key in fields) {
        if (fields[key]) {
          this.#tasks[idx][key] = fields[key];
        }
      }
      return this.#tasks[idx];
    }
    return null;
  }
  static remove(id) {
    const tmp = this.#tasks.reduce(
      (tmp, t) => {
        if (t._id === id) {
          tmp.removed = t;
        } else {
          tmp.tasks.push(t);
        }

        return tmp;
      },
      {
        tasks: [],
        removed: null,
      }
    );

    if (tmp.removed) {
      this.#tasks = tmp.tasks;
      return tmp.removed;
    }

    return null;
  }

  // Task instances
  #_id;
  #subject;
  #description;

  constructor(subject, description) {
    this.#_id = uuid.v4();
    this.subject = subject;
    this.description = description;
  }
  set subject(subject) {
    if (typeof subject !== "string" || subject.length < 4) {
      throw new Error(
        "subject must be string field with at least 4 characters"
      );
    }
    this.#subject = subject;
  }
  get subject() {
    return this.#subject;
  }
  set description(description) {
    if (typeof description !== "string" || description.length < 4) {
      throw new Error(
        "description must be string field with at least 4 characters"
      );
    }
    this.#description = description;
  }
  get description() {
    return this.#description;
  }
  get _id() {
    return this.#_id;
  }
  getObject() {
    return {
      _id: this.#_id,
      subject: this.#subject,
      description: this.#description,
    };
  }
}

module.exports = Task;
