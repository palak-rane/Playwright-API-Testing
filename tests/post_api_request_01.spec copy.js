const{test,expect }= require('@playwright/test');
test("Post api request using static request body", async({request})=>{
   
    const postAPIResponse = await request.post('/booking',{
        data:{
            "firstname": "Playwright",
            "lastname": "API Testing",
            "totalprice": 1110,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    //Validate status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
   const postAPIResponseBody = await postAPIResponse.json();
   console.log(postAPIResponseBody);

   //validate json repsonse
   expect(postAPIResponseBody.booking).toHaveProperty("firstname","Playwright");
   expect(postAPIResponseBody.booking).toHaveProperty("lastname", "API Testing")

   //validate nested json response
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
})

