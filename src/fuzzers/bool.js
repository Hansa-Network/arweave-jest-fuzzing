import Fuzzer from '../Fuzzer';
import { int } from '../helper/numbers';

const defaultOptions = {
    max: 11,
    min: 0,
};

module.exports = Fuzzer(random => () => !!(int(random, defaultOptions) % 2));
