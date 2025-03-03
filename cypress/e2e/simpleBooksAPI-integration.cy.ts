import { APIfuncs1 } from '../Pages/simpleBooksAPI.cy';
const obj1 = new APIfuncs1();

describe('simpleBooksAPI-integration Testing', () => {

    it('Register Client and Fetch All Books', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.fetchAllBooks().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(0);
            });
        });
    });
    
    it('Register Client, Submit Order, and Fetch Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                const orderId = response.body.orderId;
                obj1.fetchOrder(authToken, orderId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.id).to.eq(orderId);
                });
            });
        });
    });
    
    it('Register Client, Submit Order, Update Order, and Fetch Updated Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                const orderId = response.body.orderId;
                let checkVal = obj1.randomName();
                obj1.updateOrder(authToken, orderId, checkVal).then((response) => {
                    expect(response.status).to.eq(204);
                    obj1.fetchOrder(authToken, orderId).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.customerName).to.eq(checkVal);
                    });
                });
            });
        });
    });
    
    it('Register Client, Submit Order, and Delete Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                const orderId = response.body.orderId;
                obj1.deleteOrder(authToken, orderId).then((response) => {
                    expect(response.status).to.eq(204);
                    obj1.fetchOrder(authToken, orderId).then((response) => {
                        expect(response.status).to.eq(404);
                    });
                });
            });
        });
    });

    it('Register Client, Fetch All Books, and Submit Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.fetchAllBooks().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(0);
                obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                    expect(response.status).to.eq(201);
                });
            });
        });
    });

    it('Register Client, Submit Order, Update Order, Fetch Updated Order, and Delete Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                const orderId = response.body.orderId;
                let checkVal = obj1.randomName();
                obj1.updateOrder(authToken, orderId, checkVal).then((response) => {
                    expect(response.status).to.eq(204);
                    obj1.fetchOrder(authToken, orderId).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.customerName).to.eq(checkVal);
                        obj1.deleteOrder(authToken, orderId).then((response) => {
                            expect(response.status).to.eq(204);
                        });
                    });
                });
            });
        });
    });

    it('Register Client, Fetch All Books, Submit Order, and Fetch Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.fetchAllBooks().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(0);
                obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                    const orderId = response.body.orderId;
                    obj1.fetchOrder(authToken, orderId).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.id).to.eq(orderId);
                    });
                });
            });
        });
    });

    it('Register Client, Submit Order, Fetch Order, Update Order, and Fetch Updated Order', () => {
        const randomName = obj1.randomName();
        const randomEmail = obj1.randomEmail();
        obj1.registerApiClient(randomName, randomEmail).then((response) => {
            const authToken = response.body.accessToken;
            obj1.submitOrder(authToken, 1, obj1.randomName()).then((response) => {
                const orderId = response.body.orderId;
                obj1.fetchOrder(authToken, orderId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.id).to.eq(orderId);
                    let checkVal = obj1.randomName();
                    obj1.updateOrder(authToken, orderId, checkVal).then((response) => {
                        expect(response.status).to.eq(204);
                        obj1.fetchOrder(authToken, orderId).then((response) => {
                            expect(response.status).to.eq(200);
                            expect(response.body.customerName).to.eq(checkVal);
                        });
                    });
                });
            });
        });
    });

});