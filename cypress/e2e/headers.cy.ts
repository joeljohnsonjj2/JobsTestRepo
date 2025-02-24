describe('Books API Testing', () => {

    let authToken = null;
    before('Creating Access Token', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {'Content-Type': 'application/json'},
            body: {
                "clientName": "Joel",
                "clientEmail": Math.random().toString(5).substring(2) + "@gmail.com"
            }
        }).then((response) => {
            authToken = response.body.accessToken;
        });
    });

    let orderId = null;
    it('Creating New Order', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + authToken
            },
            body: {
                "bookId" : 1,
                "customerName" : "allan" 
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
            orderId = response.body.orderId;
        });
    });
    
    
    it('Fetch All Orders', () => {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + authToken
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Fetch Specific Order', () => {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/' + orderId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + authToken
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });


});