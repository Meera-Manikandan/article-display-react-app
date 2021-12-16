## Article Display Application

This project is a sample ReactJS based web applicaiton , which is used to interact with two different third party API. Application is built with React, JavaScript, and CSS.

## Project Status

Base version of the running application which diplay movie list and user list are currently implemented

## Development Approach

Followed two approaches for fetching data from both APIs:

#Movies List from SWAPI:
Used async-await approach for third-party API calls with catch for error handling.
Used React Hooks like useEffect for the first time loading of the landing page when the component is mounted.

#User List from jsonplaceholder API:
Used fetch with try-catch for third-party calls and error handling.

## Installation and Local Setup Instructions

Clone down this repository (master branch). You will need `node` and `npm` installed globally on your machine.

Installation & local app startup steps:

`npm install`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Build and Production deployment bundle creation steps

`npm run build`

This will create a "build" folder in the workspace , which will contain all the packaged application code for deployment

## Reflection

This was a 4 hour tech skill assesment project . I had completed this project iteratively. I started this process by using the `create-react-app` boilerplate framework code. Then tried to simulate data retrival call to swapi API , Once it is working next integration work with jsonplaceholder API implemented

Project goals included using technologies known up until this point and showcasing the ReactJS skills to assessment panel.
