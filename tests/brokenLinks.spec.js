const { test, expect } = require('@playwright/test');

test('Check for broken links', async ({ page, baseURL }) => {
    await page.goto(baseURL); // Replace with your target website

    // Get all links on the page
    const links = await page.locator('a').evaluateAll((anchors) =>
        anchors.map((a) => a.href) // Extract href values
    );

    console.log(`Total links found: ${links.length}`);

    let brokenLinks = [];

    for (const link of links) {
        if (!link.startsWith('http')) continue; // Skip invalid URLs (like #, mailto, etc.)

        try {
            const response = await page.request.get(link); // Fetch the link
            if (response.status() >= 400) { // Check for broken status (404, 500, etc.)
                console.log(`Broken Link: ${link} (Status: ${response.status()})`);
                brokenLinks.push({ link, status: response.status() });
            } else {
                console.log(`Working Link: ${link} (Status: ${response.status()})`);
            }
        } catch (error) {
            console.log(`Error fetching: ${link}`);
        }
    }

    console.log(`Total broken links: ${brokenLinks.length}`);
    expect(brokenLinks.length).toBe(0); // Fails test if any broken links exist
});
