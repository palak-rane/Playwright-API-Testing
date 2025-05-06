const{test,expect }= require('@playwright/test');
import{faker} from '@faker-js/faker';
const {DateTime} = require ('luxon');

test("Post api request using dynamic request body", async({request})=>{
   
   const firstName= faker.person.firstName();
   const lastName = faker.person.lastName();
   const totalPrice = faker.number.int(1000);

   const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
   const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd'); 


    const postAPIResponse = await request.post('/booking',{
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
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
   expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName);
   expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName)

   //validate nested json response
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", checkInDate);
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate)
})

