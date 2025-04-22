import { initAuth0 } from "@auth0/nextjs-auth0"

export const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET || "a-very-long-secret-value-at-least-32-characters",
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || "",
  baseURL: process.env.AUTH0_BASE_URL || "http://localhost:3000",
  clientID: process.env.AUTH0_CLIENT_ID || "",
  clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
  routes: {
    callback: "/api/auth/callback",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
  },
  authorizationParams: {
    scope: "openid profile email",
  },
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours in seconds
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days in seconds
  },
})

export const getSession = auth0.getSession.bind(auth0)
export const handleAuth = auth0.handleAuth.bind(auth0)
export const handleCallback = auth0.handleCallback.bind(auth0)
export const handleLogin = auth0.handleLogin.bind(auth0)
export const handleLogout = auth0.handleLogout.bind(auth0)
export const withApiAuthRequired = auth0.withApiAuthRequired.bind(auth0)
export const withPageAuthRequired = auth0.withPageAuthRequired.bind(auth0)
