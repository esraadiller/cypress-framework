import { url, login_username, login_password } from '../../config'
import Navbar from '../page-objects/components/navbar'
import LoginPage from '../page-objects/pages/loginpage'

describe('Login Failed Test', () => { 

    before(function(){
        cy.visit(url)
        Navbar.clickSignIn()
    })
    it('should try to login with invalid credentials', () => {
        LoginPage.login('invalid username', 'invalid password')
        LoginPage.displayErrorMessage()
       

    })
    // it('should display error message', () => {
    // })

 })

 describe('Login Success Test', () => { 
    before(function(){
        cy.visit(url)
        Navbar.clickSignIn()
    })
    it('should login into application', () => {
        LoginPage.login(login_username, login_password)

    })

  })