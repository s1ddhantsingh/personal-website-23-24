const axios = require("axios");
const qs = require("qs");

async function getTokens() {
	// get code by extracting the "?code=" property from when you click this link:
	// https://accounts.spotify.com/authorize?client_id=f2190d85839c499cae5757569b84b0be&response_type=code&redirect_uri=https://www.siddhantsingh.xyz/&scope=user-read-currently-playing
	const data = {
		grant_type: "authorization_code",
		code: "AQAPIFGBiPiYVFL1NmSPqLHFqKaei7MerP4Di4aaiW5vIqACpDE-zqBaTWSIduogDL7W3DZpsNO98gSpObuyRjTRzj5kt13yZGEczt4zCRLabHWaIvP72tk9B21FH1bWPzATch37jUs4M-VVY1DBvuUnSyTiROhQZmZY80Nve6hygdxjgSjiOpyqrShzCQ7YjWti3j-gcYEGSSvaaq4a",
		redirect_uri: "https://www.siddhantsingh.xyz/",
	};

	const headers = {
		Authorization: `Basic ${Buffer.from(
			"f2190d85839c499cae5757569b84b0be:da2759f78cda432d95db35c92023c171"
		).toString("base64")}`,
		"Content-Type": "application/x-www-form-urlencoded",
	};

	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			qs.stringify(data),
			{ headers }
		);
		const { access_token, refresh_token } = response.data;

		console.log("Access Token:", access_token);
		console.log("Refresh Token:", refresh_token);
	} catch (error) {
		console.error("Error getting tokens:", error);
	}
}

getTokens();
