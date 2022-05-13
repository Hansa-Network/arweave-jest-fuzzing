global.fuzz = global.fuzz || {};

// TODO: change this into a single test
function fuzzTest(name, fuzzer, testRunner) {
    const iterations = global.fuzz.iterations || 5000;

    const testCase = index => test(`${name} -> FUZZ-${index}`, () => testRunner(fuzzer()));

    for (let i = 0; i < iterations; i += 1) {
        describe(name, testCase.bind(null, i));
    }
}

export default fuzzTest;