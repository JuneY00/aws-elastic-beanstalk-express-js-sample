const assert = require('assert');
const { getMessage } = require('./app');

const actualMessage = getMessage();

assert.strictEqual(actualMessage, 'Hello World!');

console.log("Test passed: getMesage returns 'Hello World!'")