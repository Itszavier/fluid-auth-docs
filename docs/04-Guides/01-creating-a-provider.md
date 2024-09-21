---

---

# Create a Custom Provider

In this guide, you will learn how to create a custom provider for FluidAuth. This process is primarily for developers who want to contribute to FluidAuth. Most users of FluidAuth Express won't need to create their own provider unless they are contributing to FluidAuth. However, if you are looking to extend FluidAuth or tailor it to specific needs, this guide will help you understand how to build a provider effectively.

## What Are Providers?

Providers in FluidAuth are essential components that handle different types of authentication methods. They define how users can log in and manage their sessions. Each provider can support various authentication techniques, such as local credentials (email and password) or third-party services (like GitHub or Google). By using providers, developers can easily integrate multiple authentication options into their applications, ensuring flexibility and security in user authentication.

## Let's Get Started

In this guide, you'll begin by building a basic credential-based provider in TypeScript. This will help you understand how to manage user authentication using email and password. In the next section, you'll expand your skills by creating an OAuth2 provider, allowing for third-party logins. Let’s dive in!

### Example Code

```typescript
class CustomProvider extends BaseProvider {
    providerConfig: ICustomProviderConfig;

    // Constructor to initialize the provider with configuration
    constructor(config: ICustomProviderConfig) {
        // Call the parent class constructor with provider type and name
        super({ type: "CREDENTIALS", name: "CustomProvider" });
        this.providerConfig = config; // Store the user validation function
    }

    // Method to authenticate users
    async authenticate(req, res, next) {
        // Extract username and password from the request body
        const { username, password } = req.body || {};

        // Check if both username and password are provided
        if (!username || !password) {
            // Handle the error if fields are missing
            this.handleAuthError({
                context: { req, res, next },
                message: `Fields username & password are required for ${this.config.name} provider.`,
            });
            return; // Exit if there is an error
        }

        // Validate the credentials using the provided validation function
        const validationFunction = this.providerConfig.validateUser(username, password);
        // Call handleLogin to process the authentication
        await this.handleLogin({ context: { req, res, next }, validationFunction });
    }

    /*
    // Method to handle OAuth callbacks (currently not needed for credential logins)
    async handleCallback() {

    }
    */
}
```
### 1. User Visits Auth Route

When a user navigates to a specific route that requires authentication, the application triggers the authentication process. This is typically done through a route handler that is configured to manage login requests.

### 2. Calling the Authentication Function

In the route handler, the `AuthService.authenticate("CustomProvider")` method is called. This indicates that the application will use the `CustomProvider` for authenticating the user.

### 3. AuthService.authenticate Method

The `AuthService.authenticate` method performs the following actions:

- **Determine Provider**: It identifies which provider to use based on the argument passed (in this case, "CustomProvider").
- **Call Provider's Authenticate Method**: The method then calls the `authenticate` method of the specified provider (e.g., `CustomProvider`), passing down the `req`, `res`, and `next` parameters.

### 4. Provider's Authenticate Method

The provider's `authenticate` method executes the following steps:

- **Extract Credentials**: It retrieves the user credentials (e.g., username and password) from the incoming request (`req.body`).
- **Validate Credentials**: It checks if the credentials are provided and calls the appropriate validation function to verify them.
- **Handle Login Process**: If validation is successful, it proceeds to manage the login process (e.g., setting session data). If validation fails, it handles the error appropriately (e.g., sending an error response).

### 5. Completion of Authentication

Once the provider's authentication logic completes:

- **Response Handling**: The `authenticate` method either sends a success response to the user or an error response if authentication fails.
- **Next Middleware**: If successful, control may pass to the next middleware in the stack, allowing the user to access protected resources.

