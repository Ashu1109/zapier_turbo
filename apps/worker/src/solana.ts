import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import base58 from "bs58";
import { SOLANA_PRIVATE_KEY } from "./config";
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
export async function send_solana(amount: string, to: string) {
   try {
    const keyPair = Keypair.fromSecretKey(base58.decode(SOLANA_PRIVATE_KEY));
    const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: keyPair.publicKey,
            toPubkey: new PublicKey(to),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
    )
    await sendAndConfirmTransaction(connection, transferTransaction, [keyPair]);
    console.log("Transaction sent");
   } catch (error) {
    throw new Error("Error sending transaction");
   }
}  