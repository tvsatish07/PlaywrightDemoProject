const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json")
const properties = PropertiesReader('./config/advUILocators.properties');
const itemsMap = new Map();
class AdvHomePage{
    constructor(page){
        this.page = page;
        this.productsLabel = page.locator(properties.get('productsLabel'));
        this.productName = page.locator(properties.get('productName'));
        this.productPrice = page.locator(properties.get('productPrice'));
        this.categoryTitle = page.locator(properties.get('categoryTitle'));
        this.itemName = page.locator(properties.get('itemName'));
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
        for(let i=0; i<productCounts.length; i++){
            await this.productName.nth(i).hover();
            await this.productsLabel.nth(i).click();
            const text = await this.categoryTitle.textContent();
            console.log("Selected Category Name is: "+text);
            // const items = await this.itemName.all();
            
            const items = await this.page.locator('.categoryRight > ul > li:visible').all();
            await this.page.waitForLoadState('domcontentloaded');
            for(const item of items){
                try{
                    const name = await item.locator('.productName').textContent();
                    const priceText = await item.locator('.productPrice').textContent();
                    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                    if (name && !isNaN(price)) {
                        itemsMap.set(name.trim(), price);
                    }
                } catch (e) {
                    console.warn(`Skipping item due to error: ${e.message}`);
                    continue;
                }
            }
            await this.page.locator('a').filter({hasText: 'HOME'}).click();
            await this.productName.nth(1).waitFor();
            
        }
        for (const [name, price] of itemsMap.entries()){
            if(price >1000){
            console.log(` item: ${name}, price: ${price}`);
            }
        }

    }
}
module.exports = {AdvHomePage}