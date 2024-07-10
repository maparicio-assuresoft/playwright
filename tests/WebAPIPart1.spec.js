//More info about API
//https://www.youtube.com/watch?v=bdHeDZPrYec

const {test, expect, request} = require('@playwright/test');

const loginPayload =  {userEmail:"marioapariciodesarrollo@gmail.com",userPassword:"Udemyclass1$"};
let token;

const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload
    } );

    expect((loginResponse).ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();

    token = loginResponseJSON.token;
    console.log(token);

    //
    apiContext.post('')


});

//test.beforeEach(()=>{}); //Se ejecuta antes de cada Test

test('API example', async ({page})=>
{

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

        
    await page.goto("https://rahulshettyacademy.com/client");            
    await page.locator('.card-body b').last().waitFor(); 

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    
});


//Verify if order created is showing in history page

test('API example 2', async ({page})=>
    {
    
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, token);
    
            
        await page.goto("https://rahulshettyacademy.com/client");            
        await page.locator('.card-body b').last().waitFor(); 
    
        const titles = await page.locator('.card-body b').allTextContents();
        console.log(titles);
        
    });