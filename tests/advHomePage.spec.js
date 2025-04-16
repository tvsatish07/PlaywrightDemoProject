const {test, expect} = require('@playwright/test');
const {POManager} = require('../Pages/POManager');
const testdata = require("../Utils/worlds.json");
const data = require('../Utils/testData');

test('@regression user gets the total products in the portal', async({page}) =>{
    const poManager = new POManager(page);
    const home = poManager.getAdvHomePage();
    // const userName = data.testData.generateUsername();
    // const emailID = data.testData.generateEmail();
    await home.getAllProductPrices();
})