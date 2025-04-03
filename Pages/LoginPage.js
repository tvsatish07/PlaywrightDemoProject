const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")
const properties = PropertiesReader('./config/uiLocators.properties');
class LoginPage{
    
    constructor(page)
    {
        this.page = page;
        this.people = page.locator(properties.get('people'))
        this.text = page.locator(properties.get('peopletext'));
        this.signIn = page.locator('a').getByText('Sign in');
        this.username = page.locator(properties.get('usernameTextBox'));
        this.password = page.locator(properties.get('passwordTextBox'));
        this.LoginButton = page.locator(properties.get('submitButton'));
        this.wrongpassword = page.locator(properties.get('passworderror'));
    }

    async navigate(){
        const baseurl = process.env.LINKEDIN_URL
        await this.page.goto(baseurl);
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        this.page.on('dialogue', dialogue => dialogue.dismiss())

    }

    async loginTest(userName,wrngPassword,passWord){
        if(this.people){
            await this.people.click();
            console.log("value is: "+this.text);
            expect(await this.text.textContent()).toContain("co-worker");
        }
        await this.page.pause();
        await this.signIn.click();
        await this.username.fill(userName);
        await this.password.fill(wrngPassword);
        await this.LoginButton.click();
        expect(await this.wrongpassword).toBeVisible();
        await this.password.fill(passWord);
        await this.LoginButton.click();
     
    }
}
module.exports = {LoginPage};