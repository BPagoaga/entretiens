import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';
import { CookieService } from './cookies';

const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;
const COGNITO_USERPOOL_CLIENT_ID = import.meta.env.VITE_COGNITO_USERPOOL_CLIENT_ID;
const COGNITO_USERPOOL_ID = import.meta.env.VITE_COGNITO_USERPOOL_ID;

if (COGNITO_DOMAIN && COGNITO_USERPOOL_CLIENT_ID && COGNITO_USERPOOL_ID) {
  Amplify.configure({
    Geo: {
      LocationService: {
        region: 'eu-west-1',
      },
    },
    Auth: {
      Cognito: {
        userPoolClientId: COGNITO_USERPOOL_CLIENT_ID,
        userPoolId: COGNITO_USERPOOL_ID,
        loginWith: {
          username: false,
          email: true,
          oauth: {
            domain: COGNITO_DOMAIN,
            scopes: ['aws.cognito.signin.user.admin', 'email', 'openid', 'profile'],
            redirectSignIn: [window.location.origin],
            redirectSignOut: [window.location.origin],
            responseType: 'code',
          },
        },
        signUpVerificationMethod: 'code',
      },
    },
  });
}

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({ ...CookieService.setOptions }));
