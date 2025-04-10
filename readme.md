# Cypress API Testing Project
This project contains automated tests for API endpoints using Cypress. The tests cover various API functionalities for Reqres and Simple Books APIs.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/joeljohnsonjj2/JobsTestRepo.git
    cd apitesting
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Running Tests
To run the tests, use the following command:
```sh
npx cypress run 
```

## Test Files
Reqres API Tests: Located in reqresAPI.cy.ts <br />
Simple Books API Integration Tests: Located in simpleBooksAPI-integration.cy.ts <br />
Simple Books API Smoke Tests: Located in simpleBooksAPI-smoke.cy.ts <br />
Simple Books API Tests: Located in simpleBooksAPI.cy.ts <br />

## Fixtures
Fixtures are located in the fixtures directory and include:
* negativeOrders.json
* orders.json
* users.json
* usersUpdate.json

## Configuration
Cypress configuration is defined in cypress.config.ts.

## CI/CD
The project uses GitLab CI/CD for continuous integration and deployment. The configuration is defined in .gitlab-ci.yml.