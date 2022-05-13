import fuzz from './src/fuzzTest';
import fuzzers from './src/fuzzers';
import Fuzzer from './src/Fuzzer';

module.exports = {
    fuzz,
    Fuzzer,
    ...fuzzers,
};
