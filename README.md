


# MetroJS

MetroJS is a minimalistic and lightweight web application framework built on top of Node.js. It provides a simple and intuitive API for developing web applications with a focus on modularity and flexibility.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Documentation](#documentation)
- [Cloning the Repository](#cloning-the-repository)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MetroJS is a minimalistic and lightweight web application framework built on top of Node.js. It provides a simple and intuitive API for developing web applications with a focus on modularity and flexibility. Whether you are building a small personal project or a large-scale production application, MetroJS can help you create robust and efficient web applications.

## Installation

To use MetroJS in your project, you need to have Node.js and npm (Node Package Manager) installed. If you haven't installed Node.js, you can download it from the official website: [https://nodejs.org](https://nodejs.org).



Once you have Node.js and npm installed, you can install MetroJS by running the following command in your project directory:

```bash
$ npm install metrojs
```

This will download and install MetroJS and its dependencies into your project's `node_modules` directory.

### Note
The package is in the process of being uploaded to the npm registry. We are working on making it live soon. Until then use the git clone command to use the framework.

## Basic Usage

To create a basic MetroJS application, you need to require the `metrojs` module and initialize an instance of `metro()`.

```javascript
const metro = require('metrojs');
const app = metro();
```

Once you have an instance of `app`, you can start defining routes and handling requests using the available HTTP methods such as `get()`, `post()`, `put()`, `delete()`, etc.

Here's an example that demonstrates how to create a simple "Hello, MetroJS!" route:

```javascript
app.get('/', (req, res) => {
  res.send('Hello, MetroJS!');
});
```

You can start the MetroJS server by calling the `listen()` method and specifying the port number:

```javascript
app.listen(3000, () => {
  console.log('MetroJS server listening on port 3000');
});
```

Now, when you run your application with Node.js, it will start a server that listens on port 3000. Open your browser and visit `http://localhost:3000` to see the "Hello, MetroJS!" message.

## Documentation

For detailed documentation on how to use MetroJS and its features, please refer to the [MetroJS Documentation](https://yourdocumentationurl.com). The documentation provides comprehensive guides, examples, and reference material to help you understand and utilize the full power of MetroJS.

## Cloning the Repository

To clone the MetroJS repository from GitHub, you can use the following command:

```bash
$ git clone https://github.com/Prajna1999/metrojs.git
```



## Contributing

We welcome contributions from the community! If you'd like to contribute to MetroJS, please follow the guidelines in [CONTRIBUTING.md](https://github.com/Prajna1999/metrojs/blob/main/CONTRIBUTING.md). The contribution guide provides instructions on how to set up the development environment, run tests, and submit pull requests.

## License

MetroJS is licensed under the [MIT License](https://github.com/Prajna1999/metrojs/blob/main/LICENSE). You are free to use, modify, and distribute this framework according to the terms of the license.

If you encounter any issues or have suggestions for improvement, please open an issue on the GitHub repository. We appreciate your feedback and contributions to make MetroJS even better.
```





