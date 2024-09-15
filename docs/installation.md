# Installation & Usage

Welcome to **FluidAuth Express**! This guide will help you get started with the package and integrate it into your Express application.

### Why FluidAuth Express?

FluidAuth Express provides a simple, modern solution for handling authentication in Express applications. It’s lightweight, flexible, and easy to set up, making it an ideal choice for developers looking for a hassle-free authentication library.

### Before You Begin

Since **FluidAuth Express** relies on cookies for session management but doesn’t parse them automatically, you’ll need to install `cookie-parser` for handling cookies. If you’re using the **credential provider** (like email/password authentication), you’ll also need a body parser such as `body-parser` or the built-in one from Express to handle request bodies.

### Step 1: Install Required Packages

To get started, you’ll need to install FluidAuth Express along with its dependencies. Run the following command to install **Express**, **cookie-parser**, and **FluidAuth Express**:

```bash
npm install express cookie-parser @fluidauth/express
```



### Step 2: Setup A Provider 

where gonna use the github provider For this example

```ts
import { GithubProvider } from "@fluidauth/express/providers"

 const Github = new GithubProvider({
    credential: {
      clientId: "your client id",
      clientSecret: "your client Secret",
      redirectUri: "your redirectUri" // optional by github but remmecded  required by us for security;
    },

    async verifyUser(data, profile) {
     // Simulate a database lookup
      const user = await findUserByEmail(email);
     // If the user is not found, return an error message
      if (!user) {  
        // You can also create a user here
        return { user: null, info: { message: "User not found" } };
      }
      return { user }; // Return the user object which will be pass to the serilize function
    }
})
```

### Step 3: Set Up Express, Middleware, and AuthService
Next, set up your Express application and configure middleware for handling JSON requests and cookies. Initialize the AuthService with your chosen providers and session management.


```ts
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the authentication service
const authService = new AuthService({
  providers: [Github],
  session: new Session({
    secret: "your-session-secret",
  }),
});

// Apply middleware to handle JSON requests and cookies
app.use(express.json()); // Parses incoming JSON request bodies
app.use(cookieParser()); // Parses cookies

// Initialize the authentication session and middleware
app.use(authService.session()); // Manages the session And Storage
app.use(authService.initialize()); // Initializes authentication
```

# Step 3: Define Authentication Routes & Run your Server

Set up routes for your application. For example, you can add a login route that uses a provider like GitHub for authentication:

```ts
app.get("/auth/github", authService.authenticate("github"));

// Handle the redirect URI for GitHub authentication

app.get("/auth/redirect/github", authService..handleCallback("github"));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Summary 
You’ve now set up FluidAuth Express with the GitHub provider, configured your Express app, and defined authentication routes. This setup will handle user authentication and session management in your application.

:::tip
You can set up your providers in separate files and customize them for better organization and maintainability
:::

:::info
You might wonder why we don’t use existing session management solutions like express-session or others. The reason is that we needed a session management system tailored specifically to work seamlessly with FluidAuth. By developing our own, we ensure that it integrates well with our framework, allows for greater maintainability, and enables us to add custom features and support as needed.
:::
