export class APIfuncs{

    getRequest(url: string, expectedStatus: number) {
        cy.request({
            method: 'GET',
            url: url
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }
    
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

    delRequest(url: string, expectedStatus: number) {
        cy.request({
            method: 'DELETE',
            url: url
        })
        .then((response) => {
            expect(response.status).to.eq(expectedStatus);
        });
    }
    
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
    
    validateErroneousResponse = (url: string) => {
        cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    };

}