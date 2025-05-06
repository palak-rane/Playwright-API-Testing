const { test, expect } = require("@playwright/test");
import { stringFormat } from "../utils/common";
const bookingAPIRequestBody = require("../test-data/post_dynamic_request_body.json");
test("Get api request using Playwright", async ({ request }) => {
  const dynamicRequestBody = stringFormat(
    JSON.stringify(bookingAPIRequestBody),
    "Playwright API testing",
    "Selenium Web testing",
    "Microsoft",
  );
  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(dynamicRequestBody),
  });

  //Validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  const postAPIResponseBody = await postAPIResponse.json();
  const bId = postAPIResponseBody.bookingid;

  //validate json repsonse
  expect(postAPIResponseBody.booking).toHaveProperty(
    "firstname",
    "Playwright API testing",
  );
  expect(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    "Selenium Web testing",
  );

  //validate nested json response
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01",
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01",
  );

  const getAPIResponse = await request.get(`/booking/${bId}`);

  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
});
