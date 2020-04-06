const escapeXpathString = (str) => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

// is exist using selector
const isExist = async (page, selector) => {
  let response;
  await page
    .waitFor(1500)
    .then(async () => {
      const el = await page.$x(selector);
      if (el.length > 0) {
        response = true;
      } else {
        response = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

// click by xpath
const clickByXPath = async (page, selector) => {
  let response = await isExist(page, selector);
  if (!response) {
    console.log(selector + " Element tidak ditemukan.");
    return;
  } else {
    await page
      .waitFor(700)
      .then(async () => {
        const el = await page.$x(selector);
        if (el.length > 0) {
          el[0].click();
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getTextByXPath = async (page, selector) => {
  let response = await isExist(page, selector);
  if (!response) {
    console.log(selector + " Element tidak ditemukan.");
    return;
  } else {
    const [elementHandle] = await page.$x(selector);
    const propertyHandle = await elementHandle.getProperty("innerHTML");
    const propertyValue = await propertyHandle.jsonValue();
    response = propertyValue;
    return response;
  }
};

// click by tag
const clickByTag = async (page, text, tag) => {
  await page.waitFor(700);
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(
    `//${tag}[contains(text(), ${escapedText})]`
  );
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

// click by property
const clickByProperty = async (page, text, property) => {
  await page.waitFor(700);
  try {
    await page.click("[" + property + '="' + text + '"]');
    return;
  } catch (error) {
    return error;
  }
};

// input by property
const inputByProperty = async (page, text, property, input) => {
  await page.waitFor(700);
  try {
    await page.type("[" + property + '="' + text + '"]', input);
    return;
  } catch (error) {
    return error;
  }
};

// get text using selector
const getText = async (page, selector) => {
  try {
    await page.waitFor(3000);
    const [elementHandle] = await page.$x(selector);
    const propertyHandle = await elementHandle.getProperty("innerHTML");
    const propertyValue = await propertyHandle.jsonValue();
    return propertyValue;
  } catch (error) {
    return error;
  }
};

module.exports = {
  isExist: isExist,
  clickByXPath: clickByXPath,
  getTextByXPath: getTextByXPath,
  getText: getText,
  clickByProperty: clickByProperty,
  clickByTag: clickByTag,
  inputByProperty: inputByProperty,
};
