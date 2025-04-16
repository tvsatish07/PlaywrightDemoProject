const {test, expect} = require('@playwright/test');
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");
const data = require('../Utils/testData');
testdata.advUsername = data.testData.generateUsername();
testdata.advEmail = data.testData.generateEmail();

test('@regression user with correct details', async({page}) =>{
    const poManager = new POManager(page);
    const register = poManager.getRegisterPage();
    // const userName = data.testData.generateUsername();
    // const emailID = data.testData.generateEmail();
    await register.newUserRegistration(testdata.advUsername,testdata.advEmail);
})