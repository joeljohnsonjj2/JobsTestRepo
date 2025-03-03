import { urls } from "../Pages/urlRepository.cy";

export class APIfuncs1 {

    // Generates a random 8-character string consisting of lowercase letters
    randomName() {
        return Array.from({ length: 8 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    }

    // Generates a random email address with a gmail.com domain
    randomEmail() {
        return Math.random().toString(36).substring(7) + "@gmail.com";
    }

    // Sends a GET request to check the API status
    checkApiStatus = () => {
        return cy.request({
            method: 'GET',
            url: urls.status,
        });
    };
    
    // Sends a POST request to register a new API client with the given name and email
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
    
    // Sends a GET request to fetch all books
    fetchAllBooks = () => {
        return cy.request({
            method: 'GET',
            url: urls.books,
        });
    };
    
    // Sends a GET request to fetch books by a specific type
    fetchBooksByType = (type: string) => {
        return cy.request({
            method: 'GET',
            url: urls.booksByType(type),
        });
    };
    
    // Sends a POST request to submit an order with the given book ID and customer name
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
    
    // Sends a GET request to fetch a specific order by its ID
    fetchOrder = (authToken: string, orderId: string) => {
        return cy.request({
            method: 'GET',
            url: urls.orderById(orderId),
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };
    
    // Sends a GET request to fetch all orders
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
    
    // Sends a PATCH request to update an order's customer name by its ID
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
    
    // Sends a DELETE request to delete an order by its ID
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