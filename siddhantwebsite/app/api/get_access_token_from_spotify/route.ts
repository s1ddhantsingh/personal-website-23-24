import { NextResponse } from "next/server";
import axios from "axios";
require("dotenv").config({ path: "../../../.env" });

let accessToken =
	"BQB8TrIec-zvrbHZx-IXIblic_Iui0A-kdx-mtNC_yU2sGm3zeRJ7pbT1CvQqH1_Ta0sOO-Ad2DkcF_PWIeptFhEHfyH69jGKBPo46-3_dJSOyeraUQUARmlYtCv9i4TJCDNGkO064z6RZZ0JI9UR1hic7vwjdOhP2wLHUSpzEmPqQ11KyR1O-lYlkC2DjhFbR8";

// Function to refresh the access token
async function refreshAccessToken() {
	const client_id = process.env.client_id;
	const client_secret = process.env.client_secret;
	const refresh_token = process.env.spotify_refresh_token;

	const authOptions = {
		url: "https://accounts.spotify.com/api/token",
		method: "post",
		params: {
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		},
		headers: {
			Authorization: `Basic ${Buffer.from(
				`${client_id}:${client_secret}`
			).toString("base64")}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	try {
		const response = await axios(authOptions);
		accessToken = response.data.access_token;
		console.log("Access token refreshed:", accessToken);
	} catch (error) {
		console.error("Failed to refresh access token:", error);
	}
}

// setInterval(refreshAccessToken, 1000 * 60 * 60); // 1 hour in milliseconds

export async function GET() {
	refreshAccessToken();
	return NextResponse.json({ accessToken });
}
