# Unsplash Images Plugin Sample 

Follow these instructions to set up the server-side for the plugin. 
## Install dependencies

First ensure that your terminal is in the `plugin` folder of this project. To do this, use: 

```bash
cd /uxp-photoshop-plugin-samples/unsplash-plugin-sample/server
```

For `yarn` users, install all dependencies using:

```
yarn install
```

For `npm` users, install all dependencies using:

```
npm install
```

## Environment Variables Setup

Next, you need to create a `.env` file containing all the variables. You can check the [.env.sample](./.env.sample) file for this. Enter all variables:

```sh
{
        echo 'PORT=8000'
        echo 'UNSPLASH_ACCESS_KEY='

} >> .env
```

`PORT` specifies the port your local API server runs on.

Here `UNSPLASH_ACCESS_KEY` needs to be generated using Unsplash Developers panel. Firstly, create a developer account in Unsplash. Then, go to the `Your Apps` option on the navbar and click on the `Create a new application` button. 
After creating your new application, go under the `Keys` section of the application and copy the `ACCESS_KEY`. 

## Starting The Project

Use this command to start up the server.

```
npm start
```
