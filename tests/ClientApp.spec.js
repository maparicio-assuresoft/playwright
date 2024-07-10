    //https://rahulshettyacademy.com/client
    //marioapariciodesarrollo@gmail.com
    //Udemyclass1$

    
    const {test, expect} = require('@playwright/test');

    test.skip('Client App Login', async ({browser})=>
        {
            const context = await browser.newContext();
            const page = await context.newPage();            
            await page.goto("https://rahulshettyacademy.com/client");            
            
     
            const userEmail= page.locator('#userEmail');
            const password = page.locator("#userPassword");
            const btnLoging = page.locator('#login');           
    
            
            await userEmail.fill("marioapariciodesarrollo@gmail.com");  
            await password.fill('Udemyclass1$');
            await btnLoging.click();

            //console.log(await page.locator('.card-body b').first().textContent()); 

            //Para indicarle que queremos esperar hasta que todas las llamadas de red se hayan completado:
            //await page.waitForLoadState('networkidle');

            //Otra opcion mejor es esperar que el locator se haya cargado
            await page.locator('.card-body b').last().waitFor(); //.first tambien


            const titles = await page.locator('.card-body b').allTextContents();
            console.log(titles);
           
        });


    test('Client App ', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/client");
        //1: Nos logueamos en la pagina
        const userEmail= page.locator('#userEmail');
        const password = page.locator("#userPassword");
        const btnLoging = page.locator('#login');

        const loginEmail = 'marioapariciodesarrollo@gmail.com'
        
        await userEmail.fill(loginEmail);  
        await password.fill('Udemyclass1$');
        await btnLoging.click();

        //2: Una vez logueados seleccionamos un item: ADIDAS ORIGINAL y lo adicionamos al carro de compras
        await page.locator('.card-body b').last().waitFor();     
        const products = page.locator(".card-body");
        const count = await products.count();
        const expectedProduct = "ADIDAS ORIGINAL";
        for(let i=0; i < count; i++)
        {
            if (await products.nth(i).locator("b").textContent() === expectedProduct)
            {
                //Add to cart
                await products.nth(i).locator("text=Add To Cart").click();
                break;
            } 
        }
        await page.locator("[routerlink='/dashboard/cart']").click();

        //3: Verificamos que el producto seleccionado aparezca en el Cart
        await page.locator("div li").last().waitFor();
        //IsVisible no es controlado por el autoWait de Playwright (ver documentacio) Por eso necesitamos añadir una espera para garantizar que los elementos hayan cargado
        const productExists = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible(); //Podemos buscar un elemento en base a su texto y tag
        expect(productExists).toBeTruthy();
        await page.locator("text=Checkout").click();

        //4: Una vez que le dimos Checout debemos rellenar los datos del formulario
        await page.getByRole('combobox').first().selectOption('03');
        await page.getByRole('combobox').last().selectOption('03');
        await page.locator('input[type="text"]').nth(1).fill('123')
        await page.locator('input[type="text"]').nth(2).fill('Aparicio');

        await page.locator('input[name="coupon"]').fill('123456')

        //En este caso el Dropdown de pais se va filtrando en funcion a lo tecleado, para simular eso se usa pressSequentially
        await page.locator("[placeholder*='Country']").pressSequentially('ind');
        //await page.locator("[placeholder*='Country']").pressSequentially('bol', { delay: 500 });//Si queremos un delay

        const dropdownResults = page.locator('.ta-results');
        await dropdownResults.waitFor();

        const resultsCount = await dropdownResults.locator('button').count()
        const expectedCountry = ' India';
        //Nota en este caso India tiene un espacio, deberiamos usar: text.trim();
        for(let i=0 ; i<resultsCount; i++)
        {
            const text = await dropdownResults.locator("button.ta-item").nth(i).textContent()
            if(text === expectedCountry)
            {
                await dropdownResults.locator("button.ta-item").nth(i).click();
                break;
            }
        }

        await expect(page.locator('.user__name [type="text"]').first()).toHaveText(loginEmail);
        await page.locator('.action__submit').click();
        
        //5: Una vez realizado el Checkout verificamos que la orden se haya completado
        await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

        const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
        console.log(orderID);

        //********************************************************************************************************************/
        //6: TAREA -  guargar el OrderId - Dar click e orders y buscar el order ID en la tabla de ordenes, una vez ubicado
        //Dar click en el boton View de la fila correspondiente
        //********************************************************************************************************************/
        //**********ESTO ES LO QUE YO HICE ---  FUNCIONA PERO VOYA INCLUIR LO QUE HIZO EL TEACHER */
        //********************************************************************************************************************/
            await page.locator("[routerlink='/dashboard/myorders']").first().click();
            
            await page.locator("tr.ng-star-inserted").first().waitFor();
            const ordersTableRows = page.locator("tr.ng-star-inserted");
            const rowsCount = await ordersTableRows.count();
    
           //El orderID tiene un valor de este tipo: | 66876794ae2afd4c0b17d72b | , necesitamos eliminar pipes y espacios
           const expectedOrderId = orderID.split(" ")[2];
           console.log('expected: '+expectedOrderId);
            for(let i=0 ; i<rowsCount; i++)
            {
                if(expectedOrderId === await page.locator("tr.ng-star-inserted").nth(i).locator("th[scope='row']").textContent())
                {
                    await page.locator("tr.ng-star-inserted").nth(i).locator('button.btn-primary').click();
                    break;
                }
            }
        //********************************************************************************************************************/
        //********* LO QUE HIZO EL TEACHER: */
        // //********************************************************************************************************************/
        // await page.locator("button[routerlink*='myorders']").click();
        // await page.locator("tbody").waitFor();
        // const rows = await page.locator("tbody tr");
      
      
        // for (let i = 0; i < await rows.count(); ++i) {
        //    const rowOrderId = await rows.nth(i).locator("th").textContent();
        //    if (orderID.includes(rowOrderId)) {
        //       await rows.nth(i).locator("button").first().click();
        //       break;
        //    }
        // }
        // const orderIdDetails = await page.locator(".col-text").textContent();
        // console.log('orderIdDetails: '+orderIdDetails);
        // console.log('orderId: '+orderID);
        // expect(orderID.includes(orderIdDetails)).toBeTruthy();

        //********************************************************************************************************************/



    })        