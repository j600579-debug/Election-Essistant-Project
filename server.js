/**
 * @file server.js
 * @description ElectED - Election Education AI Backend Server
 * @version 3.0.0
 * @security API key loaded from environment variable ONLY - never hardcoded
 */

'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// SECURITY: API key from environment variable ONLY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml'
};

const SYSTEM_PROMPT = `You are ElectED Assistant, an expert civic education AI specializing in election processes worldwide. Help users understand voter registration, election timelines, voting steps, voting systems, electoral terminology, election commissions, ballot counting, and voter rights. Be clear, friendly, educational, and encouraging. Keep responses to 2-4 short paragraphs. Use simple language. Always promote democratic participation.`;

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { messages } = JSON.parse(body);
        if (!Array.isArray(messages)) { res.writeHead(400); res.end('Bad request'); return; }

        const payload = JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: messages.slice(-10)
        });

        const options = {
          hostname: 'api.anthropic.com',
          path: '/v1/messages',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Length': Buffer.byteLength(payload)
          }
        };

        const apiReq = https.request(options, apiRes => {
          let data = '';
          apiRes.on('data', chunk => { data += chunk; });
          apiRes.on('end', () => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(data); });
        });
        apiReq.on('error', err => { res.writeHead(503); res.end(JSON.stringify({ error: 'Service unavailable' })); });
        apiReq.setTimeout(30000, () => { apiReq.destroy(); });
        apiReq.write(payload);
        apiReq.end();
      } catch (e) { res.writeHead(400); res.end('Bad request'); }
    });
    return;
  }

  if (req.method === 'GET') {
    const safePath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.normalize(path.join(__dirname, safePath));
    if (!filePath.startsWith(__dirname)) { res.writeHead(403); res.end('Forbidden'); return; }
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';
    fs.readFile(filePath, (err, content) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`\n🗳️  ElectED running at http://localhost:${PORT}\n`);
});

module.exports = { server };
