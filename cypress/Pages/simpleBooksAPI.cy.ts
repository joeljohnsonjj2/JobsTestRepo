export class APIfuncs1{

    checkApiStatus = () => {
        return cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/status',
        });
    };
    
    registerApiClient = (clientName: string, clientEmail: string) => {
        return cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: { 'Content-Type': 'application/json' },
            body: {
                "clientName" : clientName,
                "clientEmail" : clientEmail
            },
        });
    };
    
    fetchAllBooks = () => {
        return cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/books',
        });
    };
    
    fetchBooksByType = (type: string) => {
        return cy.request({
            method: 'GET',
            url: `https://simple-books-api.glitch.me/books?type=${type}`,
        });
    };
    
    submitOrder = (authToken: string, bookId: number, customerName: string) => {
        return cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: {
                "bookId" : bookId,
                "customerName" : customerName,
            },
        });
    };
    
    fetchOrder = (authToken: string, orderId: string) => {
        return cy.request({
            method: 'GET',
            url: `https://simple-books-api.glitch.me/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };
    
    fetchAllOrders = (authToken: string) => {
        return cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };
    
    updateOrder = (authToken: string, orderId: string, customerName: string) => {
        return cy.request({
            method: 'PATCH',
            url: `https://simple-books-api.glitch.me/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: {
                customerName,
            },
        });
    };
    
    deleteOrder = (authToken: string, orderId: string) => {
        return cy.request({
            method: 'DELETE',
            url: `https://simple-books-api.glitch.me/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };    

}