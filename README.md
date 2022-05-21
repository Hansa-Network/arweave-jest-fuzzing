# SmartWeave Fuzzing in Jest

This package adds simple functions that help SmartWeave developers write fuzzing tests in
jest.

## Fuzz Test

Fuzzing tests are designed to be similar to the typical jest `test()`, or its alias `it()`.

```javascript
import { fuzz } from 'arweave-jest-fuzzing';

describe('NAME OF TEST SUITE', () => {
    it(name, test);
    fuzz(name, fuzzer, test, iterations, runAsync);
});
```

**fuzz(name, fuzzer, test, iterations, runAsync)**

- **name**: Similar to the jest test, this parameter is just the name of the test.
- **fuzzer**: A function that is used to generate values for the fuzzing test.
- **test**: Similar to the jest test, it is the function that the test runs, but it also takes in a parameter as a fuzzing value.
- **iterations**: (optional, default=100) the number of times that the fuzzer should run. Be careful how high you set it, as the test may timeout, so adjust your timeout settings accordingly.
- **runAsync**: (optional, default=true) whether to run the test async.

#### Example:

This example (doesn't include contract setup) uses RedStone smart contracts, but we encourage you to use any framework if you believe it fits.

```javascript
import { fuzz, Fuzzers } from 'arweave-jest-fuzzing';
define contract as Contract;

describe('Example Arweave Smart Contract Tests', () => {
    fuzz('Allow wallet to call function.', Fuzzers.wallet(), async(fuzzWallet) => {
        contract.connect(fuzzWallet);
        const result = await contract.dryWrite({
            function: 'smart-contract-function'
        });
        expect(result.type).toBe('ok');
    });
});
```

## Fuzzers

Fuzzers generate the data within the fuzzing thats used within your test. There are predefined fuzzers for you to use. You can find them under the Fuzzers object:

```javascript
import { Fuzzers } from 'arweave-jest-fuzzing';
Fuzzers.string();
Fuzzers.int();
Fuzzers.float();
...
```

Feel free to issue a pull request if you believe that you've designed an especially useful one for the Arweave community.

### String

`Fuzzers.string(options)` will generate a string that could have any characters from the keyboard.The **options** parameter is an optional object:

- **length**: Length of the string to test with (default = 125).
- **suffix**: A suffix to append at the end of the string.
- **prefix**: A prefix to append at the start of the string.

### Int

`Fuzzers.int(options)` will generate an integer number.The **options** parameter is an optional object:

- **min**: Minimum value to generate (default = -Infinity).
- **max**: Maximum value to generate (default = Infinity).

### Float

`Fuzzers.float(options)` will generate a float number.
The **options** parameter is an optional object:

- **min**: Minimum value to generate (default = -Infinity).
- **max**: Maximum value to generate (default = Infinity).

### Bool

`Fuzzers.bool()` will generate a true or false value.
Provided on the assumption that will be used in conjunction with other fuzzers.

### Wallet

`Fuzzers.wallet()` will generate a JWKInterface object using the Arweave SDK.
Using this wallet requires runAsync to be set to true.
**NOTE:** it is likely that using `Fuzzers.wallet()` as your fuzzer will require a
significant increase with your test timeouts. In our test, a simple connection
& dryWrite 100 times took 1 minute.

### Array

`Fuzzers.array(options)` will generate variable length arrays.
The **options** parameter is an optional object:

- **type**: A fuzzer function to generate the array's elements with (default = Fuzzers.int()).
- **minLength**: The minimum length of the array (default = 1).
- maxLength: The maximum length of the array (default = 300).

### Custom Fuzzers

You can create more complex fuzzers yourself with the `Fuzzer()` function.
```javascript
import { Fuzzer, Fuzzers } from 'arweave-jest-fuzzing`;

const exampleFuzzer = Fuzzer({
    exampleName: Fuzzers.string(),
    exampleTokenAmount: Fuzzers. Fuzzers.int()
});

describe('Example test suite.', () => {
    fuzz('Example test.', exampleFuzzer, dataFunc => {
        const data = await dataFunc();
        expect(typeof(data.exampleName)).toBe('string');
        expect(typeof(data.exampleTokenAmount)).toBe('number');
        
        // Write your test...
    });
});
```

## Recommendations

While the jest fuzzers run, by default jest provides limited information about the inputs
provided in the fuzzer. For your tests, you may desire to use an extension like Matt Phillip's
[jest-expect-message](https://github.com/mattphillips/jest-expect-message).

It is suggested that fuzzing tests use a `dryWrite` to test for errors or proper changes if 
you are using RedStone contracts. Remember to adjust your logging level accordingly.

## Credits

This package was adapted from the [jest-fuzz](https://github.com/jeffersonmourak/jest-fuzz)
package by Jefferson Moura, Tiogshi Laj, and 0xLogN.
