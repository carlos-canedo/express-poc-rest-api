const request = require("supertest");
const app = require("../../app");

describe("POST /v1/tasks", () => {
  test("sending request with both valid fields => should return status code 201 and the Task object", async () => {
    const fields = {
      subject: "subject",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);

    expect(response.status).toBe(201);

    expect(response.body._id).toBeDefined();
    expect(response.body.subject).toBe(fields.subject);
    expect(response.body.description).toBe(fields.description);
  });

  test("sending request without fields => should return status code 400", async () => {
    const response = await request(app).post("/v1/tasks").send();
    expect(response.status).toBe(400);
  });

  test("sending request with a invalid field => should return status code 400", async () => {
    const fields = {
      subject: "s",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);
    expect(response.status).toBe(400);
  });
});

describe("GET /v1/tasks", () => {
  test("sending request => should return status code 200 and a array", async () => {
    const response = await request(app).get("/v1/tasks").send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  test("sending request after creating multiple Tasks => should return status code 200 and a array with all those Tasks objects", async () => {
    const fields = [
      {
        subject: "subject-01",
        description: "description-01",
      },
      {
        subject: "subject-02",
        description: "description-02",
      },
    ];
    const tasks = [];

    for (let i = 0; i < fields.length; i++) {
      const response = await request(app).post("/v1/tasks").send(fields[i]);
      tasks.push(response.body);
    }

    const secondResponse = await request(app).get("/v1/tasks").send();
    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body).toEqual(expect.arrayContaining([...tasks]));
  });
});

describe("GET /v1/tasks/:id", () => {
  test("sending request with valid Task id => should return status code 200 and the Task object", async () => {
    const fields = {
      subject: "subject",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);

    const secondResponse = await request(app)
      .get(`/v1/tasks/${response.body._id}`)
      .send();

    expect(secondResponse.status).toBe(200);
    expect(response.body).toEqual(secondResponse.body);
  });

  test("sending request with invalid Task id => should return status code 404", async () => {
    const response = await request(app).get("/v1/tasks/invalid-id").send({});

    expect(response.status).toBe(404);
  });
});

describe("PUT /v1/tasks/:id", () => {
  test("sending request with valid Task id and valid fields => should return status code 200 and the Task object", async () => {
    const fields = {
      subject: "subject",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);

    const newFields = {
      subject: "updated subject",
      description: "updated description",
    };
    const secondResponse = await request(app)
      .put(`/v1/tasks/${response.body._id}`)
      .send(newFields);

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.subject).toBe(newFields.subject);
    expect(secondResponse.body.description).toBe(newFields.description);
  });

  test("sending request with valid Task id and invalid fields => should return status code 400", async () => {
    const fields = {
      subject: "subject",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);

    const newFields = {
      subject: "s",
      description: "updated description",
    };
    const secondResponse = await request(app)
      .put(`/v1/tasks/${response.body._id}`)
      .send(newFields);

    expect(secondResponse.status).toBe(400);
  });

  test("sending request with invalid Task id without fields => should return status code 400", async () => {
    const response = await request(app).put("/v1/tasks/invalid-id").send();

    expect(response.status).toBe(400);
  });

  test("sending request with invalid Task id and valid fields => should return status code 404", async () => {
    const fields = {
      subject: "updated subject",
      description: "updated description",
    };
    const response = await request(app)
      .put("/v1/tasks/invalid-id")
      .send(fields);

    expect(response.status).toBe(404);
  });

  test("sending request with invalid Task id and invalid fields => should return status code 404", async () => {
    const fields = {
      subject: "s",
      description: "updated description",
    };
    const response = await request(app)
      .put("/v1/tasks/invalid-id")
      .send(fields);

    expect(response.status).toBe(404);
  });
});

describe("DELETE /v1/tasks/:id", () => {
  test("sending request with valid id => should return status code 200 and the Task object", async () => {
    const fields = {
      subject: "subject",
      description: "description",
    };
    const response = await request(app).post("/v1/tasks").send(fields);
    const secondResponse = await request(app).delete(
      `/v1/tasks/${response.body._id}`
    );

    expect(secondResponse.status).toBe(200);
    expect(response.body).toEqual(secondResponse.body);
  });

  test("sending request with invalid id => should return status code 404", async () => {
    const response = await request(app).delete("/v1/tasks/invalid-id").send();

    expect(response.status).toBe(404);
  });
});
