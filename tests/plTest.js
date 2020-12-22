module.exports={
    '@disabled': true,
    '@tags':'pl',
    'Sign IN and open book'(browser){
        const username='plsr_teacher2@mailinator.com';
        const password='Perfection1';

        const signInButtonSelector='.accessible-btn-warning';
        const usernameSelector='#username';
        const passwordSelector='#password';
        const nextButtonSelector='button[type="submit"]';
        const loaderSelector='#appLoader';
        const rowBookSelector='.rowStyle-container';
        const EnglishArtsBookSelector = 'div[series-id="English Language Arts"]';
        const modalSelector = '#example-collapse-text';
        const interactiveDropDown = 'option[value="interactive"]';

        browser
        .url('https://qa1.perfectionlearning.com/auth/main')
        .click(signInButtonSelector)
        .setValue(usernameSelector,username)
        .click(nextButtonSelector)
        .waitForElementVisible(passwordSelector,2000)
        .setValue(passwordSelector,password)
        .click(nextButtonSelector)
        .waitForElementVisible(loaderSelector,100000)
        .waitForElementVisible(rowBookSelector,100000)
        .click(EnglishArtsBookSelector)
        .waitForElementVisible(modalSelector,10000)
        .click(interactiveDropDown)
        .saveScreenshot('screenshot/pl_login.png')
    },

    'open classes from toogle-menu'(browser){
        const toogleMenuSelector = '.ant-toggle-menu-button';
        const classesSelector = 'button[name="classes"]';
        const classesTitles = '.tilesContainer';

        browser
        .click(toogleMenuSelector)
        .click(classesSelector)
        .waitForElementVisible(classesTitles,10000)
        .saveScreenshot('screenshot/pl_classes.png')
    }
}