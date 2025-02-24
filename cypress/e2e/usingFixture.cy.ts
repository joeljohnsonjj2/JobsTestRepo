describe('API Tests', () => {
 
    it('POST Request', () => {
        cy.fixture('usersPositive.json').then((users) => {
            users.forEach((user) => {
                cy.request('POST', 'https://reqres.in/api/users', user)
                .then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body.name).to.eq(user.name);
                    expect(response.body.job).to.eq(user.job);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('createdAt');
                });
            });
        });
    });

    it('PUT Request', () => {
        cy.fixture('usersPositive.json').then((users) => {
            users.forEach((user) => {
                cy.request('PUT', 'https://reqres.in/api/users/2', user)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq(user.name);
                    expect(response.body.job).to.eq(user.job);
                    expect(response.body).to.have.property('updatedAt');
                });
            });
        });
    });

});