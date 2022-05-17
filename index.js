import fuzz from    './src/fuzzTest';
import string from  './src/fuzzers/string';
import int from     './src/fuzzers/int';
import float from   './src/fuzzers/float';
import bool from    './src/fuzzers/bool';
import array from   './src/fuzzers/array';
import wallet from  './src/fuzzers/wallet';

const Fuzzers = {
    string,
    int,
    float,
    bool,
    array,
    wallet
};

export { 
    fuzz, 
    Fuzzers
};