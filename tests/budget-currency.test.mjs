import assert from 'node:assert/strict';
import { phoneOutputLimit } from '../phone-budget.js';
import { currencyInfo, getCurrencies, normalizeCurrency } from '../currencies.js';

assert.equal(phoneOutputLimit(400, 4096, 0), 4496, 'courier now has reasoning headroom');
assert.equal(phoneOutputLimit(300, 4096, 20000), 4396, 'replies retain reasoning headroom');
assert.equal(phoneOutputLimit(400, 0, 0), 400, 'headroom 0 restores original task limit');
assert.equal(phoneOutputLimit(400, 4096, 512), 512, 'configured hard ceiling is respected');
assert.equal(phoneOutputLimit(30000, 16000, 0), 32000, 'hard safety ceiling is respected');
assert.equal(currencyInfo('USD').name, 'US Dollar', 'currency display is English');
assert.equal(currencyInfo('AUD').name, 'Australian Dollar');
assert.equal(currencyInfo('AZN').name, 'Azerbaijani Manat');
assert.equal(normalizeCurrency('₽'), 'RUB', 'legacy currency codes still migrate');
assert.equal(new Set(getCurrencies().map(v => v.code)).size, getCurrencies().length);
console.log('Budget and currency regression checks passed.');
