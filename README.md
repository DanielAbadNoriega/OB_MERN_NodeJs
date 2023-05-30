# Open Bootcamp: MERN

## Ejercicio 1: Node JS

1. Replicar proyecto completo Node con TS y Express visto en el vídeo

   - Subir el enlace al repositorio Github / Gitlab donde lo subas

   - Crear un README.md explicando:

     - Las dependencias que has instalado y para qué sirve cada una de ellas

     - Los scripts de NPM que hayas creado y para qué sirven cada uno de ellos

2. Crear una ruta nueva:

   - api/goodbye

     - Debe devolver un JSON con una despedida:

     -

     ```json
       {

       “message”: “Goodbye {NOMBRE POR QUERY PARAMS}”,

       “Date”: {FECHA ACTUAL}

       }
     ```

     - Recuerda crear un type específico para esta respuesta dentro de la carpeta de controllers

   - Recuerda crear Controller y Router oportuno

3. Realiza pruebas con Postman y demuestra que funciona correctamente

## Ejercicio 2:

1. Replicar proyecto completo Node con TS y Express visto en el vídeo

2. Replicar la creación de base de datos en MongoDB

   - Crear una colección llamada Katas (retos de programación)

     - Cada documento deberá tener:

       ```json
       {

         Name

         Description

         Level (nivel de dificultad numérico)

         User (id asociado al usuario que lo ha creado)

         Date (Fecha de creación del reto)

         Valoration (sobre 5, valor numérico)

         Chances (número de intentos realizados por otros usuarios)

       }
       ```

3. Crear archivo de Kata.Entity.ts con el esquema Mongoose correspondiente

## Node JS:

1. Main npm installations:

- **Express:** provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love. It is for basics routing:

```

app.METHOD(PATH, HANDLER)

```

```

$ npm install express

```

- **Dotenv:** is a zero-dependency module that loads environment variables from a .env file into process.env.

```

# install locally (recommended)

$ npm install dotenv --save

```

- **Nodemon:** will monitor for any changes in your source and automatically restart your server.

```

$ npm install -D nodemon

```

```

$ npm install -g nodemon

```

Execution of nodemon (use it in a script in package.json):

```

$ npx nodemon {file-server}

```

NOTE: with npx we force to use this dependecy, if this doesn't exist, it will download it.

- **TypeScript:** install all the dependencies of ts type:

```

$ npm i -D typescript @types/express @types/node

```

After we will execute:

```

$ npx tsc --init

```

With this, it will create a tsconfig.json by default.

- **Concurrently:** run multiple commands concurrently

```

$ npm i -D concurrently

```

In package.json, escape quotes:

```

"start": "concurrently \"command1 arg\" \"command2 arg\""

```

- **Webpack:** Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

```

$ npm i -D webpack

```

- **Webpack-cli:** webpack CLI provides a flexible set of commands for developers to increase speed when setting up a custom webpack project. As of webpack v4, webpack is not expecting a configuration file, but often developers want to create a more custom webpack configuration based on their use-cases and needs. webpack CLI addresses these needs by providing a set of tools to improve the setup of custom webpack configuration.

```

$ npm i -D webpack-cli

```

- **Webpack-node-externals:** Webpack allows you to define externals - modules that should not be bundled.

When bundling with Webpack for the backend - you usually don't want to bundle its node_modules dependencies. This library creates an externals function that ignores node_modules when bundling in Webpack.

```

$ npm i -D webpack-node-externals

```

- **Webpack-shell-plugin:** This plugin allows you to run any shell commands before or after webpack builds. This will work for both webpack and webpack-dev-server.

```

$ npm i -D webpack-shell-plugin

```

- **eslint:** ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

```

$ npm i -D eslint

```

You can install and configure ESLint using this command:

```

npm init @eslint/config

```

- **jest:** testing solution

```

$ npm i -D jest

```

- **ts-jest:** A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.

```

$ npm i -D ts-jest ts-node

```

- **@types/jest:** installed previously. It is necesary for ts-jest.

```

$ npm i -D @types/jest

```

> After installation, we will execute the next command to configure jest.

```
$ npx jest --init
```

- **supertest:** The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

```

$ npm i -D supertest

```

- **serve:** helps you serve a static site, single page application or just a static file (no matter if on your device or on the local network). It also provides a neat interface for listing the directory's contents:

```

$ npm i -D serve

```

- **cors:** is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

```

$ npm i cors

```

> We need also the @types/cors package to can use

```

$ npm i --save @types/cors

```

- **helmet:** helps secure Express apps by setting HTTP response headers.

```

$ npm i helmet

```

- **mongoose:** Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment

```

$ npm i -D mongoose

```

<!-- DOCUMENTATION -->

- **@types/swagger-jsdoc:** This package contains type definitions for swagger-jsdoc. Documentations with swagger

```

$ npm i -D @types/swagger-jsdoc

```

- **swagger-jsdoc:** This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.

```

$ npm i --save swagger-jsdoc

```

- **@types/swagger-ui-express:** definitions for swagger-ui-express

```

$ npm i -D @types/swagger-ui-express

```

- **swagger-ui-express:** This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.

```

$ npm i --save swagger-ui-express

```

- **tsoa:** TypeScript controllers and models as the single source of truth for your API. More in documentation.

```

$ npm i tsoa

```

- **bcrypt:** A library to help you hash passwords

```

$ npm i bcrypt

```

- **@types/bcrypt:** the type definitions

```

$ npm i -D @types/bcrypt

```

- **bcryptjs:** Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.

```

$ npm i bcryptjs

```

- **@types/bcryptjs:** the type definitions.

```

$ npm i -D @types/bcryptjs

```

- **jsonwebtoken:** An implementation of JSON Web Tokens.

```

$ npm i jsonwebtoken

```

- **@types/jsonwebtoken:** the type definitions.

```

$ npm i -D @types/jsonwebtoken

```

<!-- - **:**

```

$ npm i -D

```-->
