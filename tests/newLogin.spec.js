const {test, expect} = require('@playwright/test');
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");

test('Login with pageObjects', async({page}) =>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage()
    await login.navigate();
    await login.loginTest(testdata.username,testdata.wrngPassword, testdata.password);
})