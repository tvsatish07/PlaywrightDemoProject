const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")
const properties = PropertiesReader('./config/advUILocators.properties');
const {RegisterPage} = require('./RegisterPage');

class ADLoginPage{
    constructor(page)
    {
        this.page = page;
        this.RegisterPage = new RegisterPage(page);
        this.userProfileIcon = page.locator(properties.get("userProfileIcon"));
        this.username = page.locator(properties.get('username'));
        this.password = page.locator(properties.get('password'));
    
    }

    async loginWithNewUser(userName){
        const passWord = process.env.PASSWORD;
        await this.RegisterPage.navigate();
        await this.userProfileIcon.click();
        await this.username.click();
        await this.username.fill(userName);
        console.log(userName);
        await this.password.click();
        await this.password.fill(passWord);
        console.log(passWord);
        const submitButton = this.page.getByRole('button', {name: 'SIGN IN'})
        await submitButton.click();
        await this.page.pause();

    }
}
module.exports = {ADLoginPage}