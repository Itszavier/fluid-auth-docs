---
title: Credential Provider
description: "Learn how to implement the Credential Provider in FluidAuth for email and password authentication."
keywords:
  - FluidAuth
  - Credential Provider
  - email login
  - password authentication
  - authentication provider
  - custom authentication
---


**Provider Name:** `credential`

The **Credential Provider** supports authentication using email and password, allowing users to log in with their credentials.

## Usage

```ts 
const { CredentialProvider } = require("@fluidauth/express/providers");
const bcrypt = require('bcrypt'); // Commonly used for hashing passwords

// Simulated database of users with hashed passwords
const users = [
  { email: "john@example.com", passwordHash: "$2b$10$abcd1234hashpasswordhere" },
  { email: "jane@example.com", passwordHash: "$2b$10$efgh5678hashpasswordhere" },
];

const Credential = new CredentialProvider({
  async validateUser(email, password) {
    // Simulate database query to find the user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
      // Return null if user not found
      return { user: null };
    }

    // Verify the password using bcrypt (or other password-hashing library)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    // Return user if password matches, otherwise return null
    return { user: isPasswordValid ? user : null };
  },
});

module.exports = Credential;
```