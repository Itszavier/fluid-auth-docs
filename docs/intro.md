---
sidebar_position: 1
title: Introduction
slug: /
---

# Introduction 

Welcome to **FluidAuth**, a modern authentication framework inspired by best practices from Passport.js and NextAuth.js. FluidAuth is designed to make authentication integration simple while giving developers the freedom to customize every aspect of the process. Whether you're building a straightforward app or a complex system, FluidAuth provides the tools you need to create secure, flexible authentication flows with ease.

### Why FluidAuth?

- **Simple Integration**: Start using FluidAuth without hassle.
- **Fully Customizable**: Tailor authentication processes to your specific requirements.
- **Security Focused**: Built with top security practices to protect user data.
- **Extensible**: Easily extend or add custom providers.
- **Popular Provider Support**: Includes Google, Facebook, GitHub, and more.
- **Multiple Authentication Methods**: Supports both OAuth and traditional email/password authentication.

### Get Involved

FluidAuth is open source, and we welcome contributions from the community

## Module Support

**FluidAuth Express** supports both CommonJS and ES Modules, providing flexibility in how you integrate the package into your project.

### CommonJS

For projects using CommonJS, you can import the package with `require`:

```js
const { AuthService } = require("@fluidauth/express");
```

### ES Modules

For projects using ES Modules, you can import the package with `import`:

```js
import { AuthService } from "@fluidauth/express";
```

Both module systems are fully supported to ensure compatibility across different environments. Choose the import method that best fits your project setup.


## Typescript

FluidAuth Express comes with full TypeScript support out of the box. There’s no need for additional configuration to enjoy type safety throughout your authentication setup. TypeScript ensures robust type checking, better autocompletion, and overall improved developer experience.