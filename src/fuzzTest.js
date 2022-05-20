/**
 * Does a fuzzing test. Use similar to "it" or "test" from jest.
 * @param {string} name Name of the fuzzing test.
 * @param {function} fuzzer The fuzzer to use.
 * @param {function} testRunner The test to run.
 * @param {number} iterations The number of times to fuzz (default 100).
 * @param {boolean} runAsync Whether or not to run the test async (default true).
 */
function fuzzTest(name, fuzzer, testRunner, iterations = 100, runAsync = true) {
    test(`FUZZ: ${name}`, async() => {
        for(let i = 0; i < iterations; i++) {
            if(runAsync) await testRunner(await fuzzer());
            else testRunner(fuzzer());
        }
    });

}

export default fuzzTest;