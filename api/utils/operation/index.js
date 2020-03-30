const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

// is exist using selector
exports.isExist = async selector => {
  await page
    .waitForSelector(selector, {
      visible: true
    })
    .then(response => {
      console.log(selector + "exist");
      return true;
    })
    .catch(error => {
      console.log(selector + " doesn't exist");
      return false;
    });
};

// click by tag
exports.clickByTag = async (page, text, tag) => {
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
exports.clickByProperty = async (page, text, property) => {
  await page.waitFor(700);
  try {
    await page.click("[" + property + '="' + text + '"]');
    return;
  } catch (error) {
    return error;
  }
};

// input by property
exports.inputByProperty = async (page, text, property, input) => {
  await page.waitFor(700);
  try {
    await page.type("[" + property + '="' + text + '"]', input);
    return;
  } catch (error) {
    return error;
  }
};

// get text using selector
exports.getText = async (page, selector) => {
  try {
    await page.waitFor(1500);
    const [elementHandle] = await page.$x(selector);
    const propertyHandle = await elementHandle.getProperty("innerHTML");
    const propertyValue = await propertyHandle.jsonValue();
    return propertyValue;
  } catch (error) {
    return error;
  }
};
