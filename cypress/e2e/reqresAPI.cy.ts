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
                obj1.postRequest('https://reqres.in/api/users', user, 201);  // make this
            });
        });
    });

    it('Verify User Updation', () => {
        cy.fixture('usersUpdate.json').then((users) => {
            users.forEach((user) => {
                obj1.putRequest(`https://reqres.in/api/users/${user.queryParam}`, {   // make this
                    "name": user.name,
                    "job": user.job
                }, 200);
            });
        });
    });

    it('List User Request Response Validation', () => {
        const pages = [1, 2];
        pages.forEach((page) => {
            obj1.listValidation(`https://reqres.in/api/users?page=${page}`, 200, page);  //make this
        });
    });

    it('Single User Request Response Validation', () => {
        const userIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        userIDs.forEach((userID) => {
            obj1.validateUserResponse(userID);
        });
    });

    it('Single User Request Erroneous Response Validation', () => {
        const userIDs = obj1.generateRandomIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        userIDs.forEach((userID) => {
            obj1.validateErroneousResponse(`https://reqres.in/api/users/${userID}`);
        });
    });

    it('List Products Request Response Validation', () => {
        const pages = [1, 2];
        pages.forEach((page) => {
            obj1.listValidation(`https://reqres.in/api/products?page=${page}`, 200, page);  //make this
        });
    });

    it('Single Product Request Response Validation', () => {
        const prodIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        prodIDs.forEach((prodID) => {
            obj1.validateProductResponse(prodID);
        });
    });

    it('Single Product Request Erroneous Response Validation', () => {
        const prodIDs = obj1.generateRandomIDs(15, 0, 100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        prodIDs.forEach((prodID) => {
            obj1.validateErroneousResponse(`https://reqres.in/api/products/${prodID}`);
        });
    });

});