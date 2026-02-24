import { expect } from '@playwright/test';

export default class lingo {
  constructor(page) {
    this.page = page;
    // language banner locators
    this.langBanner = page.locator('.language-banner');
    this.bannerText_IN = page.locator('//a[@daa-ll="in|Continue"]');
    this.langBannerContinueLink = this.langBanner.locator("//a[contains(@class, 'language-banner-link') and text()='Visit India site']");
    this.bannerCloseBtn = this.langBanner.locator('.language-banner-close');
    this.langBannerTxt = page.locator('.language-banner-text');
    this.langBannerLink = page.locator('.language-banner-link');

    // language selector locators
    this.langSelector = page.locator('.feds-regionPicker');
    this.searchFeature = this.langSelector.locator('search-input-wrapper');
    this.navPriceLink = page.locator('//a[@daa-ll="Pricing-4"]').first();
    this.languageList = page.locator('#language-selector-listbox .language-name');
    this.langJapan = page.locator('#language-option-10');
    this.langPortugal = page.locator('#language-option-8');

    // Georouting pop locators
    this.georouting = page.locator('.georouting-wrapper fragment');

    // Change Region
    this.regionPicker = page.locator('.feds-regionPicker');
    this.germanLang = page.locator('.language-item').nth(0);
    this.enAustraliaLang = page.locator('.language-item').nth(1);
    this.enIndiaLang = page.locator('.language-item').nth(2);
    this.enUKLang = page.locator('.language-item').nth(3);
    this.enUSLang = page.locator('.language-item').nth(4);
    this.spanishLang = page.locator('.language-item').nth(5);
    this.frenchLang = page.locator('.language-item').nth(6);
    this.italyLang = page.locator('.language-item').nth(7);
    this.portugueseLang = page.locator('.language-item').nth(8);
    this.japanLang = page.locator('.language-item').nth(9);
    this.koreaLang = page.locator('.language-item').nth(10);

    this.searchContainer = page.locator('#language-selector-search');
    this.deutsche = page.locator('.language-item').nth(0);
    this.AU = page.locator('.language-item').nth(1);
    this.IN = page.locator('.language-item').nth(2);
    this.UK = page.locator('.language-item').nth(3);
    this.US = page.locator('.language-item').nth(4);
    this.francias = page.locator('.language-item').nth(5);
    this.italian = page.locator('.language-item').nth(6);
    this.spanish = page.locator('.language-item').nth(7);
    this.portuguese = page.locator('.language-item').nth(8);
    this.jp = page.locator('.language-item').nth(9);
    this.kr = page.locator('.language-item').nth(10);

    // this.languageOptions = page.locator('.language-item');
    // this.noResultMessage = page.locator('.language-item.no-search-result');
    this.searchInput = page.locator('.search-input');
    // this.languageList = page.locator('#language-selector-listbox');
    this.languageOptions = page.locator('.language-item:not(.no-search-result)');
    this.noSearchResultItem = page.locator('.language-item.no-search-result');
    this.noSearchResultText = page.locator('.no-search-result-text');
  }

  /**
   * Extracts text from list items and compares them against an expected array.
   * @param {string} selector - The CSS selector for the list items (e.g., 'ul#myList li')
   * @param {string[]} expectedValues - The array of strings you expect to find.
   */
  async verifyListItems(selector, expectedValues) {
    // 1. Extract the text contents from all matching elements
    const actualValues = await this.page.locator(selector).allTextContents();

    // 2. Clean the data (optional: trim whitespace)
    const cleanedActual = actualValues.map((item) => item.trim());

    // 3. Compare lengths first for a quick fail
    if (cleanedActual.length !== expectedValues.length) {
      throw new Error(`Length mismatch: Expected ${expectedValues.length}, but found ${cleanedActual.length}`);
    }

    // 4. Compare individual values
    const isMatch = cleanedActual.every((val, index) => val === expectedValues[index]);

    if (!isMatch) {
      console.error('Actual:', cleanedActual);
      console.error('Expected:', expectedValues);
      throw new Error('The list items do not match the expected values.');
    }

    return true;
  }

  // Search Scenarios
  async validateRegionSearchScenarios() {
    const languages = [
      { search: 'au', expectedText: ['English (Australia)'] },
      { search: 'in', expectedText: ['English (India)'] },
      { search: 'uk', expectedText: ['English (UK)'] },
      { search: 'us', expectedText: ['English (US)', 'English (Australia)'] },
      { search: 'fr', expectedText: ['Français'] },
      { search: 'it', expectedText: ['Italiano'] },
      { search: 'es', expectedText: ['Español', 'Português', '日本語'] },
      { search: 'pt', expectedText: ['Português'] },
      { search: 'jp', expectedText: ['日本語'] },
      { search: 'kr', expectedText: ['한국인'] },
    ];

    await this.feds.regionpicker.click();
    await expect(this.feds.searchContainer).toBeVisible();

    // ---------- Partial input ----------
    await expect(this.feds.searchContainer).toBeVisible();
    await this.feds.searchContainer.fill('Eng');
    await expect(this.feds.languageOptions).not.toHaveCount(0);
    await this.feds.searchContainer.fill('');

    // ---------- Search by "en" ----------
    await expect(this.feds.searchContainer).toBeVisible();
    await this.feds.searchContainer.fill('en');
    await expect(this.feds.languageOptions).not.toHaveCount(0);
    await this.feds.searchContainer.fill('');

    // ---------- Invalid input ----------
    await expect(this.feds.searchContainer).toBeVisible();
    await this.feds.searchContainer.fill('mx');
    await expect(this.feds.noSearchResultItem).toBeVisible();
    await expect(this.feds.noSearchResultText).toBeVisible();
    await this.feds.searchContainer.fill('');

    // ---------- Special characters ----------
    await expect(this.feds.searchContainer).toBeVisible();
    await this.feds.searchContainer.fill('@#$%');

    await expect(this.feds.noSearchResultItem).toBeVisible();
    await expect(this.feds.noSearchResultText).toBeVisible();
    await this.feds.searchContainer.fill('');

    for (const lang of languages) {
      await this.feds.searchContainer.fill(lang.search);

      await expect(this.feds.languageOptions)
        .not.toHaveCount(0, { timeout: 5000 });

      for (const expected of lang.expectedText) {
        await expect(async () => {
          const texts = (await this.feds.languageOptions.allTextContents())
            .map((t) => t.trim());

          expect(texts).toContain(expected);
        }).toPass({ timeout: 5000 });
      }

      await this.feds.searchContainer.fill('');
    }
  }
}
