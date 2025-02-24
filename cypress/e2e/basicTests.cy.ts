describe('Basic Status Tests', () => {

    it('GET Request', () => {
        cy.request('GET', 'https://reqres.in/api/users/2')
        .its('status')
        .should('equal', 200);
    });

    it('POST Request', () => {
        cy.request('POST', 'https://reqres.in/api/users', {
            "name": "joel",
            "job": "QA"
        })
        .its('status')
        .should('equal', 201);
    });

    it('PUT Request', () => {
        cy.request('PUT', 'https://reqres.in/api/users/2', {
            "name": "joel",
            "job": "QA"
        })
        .its('status')
        .should('equal', 200);
    
    });

    it('DELETE Request', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
        .its('status')
        .should('equal', 204);
    });

    it('POST Request', () => {
        cy.request('POST', 'https://reqres.in/api/users', {
            "name": "joel",
            "job": "QA"
        })
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq('joel');
            expect(response.body.job).to.eq('QA');
        }); 
    });

});