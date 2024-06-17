import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "3149a216-293c-4ae9-a1a4-ef4651b935b0",
    authority: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    redirectUri: "https://proyect-group-1.vercel.app/",
  },
};

export const loginRequest = {
  scopes: ["user.read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
