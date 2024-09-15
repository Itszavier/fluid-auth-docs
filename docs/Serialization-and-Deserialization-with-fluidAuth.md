---
title: Serialization and Deserialization with FluidAuth
description: Learn how to use the `serializeUser` and `deserializeUser` functions with FluidAuth to manage user sessions efficiently. This guide provides implementation details and example code for storing and retrieving user information in the session.
---

## Serialization and Deserialization with FluidAuth

### Serialization

The `serializeUser` function is used to determine what information is stored in the local session. Typically, this involves serializing a user object into a session identifier that will be used for subsequent requests.

```ts
authService.serializeUser(function(user) {
    // Serialize user information to store in the session
    // Here, user.id is used as the session identifier
    // Replace user.id with any other identifier if needed

    return user.id; // Return the identifier for the session
});
```

**Parameters:**

- `user`: The user object to be serialized, comes from the `AuthResponse` user.

**Returns:**

- The identifier (e.g., `user.id`) that will be stored in the session.

### Deserialization

The `deserializeUser` function is responsible for loading the user information from the session identifier. This is where you retrieve the user object based on the identifier stored in the session.

```ts
authService.deserializeUser(function(id) {
    // Retrieve user information based on the session identifier
    // Use the identifier to find the corresponding user object in your database or user store

    const user = users.find(user => user.id === id); // Example: find user by ID

    // Return the user object if found, otherwise return null
    return user || null;
});
```

**Parameters:**

- `id`: The session identifier used to find the user.

**Returns:**

- The user object corresponding to the identifier, or `null` if no user is found.

  
:::Note=[Note]
 Replace `users.find(user => user.id === id)` with your actual user lookup logic.
:::

