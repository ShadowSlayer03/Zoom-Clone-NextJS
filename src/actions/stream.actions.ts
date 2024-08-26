"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const tokenProvider = async () => {
  const user = await currentUser();
  const userID = user?.id;

  if (!user) throw new Error("User Not Authenticated!");
  if (!apiKey) throw new Error("API KEY Not Found!");
  if (!apiKey) throw new Error("API SECRET Not Found!");

  const client = new StreamClient(apiKey, apiSecret as string);

  if (typeof userID === "string") {
    const token2 = client.createToken(
      userID,
      Math.floor(Date.now() / 1000) + 60 * 60
    );

    return token2;
  } else {
    return "";
  }
};
