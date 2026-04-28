const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;

const server = http.createServer((req, res) => {
    const host = req.headers.host || '';
    const parts = host.split('.');

    // Subdomain detection (e.g., sayak.localhost:5500)
    let isSubdomain = false;
    if (parts.length > 1 && !parts[0].includes('localhost') && !parts[0].includes('127.0.0.1')) {
        isSubdomain = true;
    }

    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    // If it's a subdomain and the path is just root, serve the profile.html template
    // This simulates the Vercel middleware locally
    if (isSubdomain && (req.url === '/' || req.url === '')) {
        filePath = './talent/profile.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content || '404 Not Found', 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

});

server.listen(PORT, () => {
    console.log(`
🚀 Hustle House Local Dev Server
--------------------------------
Main Site: http://localhost:${PORT}
Subdomain: http://sayak.localhost:${PORT} (Tests subdomain routing)

Note: Most browsers automatically resolve *.localhost to 127.0.0.1.
If they don't, add '127.0.0.1 sayak.localhost' to your C:\\Windows\\System32\\drivers\\etc\\hosts file.
    `);
});
