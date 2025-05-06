const { test, expect } = require("@playwright/test");
const bookingAPIRequestBody = require("../test-Data/post_request_body.json");
test("Post api request using static json file", async ({ request }) => {
  const postAPIResponse = await request.post("/booking", {
    data: bookingAPIRequestBody,
  });

  //Validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  const postAPIResponseBody = await postAPIResponse.json();

  //validate json repsonse
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Playwright");
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", "API Testing");

  //validate nested json response
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01",
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01",
  );
});
