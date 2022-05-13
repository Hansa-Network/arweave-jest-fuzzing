import Fuzzer from '../Fuzzer';
import { float } from '../helper/numbers';

const defaultOptions = {
    max: Infinity,
    min: -Infinity,
};

module.exports = Fuzzer((random, options) => {
    const newOptions = {
        ...defaultOptions,
        ...options,
    };

    return () => float(random, newOptions);
});
