describe('regresAPI Testing', () => {

    it('Basic GET Request', () => {
        cy.request('GET', 'https://reqres.in/api/users/2')
        .its('status')
        .should('equal', 200);
    });

    it('Basic POST Request', () => {
        cy.fixture('users.json').then((users) => {
            users.forEach((user) => {
                cy.request('POST', 'https://reqres.in/api/users', user)
                .then((response) => {
                    expect(response.status).to.eq(201);
                });
            });
        });
    });

    it('Basic PUT Request', () => {
        cy.fixture('usersUpdate.json').then((users) => {
            users.forEach((user) => {
                cy.request('PUT', 'https://reqres.in/api/users/2', user)
                .then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
    });

    it('Basic DELETE Request', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
        .its('status')
        .should('equal', 204);
    });

    

});