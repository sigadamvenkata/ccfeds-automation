import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/lingo.spec.js';
import Lingo from '../../selectors/cc/lingo.page.js';

let lingo;
test.describe('Validate lingo functionality', () => {
  test.beforeEach(async ({ page }) => {
    lingo = new Lingo(page);
  });

  // Common utility method reused by all test cases.
  async function gotoAndVerify(page, baseURL, path) {
    console.info(`[Test Page]: ${baseURL}${path}`);
    await page.goto(`${baseURL}${path}`);
    await expect(page).toHaveURL(`${baseURL}${path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10_000);
  }

  test(`${features[0].name},${features[0].tags} [TC-${features[0].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('lingo banner shows in page from country you visiting (IN)', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('lingo banner (IN) shows in page', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      expect(await lingo.langBanner).toBeTruthy();
      expect(await lingo.bannerText_IN).toBeVisible();
      expect(await lingo.langBannerContinueLink).toBeVisible();
      expect(await lingo.bannerCloseBtn).toBeVisible();
    });
  });

  test(`${features[1].name},${features[1].tags} [TC-${features[1].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    await test.step('check if lingo banner closed then its not appear again', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('lingo banner cancle and not show again', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      expect(await lingo.langBanner).toBeTruthy();
      expect(await lingo.bannerText_IN).toBeVisible();
      expect(await lingo.langBannerContinueLink).toBeVisible();
      expect(await lingo.bannerCloseBtn).toBeVisible();
      await lingo.bannerCloseBtn.click();
      await page.waitForTimeout(3000);
      await expect(lingo.bannerText_IN).not.toBeVisible();
      await lingo.navPriceLink.click();
      await page.waitForLoadState();
      await page.waitForTimeout(3000);
      await expect(lingo.bannerText_IN).not.toBeVisible();
      await expect(lingo.langBanner).not.toBeVisible();
    });
  });

  test(`${features[2].name},${features[2].tags} [TC-${features[2].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    await test.step('Accept lingo banner proposel and change to respective country lang', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });
    await test.step('accept lingo locale banner', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      expect(await lingo.langBanner).toBeTruthy();
      expect(await lingo.bannerText_IN).toBeVisible();
      expect(await lingo.langBannerContinueLink).toBeVisible();
      expect(await lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerContinueLink.click();
      await page.waitForTimeout(2000);
      const expectedUrl = features[2].url;
      await expect(page).toHaveURL(expectedUrl);
    });
  });

  test(`${features[3].name},${features[3].tags} [TC-${features[3].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    await test.step('direct lang urls, Ex, UK or NZ then user should be in same language, WPS rule', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });
    await test.step('direct supported lang urls, Ex UK then user should be in same language', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      const expectedUrl = features[3].url;
      await expect(page).toHaveURL(expectedUrl);
    });
  });

  test(`${features[4].name},${features[4].tags} [TC-${features[4].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}`);
    await test.step('Non direct lang url, ex sg and user should be go to US page, WPS rule', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });
    await test.step('Non direct lang url, ex sg and user go to US', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      const expectedUrl = features[4].url;
      console.log('Expected URL:', expectedUrl);
      await expect(page).toHaveURL(expectedUrl);
    });
  });

  test(`${features[5].name},${features[5].tags} [TC-${features[5].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}`);
    await test.step('GEO routing model should not show in lingo site', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });
    await test.step('GEO routing model should not show in lingo site', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
    });
  });

  test(`${features[6].name},${features[6].tags} [TC-${features[6].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}`);
    await test.step('language picker should have 11 languages', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });
    await test.step('language picker 11 language list checking', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      await expect(lingo.langSelector).toBeVisible();
      await lingo.langSelector.click();
      const expected_Languages = [
        'Deutsch', 'English (Australia)', 'English (India)',
        'English (UK)', 'English (US)', 'Español',
        'Français', 'Italiano', 'Português', '日本語', '한국인'];
      const languageItems = await lingo.languageList.allTextContents();
      console.log('Extracted Language Items:', languageItems);
      expect(languageItems).toEqual(expected_Languages);
    });
  });

  test(`${features[7].name},${features[7].tags} [TC-${features[7].tcid}]`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}`);
    await test.step('site should change as per selected language', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });
    await test.step('selected language site should load', async () => {
      await page.waitForLoadState();
      await page.waitForTimeout(10000);
      await expect(lingo.langSelector).toBeVisible();
      await lingo.langSelector.click();
      await lingo.langJapan.click();
      await page.waitForTimeout(2000);
      const expectedUrl = features[7].url;
      await expect(page).toHaveURL(expectedUrl);
    });
  });

  test(`${features[8].name},${features[8].tags} [TC-${features[8].tcid}]`, async ({ page, baseURL }) => {
    await test.step('When I visit a page that matches my region and language', async () => {
      await gotoAndVerify(page, baseURL, features[8].path);
      const expectedUrl = features[8].url;
      await expect(page).toHaveURL(expectedUrl);
      await page.waitForTimeout(10_000);
      await expect(lingo.georouting).toHaveCount(0);
      await expect(lingo.langBanner).toHaveCount(0);
    });
  });

  test(`${features[9].name},${features[9].tags} [TC-${features[9].tcid}]`, async ({ page, baseURL }) => {
    await test.step('When I visit a page from a region different from my language choice', async () => {
      await gotoAndVerify(page, baseURL, features[9].path);
      const expectedUrl = features[9].url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[9].bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();
      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );
      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('de');
      await expect(page).toHaveURL(features[9].bannerLink);
    });
  });

  test(`${features[10].name},${features[10].tags} [TC-${features[10].tcid}]`, async ({ page, baseURL }) => {
    await test.step('When I visit a page, cookies should not be set and the banner should not be displayed', async () => {
      await gotoAndVerify(page, baseURL, features[10].path);
      const expectedUrl = features[10].url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.georouting).toHaveCount(0);
      await expect(lingo.langBanner).toHaveCount(0);
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );
      expect(internationalCookie).toBeUndefined();
    });
  });

  test(`${features[11].name},${features[11].tags} [TC-${features[11].tcid}]`, async ({ page, baseURL }) => {
    await test.step('When I visit a page, the US banner should be displayed', async () => {
      await gotoAndVerify(page, baseURL, features[11].path);
      const expectedUrl = features[11].url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('View this page in English (US).');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[11].bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Continue');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();
      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );
      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('us');
      await expect(page).toHaveURL(features[11].bannerLink);
    });
  });

  // Region Priority CH:1 > DE Banner
  test(`${features[12].name},${features[12].tags} [TC-${features[12].tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the JP and CH locales shows the DE banner, and accepting it redirects to the DE page', async () => {
      await gotoAndVerify(page, baseURL, features[12].path);
      const expectedUrl = features[12].url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[12].bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();
      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );
      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('de');
      await expect(page).toHaveURL(features[12].bannerLink);
    });
  });

  test(`${features[13].name},${features[13].tags} [TC-${features[13].tcid}]`, async ({ page, baseURL }) => {
    await test.step('When I visit a page, the banner should not be displayed', async () => {
      await gotoAndVerify(page, baseURL, features[13].path);
      const expectedUrl = features[13].url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.georouting).toHaveCount(0);
      await expect(lingo.langBanner).toHaveCount(0);
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );
      expect(internationalCookie).toBeUndefined();
    });
  });

  // Region Priority CH:2 > FR Banner
  test(`${features[14].name},${features[14].tags} [TC-${features[14].tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('US and CH locales show the DE banner; selecting FR redirects to the IT page and displays the FR banner', async () => {
      await gotoAndVerify(page, baseURL, features[14].path);
      const expectedUrl = features[14].url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[14].bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();

      await expect(page).toHaveURL(features[14].bannerLink);
      await page.waitForLoadState('domcontentloaded');

      await lingo.regionPicker.click();
      await lingo.frenchLang.click();
      await expect(page).toHaveURL(features[14].changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('fr');
      }).toPass();

      await page.goto(features[14].redirectURL);
      await expect(page).toHaveURL(features[14].redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Afficher cette page en Français.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[14].expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Continuer');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('fr');
      }).toPass();
    });
  });

  // Region Priority CH:3 > IT Banner
  test(`${features[15].name},${features[15].tags} [TC-${features[15].tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('US and CH locales show the DE banner; selecting IT redirects to the DE page and displays the IT banner', async () => {
      await gotoAndVerify(page, baseURL, features[15].path);
      const expectedUrl = features[15].url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[15].bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();

      await expect(page).toHaveURL(features[15].bannerLink);
      await page.waitForLoadState('domcontentloaded');

      await lingo.regionPicker.click();
      await lingo.italyLang.click();
      await expect(page).toHaveURL(features[15].changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('it');
      }).toPass();

      await page.goto(features[15].redirectURL);
      await expect(page).toHaveURL(features[15].redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Visualizza questa pagina in Italiano.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', features[15].expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Continuare');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('it');
      }).toPass();
    });
  });

  const excludedTcids = new Set([192, 193, 225, 239, 253]); // No Banner
  const allowedTcids = new Set([192, 193, 225, 239, 253]); // US Banner

  const noBannerCases = features.filter((feature) => {
    const id = Number(feature.tcid);
    return (
      !Number.isNaN(id)
      && id >= 16
      && id <= 271
      && !excludedTcids.has(id)
    );
  });

  const usBannerCases = features.filter((feature) => {
    const id = Number(feature.tcid);
    return (
      !Number.isNaN(id)
      && allowedTcids.has(id)
    );
  });

  if (!noBannerCases.length && !usBannerCases.length) {
    throw new Error('No test cases selected!');
  }

  const usedDynamicTitles = new Set();
  const buildTitle = (feature) => {
    const tags = Array.isArray(feature.tags)
      ? feature.tags.sort().join(',')
      : feature.tags ?? '';

    return tags
      ? `[TC-${feature.tcid}] ${feature.name},${tags}`
      : `[TC-${feature.tcid}] ${feature.name}`;
  };

  // NO BANNER FOR 404 PAGES
  noBannerCases.forEach((feature) => {
    const title = buildTitle(feature);

    if (usedDynamicTitles.has(title)) {
      throw new Error(`Duplicate dynamic test title detected: ${title}`);
    }
    usedDynamicTitles.add(title);

    test(title, async ({ page, baseURL }) => {
      await test.step(
        'When I visit the content-management page, the lingo banner should not be displayed',
        async () => {
          await gotoAndVerify(page, baseURL, feature.path);
          await expect(page).toHaveURL(feature.url);

          await expect(lingo.georouting).toHaveCount(0);
          await expect(lingo.langBanner).toHaveCount(0);

          const cookies = await page.context().cookies();
          const internationalCookie = cookies.find(
            (cookie) => cookie.name === 'international',
          );

          expect(internationalCookie).toBeUndefined();
        },
      );
    });
  });

  // DISPLAY US BANNER
  usBannerCases.forEach((feature) => {
    const title = buildTitle(feature);

    if (usedDynamicTitles.has(title)) {
      throw new Error(`Duplicate dynamic test title detected: ${title}`);
    }
    usedDynamicTitles.add(title);

    test(title, async ({ page, baseURL }) => {
      await test.step(
        'When I visit the content-management page, the US lingo banner should be displayed',
        async () => {
          const getInternationalCookie = async () => {
            const cookies = await page.context().cookies();
            return cookies.find((cookie) => cookie.name === 'international');
          };

          await gotoAndVerify(page, baseURL, feature.path);
          await expect(page).toHaveURL(feature.url);

          await expect(lingo.langBanner).toBeVisible();
          await expect(lingo.langBannerTxt).toHaveText('View this page in English (US).');
          await expect(lingo.langBannerLink).toHaveAttribute('href', feature.expectedURl);
          await expect(lingo.langBannerLink).toHaveText('Continue');
          await expect(lingo.bannerCloseBtn).toBeVisible();
          await lingo.langBannerLink.click();

          await expect.poll(async () => {
            const cookie = await getInternationalCookie();
            return cookie?.value;
          }).toBe('us');
        },
      );
    });
  });

  // PT Banner
  const feature272 = features.find(f => f.tcid === '272');
  test(`${feature272.name},${feature272.tags} [TC-${feature272.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the IT and PT locales shows the PT banner, and accepting it redirects to the PT page', async () => {
      await gotoAndVerify(page, baseURL, feature272.path);
      const expectedUrl = feature272.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Visualizar esta página em Português.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature272.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Continuar');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('pt');

      await expect(page).toHaveURL(feature272.bannerLink);
    });
  });

  // FR Banner
  const feature273 = features.find(f => f.tcid === '273');
  test(`${feature273.name},${feature273.tags} [TC-${feature273.tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('UK/CA show US banner; selecting FR sets FR cookie and shows FR banner on UK/CA', async () => {
      await gotoAndVerify(page, baseURL, feature273.path);
      const expectedUrl = feature273.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('View this page in English (US).');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature273.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Continue');
      await expect(lingo.bannerCloseBtn).toBeVisible();

      await lingo.regionPicker.click();
      await lingo.frenchLang.click();
      await expect(page).toHaveURL(feature273.changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('fr');
      }).toPass();

      await page.goto(feature273.redirectURL);
      await expect(page).toHaveURL(feature273.redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Afficher cette page en Français.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature273.expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Continuer');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('fr');
      }).toPass();
    });
  });

  // JP Banner
  const feature274 = features.find(f => f.tcid === '274');
  test(`${feature274.name},${feature274.tags} [TC-${feature274.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the IT and JP locales shows the JP banner, and accepting it redirects to the JP page', async () => {
      await gotoAndVerify(page, baseURL, feature274.path);
      const expectedUrl = feature274.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('このページを日本語で表示する .');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature274.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('続く');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('jp');

      await expect(page).toHaveURL(feature274.bannerLink);
    });
  });

  // UK Banner
  const feature275 = features.find(f => f.tcid === '275');
  test(`${feature275.name},${feature275.tags} [TC-${feature275.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the US and GB locales shows the UK banner, and accepting it redirects to the UK page', async () => {
      await gotoAndVerify(page, baseURL, feature275.path);
      const expectedUrl = feature275.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText(' We have a dedicated UK site with specific content and resources.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature275.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Visit UK site');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('uk');

      await expect(page).toHaveURL(feature275.bannerLink);
    });
  });

  // AU Banner
  const feature276 = features.find(f => f.tcid === '276');
  test(`${feature276.name},${feature276.tags} [TC-${feature276.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the US and AU locales shows the AU banner, and accepting it redirects to the AU page', async () => {
      await gotoAndVerify(page, baseURL, feature276.path);
      const expectedUrl = feature276.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText(' We have a dedicated Australia site with specific content and resources.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature276.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Visit Australia site');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('au');

      await expect(page).toHaveURL(feature276.bannerLink);
    });
  });

  // ES Banner
  const feature277 = features.find(f => f.tcid === '277');
  test(`${feature277.name},${feature277.tags} [TC-${feature277.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the US and ES locales shows the ES banner, and accepting it redirects to the ES page', async () => {
      await gotoAndVerify(page, baseURL, feature277.path);
      const expectedUrl = feature277.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Ver esta página en Español.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature277.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Continuar');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('es');

      await expect(page).toHaveURL(feature277.bannerLink);
    });
  });

  // KR Banner
  const feature278 = features.find(f => f.tcid === '278');
  test(`${feature278.name},${feature278.tags} [TC-${feature278.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the US and KR locales shows the KR banner, and accepting it redirects to the KR page', async () => {
      await gotoAndVerify(page, baseURL, feature278.path);
      const expectedUrl = feature278.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('이 페이지를 한국어로 보기 .');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature278.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('계속하기');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('kr');

      await expect(page).toHaveURL(feature278.bannerLink);
    });
  });

   // IT Banner
  const feature279 = features.find(f => f.tcid === '279');
  test(`${feature279.name},${feature279.tags} [TC-${feature279.tcid}]`, async ({ page, baseURL }) => {
    await test.step('Visiting the US and KR locales shows the KR banner, and accepting it redirects to the KR page', async () => {
      await gotoAndVerify(page, baseURL, feature279.path);
      const expectedUrl = feature279.url;
      await expect(page).toHaveURL(expectedUrl);

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Visualizza questa pagina in Italiano.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature279.bannerLink);
      await expect(lingo.langBannerLink).toHaveText('Continuare');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await page.waitForFunction(() => document.cookie.includes('international='));
      const cookies = await page.context().cookies();
      const internationalCookie = cookies.find(
        (cookie) => cookie.name === 'international',
      );

      expect(internationalCookie).toBeDefined();
      expect(internationalCookie?.value).toBe('it');

      await expect(page).toHaveURL(feature279.bannerLink);
    });
  });

  // Region Priority LU:2 > DE Banner (BACOM SCENARIO: 2)
  const feature280 = features.find(f => f.tcid === '280');
  test(`${feature280.name},${feature280.tags} [TC-${feature280.tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('FR and LU locales show the DE banner; selecting DE redirects to the DE page and displays the DE banner', async () => {
      await gotoAndVerify(page, baseURL, feature280.path);
      const expectedUrl = feature280.url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeHidden({ timeout: 10_000 });

      await lingo.regionPicker.click();
      await lingo.germanLang.click();
      await expect(page).toHaveURL(feature280.changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();

      await page.goto(feature280.redirectURL);
      await expect(page).toHaveURL(feature280.redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature280.expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();
    });
  });

  // Region Priority LU:2 > DE Banner (BACOM SCENARIO: 2)
  const feature281 = features.find(f => f.tcid === '281');
  test(`${feature281.name},${feature281.tags} [TC-${feature281.tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('FR and CH locales show the DE banner; selecting DE redirects to the DE page and displays the DE banner', async () => {
      await gotoAndVerify(page, baseURL, feature281.path);
      const expectedUrl = feature281.url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeHidden({ timeout: 10_000 });

      await lingo.regionPicker.click();
      await lingo.germanLang.click();
      await expect(page).toHaveURL(feature281.changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();

      await page.goto(feature281.redirectURL);
      await expect(page).toHaveURL(feature281.redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Diese Seite in Deutsch anzeigen.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature281.expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Weitermachen');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('de');
      }).toPass();
    });
  });

  // ES Banner (BACOM SCENARIO: 4)
  const feature282 = features.find(f => f.tcid === '282');
  test(`${feature282.name},${feature282.tags} [TC-${feature282.tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('FR and ES locales show the ES banner; selecting ES redirects to the ES page and displays the ES banner', async () => {
      await gotoAndVerify(page, baseURL, feature282.path);
      const expectedUrl = feature282.url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeHidden({ timeout: 10_000 });

      await lingo.regionPicker.click();
      await lingo.spanishLang.click();
      await expect(page).toHaveURL(feature282.changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('es');
      }).toPass();

      await page.waitForTimeout(3000);
      await page.goto(feature282.redirectURL);
      await expect(page).toHaveURL(feature282.redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Ver esta página en Español.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature282.expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Continuar');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('es');
      }).toPass();
    });
  });

  // ES Banner (BACOM SCENARIO: 4)
  const feature283 = features.find(f => f.tcid === '283');
  test(`${feature283.name},${feature283.tags} [TC-${feature283.tcid}]`, async ({ page, baseURL }) => {
    const getInternationalCookie = async () => {
      const cookies = await page.context().cookies();
      return cookies.find((cookie) => cookie.name === 'international');
    };

    await test.step('FR and ES locales show the ES banner; selecting ES redirects to the ES page and displays the ES banner', async () => {
      await gotoAndVerify(page, baseURL, feature283.path);
      const expectedUrl = feature283.url;
      await expect(page).toHaveURL(expectedUrl);
      await expect(lingo.langBanner).toBeHidden({ timeout: 10_000 });

      await lingo.regionPicker.click();
      await lingo.spanishLang.click();
      await expect(page).toHaveURL(feature283.changeRegionURL);
      await page.waitForLoadState('domcontentloaded');

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('es');
      }).toPass();

      await page.waitForTimeout(3000);
      await page.goto(feature283.redirectURL);
      await expect(page).toHaveURL(feature283.redirectURL);
      await page.waitForLoadState('networkidle');

      await expect(lingo.langBanner).toBeVisible();
      await expect(lingo.langBannerTxt).toHaveText('Ver esta página en Español.');
      await expect(lingo.langBannerLink).toHaveAttribute('href', feature283.expectedURl);
      await expect(lingo.langBannerLink).toHaveText('Continuar');
      await expect(lingo.bannerCloseBtn).toBeVisible();
      await lingo.langBannerLink.click();

      await expect(async () => {
        const cookie = await getInternationalCookie();
        expect(cookie).toBeDefined();
        expect(cookie?.value).toBe('es');
      }).toPass();
    });
  });
});
