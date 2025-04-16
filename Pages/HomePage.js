const {test, expect} = require('@playwright/test');
import PropertiesReader from 'properties-reader'
const testdata = require("../Utils/worlds.json");
const properties = PropertiesReader('./config/uiLocators.properties');

class HomePage {
    constructor(page){
        this.context = page.context();
        this.page = page;
        this.jobLink = page.locator(properties.get('globalJobSearch'));
        this.globalJobLink = page.locator(properties.get('jobsearch'));
        this.skillsInputBox = page.locator(properties.get('skillsKeyword'));
        this.skillsResults = page.locator(properties.get('skillsResults'));
        this.searchResultsHeaderBlock = page.locator(properties.get('searchResultsHeader'));
        this.searchResultsText = page.locator(properties.get('searchResultsCountText'));
        this.searchResultsSec = page.locator(properties.get('searchResultsSection'));
        this.totalResultsOne = page.locator(properties.get('searchTotalResults'));
        this.phoneNumberTextBox = page.locator(properties.get('phoneNumberTextBox'));
        this.emailSelect = page.getByLabel('Email address');
        this.countrySelect = page.getByLabel('Phone country code');
        this.popupNextButton = page.getByRole('button', {name: 'Next'});
        // this.uploadButton = this.page.getByRole('button', {name: 'Upload resume'});
        this.uploadButton = page.locator('.jobs-document-upload__upload-button + input');
        this.resumeToggle = page.locator('label[id*=jobsDocumentCardToggleLabel]');
        this.seleniumExperienceTextBox = page.locator('label:has-text("with Selenium Testing?")');

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
        const count1 = await this.totalResultsOne.count();
        for(let i = 0; i< count1; i++){
            const companyjob = this.totalResultsOne.nth(i);
            await companyjob.click();
            const easyApply = this.page.getByRole('button', { name: 'Easy Apply' });
            if(easyApply.isVisible()){
                easyApply.click();
            }
            
            await this.page.pause();
            while(this.popupNextButton.isVisible()){

                await this.emailSelect.selectOption('shivaji.m1630@gmail.com');
                await this.countrySelect.waitFor({ state: 'visible', timeout: 10000 });
                // await countrySelect.selectOption('India (+91)');
                await this.countrySelect.selectOption({ label: 'India (+91)' });
                if(await this.phoneNumberTextBox.isVisible()){
                    await this.phoneNumberTextBox.fill('8688696102')
                }
                await this.popupNextButton.click();     
                await this.uploadButton.setInputFiles('./Files/Upload_File.pdf');
                // if(!(this.resumeToggle.isChecked())){
                //     await this.resumeToggle.check();
                // }
                await this.popupNextButton.click();
                await this.seleniumExperienceTextBox.fill('2');
            }
            await this.page.pause();
            // if(easyApply.isVisible()){
            //     const [newPage] = await Promise.all([
            //         this.context.waitForEvent('page'),
            //         easyApply.click()
            //     ]);
                        
            //     const emailSelect = newPage.getByLabel('Email address');
            //     const countrySelect = newPage.getByLabel('Phone country code');
            //     const popupNextButton = newPage.getByRole('button', {name: 'Next'});
            //     const phoneNumberTextBox = newPage.locator(properties.get('phoneNumberTextBox'));
            //     await newPage.waitForLoadState();
            //     console.log(await newPage.title());
            //     while(popupNextButton.isVisible()){
            //         if(emailSelect.isVisible()){
            //             await emailSelect.selectOption('shivaji.m1630@gmail.com');
            //         }
            //         if(countrySelect.isVisible()){
            //             await countrySelect.selectOption('India (+91)');
            //         }
            //         if(phoneNumberTextBox.isVisible()){
            //             await phoneNumberTextBox.fill('8688696102')
            //         }
            //         popupNextButton.click();

            //     }
            //     await this.page.pause();
            // }
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
