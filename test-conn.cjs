
const https = require('https');

const url = 'https://udjnlkxefegwrsejvlvd.supabase.co';

console.log('Testing connection to:', url);

const req = https.get(url, (res) => {
    console.log('StatusCode:', res.statusCode);
    console.log('Headers:', res.headers);
    res.on('data', () => { });
    res.on('end', () => console.log('Response ended'));
});

req.on('error', (e) => {
    console.error('Connection Error:', e);
});

req.end();
