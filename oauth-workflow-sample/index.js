const publicUrl = "http://localhost:8000";
let accessToken;

async function connectOAuthService() {
  	// Retrieve he access token if it doesn't exist already
	if (!accessToken) {
		const rid = await xhrRequest(`${publicUrl}/getRequestId`, 'GET')
			.then(response => {
				return response.id;
			})

		// opens the url in the default browser
		require("uxp").shell.openExternal(`${publicUrl}/login?requestId=${rid}`)

		accessToken = await xhrRequest(`${publicUrl}/getCredentials?requestId=${rid}`, 'GET')
			.then(tokenResponse => {
				return tokenResponse.accessToken;
			})
	}
	document.getElementById("status").innerText = "OAuth service successfully connected";
	let button = document.getElementById("connect");
	button.innerText = "Fetch User Info";
	button.addEventListener("click", fetchUserProfile);
}

async function fetchUserProfile() {
  // Retrieve the current user's dropbox profile using the access toekn received from OAuth
	const dropboxProfileUrl = `https://api.dropboxapi.com/2/users/get_current_account?authorization=Bearer%20${accessToken}`;
	const dropboxProfile = await xhrRequest(dropboxProfileUrl, 'POST');

	userName = document.createTextNode(`Name: ${dropboxProfile.name.display_name}`);
	userInfo = document.getElementById('info').appendChild(userName);
}

// XHR helper function
function xhrRequest(url, method) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.timeout = 6000;
		req.onload = () => {
			if (req.status === 200) {
				try {
					resolve(req.response);
				} catch (err) {
					reject(`Couldn't parse response. ${err.message}, ${req.response}`);
				}
			} else {
				reject(`Request had an error: ${req.status}`);
			}
		}
		req.ontimeout = () => {
			console.log("polling..")
			resolve(xhrRequest(url, method))
		}
		req.onerror = (err) => {
			console.log(err)
			reject(err)
		}
		req.open(method, url, true);
		req.responseType = 'json';
		req.send();
	});
}

document.getElementById("connect").addEventListener("click", () => connectOAuthService());

