export default class LoginPage {
    static login(username, password) {
        cy.login(username, passwoerd)
    }

    static clickForgotPasswordLink() {
        cy.contains('Forgot your password?').click()
    }

    static displayErrorMessage() {
        cy.isVisible('.alert-error')
    }
}