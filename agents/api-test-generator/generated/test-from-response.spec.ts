import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../input/response.json');

test('Positive test: Valid JSON data', async () => {
  const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
  expect(data.status).toBe(200);
  expect(data.body.id).toBeDefined();
  expect(typeof data.body.id).toBe('number');
  expect(data.body.username).toBeDefined();
  expect(typeof data.body.username).toBe('string');
  expect(data.body.email).toBeDefined();
  expect(typeof data.body.email).toBe('string');
});

test('Negative test: Missing or invalid data', async () => {
  const invalidData = { status: 500, body: {} };
  expect(invalidData.status).toBe(500);
 // expect(invalidData.body.id).toBeUndefined();
  expect(invalidData.body).not.toHaveProperty('username');
  expect(invalidData.body).not.toHaveProperty('email');
});


test('Edge-case test: Empty strings, large numbers, nulls', async () => {
  const edgeCaseData = {
    status: 200,
    body: {
      id: 1234567890,
      username: '',
      email: 'test@example.com',
    },
  };
  expect(edgeCaseData.status).toBe(200);
  expect(edgeCaseData.body.id).toBe(1234567890);
  expect(edgeCaseData.body.username).toBe('');
  expect(edgeCaseData.body.email).toBe('test@example.com');

  const edgeCaseData2 = {
    status: 200,
    body: {
      id: null,
      username: 'testuser',
      email: null,
    },
  };
  expect(edgeCaseData2.status).toBe(200);
  expect(edgeCaseData2.body.id).toBe(null);
  expect(edgeCaseData2.body.username).toBe('testuser');
  expect(edgeCaseData2.body.email).toBe(null);
});
