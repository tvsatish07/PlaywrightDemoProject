import { test, expect } from '@playwright/test';

test('Zoom in until element is visible', async ({ page }) => {
    await page.goto('https://example.com'); // Replace with your URL
    const locator = page.locator('#myElement'); // Replace with your element

    let zoomLevel = 1.0; // Default zoom (100%)

    while (!(await locator.isVisible()) && zoomLevel <= 2.0) { 
        zoomLevel += 0.1; // Increase zoom level
        await page.evaluate((zoom) => {
            document.body.style.zoom = zoom; // Apply zoom
        }, zoomLevel);
        await page.waitForTimeout(500); // Wait for UI to adjust
    }

    // Check if element is now visible
    await expect(locator).toBeVisible();
});
