// =====================================================
//  ElectED - Election Education AI Backend Server
//  Run: node server.js
//  Then open: http://localhost:3000
// =====================================================

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ====================================================
//  🔑 PUT YOUR ANTHROPIC API KEY HERE
// ====================================================
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';
// ====================================================

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon'
};

const SYSTEM_PROMPT = `You are ElectED Assistant, an expert civic education AI specializing in election processes worldwide.
Help users understand:
- Voter registration processes and deadlines
- Election timelines and key dates
- Step-by-step voting process
- Different voting systems (first-past-the-post, proportional representation, etc.)
- Electoral terminology and concepts
- Roles of election commissions, candidates, and voters
- How ballots are counted and results declared
- Voter rights and protections
- EVM machines, VVPAT, paper ballots
- Campaign rules and blackout periods

Be clear, friendly, educational, and encouraging. Keep responses concise (2-4 short paragraphs).
Use simple language. Use emojis occasionally to make it engaging.
Always promote democratic participation.
If asked about a specific country, provide relevant information for that country when possible.`;

const server = http.createServer((req, res) => {

  // ── CORS headers ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── AI Chat API endpoint ──
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { messages } = JSON.parse(body);

        const payload = JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: messages
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
          apiRes.on('data', chunk => data += chunk);
          apiRes.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
          });
        });

        apiReq.on('error', err => {
          console.error('API Error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API connection failed' }));
        });

        apiReq.write(payload);
        apiReq.end();

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
    });
    return;
  }

  // ── Serve static files ──
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   🗳️  ElectED Server is RUNNING!          ║');
  console.log('║                                          ║');
  console.log(`║   Open: http://localhost:${PORT}           ║`);
  console.log('║                                          ║');
  console.log('║   Press Ctrl+C to stop the server       ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
});
