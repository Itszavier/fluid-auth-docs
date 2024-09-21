---
title: Management
description: Understanding Session Management in FluidAuth
---

This documentation covers the Session class, an essential component of FluidAuth, providing insights into how it works within the framework.


Fluid Auth is a session based Authencation framework at the momment am currently looking on other ways to persist user data in safe and easy way


FluidAuth is a session-based authentication framework that simplifies the process of managing user sessions securely. While it currently relies on sessions for user data persistence, I'm actively exploring other safe and efficient methods to enhance data storage in the future.


The Session class is responsible for managing user sessions. It uses a session store to persist session data and works with session middleware to manage the current active session.


```ts
import { Session, MemoryStore } from "fluidauth/express";

const session = new Session({
    secret: "Your Secret", // usually an env variable
    store: new MemoryStore(), // use the memory store
    cookie: {
     // options for configuring the cookie
     httpOnly: true, 
     maxAge: 5 * 60 * 60 * 1000,  // 5 hours.  maxage is sync with sessionDuration no set maxage 
     secure: process.env.NODE_ENV === "production",
     sameSite: "strict" // CSRF protection
    }
    // handles both cookie and session c
    sessionDuration: 24 * 60 * 60 * 1000, //  24 hours after
});




```
:::tip[note]
MemoryStore should only be used in development. For production, use a session store linked to a database. For more information on session stores, visit here. [visit here](/docs/06-session/store.md)

:::
### Public Methods of the Session Class

| Method Name        | Parameters                               | Description                                                                                             |
|--------------------|------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `manageSession`    | `req: Request`, `res: Response`, `next: NextFunction` | Manages the session by initializing, validating, and potentially destroying it.                        |
| `createSession`    | `req: Request`, `res: Response`, `userData: Express.User` | Creates a new session for the given user data, sets the session cookie, and updates the request object.  |
| `destroySession`   | `req: Request`, `res: Response`          | Destroys the current session, clears the session cookie, and updates the request object.                 |
| `cleanSession`     | None                                     | Cleans up expired sessions from the session store.                                                      |
| `getSession`       | `sessionId: string`                      | Retrieves the session data for the given session ID. Returns `null` if the session does not exist.       |
| `deleteSession`    | `sessionId: string`                      | Deletes the session with the specified session ID from the store.                                       |


## Session config
| Property          | Type                   | Description                                                                                                       |
|-------------------|------------------------|-------------------------------------------------------------------------------------------------------------------|
| `secret`          | `string`               | The secret key used to sign the session ID cookie, usually stored in an environment variable.                     |
| `store`           | `object`               | The session store for persisting session data. In this case, it is set to `MemoryStore`.                          |
| `cookie`          | `express.CookieOptions` | An object that defines the cookie settings. Refer to the Cookie Options table below for more details.             |
| `sessionDuration` | `number`               | The duration in milliseconds for which the session is valid. Here, it's set to 24 hours (`24 * 60 * 60 * 1000`).  |


## Cookie Option

| Property       | Type      | Description                                                                                 |
|----------------|-----------|---------------------------------------------------------------------------------------------|
| `httpOnly`     | `boolean` | Specifies whether the cookie is accessible only via HTTP(S) and not by JavaScript (default: `true`). |
| `maxAge`       | `number`  | The maximum duration in milliseconds for which the cookie is valid. Here, it is set to 5 hours.  |
| `secure`       | `boolean` | Ensures the cookie is sent only over HTTPS when set to `true`. Typically used in production.  |
| `sameSite`     | `string`  | Controls whether the cookie is sent along with cross-site requests (`lax`, `strict`, or `none`). |
| `expires`      | `Date`    | Specifies the exact `Date` when the cookie will expire.                                        |
| `path`         | `string`  | Specifies the URL path for which the cookie is valid (default: `/`).                           |
| `domain`       | `string`  | Defines the domain for which the cookie is valid.                                             |
| `signed`       | `boolean` | Indicates whether the cookie should be signed.                                                 |
