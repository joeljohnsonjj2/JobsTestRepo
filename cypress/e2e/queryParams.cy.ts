describe('Query Parmeters', () => {

    it('Passing Query Parameters', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2') // ?page=2 is a query parameter
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.page).to.eq(2);
            expect(response.body.data).has.length(6);

            expect(response.body.data[0]).has.property('id', 7);
            expect(response.body.data[0]).have.property('first_name', 'Michael');
        });
    });


});