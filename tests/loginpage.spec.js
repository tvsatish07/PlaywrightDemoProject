const {test, expect} = require("@playwright/test");
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")


test.skip('Login page with properties file', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const properties = PropertiesReader('./config/config.properties');
    // console.log("Properties file contents:", properties.path()); 
    const baseURL = properties.get('BASEURL');
    console.log("Base URL:", baseURL);
    await page.goto(baseURL);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.pause();
    await page.getByLabel('Username');

})

test('@json Login with json', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // console.log("Properties file contents:", properties.path()); 
    const baseURL = testdata.baseURL;
    console.log("Base URL from json file:", baseURL);
    await page.goto(baseURL);
    await page.setViewportSize({ width: 1920, height: 1080 });
    page.on('dialogue', dialogue => dialogue.dismiss())
    const title = await page.title();
    console.log("Title is: "+title)
    const people = page.locator('a[href$=basic_guest_nav_menu_people]')
    if(people){
        await people.waitFor();
        await people.click();
        const text = await page.locator('h1[class~=main-title]').textContent();
        console.log("value is: "+text);
        expect(text).toContain("co-worker");
    }
    await page.locator('a').getByText('Sign in').click();
    await page.getByRole('button', {name: 'Sign in'}).click();
    await page.keyboard.press();
    
})