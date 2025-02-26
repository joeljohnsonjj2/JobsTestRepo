import { APIfuncs1 } from '../Pages/simpleBooksAPI.cy';
const obj1 = new APIfuncs1();

describe('simpleBooksAPI Testing', () => {

    it('Check API Status', () => {
        obj1.checkApiStatus().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('OK');
        });
    });

    let authToken = null;
    it('Register API Client / Creating Access Token', () => {
        obj1.registerApiClient('Joel', Math.random().toString(5).substring(2) + "@gmail.com").then((response) => {
            authToken = response.body.accessToken;
        });
    });

    it('Fetch All Books', () => {
        obj1.fetchAllBooks().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('Fetch Books with Type - Fiction', () => {
        obj1.fetchBooksByType('fiction').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('Fetch Books with Type - Non Fiction', () => {
        obj1.fetchBooksByType('non-fiction').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    let orderId = null;
    it('Submitting New Order - Positive Case', () => {
        obj1.submitOrder(authToken, 1, 'allan').then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
            orderId = response.body.orderId;
        });
    });

    it('Submitting New Order - Negative Case', () => {
        obj1.submitOrder(authToken + 'abc', 1, 'allan').then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Fetch Specific Order', () => {
        obj1.fetchOrder(authToken, orderId).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Fetch All Orders', () => {
        obj1.fetchAllOrders(authToken).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Update Specific Order', () => {
        obj1.updateOrder(authToken, orderId, 'allan').then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('Delete Specific Order', () => {
        obj1.deleteOrder(authToken, orderId).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

});