#!/usr/bin/env node
import { randomBytes } from 'crypto';

const token = randomBytes(32).toString('hex');

console.log('\n🔐 Secure Admin Token Generated\n');
console.log('Add this to your .env file:');
console.log(`ADMIN_TOKEN=${token}\n`);
console.log('⚠️  Keep this token secret and never commit to version control!\n');
