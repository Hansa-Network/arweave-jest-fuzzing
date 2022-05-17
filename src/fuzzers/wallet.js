import Arweave from "arweave";

const arweave = Arweave.init({});

/**
 * @returns {wallet, address} wallet: JWK, address: string
 */
export default function WalletFuzzer() {
    return async() => { 
        const wallet = await arweave.wallets.generate();
        const address = await arweave.wallets.getAddress(wallet);
        return { wallet, address };
    };
}
