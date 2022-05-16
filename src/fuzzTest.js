global.fuzz = global.fuzz || {};

// TODO: change this into a single test
function fuzzTest(name, fuzzer, testRunner, runAsync = false) {
    const iterations = global.fuzz.iterations || 100;

    const testCase = index => test(`${name} -> FUZZ-${index}`, () => testRunner(fuzzer()));

    for (let i = 0; i < iterations; i += 1) {
        describe(`FUZZ: ${name}`, testCase.bind(null, i));
    }

    describe(`FUZZ: ${name}`, async() => {
        for(let i = 0; i < iterations; i++) {
            if(runAsync) await testRunner(await fuzzer());
            else testRunner(fuzzer());
        }
    });

}

export default fuzzTest;