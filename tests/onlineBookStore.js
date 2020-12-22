module.exports= {
    '@disabled': true,
    '@tags':'book',
    'Visit online store'(browser){
        const value = 'engineering';

        const searchBarSelector = '#searchBox';
        const goButtonSelector = '#searchButtonInline';
        const bookSelector = 'li[data-id="9789388080835"]';
        const modalSelector = '.modal-content';
        const bookNameSelector = '.modal-title';
        const closeModalSelector = '.modal-close-button'

        browser
        .url('https://www.indiabookstore.net/')
        .setValue(searchBarSelector,value)
        .click(goButtonSelector)
        .waitForElementPresent(bookSelector,2000)
        .click(bookSelector)
        .waitForElementPresent(modalSelector,1000)
        .assert.containsText(bookNameSelector,'GATE - 2021 - Civil Engineering (34 Years Solution)','should contain text')
        .click(closeModalSelector)
        .saveScreenshot('screenshot/onlineBook.png')

    }
}