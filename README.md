# redux-module-builder

An example app utilizing the twitter stream API, demonstrating how to use and featuring the efficiency of using `redux-module-builder`.

The demo application creates four redux modules (all located in the `src/redux/modules` directory):

<div class="table blue">

| name | file path | description |
|-----|--------|-----|
| users | src/redux/modules/users.js | responsible for keeping track of the current user |
| events | src/redux/modules/event.js | responsible for getting upcoming events |
| images | src/redux/modules/images.js | responsible for getting images associated with an event |
| currentEvent | src/redux/modules/currentEvent.js | responsible for connecting to a websocket and live updating an event's data  |

</div>

## Quickstart

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/fullstackreact/redux-module-builder-example.git
cd redux-module-builder-example

# Install dependencies
npm install
```

Next, we'll need to make sure we have a `.env` file in the root of our project. We've included a sample `.env` file for you already, so you can use it as a base for yours:

```bash
cp .env.example .env

# Start the server
npm start
```

## Configuring the Application

This app uses [dotenv](https://github.com/bkeepers/dotenv) for configuration. In order to configure the application for your own api access, [grab an api token from Twitter here](https://dev.twitter.com) and set it in a file called `.env` at the root for a key called `__TWITTER_KEY__`.
For instance, say that your twitter key is: `abc123`. Your `.env` file should look like:

```bash
APP_NAME=liveStream
API_HOST=realtime.fullstackweb.org
API_URL=https://realtime.fullstackweb.org
WS_URL=wss://realtime.fullstackweb.org
TWITTER_KEY=abc123
```

## Contributing

```shell
git clone https://github.com/fullstackreact/redux-module-builder-example.git
cd redux-module-builder-example
npm install
npm start
```

# Fullstack React Book

<a href="https://fullstackreact.com">
<img align="right" src="resources/readme/fullstack-react-hero-book.png" alt="Fullstack React Book" width="155" height="250" />
</a>

This app was built alongside the blog post [React Tutorial: Cloning Yelp](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/).

This repo was written and is maintained by the [Fullstack React](https://fullstackreact.com) team. In the book we cover many more projects like this. We walk through each line of code, explain why it's there and how it works.

This app is only one of several apps we have in the book. If you're looking to learn React, there's no faster way than by spending a few hours with the Fullstack React book.

<div style="clear:both"></div>

## License
 [MIT](/LICENSE)
