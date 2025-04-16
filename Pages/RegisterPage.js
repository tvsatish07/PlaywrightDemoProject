const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")
const properties = PropertiesReader('./config/advUILocators.properties');

class RegisterPage{
    constructor(page)
    {
        this.page = page;
        this.userProfileIcon = page.locator(properties.get("userProfileIcon"));
        this.createAccount = page.getByRole('link', {name: 'CREATE NEW ACCOUNT'});
        this.usrLabel = page.locator(properties.get('userNameLabelField'));
        this.username = page.getByLabel('Username');
        this.email = page.locator(properties.get('emailLabelField'));
        this.password = page.locator(properties.get('passwordLabelField'));
        this.confirmPassword = page.locator(properties.get('confirmPasswordLabelField'));
        this.firstName = page.locator(properties.get('firstNameLabelField'))
        this.lastName = page.locator(properties.get('lastNameLabelField'))
        this.phoneNumber = page.locator(properties.get('phoneNumberLabelField'))
        this.countryDropdown = page.locator(properties.get('countrydropdown'))
        this.city = page.locator(properties.get('cityLabelField'))
        this.adress = page.locator(properties.get('addressLabelField'))
        this.state = page.locator(properties.get('stateLabelField'))
        this.postCode = page.locator(properties.get('postalCodeLabelField'))
        this.allowOffersCheckbox = page.locator(properties.get('allowOffersCheckbox'));
        this.agreeCheckbox = page.locator(properties.get('iAgreeCheckbox'));
    }
    async navigate(){
        const baseurl = process.env.ADVANTAGEDEMO
        await this.page.goto(baseurl);
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        this.page.on('dialogue', dialogue => dialogue.dismiss())

    }
    async newUserRegistration(userName, emailID){
        this.navigate();
        const passWord = process.env.PASSWORD;
        await this.userProfileIcon.click()
        await this.createAccount.filter({visible: true}).click();
        await this.usrLabel.click();
        await this.usrLabel.fill(userName);
        await this.email.click();
        await this.email.fill(emailID);
        await this.password.click();
        await this.password.fill(passWord);
        await this.confirmPassword.click();
        await this.confirmPassword.fill(passWord);
        await this.firstName.click();
        await this.firstName.fill('shivaji');
        await this.lastName.click();
        await this.lastName.fill('maharaj');
        await this.phoneNumber.click();
        await this.phoneNumber.fill('8688696102');
        await this.countryDropdown.selectOption({label: 'India'});
        await this.city.click();
        await this.city.fill('Vizag');
        await this.adress.click();
        await this.adress.fill('green fields');
        await this.state.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200); 
        await this.state.fill('Andhra');
        await this.postCode.click();
        await this.postCode.fill('530016');
        await this.agreeCheckbox.check();
        const registerButton = this.page.getByRole('button', {name: 'REGISTER'});
        await registerButton.click();
    }

    async getRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
      }
    
}
module.exports = {RegisterPage};