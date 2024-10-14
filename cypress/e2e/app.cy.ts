describe('Home', () => {
  it('renders dataSets on the homepage', () => {
    // intercept api calls
    cy.intercept('GET', '**/catalog/*', { fixture: 'catalog.json' }).as('getDataSets');

    cy.visit('/');

    // expect subtitle on main page to render
    expect(cy.findByText(/data from data.gov/)).toExist();
    // expect list of datasets to render
    expect(cy.findByText(/Electric Vehicle Population Data/)).toExist();
  });
});
