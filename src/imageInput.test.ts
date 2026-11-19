import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAcceptableImage, MAX_IMAGE_BYTES } from './imageInput.ts';

test('null and undefined are rejected', () => {
  assert.equal(isAcceptableImage(null), false);
  assert.equal(isAcceptableImage(undefined), false);
});

test('a PDF is rejected', () => {
  assert.equal(isAcceptableImage({ type: 'application/pdf', size: 1024 }), false);
});

test('a large non-image is rejected', () => {
  assert.equal(
    isAcceptableImage({ type: 'application/pdf', size: 50_000_000 }),
    false,
  );
});

test('an image is accepted', () => {
  assert.equal(isAcceptableImage({ type: 'image/png', size: 1024 }), true);
});

test('an empty 0-byte image is rejected', () => {
  assert.equal(isAcceptableImage({ type: 'image/png', size: 0 }), false);
});

test('a file exactly MAX_IMAGE_BYTES is accepted', () => {
  assert.equal(
    isAcceptableImage({ type: 'image/jpeg', size: MAX_IMAGE_BYTES }),
    true,
  );
});

test('a file MAX_IMAGE_BYTES + 1 is rejected', () => {
  assert.equal(
    isAcceptableImage({ type: 'image/jpeg', size: MAX_IMAGE_BYTES + 1 }),
    false,
  );
});
