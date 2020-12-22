module.exports={
    '@disabled': true,
    '@tags':['google'],
    'Google Advance Search'(browser){
        const query = 'India';
        const queryInpustSelector= 'input[name="as_q"]';
        const dropDownLanguage = '#lr_button'
        const dropDownValue = '.goog-menuitem[value="lang_en"]';
        const lastUpdateDropDown = '#as_qdr_button';
        const lastUpdateValue = '.goog-menuitem[value="w"]'
        const submitButton = '.jfk-button[type="submit"]'
        const resultPageQuerySelector = '#searchform input[name="q"]'
        const resultPageLanguageSelector = '[aria-label="Search English pages"]';
        const resultPageLastUpdateSelector = '[aria-label="Past week"]';
        
        browser
        .url('https://www.google.com/advanced_search')
        .setValue(queryInpustSelector,query)
        .click(dropDownLanguage)
        .click(dropDownValue)
        .click(lastUpdateDropDown)
        .click(lastUpdateValue)
        .click(submitButton)
        .assert.urlContains('as_q=India','Query is India')
        .assert.elementPresent(resultPageQuerySelector,'UI: element should visible')
        .assert.containsText(resultPageLanguageSelector,'Search English pages','UI:contains Language should visible')
        .assert.containsText(resultPageLastUpdateSelector,'Past week','UI:contains past week should visible')
        .saveScreenshot('screenshot/google.png')

    }
}