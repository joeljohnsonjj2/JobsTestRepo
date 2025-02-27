export const urls = {
    getUser: (id: number) => `https://reqres.in/api/users/${id}`,
    postUser: 'https://reqres.in/api/users',
    putUser: (id: number) => `https://reqres.in/api/users/${id}`,
    deleteUser: (id: number) => `https://reqres.in/api/users/${id}`,
    listUsers: (page: number) => `https://reqres.in/api/users?page=${page}`,
    listProducts: (page: number) => `https://reqres.in/api/products?page=${page}`,
    singleProduct: (id: number) => `https://reqres.in/api/products/${id}`,
    status: 'https://simple-books-api.glitch.me/status',
    registerClient: 'https://simple-books-api.glitch.me/api-clients/',
    books: 'https://simple-books-api.glitch.me/books',
    booksByType: (type: string) => `https://simple-books-api.glitch.me/books?type=${type}`,
    orders: 'https://simple-books-api.glitch.me/orders/',
    orderById: (orderId: string) => `https://simple-books-api.glitch.me/orders/${orderId}`
};