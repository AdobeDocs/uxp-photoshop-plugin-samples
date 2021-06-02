/* Replace "YOUR_ADOBE_API_KEY" with your Api key 
and "YOUR_ADOBE_API_SECRET" with your API Secret */

const dropboxApiKey = "YOUR_ADOBE_API_KEY";
const dropboxApiSecret = "YOUR_ADOBE_API_SECRET";
const publicUrl = "http://localhost:8000";

try {
        if (module) {
                module.exports = {
                        dropboxApiKey: dropboxApiKey,
                        dropboxApiSecret: dropboxApiSecret,
                        publicUrl: publicUrl
                }
        }
}
catch (err) { }