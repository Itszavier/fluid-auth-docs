---
title: Installation
---
# Installation

To get started with **FluidAuth Express**, follow these steps to install the required packages and understand their roles.

## Why Cookie Parser and Body Parser?

**FluidAuth Express** relies on `cookie-parser` and a body parser for handling sessions and request bodies. Here’s why:

- **Cookie Parser**: FluidAuth Express does not handle cookie parsing itself. Therefore, you need `cookie-parser` to parse cookies in incoming requests. This allows FluidAuth Express to manage sessions effectively.

- **Body Parser**: Some authentication providers may require request bodies to be parsed. For example, credential-based providers (like email/password) need to read data from request bodies. While `express.json()` is included by default in Express for JSON payloads, you can use any body parser as long as it correctly parses the request body.

## Installation Steps

1. **Install Required Packages**

   Run the following command to install **Express**, **cookie-parser**, and **FluidAuth Express**:

   ```bash
   npm install express cookie-parser @fluidauth/express
   ```

2. **Set Up Your Application**

   After installing the packages, configure your application as follows:

   ```ts
   import express from 'express';
   import cookieParser from 'cookie-parser';
   import { AuthService, Session } from '@fluidauth/express';

   const app = express();
   const PORT = process.env.PORT || 3000;

   const authService = new AuthService({
     providers: [/* your providers here */],
     session: new Session({ secret: "your-session-secret" }),
   });

   app.use(express.json()); // Parses JSON request bodies
   app.use(cookieParser()); // Parses cookies

   app.use(authService.session()); // Manages sessions
   app.use(authService.initialize()); // Initializes authentication

   app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });
   ```
