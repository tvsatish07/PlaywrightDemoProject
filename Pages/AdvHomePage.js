const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")
const properties = PropertiesReader('./config/advUILocators.properties');
class AdvHomePage{
    constructor(page){
        this.page = page;
        this.productsLabel = page.locator(properties.get('productsLabel'));
        this.productName = page.locator(properties.get('productName'));
        this.productPrice = page.locator(properties.get('productPrice'));
        this.categoryTitle = page.locator(properties.get('categoryTitle'));
    }

    async navigate(){
        const baseurl = process.env.ADVANTAGEDEMO
        await this.page.goto(baseurl);
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        this.page.on('dialogue', dialogue => dialogue.dismiss())

    }

    async getAllProductPrices(){
        await this.navigate();
        // await this.page.pause();
        await this.productsLabel.nth(1).waitFor();
        const productCounts = await this.productsLabel.all();
        console.log("All products: "+productCounts.length)
        for(let i=0; i<productCounts.length; i++){
            await this.productName.nth(i).hover();
            await this.productsLabel.nth(i).click();
            const text = await this.categoryTitle.textContent();
            console.log("Selected Category Name is: "+text);
            await this.page.locator('a').filter({hasText: 'HOME'}).click();
            await this.productName.nth(1).waitFor();
        }

    }
}
module.exports = {AdvHomePage}