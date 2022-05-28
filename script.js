const puppeteer = require("puppeteer");
const json = require("./info.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: [
      "--start-maximized",
      "--disable-notifications",
      "--disable-infobars",
    ],
  });

  const page = await browser.newPage();

  const { xl } = {
    lg: {
      width: 1920,
      height: 1080,
    },
    xl: {
      width: 2560,
      height: 1440,
    },
  };

  await page.setViewport(xl);

  await page.goto("https://www.instagram.com/accounts/login");

  // login credentials
  await page.type("input[name='username']", json.username);
  await page.type("input[name='password']", json.password);
  await page.keyboard.press("Enter");

  await page.waitForNavigation();

  // person to send message to
  await page.goto(`https://www.instagram.com/${json.receiver}`);

  await page.keyboard.press("Tab");

  await page.keyboard.press("Enter");

  await page.waitForNavigation();

  await page.click("textarea");

  // message to send
  await page.keyboard.type(json.message);

  await page.keyboard.press("Enter");

  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
})();

/*

  * Changing Bio -- '/accounts/edit'
  
  await page.goto("https://www.instagram.com/accounts/edit/");

  await page.waitForSelector("#pepBio");
  await page.type("#pepBio", `Hello World`);

  ? Jank way to reach the submit button: (7T) // [type='button'] = pfp button & [type='submit'] = DNE
  ! Can't find selector for textarea | no class / id / type
  await page.evaluate(() => {
	document.getElementByTagName("textarea").item(0).value = "Hello World";
  })


  await page.keyboard.press("Enter");

*/
