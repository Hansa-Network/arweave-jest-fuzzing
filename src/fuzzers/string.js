const Fuzzer = require('../Fuzzer');
const { int } = require('../helper/numbers');

const defaultOptions = {
    length: 125,
    suffix: '',
    prefix: '',
};

function getString(random, length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`\'";:{[}]?/>.<,\\|';
    const charSet = new Array(length).fill('');

    return charSet.map(() => alphabet.charAt(int(random, { min: 0, max: alphabet.length }))).join('');
}

module.exports = Fuzzer((random, options) => {
    const newOptions = {
        ...defaultOptions,
        ...options,
    };

    return () => `${newOptions.prefix}${getString(random, newOptions.length)}${newOptions.suffix}`;
});
