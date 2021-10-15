# Creating a New CC Library: Node.js

This sample shows how to create a new Creative Cloud library from a simple Node.js script using the Axios node module.

## What it does

This sample makes a `POST` request to `/libraries/` as soon as you run it. It will then create a new library named `My Test Library` and then print the response data in your terminal.

## Setup

### 1. Add environment variables

Add a `.env` file to the top level of this sample with these keys:

```
API_KEY=
ACCESS_TOKEN=
```

See the [How To Get Your Developer Credentials](https://www.adobe.io/creative-cloud-libraries/docs/integrate/setup/developer-credentials/) tutorial to learn how to get values for these environment variables.

*NOTE:* The access token must be generated with the following scopes

- openid
- creative_sdk
- cc_files
- cc_libraries

### 2. Run the sample

In your terminal, start the sample:

```
npm install
npm start
```
