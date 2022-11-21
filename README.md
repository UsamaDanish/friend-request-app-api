# Friend request Application API (NodeJs + TypeScript)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A local mongoDB database named as `friend-request` should be running.

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/UsamaDanish/friend-request-app-api my-project
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./my-project
npm install
```

Once the dependencies are installed, you can now configure your project by poplulating variables in `.env` file.

```
vi .env
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server with TSNode
npm run start:dev
```

You can now head to `http://localhost:3001/api/docs` and see your API Swagger docs.

For restricted routes, sign up and login to get JWT token and explore thoese routes.

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start
# Run the application using "ts-node"
npm run start:dev
# Transpile the TypeScript files
npm run build
# Run the project' functional tests
npm run test
# Lint the project files using TSLint
npm run lint
```
