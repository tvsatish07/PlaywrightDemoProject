async function findSmartLocator(page, selectors) {
    for (const sel of selectors) {
      const el = page.locator(sel);
      if (await el.count()) return el;
    }
    throw new Error('No working selector found');
  }
  