const {test, expect} = require('@playwright/test');
const exp = require('constants');
const { text } = require('stream/consumers');


test('Browser Context Playwrigth test', async ({browser})=>
{
    //chrome - plugins/cookies
    //Si necesitasemos pasarle al contexto informacion existente sobre proxy, cookies lo podriamos usar inyectandolas al contexto
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
});

test('Page Playwrigth test', async ({page})=>
{
    //Si no definimos un contexto o browser se abrira el browser y pagina por defecto
    await page.goto("https://google.com");

    //get title - Assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

//Si por ejemplo tenemos 50 test y queremos solo ejecutar el 51 que estamos trabajando: test.only
//test.only('Page Playwrigth test', async ({page})=>


///***********LOCATORS********* */

test('Locators Playwrigth test- Wrong User', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        //css, xpath
        //page.locator('#username').type("texto"); //Type method deprecated

        await page.locator('#username').fill("rahulshetty");  //rahulshettyacademy
        await page.locator("[type='password']").fill('learning');
        await page.locator('#signInBtn').click();

        //En este ejemplo, el mensaje de error de la pagina no se muestra instantaneamente, playwrigth es inteligente y espera
        //En otra herramienta como Selenium deberiamos poner algo como wait until this locator show in the page
        console.log(await page.locator("[style*='block']").textContent());  //con el * permitimos que la coincidencia sea parcial el valor completo en este caso es [style='display: block']
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');   
        
    });


test('Locators Playwrigth test- Good User', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();

        const userName = page.locator('#username');
        const password = page.locator("[type='password']");
        const btnLoging = page.locator('#signInBtn');
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    

        
        await userName.fill("rahulshettyacademy");  
        await password.fill('learning');
        await btnLoging.click();

        console.log(await page.locator('.card-body a').first().textContent()); //Obtiene el primero
        console.log(await page.locator('.card-body a').nth(0).textContent()); //Obtine en base a index

        const cardTitles = page.locator('.card-body a');
        const allTitles=await cardTitles.allTextContents();
        //Si comentamos los console de arriba allTextContents() devolvera un array vacio ya que no esperara a que se carguen todos los cards

        console.log(allTitles);
       
    });


////////////////////UI CONTROLS////////////

test('UI CONTROLS', async ({page})=>
    {
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
        
        const userName = page.locator('#username');
        const password = page.locator("[type='password']");
        const btnLoging = page.locator('#signInBtn');

        //********************STATIC DROPDOWN
        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption("consult");
        //await page.pause();

        //********************RADIO BUTTON
        await page.locator(".radiotextsty").last().click();
        //await page.locator(".radiotextsty").nth(1).click(); //otra opcion si tuviesemos mas elementos
        await page.locator("#okayBtn").click();

        //Para verificar que se ha seleccionado la opcion de radio que queremos hacemos una assertion:
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        //Lo podriamos hacer de otra forma sin una assertion:
        console.log(await page.locator(".radiotextsty").last().isChecked());


         //********************CHECKBOX
         await page.locator("#terms").click();
         await expect(page.locator("#terms")).toBeChecked();
         await page.locator("#terms").uncheck();
         //Para hacer una Assertion que el check no esta seleccionado no existe un metodo: .toBeUncecked();
         expect(await page.locator("#terms").isChecked()).toBeFalsy();

         //Porque en unos casos se uso await antes del expect? y en otro caso dentro del os parentesis? Ej:
         //await expect(page.locator(".radiotextsty").last()).toBeChecked();
         //expect(await page.locator("#terms").isChecked()).toBeFalsy();
         //El await se debe incluir en el ambito donde se realizo la accion, caso 1 en los parentesis solo se pasa el Locator, la accion se realiza fuera
         //En el segundo caso fuera de parentesis solo se ve si es true o false, la accion se realiza dentro.... El check


         const documentLink =  page.locator("[href*='documents-request']");
         await expect(documentLink).toHaveAttribute("class","blinkingText");       
    });    



    //////////////////***********HANDLING CHILD WINDOWS************* */
    test('Child Windows Handling', async ({browser})=>
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

            const documentLink =  page.locator("[href*='documents-request']");

            //En el caso que al dar click se abran 2 paginas seria:  const [newPage,newPage2] = await Promise......
            const [newPage] = await Promise.all(
                [
                    context.waitForEvent('page'), //listen for any new page            
                    documentLink.click()
                ]);

            const text = await newPage.locator('.red').textContent();          
            
            //Ahora vamos a sacar el email de texto de la segunda pagina y lo vamos a usar en la primera pagina (login)
            const arrayText = text.split("@");

            const domain = arrayText[1].split(" ")[0];
            console.log('domain'+domain);

           
            await page.locator("#username").fill(domain);
            //await  page.pause();
            console.log(await page.locator("#username").inputValue());


        });  

