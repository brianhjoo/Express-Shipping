"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {

  // test("valid", async function () {
  //   const resp = await request(app).post("/shipments").send({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(resp.body).toEqual({ shipped: expect.any(Number) });
  // });

  // VALID DATA TEST
  test("data is valid", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        "productId": 1001,
        "name": "testUser",
        "addr": "123 Main St.",
        "zip": "30907"
      });
    // expect(resp.body).toEqual({ ordered: true });
    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  // INVALID DATA TEST
  test("returns JSON error for invalid data", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        "productId": 99,
        "name": "testUser",
        "addr": 222,
        "zip": "30907"
      });
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual(
      {
        "error": {
          "message": [
            "instance.productId must be greater than or equal to 1000",
            "instance.addr is not of a type(s) string"
          ],
          "status": 400
        }
      });
  });

  // EMPTY BODY TEST
  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });


});
