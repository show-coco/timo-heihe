#!/usr/bin/env node

/* eslint-disable */

const fs = require('fs');

const template = fs.readFileSync('app.template.yaml').toString();
let content = template;

for (const match of template.matchAll(/\${{([A-Z_]*)}}/g)) {
  const envName = `APP_${match[1]}`;
  content = content.replace(match[0], `'${process.env[envName]}'`);
}

fs.writeFileSync('app.yaml', content);
