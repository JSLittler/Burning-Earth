# Burning Earth

[Version](#version) | [Purpose](#purpose) | [Dependencies](#dependencies) | [Key-Technologies](#key-technologies) | [Testing](#testing) | [Development](#development) | [Deployment](#deployment) | [TODO](#todo)

## Version

1.0.0

## Purpose

This is an example SPA Web Application designed to allow users to see projected temperature rises on a country by country basis. It is written as a practical demonstration of some of my front-end skills including writing:

- Javascript ES2023
- REACT (Single Page Application)
- HTML5
- CSS3

It also demonstrates knowledge of:

- Web Vitals
- Accessibility
- Responsive Web Applications
- Web Application Design
- Building Web Applications
- Web Application Testing
- Using Libraries
- Dynamic Web Applications

## Dependencies

The warming data which comes from [Climate Analytics](https://climateanalytics.org/), is fairly static and so is acquired and formatted at build-time to avoid costly fetch requests during the operation of the application.

## Key-Technologies

This application is built as a manually configured REACT application (NOT `create-react-app`) and built with ESBuild for performance and configuration reasons. It is designed for deployment via an AWS S3 bucket.

### Environment
- Node 20 (LTS)
- Javascript ES2023

### Build Libraries
- ESBuild 0.21.5
- React 18.13.1
- React-Google-Charts 4.0.1
- React-Redux 9.1.2
- Redux-Thunk 3.1.0

### Testing Libraries
- Jest 29.7.0
- React Testing Library 16.0.0

## Testing

- Run unit tests with test coverage: `npm run test`
- Run unit tests without test coverage: `npm run coverage`

nb. Remember to run `npm install` from root prior to running tests for the first time.

## Development

Locally, `http-server` is used to deploy the application to: `http://localhost:8080/`

- With updated warming data: `npm run start`
- Without updating warming data: `npm run start-local`

nb. warming data must be updated on first run. Also, remember to run `npm install` from root prior to running for the first time.

## Deployment

S3 static website deployed via terraform.

Main terrform definition files can be found [here](./deployment/), however state files have obviously been omitted from this repo.

Deployment instructions (assuming terraform is installed):

1. From root run `npm run build`.
2. Run `terraform plan` from the CLI, to check deployment changes.
3. Run `terraform apply` from the CLI, assuming you are happy with the outcome of the previous step.
4. Answer the confirmation prompt on the CLI by typing `yes` in accordance with prompt instructions.

A live version of this app can be found [here](http://burning-earth.s3-website.eu-west-2.amazonaws.com/)

## TODO

- Deployment (SSL and proper domain)
- User testing (Probably Playwright, possibly in a docker container)
- Recording screenshots (Probably via blob storage in the browser and then write to the local repo)
- Add wildfire map and data page
- Add major storm tracking page
- Add further information sources page (global warming studies etc...)