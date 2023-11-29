
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function() {
    cy.get('form').within(() => {
        cy.get('#firstName').type('Filipe')
        cy.get('#lastName').type('Aguiar')
        cy.get('#email').type('filipe@hotmail.com')
        cy.get('#open-text-area').type('lorem ipsum')
        cy.get('.button[type="submit"]').click()
    })                      
})