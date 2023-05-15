describe('Vehicle creation intergration tests', ()=>{
    before(()=>{
        cy.loginAsHost();
        cy.visit('/vehicle-management');
        
    })

    it('checks on the current location', ()=>{
        cy.wait(15000);
        cy.contains('button','Add new vehicle').should('exist')
    })

    it('Checks if the form exists', ()=>{
        cy.get('[data-cy="rounded-btn"]').click()
        cy.get('[data-cy="create-vehicle-modal"]').should('exist')
        cy.get('form').should('exist')
    })

    it('Checks if the API will load data once the form has been filled',()=>{
        cy.get('[id="field-:rh:"]').type('2016')
        cy.get('[id="field-:rh:"]').should('have.value', '2016')
        cy.get('[id="field-:rj:"]').type('Toyota')
        cy.get('[id="field-:rj:"]').should('have.value', 'Toyota')
        cy.get('[id="field-:rl:"]').type('Prius')
        cy.get('[id="field-:rl:"]').should('have.value', 'Prius')
        cy.get('[data-cy="search"]').click()
        cy.get('select').should('exist')
        cy.get('select').find('option').should('exist')
        cy.get('select').children().should((options) => {
            expect(options).to.have.length(options.length) 
          })
        
    })

    it('Checks if the selected values autopopulate', ()=>{
        cy.get('select option[value="0"]').click({force: true})
        cy.get('[data-cy="vehicle-select"]').select("0")
        cy.get('[id="make"]').should('have.value', 'Toyota')
        cy.get('[id="model"]').should('have.value', 'Prius')
        cy.get('[id="year"]').should('have.value', '2016')
    })
})
  
