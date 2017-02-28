beforeEach(function () {
    browser.get('http://localhost:8000');
});

describe('test app', function () {

    const nameInput = element(by.model('main.proxy'));
    const greeting = element(by.binding('main.greeting'));
    const modalButton = element(by.buttonText('done'));
    const speechBox = element(by.css('.card'));
    const textInput = element(by.model('main.options.text'));
    const resetButton = element(by.buttonText('reset'));
    const rateSlider = element(by.model('main.options.rate'));
    const pitchSlider = element(by.model('main.options.pitch'));
    const volumeSlider = element(by.model('main.options.volume'));

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Test');
    });

    describe('modal box', function () {
        it('input should exist', function () {
            expect(nameInput.isPresent()).toBe(true);
        });

        it('should set name and disappear on enter', function () {
            nameInput.sendKeys('Joe');
            nameInput.sendKeys(protractor.Key.ENTER);

            expect(nameInput.isDisplayed()).toBe(false);
        });

        it('should set name and disappear on button click', function () {
            nameInput.sendKeys('Barry');
            modalButton.click();

            expect(nameInput.isDisplayed()).toBe(false);
        });
    });

    describe('greeting', function () {
        it('should not be visible', function () {
            expect(greeting.isPresent()).toBeFalsy();
        });

        it('should show after name is set in modal on enter', function () {
            nameInput.sendKeys('Jessica');
            nameInput.sendKeys(protractor.Key.ENTER);

            expect(greeting.isDisplayed()).toBeTruthy();
            expect(greeting.getText()).toEqual('Welcome Jessica!');
        });

        it('should show after name is set in modal on button click', function () {
            nameInput.sendKeys('Moana');
            modalButton.click();

            expect(greeting.isDisplayed()).toBeTruthy();
            expect(greeting.getText()).toEqual('Welcome Moana!');
        });
    });

    describe('Speech Box', function () {
        it('should show after name is entered in modal', function () {
            nameInput.sendKeys('Blake');
            nameInput.sendKeys(protractor.Key.ENTER);

            expect(speechBox.isDisplayed()).toBeTruthy();
        });

        it('should reset values when clicked', function () {
            nameInput.sendKeys('Foo');
            nameInput.sendKeys(protractor.Key.ENTER);
            browser.actions().dragAndDrop(rateSlider, { x: 50, y: 0 }).perform();
            browser.actions().dragAndDrop(pitchSlider, { x: 30, y: 0 }).perform();
            browser.actions().dragAndDrop(volumeSlider, { x: 20, y: 0 }).perform();

            resetButton.click();
            expect(textInput.getAttribute('value')).toBe('');
            expect(rateSlider.getAttribute('value')).toBe('1');
            expect(pitchSlider.getAttribute('value')).toBe('1');
            expect(volumeSlider.getAttribute('value')).toBe('1');
        });
    });
});

