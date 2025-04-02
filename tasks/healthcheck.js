#!/usr/bin/env node

const url = `http://localhost:${process.env.PORT ?? 4321}/api/health`;
const response = await fetch(url);

if (!response.ok) {
  console.error(`Health check failed: ${response.status}: ${response.statusText}`);
  process.exit(1);
}

const json = await response.json();
if (json.status !== 'ok') {
  console.error(`Health check failed: invalid response`, json);
  process.exit(1);
}

console.log(`Health check passed.`);
