import { Connection } from "@solana/web3.js";
import axios from "axios";

let prices: {
  [key: string]: {
    price: string;
  };
} = {};
let LAST_UPDATED: number | null = null;

const TOKEN_REFRESH_INTERVAL = 1000 * 60;

export interface tokenDeatils {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  image: string;
  decimals: number;
}

export let SUPPORTED_TOKENS: tokenDeatils[] = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Solana_cryptocurrency_two.jpg",
    decimals: 9,
  },
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1vAKYEl0YffTpWSxrqEi_gmUsl-0BuXSKMQ&s",
    decimals: 6,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSxrpym7ij1Hf6zQOltcDORlrJGyj1kPf3A&s",
    decimals: 6,
  },
];

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
