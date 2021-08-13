# Expense Tracker App

This project aims to help you manage/track your expenses.

Although, currently this is just an initial design and implementations. I am sure that pushing this forward will require
lots of ui ux changes at the same time it definitely need some major refactoring. 

## Tech Stack

This project was bootstraped using create-react (https://reactjs.org/docs/create-a-new-react-app.html).

This is a frontend javascript app implemented using React Js. (https://reactjs.org)

On top of javascript, it's using Typescript for application type annotations. (https://www.typescriptlang.org/)

For state management, it's using Redux (https://redux.js.org/)

## Pure Frontend Application

This is purely an independent react javascript application that will connect to a dedicated restful api (Let's discuss it later).

## Considerations

As I've said this for sure requires lots of improvement moving forward.

I want to apply code splitting before deploying this to production so that we can improve initial loading time. Doing that, the whole codebase will
not be loaded fully initially, WE WILL ONLY LOAD JAVASCRIPT CODE by demand.

For multiple users support, definitely we need to implement a signup and authentication feature to support it then we can relate entries to the logged in user.

In general, to improve performance, backend and frontend needs to work correctly. You have to have a correct mindset and sets of goals to achieve it.

## Backend Api Counter Part

I've also built a simple restful api using Rails that will accomodate all data transactions and request this frontend application requires.
You can check it out in this repo. (https://github.com/ezravalmores/expense-tracker-api)

## How to run locally

You have to atleast have or installed a version of node 14.4.0 or higher.

Install dependencies by `yarn install` or `npm i`.

For this to run instantly or smootly connected with the backend. Run this using port `3001` and run backend app using port `3000`.

Run it `PORT=3001 yarn start`

You can also specify the port of your api by creating an `.env` file and adding this ENV VAR.
`REACT_APP_API_BASE_ENDPOINT=localhost:3002`

Clone and run backend api (https://github.com/ezravalmores/expense-tracker-api).
You can find more information on how you can run api locally in above repo link. 

