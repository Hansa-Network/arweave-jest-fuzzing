const string    = require('./fuzzers/string');
const int       = require('./fuzzers/int');
const float     = require('./fuzzers/float');
const bool      = require('./fuzzers/bool');
const wallet    = require('./fuzzers/wallet');
const Arweave   = require('arweave');

const arweave = Arweave.init({});

async function testInvalidInputTypes(contract, dryWriteInput, wallet = null) {
    if (wallet == null)
        wallet = await arweave.wallets.generate();
    InputTypesToDefaultValue.wallet = wallet;

    const typeEntries = Object.entries(Types);
    const inputKeys = Object.keys(dryWriteInput);
    const fuzzableEntries = [];
    const fuzzableKeys = [];

    // Finds input entries that can be fuzzed.
    for (let key of inputKeys) {
        const entry = typeEntries.find(x => x[1] === dryWriteInput[key]);
        if (entry !== undefined) {
            fuzzableEntries.push([key, inputKeys[key]]); 
            fuzzableKeys.push(key);
        }
    }

    // Fuzzes for errors (unfinished)
    for (let entry of fuzzableEntries) {
        const inputCopy = deepClone(dryWriteInput);
        const curKey = entry[0];

        for(let key of inputKeys) {
            if(fuzzableKeys.includes(key)) {
                
            }
            inputCopy[key]
        }
    }
}

const InputTypesToFuzzer = {
    float: float(),
    int: int(),
    boolean: bool(),
    string: string(),
    wallet: wallet()
}

const InputTypesToDefaultValue = {
    float: 0.1,
    int: 1,
    boolean: false,
    string: 'hello world',
    wallet: null
}

export const InputTypes = {
    float: '___float___',
    int: '___int___',
    boolean: '___boolean___',
    string: '___string___',
    wallet: '___wallet___',
};

// @author Jagathishrex
function deepClone(src) {
    let target = {};
    let keys = Object.keys(src);
    for (let i = 0, len = keys.length; i < len; i++) {
        let key = keys[i];
        if (src.hasOwnProperty(key)) {
            // if the value is a referece(object), recursively copy all properties by calling deepClone
            let val = src[key];
            let isObj = isObject(val);
            if (isObj) {
                target[key] = deepClone(val);
            } else {
                target[key] = val;
            }
        }
    }
    return target;
}

//export default testInvalidInputTypes;