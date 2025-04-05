const {test, expect} = require('@playwright/test');
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");

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