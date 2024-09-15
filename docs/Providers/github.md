---
title: GitHub Provider
description: The GitHub Provider in FluidAuth Express simplifies integrating GitHub authentication into your application.
slug: /github-provider
---

**Provider Name:** `github`

The GitHub Provider in FluidAuth Express simplifies integrating GitHub authentication into your application. With this provider, users can log in using their GitHub account, allowing for a seamless and familiar authentication experience

Use the name `github` when configuring this provider in your AuthService instance. For example:

```ts
authService.authenticate("github");
```


**Usage:**

To use the GitHub Provider, import it into your application as follows:

```js

const { GithubProvider } = require("@fluidauth/express/providers");

export const Github = new GithubProvider({
  credential: {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    redirectUri: "your-redirect-uri",
  },

  async verifyUser(data, profile) {
    return { user: null, info: "no user in the database" };
  }
});
```

### Steps to Obtain Client ID, Client Secret, and Setup Redirect URL

1. **Create a GitHub OAuth App:**
   - Log in to [GitHub](https://github.com).
   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Click **"New OAuth App"**.
   - Enter the **Application Name**, **Homepage URL**, and **Authorization Callback URL**.
   - Click **"Register application"**.

2. **Obtain Client ID and Client Secret:**
   - After registration, you’ll be on the application details page.
   - Find the **Client ID** at the top of the page.
   - Click **"Generate a new client secret"** to get your **Client Secret**. Keep this value secure.

3. **Configure Your Application:**
   - Update the `clientId`, `clientSecret`, and `redirectUri` in the GitHub Provider configuration as shown above.

For more details, refer to the [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps) and [GitHub Developer Settings](https://github.com/settings/developers).

## Credential Option

| Property       | Type     | Description                                                   |
| -------------- | -------- | ------------------------------------------------------------- |
| `clientId`     | `String` | The Client ID obtained from GitHub OAuth application settings. |
| `clientSecret` | `String` | The Client Secret obtained from GitHub OAuth application settings. |
| `redirectUri`  | `String` | The URL to which GitHub will redirect after authentication. |

**Explanation:** These credentials are used to configure your application with GitHub OAuth, allowing secure authentication and authorization.

## VerifyUser Function

| Property | Type   | Description                                            |
| -------- | ------ | ------------------------------------------------------ |
| `data`   | `Object` | The data received from the OAuth provider, including token information. |
| `profile`| `Object` | The user's profile information provided by GitHub, such as username and email. |

**Explanation:** The `verifyUser` function processes the OAuth data and user profile to manage authentication and user details.

## Data

| Property        | Type    | Description                              |
| --------------- | ------- | ---------------------------------------- |
| `access_token`  | `string` | The access token for authenticated requests. |
| `token_type`    | `string` | The type of the token (e.g., "bearer").   |
| `scope`         | `string` | The scope of the access granted by the token. |

**Explanation:** This data includes the token and its type, which are used for making authenticated requests and defining access permissions.

## Profile

| Property        | Type                   | Description                                          |
| --------------- | ---------------------- | ---------------------------------------------------- |
| `name`          | `string | null`        | The name of the user, or `null` if not provided.    |
| `id`            | `string`               | Unique identifier for the user.                     |
| `node_id`       | `string`               | Node identifier for the user.                       |
| `email`         | `IGitHubEmail | null`  | The user's email address, or `null` if not provided. |
| `picture`       | `string`               | URL to the user's avatar (equivalent to `avatar_url`). |
| `profileUrl`    | `string`               | URL to the user's profile (equivalent to `html_url`). |
| `emails`        | `IGitHubEmail[]`       | Array of email addresses associated with the user.  |

### Public

| Property         | Type      | Description                                     |
| ---------------- | --------- | ----------------------------------------------- |
| `url`            | `string`  | URL to the user's profile.                     |
| `followers_url`  | `string`  | URL to the user's followers.                   |
| `following_url`  | `string`  | URL to the user's following.                   |
| `gists_url`      | `string`  | URL to the user's gists.                       |
| `repos_url`      | `string`  | URL to the user's repositories.                |
| `followers`      | `string`  | Number of followers the user has.              |
| `following`      | `string`  | Number of users the user is following.         |
| `site_admin`     | `boolean` | Whether the user is a site admin.              |

**Explanation:** The `Profile` object contains personal and public details about the user, such as their name, email, and GitHub URLs, while `Public` provides additional links and metrics related to the user's GitHub activity.
