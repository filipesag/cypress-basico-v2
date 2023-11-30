// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {

        beforeEach(() => {
        cy.visit('./src/index.html')   
        })
  
        it('verifica o título da aplicação', function() {
            cy.title().should('eq','Central de Atendimento ao Cliente TAT')
      
        })
        it('preenche os campos obrigatórios e envia o formulário', function() {
            cy.clock()
            cy.get('form').within(() => {
                cy.get('#firstName').type('Filipe')
                cy.get('#lastName').type('Aguiar')
                cy.get('#email').type('filipe@hotmail.com')
                cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',{delay:0})
                cy.get('.button[type="submit"]').click()
            })                      
            cy.get('.success').should('be.visible')     
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')     
        })
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.clock()
            cy.get('form').within(() => {
                cy.get('#firstName').type('Filipe')
                cy.get('#lastName').type('Aguiar')
                cy.get('#email').type('emailNaoValido')
                cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',{delay:0})
                cy.get('.button[type="submit"]').click()
            })                      
            cy.get('.error').find('strong').contains('Valide os campos obrigatórios!')
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })
        it('valida valor não númerico sendo digitado sem exibir tais valores', function() {
            cy.get('#phone').type('testandoComString').should('have.value','')
        })
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            const text = Cypress._.repeat('Lorem ipsum dolor sit amet',12)  
            cy.clock()
            cy.get('form').within(() => {
                cy.get('#firstName').type('Filipe')
                cy.get('#lastName').type('Aguiar')
                cy.get('#email').type('filipe@hotmail.com')
                cy.get('#phone-checkbox').check()
                cy.get('#open-text-area').type(text,{delay:0})
                cy.get('.button[type="submit"]').click()
            })                      
            cy.get('.error').should('be.visible') 
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('form').within(() => {
                cy.get('#firstName').type('Filipe').should('have.value','Filipe').clear().should('have.value','')
                cy.get('#lastName').type('Aguiar').should('have.value','Aguiar').clear().should('have.value','')
                cy.get('#email').type('filipe@hotmail.com').should('have.value','filipe@hotmail.com').clear().should('have.value','')
                cy.get
            })
        })
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
            cy.clock()
            cy.get('.button[type="submit"]').click()
            cy.get('.error').should('be.visible')
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })
        it('envia o formuário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
        })
        it('seleciona um produto (YouTube) por seu texto', function() {
            cy.get('#product').select(4).should('have.value','youtube')
        })
        it('seleciona um produto (Mentoria) por seu valor (value)', function() {
            cy.get('#product').select(3).should('have.value','mentoria')
        })
        it('seleciona um produto (Mentoria) por seu valor (value)', function() {
            cy.get('#product').select(1).should('have.value','blog')
        })
        it('marca o tipo de atendimento "Feedback"', function() {
            cy.get('#support-type').find('[value="feedback"]').check()
        })
        Cypress._.times(5, () => 
        it('marca cada tipo de atendimento', function() {
            cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio) {
                cy.wrap($radio).check().should('be.checked')
            })
        }))

        it('marca ambos checkboxes, depois desmarca o último', function() {
            cy.get('#check input[type="checkbox"]')
            .as('checkboxes')
            .check()
            cy.get('@checkboxes').last().uncheck().should('not.be.checked')
        })
        it('seleciona um arquivo da pasta fixtures', function() {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        })
        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            cy.fixture('example.json').as('fileTransferTest')
            cy.get('#file-upload')
            .selectFile('@fileTransferTest')
            .then($input => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
            cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
        })
        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
        }) 
        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
          })
        it('preenche a area de texto usando o comando invoke', () => {
            cy.get('form').within(() => {
                cy.get('#firstName').invoke('val','Filipe')
                cy.get('#lastName').type('Aguiar')
                cy.get('#email').type('filipe@hotmail.com')
                cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',{delay:0})
                cy.get('.button[type="submit"]').click()
            })                      
            cy.get('.success').should('be.visible')     
        })
        it('faz uma requisição HTTP', function() {
            cy.request({
                method: 'GET',
                url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
            }).should(response =>{
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).contains('CAC TAT')
                })
        })
        it('encontre o gato', function() {
            cy.get('#white-background').find('#cat')
            .should('be.hidden').invoke('show')
            .should('be.visible')
        })
      })
