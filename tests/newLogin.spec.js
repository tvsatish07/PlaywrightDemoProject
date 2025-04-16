const {test, expect} = require('@playwright/test');
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");
const data = require('../Utils/testData');
testdata.advUsername = data.testData.generateUsername();
testdata.advEmail = data.testData.generateEmail();
let page;
let context;
let poManager;

test('@wrong Login with wrong credentials', async({page}) =>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage()
    await login.navigate();
    await login.loginTestFail(testdata.username,testdata.wrngPassword);
})

test('@correct Login with correct credentials', async({page}) =>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage()
    await login.navigate();
    await login.loginTestPass(testdata.username,testdata.password);
})

test.beforeAll('user creates new user for advantage shopping portal', async ({browser}) => {
    const baseurl = process.env.ADVANTAGEDEMO
    context = await browser.newContext();
    page = await context.newPage();
    page.on('dialogue', dialogue => dialogue.dismiss())
    poManager = new POManager(page);
    await page.goto(baseurl);
    await page.setViewportSize({ width: 1920, height: 1080 });
    const register = poManager.getRegisterPage();
    // const userName = data.testData.generateUsername();
    // const emailID = data.testData.generateEmail();
    await register.newUserRegistration(testdata.advUsername,testdata.advEmail);
})

test('@regression user should able to login with newly created account', async ({page}) => {
    const poManager = new POManager(page);
    const login = poManager.getADLoginPage();
    await login.loginWithNewUser(testdata.advUsername);
})