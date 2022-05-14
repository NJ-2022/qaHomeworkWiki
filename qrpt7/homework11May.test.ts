import {Builder, By, Capabilities, until, WebDriver, WebElement, Key} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {
    beforeEach(async () => {
        await driver.get("https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html");
    });
    afterAll(async () => {
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */
        //open bernice
        await driver.findElement(bernice).click();
        await driver.wait(until.elementIsVisible(await driver.findElement(bernice)));
        //clearing the field
        await driver.findElement(nameInput).clear();
        //edit the name
        await driver.findElement(nameInput).sendKeys("Test Name");
        // find phillip
        await driver.findElement(phillip).click();
        await driver.wait(until.elementTextContains(await driver.findElement(phillip),"Phillip"));
        //open bernice
        await driver.findElement(bernice).click();
        await driver.wait(until.elementTextContains(await driver.findElement(bernice),"Bernice"));
        //verify the name is same
        expect(await (await driver.findElement(nameInput)).getAttribute("value")).toBe("Bernice Ortiz");
        });

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            //click on philip
            await driver.findElement(phillip).click();
            await driver.wait(until.elementIsVisible(await driver.findElement(phillip)));
            //clear the field
            await driver.findElement(nameInput).clear();
            //change the name
            await driver.findElement(nameInput).sendKeys("Test Name");
            //click cancel button
            await driver.findElement(cancelButton).click();
            //Verify the name field is the original name
            expect(await (await driver.findElement(nameInput)).getAttribute("value")).toBe("Phillip Weaver");
        });

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            //click on bernice
            await driver.findElement(bernice).click();
            await driver.wait(until.elementIsVisible(await driver.findElement(bernice)));
            // clear the field
            await driver.findElement(nameInput).clear();
            // edit the name field
            await driver.findElement(nameInput).sendKeys("Test Name");
            // click on save
            await driver.findElement(saveButton).click();
            // click on philip
            await driver.findElement(phillip).click();
            await driver.wait(until.elementTextContains(await driver.findElement(phillip),"Phillip"));
            //click on bernice
            await driver.findElement(bernice).click();
            // Verify the name field is the edited one
            expect(await (await driver.findElement(nameInput)).getAttribute("value")).toBe("Test Name");
    });
});

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            // click on bernice
            await driver.findElement(bernice).click();
            await driver.wait(until.elementIsVisible(await driver.findElement(bernice)));
            //clear the field
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            //save the change
            await driver.findElement(saveButton).click();
            //find the error card
            await driver.wait(until.elementLocated(errorCard));
            // Verify the error is present
            expect(await (await driver.findElement(errorCard)).getText()).toBe("The name field must be between 1 and 30 characters long.");
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            //open bernice
            await driver.findElement(bernice).click();
            await driver.wait(until.elementIsVisible(await driver.findElement(bernice)));
            //clear the field
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            //save the changes
            await driver.findElement(saveButton).click();
            //locate the error card
            await driver.wait(until.elementLocated(errorCard));
            //verify the error is present
            expect(await (await driver.findElement(errorCard)).getText()).toBe("The name field must be between 1 and 30 characters long.");
            await driver.findElement(nameInput).sendKeys(Key.SPACE);
            await driver.findElement(cancelButton).click();
            driver.wait(() => true, 500);
            // verify the error is gone and the length should be 0
            expect(await driver.findElements(errorCard)).toHaveLength(0);
        });
    });
});