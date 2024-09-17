---
title: Store
description: The Session Store is used to store session data in the database so that it is persist event when the server stops
---



The Session Store in FluidAuth offers comprehensive control over how session data is managed and stored, allowing you to customize session management to meet your specific needs.

Additionally, the Session Store plays a crucial role in security by storing user-related data in the database rather than in cookies. This approach helps protect sensitive information from being exposed to potential threats such as cookie theft or tampering, enhancing the overall security of your application.

The `MemoryStore` class, derived from `BaseSessionStore`, simulates a database but stores session data locally in memory. This approach is typically intended for development purposes only. By default, the `Session` class uses `MemoryStore` if no other storage option is specified.

Key points about `MemoryStore`:

- **Local Storage**: `MemoryStore` keeps session data in the server’s memory, which makes it fast but not suitable for production environments due to its limitations in handling scalability and persistence.

- **Development Use**: This class is designed for development scenarios where a lightweight, temporary storage solution is sufficient. It’s ideal for quick testing and debugging but should be replaced with a more robust storage solution in production.

- **Default Behavior**: If you don’t specify a session store, the `Session` class defaults to using `MemoryStore`. This ensures that you have a ready-to-use session management system during development.

For production environments, it is recommended to use a more durable storage backend, such as a database or distributed cache, to ensure data persistence and scalability.

```ts
const  { MemoryStore, Session } = require("@fluidauth/express");

const session = new Session({
  store: new MemoryStore(), // does this by defualt
});
```

## Creating a Session Store

Creating a custom session store in FluidAuth is straightforward. All session stores should derive from the BaseSessionStore class provided by FluidAuth's Base Module. Here's how you can do it:


```js
// Assuming BaseSessionStore is imported from @fluidauth/express/base
import { BaseSessionStore } from "@fluidauth/express/base";

export class CustomSessionStore extends BaseSessionStore {
  constructor() {
    super();
    this.db = new Map(); // Using Map to store sessions
  }

  /**
   * Creates a session and stores it in the Map.
   *
   * @param {ISessionData} sessionData - The session data to store.
   */
  create(sessionData) {
    const { sessionId } = sessionData;
    this.db.set(sessionId, sessionData);
  }

  /**
   * Updates a session if it exists.
   *
   * @param {string} sessionId - The ID of the session to update.
   * @param {ISessionData} sessionData - The new session data.
   * @returns {Promise<void>}
   */
  async update(sessionId, sessionData) {
    if (this.db.has(sessionId)) {
      this.db.set(sessionId, sessionData);
    }
  }

  /**
   * Deletes a session by its ID.
   *
   * @param {string} sessionId - The ID of the session to delete.
   * @returns {Promise<void>}
   */
  async delete(sessionId) {
    if (this.db.has(sessionId)) {
      this.db.delete(sessionId);
    }
  }

  /**
   * Retrieves a session by its ID.
   *
   * @param {string} sessionId - The ID of the session to retrieve.
   * @returns {Promise<ISessionData | null>} - The session data or null if not found.
   */
  async get(sessionId) {
    return this.db.get(sessionId) || null;
  }

  /**
   * Cleans up expired sessions based on the `expires` field.
   * @returns {Promise<void>}
   */
  async clean() {
    const now = new Date();
    for (const [sessionId, sessionData] of this.db) {
      const expirationDate = new Date(sessionData.expires);
      if (expirationDate < now) {
        this.db.delete(sessionId); // Delete expired session
      }
    }
  }
}
```
