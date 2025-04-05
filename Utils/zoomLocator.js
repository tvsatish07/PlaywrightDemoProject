async function adjustZoomUntilVisible(page, locator, zoomStep = 0.1, maxZoom = 2.0, minZoom = 0.5) {
    let zoomLevel = 1.0; // Default zoom (100%)

    while (!(await locator.isVisible())) {
        zoomLevel += zoomStep; // Increase zoom level
        
        if (zoomLevel > maxZoom) { 
            console.log("🔴 Element still not visible after max zoom-in. Trying zoom-out...");
            zoomLevel = 1.0; // Reset to default
            break;
        }

        await page.evaluate((zoom) => {
            document.body.style.zoom = zoom; // Apply zoom
        }, zoomLevel);

        await page.waitForTimeout(500); // Wait for UI to adjust
    }

    // Try zooming out if zoom-in failed
    if (!(await locator.isVisible())) {
        zoomLevel = 1.0; // Reset zoom level before zooming out
        while (!(await locator.isVisible()) && zoomLevel >= minZoom) {
            zoomLevel -= zoomStep; // Decrease zoom level
            
            await page.evaluate((zoom) => {
                document.body.style.zoom = zoom; // Apply zoom
            }, zoomLevel);

            await page.waitForTimeout(500);
        }
    }

    if (await locator.isVisible()) {
        console.log(`Element is visible at zoom level: ${zoomLevel}`);
    } else {
        console.log("❌ Element is still not visible after adjusting zoom.");
    }
}
