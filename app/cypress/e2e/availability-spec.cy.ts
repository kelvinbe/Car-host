describe('Availability component', () => {
  it('Tests the availability page', ()=>{
    cy.contains('availability').click()
    cy.url().should('include', '/availability')
  }) 

  it('Tests availability of events', ()=>{
    cy.get('.fc-event-main').click()
    cy.get('button').contains('Close').click()
    cy.should('not.exist')  
  })

  it('Test days, week and moth toggle', ()=>{
    cy.get('.fc-resourceTimeGridDay-button').contains('day').click()
    cy.get('.fc-timeGridWeek-button').contains('week').click()
    cy.get('.fc-dayGridMonth-button').contains('month').click()
    cy.get('.fc-resourceTimeGridDay-button').contains('day').click()
    cy.get('.fc-prev-button').click()
    cy.get('.fc-next-button').click()
    cy.get('.fc-next-button').click()
    cy.get('.fc-today-button').click()
  })
  it('Tests the cancel button', ()=>{
    cy.get('.fc-event-main').click()
    cy.get('.chakra-button').contains('Cancel Booking').click()
    cy.get('.chakra-button').contains('Close').click()  
  })
})