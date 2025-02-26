export const urls = {
    getUser: (id: number) => `https://reqres.in/api/users/${id}`,
    postUser: 'https://reqres.in/api/users',
    putUser: (id: number) => `https://reqres.in/api/users/${id}`,
    deleteUser: (id: number) => `https://reqres.in/api/users/${id}`,
    listUsers: (page: number) => `https://reqres.in/api/users?page=${page}`,
    listProducts: (page: number) => `https://reqres.in/api/products?page=${page}`,
    singleProduct: (id: number) => `https://reqres.in/api/products/${id}`
};