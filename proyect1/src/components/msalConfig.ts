// msalConfig.ts

import { Configuration , PublicClientApplication } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '3149a216-293c-4ae9-a1a4-ef4651b935b0',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:3000', 
    

  },
};

export const loginRequest = {
  scopes: ['user.read'], 
};

export const msalInstance = new PublicClientApplication(msalConfig);