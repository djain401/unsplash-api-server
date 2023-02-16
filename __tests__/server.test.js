const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

//200 for the home route /
it("Test the home route", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
});

//404 for a bad route /bad
it("Test the bad route", async () => {
  const response = await request.get("/bad");
  expect(response.status).toBe(404);
});

//404 for a bad method
it("Test for a bad method", async () => {
  const response = await request.post("/");
  expect(response.status).toBe(404);
});

//200 for /randomImage and test if the returned type is an object
it("Test the random image route", async () => {
  const response = await request.get("/randomImage");
  expect(response.status).toBe(200);
  expect(typeof response.body).toBe("object");
});

//500 for '/searchImage' if not title in the query string

it("Test of the /searchImage route for no title in query string", async () => {
  const response = await request.get("/searchImage");
  expect(response.status).toBe(500);
});

//200 for '/searchImage' if title is in the query string
it("Test of the /searchImage route if title is in query string ", async () => {
  const response = await request.get("/searchImage?title=cat");
  expect(response.status).toBe(200);
});
