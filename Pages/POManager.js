const {LoginPage} = require('./LoginPage');
const {HomePage} = require('./HomePage');
const {RegisterPage} = require('./RegisterPage');
const {ADLoginPage} = require('./ADLoginPage');
const {AdvHomePage} = require('./AdvHomePage');

class POManager
{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homepage = new HomePage(this.page);
        this.registerPage = new RegisterPage(this.page);
        this.adloginpage = new ADLoginPage(this.page);
        this.advHomePage = new AdvHomePage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getHomePage(){
        return this.homepage;
    }
    getRegisterPage(){
        return this.registerPage;
    }
    getADLoginPage(){
        return this.adloginpage;
    }
    getAdvHomePage(){
        return this.advHomePage;
    }
}
module.exports = {POManager};