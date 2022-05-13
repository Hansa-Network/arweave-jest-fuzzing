import Fuzzer from '../Fuzzer';
import Arweave from "arweave";

const arweave = Arweave.init({});

module.exports = Fuzzer(async (random, options) => {
    const wallet = await arweave.wallets.generate();
    const address = await arweave.wallets.getAddress(wallet);

    return () => { wallet, address };
});
