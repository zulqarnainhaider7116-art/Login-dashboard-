import test from 'node:test';
import assert from 'node:assert/strict';
import {
  POP_SOUND_URI,
  PUSH_SOUND_URI,
  CHIME_SOUND_URI,
  SUCCESS_SOUND_URI,
  soundManager,
} from './sound-effects';

test('audio data URIs are valid WAV base64 strings', () => {
  assert.ok(POP_SOUND_URI.startsWith('data:audio/wav;base64,'));
  assert.ok(PUSH_SOUND_URI.startsWith('data:audio/wav;base64,'));
  assert.ok(CHIME_SOUND_URI.startsWith('data:audio/wav;base64,'));
  assert.ok(SUCCESS_SOUND_URI.startsWith('data:audio/wav;base64,'));

  // Ensure they contain actual audio data
  assert.ok(POP_SOUND_URI.length > 500);
  assert.ok(PUSH_SOUND_URI.length > 500);
  assert.ok(CHIME_SOUND_URI.length > 500);
  assert.ok(SUCCESS_SOUND_URI.length > 500);
});

test('soundManager tracks mute state correctly', () => {
  assert.equal(soundManager.getMuted(), false);
  soundManager.setMuted(true);
  assert.equal(soundManager.getMuted(), true);
  soundManager.setMuted(false);
  assert.equal(soundManager.getMuted(), false);
});
