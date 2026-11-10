import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getThemeConfig,
  validateUsernameOrEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  formatSocialProviderName,
} from './auth-validation';

test('theme config returns correct values for boy', () => {
  const config = getThemeConfig('boy');
  assert.equal(config.gender, 'boy');
  assert.equal(config.primaryColor, '#2563EB');
  assert.equal(config.companionName, 'Buddy');
  assert.equal(config.companionType, 'Puppy Dog');
  assert.ok(config.shadow3dClass.includes('blue'));
});

test('theme config returns correct values for girl', () => {
  const config = getThemeConfig('girl');
  assert.equal(config.gender, 'girl');
  assert.equal(config.primaryColor, '#7C3AED');
  assert.equal(config.companionName, 'Mimi');
  assert.equal(config.companionType, 'Cute Kitten');
  assert.ok(config.shadow3dClass.includes('purple'));
});

test('username/email validation handles empty and short inputs', () => {
  assert.equal(validateUsernameOrEmail('').valid, false);
  assert.equal(validateUsernameOrEmail('  ').valid, false);
  assert.equal(validateUsernameOrEmail('ab').valid, false);
  assert.equal(validateUsernameOrEmail('alex').valid, true);
});

test('username/email validation checks valid and invalid email addresses', () => {
  assert.equal(validateUsernameOrEmail('notanemail@').valid, false);
  assert.equal(validateUsernameOrEmail('user@test').valid, false);
  assert.equal(validateUsernameOrEmail('user@domain.com').valid, true);
});

test('password validation enforces length requirement', () => {
  assert.equal(validatePassword('').valid, false);
  assert.equal(validatePassword('123').valid, false);
  assert.equal(validatePassword('1234').valid, true);
  assert.equal(validatePassword('supersecret').valid, true);
});

test('name validation enforces minimum length', () => {
  assert.equal(validateName('').valid, false);
  assert.equal(validateName('a').valid, false);
  assert.equal(validateName('Luna').valid, true);
});

test('confirm password validation checks matching passwords', () => {
  assert.equal(validateConfirmPassword('pass123', '').valid, false);
  assert.equal(validateConfirmPassword('pass123', 'different').valid, false);
  assert.equal(validateConfirmPassword('pass123', 'pass123').valid, true);
});

test('social provider name formatting', () => {
  assert.equal(formatSocialProviderName('google'), 'Google');
  assert.equal(formatSocialProviderName('apple'), 'Apple');
  assert.equal(formatSocialProviderName('facebook'), 'Facebook');
});

