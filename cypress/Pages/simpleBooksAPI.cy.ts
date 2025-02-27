import { urls } from "../Pages/urlRepository.cy";

export class APIfuncs1 {

    checkApiStatus = () => {
        return cy.request({
            method: 'GET',
            url: urls.status,
        });
    };
    
    registerApiClient = (clientName: string, clientEmail: string) => {
        return cy.request({
            method: 'POST',
            url: urls.registerClient,
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
            url: urls.books,
        });
    };
    
    fetchBooksByType = (type: string) => {
        return cy.request({
            method: 'GET',
            url: urls.booksByType(type),
        });
    };
    
    submitOrder = (authToken: string, bookId: number, customerName: string) => {
        return cy.request({
            method: 'POST',
            url: urls.orders,
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
            url: urls.orderById(orderId),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };
    
    fetchAllOrders = (authToken: string) => {
        return cy.request({
            method: 'GET',
            url: urls.orders,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };
    
    updateOrder = (authToken: string, orderId: string, customerName: string) => {
        return cy.request({
            method: 'PATCH',
            url: urls.orderById(orderId),
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
            url: urls.orderById(orderId),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };    

}