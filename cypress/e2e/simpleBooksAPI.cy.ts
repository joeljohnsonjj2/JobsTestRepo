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

    it('Fetch Books with Type - Fiction : Type Property Checks', () => {
        obj1.fetchBooksByType('fiction').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
            response.body.forEach((book) => {
                expect(book.type).to.eq('fiction');
            });
        });
    });

    it('Fetch Books with Type - Non Fiction', () => {
        obj1.fetchBooksByType('non-fiction').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('Fetch Books with Type - None Fiction : Type Property Checks', () => {
        obj1.fetchBooksByType('non-fiction').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
            response.body.forEach((book) => {
                expect(book.type).to.eq('non-fiction');
            });
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

    it('Submitting New Orders : Data Driven', () => {
        cy.fixture('orders').then((orders) => {
            orders.forEach((order) => {
                obj1.submitOrder(authToken, order.bookId, order.customerName).then((response) => {
                    if (response.status === 404) {
                        expect(response.body.error).to.exist;
                        return;
                    }
                    expect(response.status).to.eq(201);
                    expect(response.body.created).to.eq(true);
                    expect(response.body.orderId).to.exist;
                });
            });
        });
    });

    it('Submitting New Orders - Negative Case : Data Driven', () => {
        cy.fixture('negativeOrders').then((orders) => {
            orders.forEach((order) => {
                obj1.submitOrder(order.authToken, order.bookId, order.customerName).then((response) => {
                    expect(response.status).to.eq(401);
                });
            });
        });
    });

    it('Fetch Specific Order', () => {
        obj1.fetchOrder(authToken, orderId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(orderId);
        });
    });

    it('Fetch All Orders', () => {
        obj1.fetchAllOrders(authToken).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
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