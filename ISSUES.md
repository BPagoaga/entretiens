# ND-6085

Story : as a user, I want to be able to login using some demo credentials. If my credentials are incorrect, it should
be highlighted by an error message below the password input.
After login, I should see the list of my bookings for the current week

## Before you begin

- No need to handle i18n
- all api services already exist, you will need to cache requests using react-query custom hooks
- the api doc is available on swagger :
  - https://staging.jooxter.com/swagger-ui/index.html?urls.primaryName=V4.0
  - https://staging.jooxter.com/swagger-ui/index.html?urls.primaryName=V3.0
- the login flow is in 2 steps :
  1- Send a request to login/{email}/check to get the login type for the provided email
  2- Send a request to cognito using aws amplify with the user email and password.

> Revelant docs :
>
> - amplify: https://docs.amplify.aws/react-native/frontend/auth/sign-in/
> - react-hook-form: https://react-hook-form.com/get-started#Integratingwithservices
> - zod: https://zod.dev/
> - react-hook-form + zod: https://github.com/react-hook-form/resolvers
> - luxon: https://moment.github.io/luxon/#/?id=luxon

## Fix errors preventing the app to build

In the current state, the app might throw errors when trying to build. If necessary, fix those errors

## Implement login feature

- use react-hook-form and zod to manage form state and validation
- display an error if email is not valid
- send api request to get login details.
- redirect to next page
- handle form validation and submission, then send login request using aws-amplify. For simplicity, only handle
  the classic login/password flow, there is no additional step such as MFA nor login via external provider

## Implement booking display feature

We want to fetch bookings based on some filters :

- the booking summary (that the user can defined using an input)
- the resource name (that the user can defined using an input) (BONUS)
- from and to parameters, these should be hardcoded : from should be the start of the week, and to should be the
  end of the week
- use zustand to handle the "filters" state across the app, and persist it to localStorage
- fetch the bookings using the filters and display them in an unordered list. We should be able to see the booking
  summary, the day, the start and end hours, and the organizer's name
