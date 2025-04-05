const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json");
const properties = PropertiesReader('./config/uiLocators.properties');

class HomePage {
    constructor(page){
        this.page = page;
        this.jobLink = page.locator(properties.get('globalJobSearch'));
        this.globalJobLink = page.locator(properties.get('jobsearch'));
        this.skillsInputBox = page.locator(properties.get('skillsKeyword'));
        this.skillsResults = page.locator(properties.get('skillsResults'));
        this.searchResultsHeaderBlock = page.locator(properties.get('searchResultsHeader'));
        this.searchResultsText = page.locator(properties.get('searchResultsCountText'));
        this.searchResultsSec = page.locator(properties.get('searchResultsSection'));
        this.totalResultsOne = page.locator(properties.get('searchTotalResults'));
    }

    async searchJobs(){
        await this.jobLink.filter({has: this.page.locator("a[href*='jobs']")}).click();
        // await this.jobLink.click();
        await this.skillsInputBox.fill(testdata.skills);
        await this.skillsResults.waitFor({ state: 'visible' })
        const firstResult = this.skillsResults.first();
        await firstResult.click();
        await this.searchResultsText.waitFor();
        // await this.page.keyboard.press("Enter");
        await this.searchResultsHeaderBlock.waitFor();
            
        try {
            await this.searchResultsHeaderBlock.waitFor();
            if(this.searchResultsText.isVisible()){
                const resultContentText = await this.searchResultsText.textContent();
                const resultText = resultContentText.trim().split(" ")
                console.log("total results count is: "+resultText[0]);
            }
            
        } catch {
            console.log("No jobs found");            
        }
        await this.searchResultsSec.waitFor();
        await this.page.pause();
        const count1 = await this.totalResultsOne.count();
        for(let i = 0; i< count1; i++){
            const companyjob = this.totalResultsOne.nth(i);
            await companyjob.click();
            await this.page.waitForTimeout(500);
        }
        // await this.searchResultsSec.evaluate((el) =>{
        //     el.scrollTop = el.scrollHeight;

        // })
        // await this.searchResultsSec.evaluate(() => {
        //     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        // })
        await this.page.pause();

    }



    
}
module.exports = {HomePage}
