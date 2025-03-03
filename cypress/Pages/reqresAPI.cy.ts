export class APIfuncs{

    // Sends a GET request to the specified URL and checks if the response status matches the expected status.
    getRequest(url: string, expectedStatus: number) {
        cy.request({
            method: 'GET',
            url: url
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }
    
    // Sends a POST request to the specified URL with the given body and checks if the response status matches the expected status.
    postRequest(url: string, body: any, expectedStatus: number) {
        cy.request({
            method: 'POST',
            url: url,
            body: body
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }
    
    // Sends a PUT request to the specified URL with the given body and checks if the response status matches the expected status.
    putRequest(url: string, body: any, expectedStatus: number) {
        cy.request({
            method: 'PUT',
            url: url,
            body: body
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }

    // Sends a DELETE request to the specified URL and checks if the response status matches the expected status.
    delRequest(url: string, expectedStatus: number) {
        cy.request({
            method: 'DELETE',
            url: url
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }
    
    // Generates an array of unique random IDs within the specified range, excluding certain IDs.
    generateRandomIDs(count: number, min: number, max: number, exclude: number[]) {
        const ids = [];
        while (ids.length < count) {
            const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!exclude.includes(randomID) && !ids.includes(randomID)) {
                ids.push(randomID);
            }
        }
        return ids;
    }

    // Sends a GET request to validate the user response for the given user ID.
    validateUserResponse = (userID: number) => {
        cy.request({
            method: 'GET',
            url: `https://reqres.in/api/users/${userID}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(userID);
            expect(response.body.data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
        });
    };
    
    // Sends a GET request to validate the product response for the given product ID.
    validateProductResponse = (prodID: number) => {
        cy.request({
            method: 'GET',
            url: `https://reqres.in/api/products/${prodID}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(prodID);
            expect(response.body.data).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
        });
    };
    
    // Sends a GET request to validate the erroneous response for the given URL.
    validateErroneousResponse = (url: string) => {
        cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    };

    // Sends a POST request to verify the creation of a resource and checks if the response matches the expected status and body.
    verifyCreation(url: string, body: any, expectedStatus: number) {
        cy.request({
            method: 'POST',
            url: url,
            body: body
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
            expect(response.body.name).to.eq(body.name);
            expect(response.body.job).to.eq(body.job);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('createdAt');
        });
    }

    // Sends a PUT request to verify the updation of a resource and checks if the response matches the expected status and body.
    verifyUpdation(url: string, body: any, expectedStatus: number) {
        cy.request({
            method: 'PUT',
            url: url,
            body: body
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
            expect(response.body.name).to.eq(body.name);
            expect(response.body.job).to.eq(body.job);
            expect(response.body).to.have.property('updatedAt');
        });
    }

    // Sends a GET request to validate the list response and checks if the response matches the expected status and page value.
    listValidation(url: string, expectedStatus: number, pageValue: number) {
        cy.request({
            method: 'GET',
            url: url
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
            expect(response.body.page).to.eq(pageValue);
            expect(response.body.data.length).to.eq(response.body.per_page);
        });
    }

}