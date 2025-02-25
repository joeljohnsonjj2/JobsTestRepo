describe('regresAPI Testing', () => {

    it('Basic GET Request', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2'
        })
        .its('status')
        .should('equal', 200);
    });

    it('Basic POST Request', () => {
        cy.fixture('users.json').then((users) => {
            users.forEach((user) => {
                cy.request({
                    method: 'POST',
                    url: 'https://reqres.in/api/users',
                    body: user
                })
                .then((response) => {
                    expect(response.status).to.eq(201);
                });
            });
        });
    });

    it('Basic PUT Request', () => {
        cy.fixture('usersUpdate.json').then((users) => {
            users.forEach((user) => {
                cy.request({
                    method: 'PUT',
                    url: `https://reqres.in/api/users/${user.queryParam}`,
                    body: {
                        "name": user.name,
                        "job": user.job
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
    });

    it('Basic DELETE Request', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2'
        })
        .its('status')
        .should('equal', 204);
    });

    it('Verify User Creation', () => {
        cy.fixture('users.json').then((users) => {
            users.forEach((user) => {
                cy.request({
                    method: 'POST',
                    url: 'https://reqres.in/api/users',
                    body: user
                })
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

    it('Verify User Updation', () => {
        cy.fixture('usersUpdate.json').then((users) => {
            users.forEach((user) => {
                cy.request({
                    method: 'PUT',
                    url: `https://reqres.in/api/users/${user.queryParam}`,
                    body: {
                        "name": user.name,
                        "job": user.job
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq(user.name);
                    expect(response.body.job).to.eq(user.job);
                    expect(response.body).to.have.property('updatedAt');
                });
            });
        });
    });

    it('List User Request Response Validation', () => {
        const pages = [1, 2];
        pages.forEach((page) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/users?page=${page}`
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.page).to.eq(page);
                expect(response.body.data.length).to.eq(response.body.per_page);
            });
        });
    });

    it('Single User Request Response Validation', () => {
        const userIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        userIDs.forEach((userID) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/users/${userID}`
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userID);
                expect(response.body.data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
            });
        });
    });

    it('Single User Request Erroneous Response Validation', () => {

        function generateRandomUserIDs(count, min, max, exclude) {
            const userIDs = [];
            while (userIDs.length < count) {
                const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!exclude.includes(randomID) && !userIDs.includes(randomID)) {
                    userIDs.push(randomID);
                }
            }
            return userIDs;
        }

        const userIDs = generateRandomUserIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        userIDs.forEach((userID) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/users/${userID}`,
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(404);
            });
        });
    });

    it('List Products Request Response Validation', () => {
        const pages = [1, 2];
        pages.forEach((page) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/products?page=${page}`
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.page).to.eq(page);
                expect(response.body.data.length).to.eq(response.body.per_page);
            });
        });
    });

    it('Single Product Request Response Validation', () => {
        const prodIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        prodIDs.forEach((prodID) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/products/${prodID}`
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(prodID);
                expect(response.body.data).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
            });
        });
    });

    it('Single User Request Erroneous Response Validation', () => {

        function generateRandomUserIDs(count, min, max, exclude) {
            const userIDs = [];
            while (userIDs.length < count) {
                const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!exclude.includes(randomID) && !userIDs.includes(randomID)) {
                    userIDs.push(randomID);
                }
            }
            return userIDs;
        }

        const prodIDs = generateRandomUserIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        prodIDs.forEach((prodID) => {
            cy.request({
                method: 'GET',
                url: `https://reqres.in/api/products/${prodID}`,
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(404);
            });
        });
    });

});