import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

let prices: {
  [key: string]: {
    price: string;
  };
} = {};
let LAST_UPDATED: number | null = null;

const TOKEN_REFRESH_INTERVAL = 1000 * 60;

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_REFRESH_INTERVAL
  ) {
    //refresh price at 60sec interval
    try {
      const response = await axios.get(
        "https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );

      prices = response.data.data;
      LAST_UPDATED = new Date().getTime();
    } catch (error) {
      console.log(error);
    }
  }
  //returns the file with the price
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.mint].price,
  }));
}

getSupportedTokens();
