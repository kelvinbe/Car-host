describe('Landing Page', () => {
    it('should load the landing page', () => {
      cy.visit('http://localhost:3000/landing-page')

    })

  context("Header", () => {
    it("it should have a header section", () => {
      cy.get('div[id="header"]').should("exist");
    });
  });

  context("Banner", () => {
    it("it should have a banner section", () => {
      cy.get('div[id="banner"]').should("exist");
    });
  });


  context("AboutUs", () => {
    it("it should have a about us section", () => {
      cy.get('section[id="about"]').should("exist");
    });
  });

  context("AppFeature", () => {
    it("it should have an app feature section", () => {
      cy.get('section[id="app-feature"]').should("exist");
    });
  });

  context("BookARide", () => {
    it("it should have a book a ride section", () => {
      cy.get('section[id="book-ride"]').should("exist");
    });
  });

  context("Footer", () => {
    it("it should have a footer section", () => {
      cy.get('footer[class="w-full"]').should("exist");
    });
  });

});
