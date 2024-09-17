---
title: Quick Start
---

# Quick Start

Welcome to **FluidAuth Express**! Follow these steps to integrate FluidAuth Express into your Express application.

## Installation

Install the required packages with:

```bash
npm install express cookie-parser @fluidauth/express
```

## Setup

### Step 1: Configure a Provider

Example using GitHub:

```ts
import { GithubProvider } from "@fluidauth/express/providers";

const Github = new GithubProvider({
  credential: {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    redirectUri: "your-redirect-uri",
  },
  async verifyUser(data, profile) {
    const user = await findUserByEmail(data.email);
    if (!user) {
      return { user: null, info: { message: "User not found" } };
    }
    return { user };
  }
});
```

### Step 2: Set Up Express and Middleware

Configure your Express app:

```ts
import express from 'express';
import cookieParser from 'cookie-parser';
import { AuthService, Session } from '@fluidauth/express';

const app = express();
const PORT = process.env.PORT || 3000;

const authService = new AuthService({
  providers: [Github],
  session: new Session({ secret: "your-session-secret" }),
  redirect: {
    onLoginSuccess: "/dashboard",
  },
  
});

app.use(express.json());
app.use(cookieParser());
app.use(authService.session());
app.use(authService.initialize());
```

### Step 3: Serialization and Deserialization

Configure user data handling:

```ts
// Serialization: Store user ID in the session
authService.serializeUser(user => user.id);

// Deserialization: Retrieve user data from the session
authService.deserializeUser(async id => {
  const user = await findUserById(id);
  return user || null;
});
```

### Step 4: Define Authentication Routes

Add authentication routes:

```ts
app.get("/auth/github", authService.authenticate("github"));
app.get("/auth/redirect/github", authService.handleCallback("github"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Summary

You’ve set up FluidAuth Express with GitHub, configured your Express app, and defined authentication routes. This setup handles user authentication and session management effectively.

## Notes

- Organize provider configurations in separate files for better maintainability.
- FluidAuth’s session management integrates seamlessly with our library, offering a tailored experience.

For more details, refer to the [Serialization and Deserialization](/docs/05-Serialization-and-Deserialization.md) section.
