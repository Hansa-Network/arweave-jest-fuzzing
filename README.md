# SmartWeave Fuzzing in Jest

This package adds simple functions that help SmartWeave developers write fuzzing tests in
jest.

## Recommendations

While the jest fuzzers run, by default jest provides limited information about the inputs
provided in the fuzzer. For your tests, you may desire to use an extension like Matt Phillip's
[jest-expect-message](https://github.com/mattphillips/jest-expect-message).

It is suggested that fuzzing tests use a `dryWrite` to test for 
errors or proper changes.

## Fuzzers

### Wallet

`Fuzzers.wallet()` will generate a JWKInterface object using the Arweave SDK.
Using this wallet requires runAsync to be set to true.
**NOTE:** it is likely that using `Fuzzers.wallet()` as your fuzzer will require a
significant increase with your test timeouts. In our test, a simple connection
& dryWrite 100 times took 1 minute.

## Credits

This package was adapted from the [jest-fuzz](https://github.com/jeffersonmourak/jest-fuzz)
package by Jefferson Moura, Tiogshi Laj, and 0xLogN.
