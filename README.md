# Virgil (working title)
A delightful way to share, discuss, and annotate poetry.

# Build and Run
Virgil is written in Node and React.

First make sure you have [Node](https://nodejs.org/) and [nvm](https://github.com/creationix/nvm). To build and start
the server:

```
nvm install
nvm use
npm install
npm start
```

Then build the client:

```
npm install -g browserify watchify # if you don't already have them
cd client
npm install
npm run watch # for development mode
# or
npm run build # for production mode
```

Finally, navigate to localhost:3000

# License
MIT
