const Task = require("../../models/Task");

describe("Task instance", () => {
  describe("constructor", () => {
    test("sending valid subject and description => should return the new Task", () => {
      const task = new Task("subject", "description");

      expect(task._id).toBeDefined();
      expect(task.subject).toBe("subject");
      expect(task.description).toBe("description");
    });

    test("sending valid subject and invalid description (not accepted string) => should throw error", () => {
      expect(() => {
        const task = new Task("subject", "d");
      }).toThrow(Error);
    });

    test("sending valid subject and number as description => should throw error", () => {
      expect(() => {
        const task = new Task("subject", 1);
      }).toThrow(Error);
    });

    test("sending invalid subject (not accepted string) and valid description => should throw error", () => {
      expect(() => {
        const task = new Task("s", "description");
      }).toThrow(Error);
    });

    test("sending number as subject and valid description => should throw error", () => {
      expect(() => {
        const task = new Task(1, "description");
      }).toThrow(Error);
    });

    test("sending just subject => should throw error", () => {
      expect(() => {
        const task = new Task("subject");
      }).toThrow(Error);
    });

    test("no sending parameters => should throw error", () => {
      expect(() => {
        const task = new Task();
      }).toThrow(Error);
    });
  });

  describe("setters", () => {
    test("setting a valid subject => should update subject field", () => {
      const task = new Task("subject", "description");
      task.subject = "new subject";
      expect(task.subject).toBe("new subject");
    });

    test("setting number as subject => should throw error", () => {
      const task = new Task("subject", "description");
      expect(() => {
        task.subject = 1;
      }).toThrow(Error);
    });

    test("setting a invalid description (not accepted string) => should throw error", () => {
      const task = new Task("subject", "description");

      expect(() => {
        task.description = "d";
      }).toThrow(Error);
    });
  });

  describe("getObject", () => {
    test("executing => should return a object with all task fields", () => {
      const task = new Task("subject", "description");
      const taskObject = task.getObject();

      expect(task._id).toBe(taskObject._id);
      expect(task.subject).toBe(taskObject.subject);
      expect(task.description).toBe(taskObject.description);
    });
  });
});

describe("Task static data", () => {
  describe("create", () => {
    test("sending a valid Task instance => should return that Task", () => {
      const task = Task.create(new Task("subject", "description"));

      expect(task._id).toBeDefined();
      expect(task.subject).toBe("subject");
      expect(task.description).toBe("description");
    });

    test("sending string as Task => should return null", () => {
      const task = Task.create("");
      expect(task).toBeNull();
    });

    test("sending Task with invalid description => should thorw error", () => {
      expect(() => {
        const task = Task.create(new Task("subject", ""));
      }).toThrow(Error);
    });
  });

  describe("getAll", () => {
    test("executing => should return a array", () => {
      const allTasks = Task.getAll();

      expect(allTasks).toEqual(expect.arrayContaining([]));
    });

    test("executing after creating multiple Tasks => should return a array with all those Tasks", () => {
      const tasks = [
        Task.create(new Task("subject-01", "description-01")),
        Task.create(new Task("subject-02", "description-02")),
      ];

      const allTasks = Task.getAll();

      expect(allTasks).toEqual(
        expect.arrayContaining([
          ...tasks.map((t) => expect.objectContaining({ _id: t._id })),
        ])
      );
    });
  });

  describe("getById", () => {
    test("sending valid Task id => should return that Task", () => {
      const task = Task.create(new Task("subject", "description"));

      const taskGetted = Task.getById(task._id);

      expect(taskGetted._id).toBe(task._id);
      expect(taskGetted.subject).toBe(task.subject);
      expect(taskGetted.description).toBe(task.description);
    });

    test("sending a invalid Task id => should return null", () => {
      const task = Task.getById("invalid-id");
      expect(task).toBeNull();
    });
  });

  describe("update", () => {
    test("sending a valid Task id and valid fields => should return that Task with its fields updated", () => {
      const task = Task.create(new Task("subject", "description"));
      const newFields = {
        subject: "updated subject",
        description: "updated description",
      };
      const taskUpdated = Task.update(task._id, newFields);

      expect(taskUpdated._id).toBe(task._id);
      expect(taskUpdated.subject).toBe(newFields.subject);
      expect(taskUpdated.description).toBe(newFields.description);
    });

    test("sending a valid Task id and invalid fields => should throw error", () => {
      const task = Task.create(new Task("subject", "description"));
      expect(() => {
        const taskUpdated = Task.update(task._id, {
          subject: "s",
          description: "d",
        });
      }).toThrow(Error);
    });

    test("sending a valid Task id and no fields => should return that Task with no changes", () => {
      const task = Task.create(new Task("subject", "description"));
      const taskUpdated = Task.update(task._id);

      expect(taskUpdated._id).toBe(task._id);
      expect(taskUpdated.subject).toBe(task.subject);
      expect(taskUpdated.description).toBe(task.description);
    });

    test("sending a invalid Task id => should return null", () => {
      const task = Task.update("invalid-id", {
        subject: "subject",
        description: "description",
      });

      expect(task).toBeNull();
    });
  });

  describe("remove", () => {
    test("sending a valid Task id => should return that Task", () => {
      const task = Task.create(new Task("subject", "description"));
      const taskRemoved = Task.remove(task._id);

      expect(taskRemoved._id).toBe(task._id);
      expect(taskRemoved.subject).toBe(task.subject);
      expect(taskRemoved.description).toBe(task.description);
    });

    test("sending a invalid Task id => should return null", () => {
      const taskRemoved = Task.remove("invalid-id");

      expect(taskRemoved).toBeNull();
    });
  });
});
