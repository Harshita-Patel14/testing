const screen = 'body';
const book = 'div#pageContainer7';
const username = 'vickym@mitrmedia.com';
const password = 'Perfection1';
module.exports = {
    //Update True if test is to be skipped, else false
    '@disabled': false,
    'GAME TEST': function (browser) {
        //----------  start of function definition -------------------------------------    
        //function to click a element and validate if another element present as expected
        // selector : selector of the element to be clicked.
        // validateSelector  : selector of the element to be validated.
        // name : screenshot file name
        // pause: true/false depending on pause required or not. 
        function validate({ browser, selector, validateSelector , name = '' }) {
            if (name !== '') {
                browser
                    .perform(() => saveScreenshots({ browser, name, selector: screen }))
            }
            browser
                .waitForElementVisible(`${selector}`, 120000)
                .click(`${selector}`)
                .pause(5000)
                .waitForElementVisible(`${validateSelector}`, 120000)
        }
        //function to enter value to specified input field
        // selector : selector of the input field to be clicked.
        //value : value to be entered.
        // name : screenshot file name
        function setValue({ browser, selector, value, name }) {
            browser
                .pause(2000)
                .waitForElementVisible(`${selector}`, 120000)
                .setValue(selector, value)
                .pause(9000)
                .verify.screenshotIdenticalToBaseline(screen, name)
        }

        //function to perform annotation
        // selector : selector to be clicked.
        // book  :  selector of which screenshot has to be taken.
        // x1,y1 :  Coordinates for mouse down.
        // x2,y2 :  Coordinates for releasing mouse click.
        // name : screenshot file name
        function performAnnotation({ browser, selector, book, x1, y1, x2 = x1, y2 = y1, name }) {
            browser
                .waitForElementVisible(selector, 12000)
                .click(selector)
                .pause(100)
                .moveToElement(book, x1, y1)
                .pause(100)
                .mouseButtonDown(0)
                .pause(100)
                .moveToElement(book, x2, y2)
                .pause(100)
                .mouseButtonUp(0)
                .pause(9000)
                .verify.screenshotIdenticalToBaseline(screen, name)
        }
        //---------- end of function definition -------------------------------------   
        //------ test starts from below ---------------- 
        browser
            .windowMaximize()
            //Load link
            .url('http://qa2.perfectionnext.com/')
            // Clicks Sign-in and username page loads
            .waitForElementVisible('.btn.accessible-btn-warning', 120000)
            .verify.screenshotIdenticalToBaseline(screen, 'Sign-in Page')
            .perform(() => validate({ browser, selector: '.btn.accessible-btn-warning', validateSelector: '#username' }))
            // Setting value to username input field
            .perform(() => setValue({ browser, selector: '#username', value: username,  name: 'Username' }))
            // Clicks Next and password page loads.
            .perform(() => validate({ browser, selector: '.btn.pull-right', validateSelector: '#password' }))
            // Setting value to password input field    
            .perform(() => setValue({ browser, selector: '#password', value: password, name: 'Password' }))
            // Clicks Next and cards load 
            .perform(() => validate({ browser, selector: '.btn.pull-right', validateSelector: 'div.hambuger-menu' }))
            .pause(40000)
            .perform(() => validate({ browser, selector: 'div.card[series-id="Connections Writing & Language"]', validateSelector: 'div.searchStyle select[dropdown-type="resource"]' }))
            .perform(() => validate({ browser, selector: 'div.searchStyle select[dropdown-type="resource"]', validateSelector: 'div.searchStyle select [value="interactive"]' }))
            .perform(() => validate({ browser, selector: 'div.searchStyle select [value="interactive"]', validateSelector: 'div.books .product-box:nth-child(8)' }))
            .perform(() => validate({ browser, selector: 'div.books .product-box:nth-child(8)', validateSelector: 'div.single-tile-body-text' }))
            .perform(() => validate({ browser, selector: 'div.single-tile-body-text', validateSelector: screen }))
            //book opened
            .frame('assmentAppFrame')
            .frame('webviewer-1')
            .waitForElementVisible('div.ribbons [data-element="toolbarGroup-Annotate"]', 120000)
            .waitForElementVisible(book, 120000)
            .verify.screenshotIdenticalToBaseline(screen, 'Book-loaded')
            // Perform Annotation Highlight
            .perform(() => performAnnotation({ browser, selector: 'div.ribbons [data-element="toolbarGroup-Annotate"]', book, x1: 54, y1: 38, x2: 276, y2: 38, name: 'Highlighted' }))
            // Underline 
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="underlineToolGroupButton"]', book, x1: 50, y1: 56, x2: 80, y2: 73, name: 'Underlined' }))
            // Striked out
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="strikeoutToolGroupButton"]', book, x1: 53, y1: 90, x2: 170, y2: 110, name: 'Strike-off' }))
            // squigglyToolGroupButton
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="squigglyToolGroupButton"]', book, x1: 54, y1: 177, x2: 292, y2: 300, name: 'SquigglyTool' }))
            // stickyToolGroupButton
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="stickyToolGroupButton"]', book, x1: 240, y1: 171, name: 'Sticky Tool' }))
            .pause(2000)
            .keys('Read the note  ')
            .waitForElementVisible(`div.save-button`, 120000)
            .click('div.save-button')
            .verify.screenshotIdenticalToBaseline(screen, 'Note Added')
            .click('Button.hide-in-small-mobile.ActionButton')
            .pause(2000)
            //freeTextToolGroupButton
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="freeTextToolGroupButton"]', book, x1: 312, y1: 23, name: 'Add Text' }))
            .pause(5000)
            .keys('Read the sentence   ')
            .click('div.tool-group-buttons-scroll [data-element="freeTextToolGroupButton"]')
            .verify.screenshotIdenticalToBaseline(screen, 'Text added')
            // draw rectangle
            .perform(() => performAnnotation({ browser, selector: 'div.tool-group-buttons-scroll [data-element="shapeToolGroupButton"]', book, x1: 301, y1: 250, x2: 343, y2: 277, name: 'Rectangle' }))
            //erase
            .perform(() => performAnnotation({ browser, selector: '[data-element="eraserToolButton"]', book, x1: 301, y1: 250, x2: 343, y2: 277, name: 'Erased' }))
            //click view
            .perform(() => validate({ browser, selector: 'div.ribbons [data-element="toolbarGroup-View"]', validateSelector: book }))
            .pause(2000)
            .verify.screenshotIdenticalToBaseline(screen, 'Book-loaded')
            //selected and deleted all the edits
            .perform(() => performAnnotation({ browser, selector: '[data-element="selectToolButton"]', book, x1: 30, y1: 25, x2: 357, y2: 455, name: 'Screen-Selected' }))
            .keys(browser.Keys.DELETE)
            .pause(5000)
            .verify.screenshotIdenticalToBaseline(screen, 'Annotation-removed')
    }
}
