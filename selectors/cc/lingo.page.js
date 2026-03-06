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
    this.searchInput = page.locator('.search-input');
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
  async validateRegionSearchScenariosLingo(props) {
   const tags = props.tags || '';
    console.log('Starting Lingo-LanguaguageSelecter Search Validation...');
    const locales = [
      { search: 'de', expectedText: ['Deutsch'] },
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
const languages = [
      { search: 'deutsch', expectedText: ['Deutsch'] },
      { search: 'english (Australia)', expectedText: ['English (Australia)'] },
      { search: 'english (India)', expectedText: ['English (India)'] },
      { search: 'english (UK)', expectedText: ['English (UK)'] },
      { search: 'english (US)', expectedText: ['English (US)' ] },
      { search: 'francais', expectedText: ['Français'] },
      { search: 'italiano', expectedText: ['Italiano'] },
      { search: 'espanol', expectedText: ['Español'] },
      { search: 'portugues', expectedText: ['Português'] },
      { search: 'japanese', expectedText: ['日本語'] },
      { search: 'korean', expectedText: ['한국인'] },
    ];

  const partialInput = [
      {search: 'deu', expectedText: ['Deutsch'] },
      { search: 'tra', expectedText: ['English (Australia)'] },
      { search: 'dia', expectedText: ['English (India)'] },
      { search: 'K', expectedText: ['English (UK)', '한국인'] },
      { search: 'en', expectedText: ['English (US)','English (Australia)','Français', 'English (UK)','English (India)' ] },
      { search: 'Eng', expectedText: ['English (US)','English (Australia)', 'English (UK)','English (India)' ] },
      { search: 'nc', expectedText: ['Français'] },
      { search: 'ita', expectedText: ['Italiano'] },
      { search: 'nol', expectedText: ['Español'] },
      { search: 'tug', expectedText: ['Português'] },
      { search: 'apa', expectedText: ['日本語'] },
      { search: 'kore', expectedText: ['한국인'] },
  ];


    // open the region picker, waiting for it to be present
    await this.page.waitForLoadState('networkidle');
    await expect(this.regionPicker).toBeVisible({ timeout: 6000 });
    await this.regionPicker.click();
    await expect(this.searchContainer).toBeVisible({ timeout: 6000 });


    // -----------Search by locales------------
    if (tags.includes('@search-locales')) {
    for (const loc of locales) {

      await this.searchContainer.fill(loc.search);

      await expect(this.languageOptions)
        .not.toHaveCount(0, { timeout: 5000 });
          for (const expected of loc.expectedText) {
  await expect(async () => {
    const texts = (await this.languageOptions.allTextContents())
      .map((t) => t.trim());

    expect(texts).toContain(expected);
  }).toPass({ timeout: 6000 });
      }
    }
 }

    // ---------- Partial input ----------
     if (tags.includes('@search-partial')) {
    await expect(this.searchContainer).toBeVisible();
    for (const partial of partialInput) {
      await this.searchContainer.fill(partial.search);

      await expect(this.languageOptions)
        .not.toHaveCount(0, { timeout: 5000 });

      for (const expected of partial.expectedText) {
        expect(async () => {
          const texts = (await this.languageOptions.allTextContents())
            .map((t) => t.trim());

           expect(texts).toContain(expected);
           }).toPass({ timeout: 6000 });
        }
          await this.searchContainer.fill('');
      }
   }

    // ---------- Search by "en" ---------
if (tags.includes('@search-en-languages')) {

  const enSearches = partialInput.filter(p =>
    ['en', 'Eng'].includes(p.search)
  );

  for (const data of enSearches) {
    await expect(this.searchContainer).toBeVisible();
    await this.searchContainer.fill(data.search);

    // Wait for at least one result
    await expect(this.languageOptions).not.toHaveCount(0, { timeout: 6000 });

    // Collect all visible language texts
    const allTexts = (await this.languageOptions.allTextContents()).map(t => t.trim());

    // Validate each expected text
    for (const expected of data.expectedText) {
      if (!allTexts.includes(expected)) {
        throw new Error(`Expected "${expected}" not found for search "${data.search}"`);
      }
    }

    // Clear search box for next iteration
    await this.searchContainer.waitFor({ state: 'visible', timeout: 3000 });
    await this.searchContainer.fill('');
  }
}
    // ---------- Invalid input ----------
   if (tags.includes('@search-invalid')) {

   const invalidInputs = ['mx','co', 'ar', 'hello', 'xyz', 'be_fr', '123'];
  await expect(this.searchContainer).toBeVisible();


  for (const input of invalidInputs) {
    await this.searchContainer.fill(input);
    await expect(this.noSearchResultItem)
      .toBeVisible({ timeout: 6000 });

    await expect(this.noSearchResultText)
      .toBeVisible();

    await this.searchContainer.fill('');
  }
}
    // ---------- Special characters ----------
    if (tags.includes('@search-special-characters')) {

  const specialChars = ['@','#', '@#$%', '!!!', '***', '&&&','^', '`'];
  await expect(this.searchContainer).toBeVisible();

  for (const char of specialChars) {
    await this.searchContainer.fill(char);
    await expect(this.languageOptions).toHaveCount(0);

    await expect(this.noSearchResultItem)
      .toBeVisible({ timeout: 6000 });

    await expect(this.noSearchResultText)
      .toBeVisible();

    await this.searchContainer.fill('');
  }
}
    // -----------Search by language names------------
     if (tags.includes('@search-languages')) {

    for (const lang of languages) {
      await this.searchContainer.fill(lang.search);
      await expect(this.languageOptions)
        .not.toHaveCount(0, { timeout: 5000 });

      for (const expected of lang.expectedText) {
        expect(async () => {
          const texts = (await this.languageOptions.allTextContents())
            .map((t) => t.trim());

           expect(texts).toContain(expected);
           }).toPass({ timeout: 6000 });
           }
          await this.searchContainer.fill('');
      }
    }

    //---------------Search Validation and Redirection-------------
if (tags.includes('@search-and-redirection')) {

  const frLocale = locales.find(l => l.search === 'fr');
  if (!frLocale) throw new Error('fr locale not found');
  await this.searchContainer.fill(frLocale.search);
  const result = this.page.getByText(frLocale.expectedText[0]);
  await expect(result).toBeVisible({ timeout: 6000 });
  await result.click();
  await expect(this.page).toHaveURL(/fr/i);
  await this.page.context().clearCookies();
  await this.page.reload();
  await expect(this.langBanner).toBeVisible({ timeout: 10000 });
   }  
 }
}