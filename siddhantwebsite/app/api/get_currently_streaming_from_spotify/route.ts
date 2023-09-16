import { NextResponse } from "next/server";
import fetch from "node-fetch"; // node-fetch is more suitable for server-side

// If your .env file is at the root of your Next.js project, you don't need this line
require("dotenv").config({ path: "../../../.env" });

export async function GET() {
	// Fetch the access token from your other route
	// Replace this URL with the correct URL of your deployed function
	const tokenRes = await fetch(
		`${process.env.site}/api/get_access_token_from_spotify`
	);
	const tokenData: any = await tokenRes.json();
	const accessToken = tokenData.accessToken;

	// Fetch the currently playing song from Spotify
	const res = await fetch(
		"https://api.spotify.com/v1/me/player/currently-playing",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (res.ok) {
		const data = await res.json();
		/*
		DONE
		to extract:
		1. from the album
			Song Cover URL
			- images[0] // 0 ~ 640 x 640, 1 ~ 300 x 300, 2 ~ 64 x 64
		2. from the artists
			All of the names of the people on the song 
		*/
		let out = { title: "", "image-url": "", artists: "", "song-url": "" }; // song ~ (data as any)["item"]["external_urls"]["spotify"]
		out["title"] = (data as any)["item"]["name"];
		out["image-url"] = (data as any)["item"]["album"]["images"][0];
		out["artists"] = (data as any)["item"]["album"]["artists"].map((e: any) => {
			return e["name"];
		});
		out["song-url"] = (data as any)["item"]["external_urls"]["spotify"];
		console.log(out);
		return NextResponse.json({ status: "OK", out });
	} else {
		console.log("Error:", res.status);
		return NextResponse.json({ status: "NOTOK" });
	}
}
