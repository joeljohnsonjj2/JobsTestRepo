import { APIfuncs } from "../Pages/reqresAPI.cy";

const obj1 = new APIfuncs();

describe('regresAPI Testing', () => {

    it('Basic GET Request', () => {
        obj1.getRequest('https://reqres.in/api/users/2', 200);
    });

    it('Basic POST Request', () => {
        cy.fixture('users.json').then((users) => {
            users.forEach((user) => {
                obj1.postRequest('https://reqres.in/api/users', user, 201);
            });
        });
    });

    it('Basic PUT Request', () => {
        cy.fixture('usersUpdate.json').then((users) => {
            users.forEach((user) => {
                obj1.putRequest(`https://reqres.in/api/users/${user.queryParam}`, {
                    "name": user.name,
                    "job": user.job
                }, 200);
            });
        });
    });

    it('Basic DELETE Request', () => {
        obj1.delRequest('https://reqres.in/api/users/2', 204);
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
            obj1.getRequest(`https://reqres.in/api/users?page=${page}`, 200);
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
        const userIDs = obj1.generateRandomIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
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
            obj1.getRequest(`https://reqres.in/api/products?page=${page}`, 200);
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

    it('Single Product Request Erroneous Response Validation', () => {
        const prodIDs = obj1.generateRandomIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
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