//const {test, expect} = require('@playwright/test');
import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({page})=>
{

    //getByLabel
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").click();  //radiobutton label
    await page.getByLabel("Employed").check(); 

    await page.getByLabel("Password").fill('asdasd'); 

    //Drop down
    await page.getByLabel("Gender").selectOption("Female");

    //getPlaceholder
    await page.getByPlaceholder("Password").fill('asaaaaaaaaaaaaaadasd'); 
    
    await page.getByRole('button',{name:'Submit'}).click();


    await page.getByText('Success! The Form has been submitted successfully!.');

    await page.getByRole('link',{name:'Shop'}).click();

    await page.locator('app-card').filter({hasText: 'Nokia Edge' }).getByRole('button',{name: 'Add'}).click();


    await page.pause();
    

})


///How handle calendars

test('Calendar Validations', async ({page})=>
{

    const monthNumber = "6";
    const day = "15";
    const year = "2027";

    const expectedList = [monthNumber,day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();

    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+ day+"']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let i=0; i<inputs.length; i++)
    {
        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
    }





});


//validate if an element is hidden
test('hidden Validations', async ({page})=>
    {
    
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.goto("https://google.com");
        await page.goBack(); //forwdard()
    
        await expect(page.locator('#displayed-text')).toBeVisible();
        await page.locator('#hide-textbox').click();
    
        await expect(page.locator('#displayed-text')).toBeHidden();
        
    });
//validate if an element is hidden
test('Popup Validations', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    ////javascript popups
    await page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    
    await page.pause();
    //hover
    await page.locator('#mousehover').hover();
});



test('iFrame Automation', async ({page})=>
    {
    
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
        const iFramePage = page.frameLocator('#courses-iframe');
        await iFramePage.locator("li a[href*='lifetime-access']:visible").click();

        const message = await iFramePage.locator('.text h2').textContent();

        console.log(message.split(" ")[1]);

    });



test('iFrame Automation2', async ({page})=>
{

    await page.goto('https://www.carwale.com/');
    await page.getByRole('img', { name: 'Maruti Suzuki Fronx' }).first().click();
    await page.locator('div:nth-child(2) > .o-bdccbU > div > div > div:nth-child(2) > .o-bXKmQE').click();
    await page.getByRole('button', { name: 'Close Popup' }).click();


});