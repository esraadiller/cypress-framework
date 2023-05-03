export default class Navbar {
static clickOnLogo() {
    cy.get('.brand').click()
}
static search(text) {
    cy.get('#searchTerm').type(`${text} {enter}`)
}
static clickSignIn() {
    cy.get('#signin_button').click()
}

}