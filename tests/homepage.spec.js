const {test, expect} = require("@playwright/test");
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");

test('Home page with dotenv file', async({browser, baseURL}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // const link = process.env.LINKEDIN_URL || 'default-key';
    const link = baseURL;
    console.log("Base url is: "+link);
    await page.goto(baseURL);
    // await page.setViewportSize({ width: 1920, height: 1080 });
    // await page.getByPlaceholder('Username').fill('Admin');
    // await page.getByPlaceholder('Password').fill('admin123')
    // // await page.keyboard.press('Enter');
    // await page.getByRole('button', {name: 'Login'}).click();
    // await page.pause();
    // const performance = await page.evaluate(() =>{
    //     JSON.stringify(window.performance.getEntriesByType('navigation'));
    // })
    // page.on('console', msg => console.log(msg.text()));
//     // await page.waitForLoadState("networkidle");
//     const viewportSize = page.viewportSize();
//   console.log(viewportSize);
//   await page.pause();
//     await page.close();
    
})

test('@job Search job', async({page}) =>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    const home = poManager.getHomePage();
    await login.navigate();
    await login.loginTestPass(testdata.username,testdata.password);
    await home.searchJobs();
})
