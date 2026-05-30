import { Connection } from "@solana/web3.js";
import { DEVNET_RPC_URL } from "./constants";

export const connection = new Connection(DEVNET_RPC_URL, "confirmed");
