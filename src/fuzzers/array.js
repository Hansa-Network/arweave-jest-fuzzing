import Fuzzer from '../Fuzzer';
import { int } from '../helper/numbers';
import intFuzzer from './int';

const defaultOptions = {
    type: intFuzzer(),
    maxLength: 300,
    minLength: 1,
};

function generateArray(random, options) {
    const length = int(random, { min: options.minLength, max: options.maxLength });
    const array = new Array(length).fill(0);

    return array.map(() => options.type());
}

module.exports = Fuzzer((random, options) => {
    const newOptions = {
        ...defaultOptions,
        ...options,
    };

    if (newOptions.minLength < 1) {
        throw new Error('Array Fuzzer: The minimum length can\'t be less than 1');
    }

    if (typeof newOptions.type !== 'function') {
        throw new Error(`Array Fuzzer: You can't use a ${typeof newOptions.type} as fuzzer.`);
    }

    return () => generateArray(random, newOptions);
});
