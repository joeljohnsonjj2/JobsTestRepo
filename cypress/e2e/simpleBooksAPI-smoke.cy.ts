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
        obj1.registerApiClient(obj1.randomName, obj1.randomEmail).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.accessToken).exist;
            authToken = response.body.accessToken;
        });
    });

    let orderId = null;
    it('Submitting New Order', () => {
        obj1.submitOrder(authToken, 1, 'allan').then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
            orderId = response.body.orderId;
        });
    });

});