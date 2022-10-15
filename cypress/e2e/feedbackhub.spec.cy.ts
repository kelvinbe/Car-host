describe("FeedBackHub - Test Visit" , ()=>{
    beforeEach(()=>{
        cy.visit('/feedBackHub')
    })

    it("Should have welcome message", ()=>{
        cy.get("[id='header-title']").should("have.text", "Welcome to the Feedbackhub, Tracy!")
    })
})