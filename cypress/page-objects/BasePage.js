export default class BasePage {
    static pause(ms) {
        cy.wait(ms)
    }

    static logInfo(message) {
        cy.log(message)
    }
}