const fuzz = require('./src/fuzzTest');
const string = require('./src/fuzzers/string');
const int = require('./src/fuzzers/int');
const float = require('./src/fuzzers/float');
const bool = require('./src/fuzzers/bool');
const array = require('./src/fuzzers/array');
const wallet = require('./src/fuzzers/wallet');
const Fuzzer = require('./src/Fuzzer');
//import testInvalidInputTypes, { InputTypes } from './src/testInvalidInput';

const Fuzzers = {
    string,
    int,
    float,
    bool,
    array,
    wallet
};

module.exports = {
    fuzz,
    Fuzzers,
    Fuzzer
};