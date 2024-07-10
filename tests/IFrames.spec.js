const {test, expect} = require('@playwright/test');

test('iFrame Automation', async ({page})=>
    {
    
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
        const iFramePage = page.frameLocator('#courses-iframe');
        await iFramePage.locator("li a[href*='lifetime-access']:visible").click();

        const message = await iFramePage.locator('.text h2').textContent();

        console.log(message.split(" ")[1]);

    });

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('iFrame Automation2', async ({page})=>
{

    await page.goto('https://www.carwale.com/');
    await page.getByRole('img', { name: 'Maruti Suzuki Fronx' }).first().click();

    const sectionVideos =  page.locator("div[data-sectionhash='videos']");
    await sectionVideos.scrollIntoViewIfNeeded();

    await page.locator("div[data-sectionhash='videos']").first().waitFor();

    const eachVideo = sectionVideos.locator("div[data-swipeable='true']");
    await eachVideo.locator('img[alt="youtube-icon"]').nth(1).click();

    const iFramePage =  page.frameLocator("iframe[class*='o-bfyaNx']");
    const boton = iFramePage.locator('button[class="ytp-play-button ytp-button"]');

    await boton.waitFor();
    await boton.click();
    await delay(1000);
    await boton.click();

    //////////////////////

    const spanCurrentTime = iFramePage.locator('span[class="ytp-time-current"]');
    let currentTime =  await spanCurrentTime.textContent();
    let secs = Number(currentTime.split(":")[1]);
    console.log('segs+ '+secs);

    while(secs<=10){
        console.log('segundos: '+ secs);
        let time= await spanCurrentTime.textContent()
        secs = Number(time.split(":")[1]);
    }

    const closeButton = page.locator('span[role="button"][aria-label="Close Popup"]');
    await closeButton.nth(2).click();
  

    const carWaleLogo = page.locator('a[title="CarWale"] img');
    const carTitle = page.locator('h1[data-lang-id="car_overview_heading"]');
    await carTitle.scrollIntoViewIfNeeded();

    await carWaleLogo.waitFor();
    carWaleLogo.click();



    await expect(page).toHaveURL('https://www.carwale.com/');
    
});


    