const path = require('path');
const express = require('express');
const app = express();

// Middleware security header, Helmet
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://ajax.googleapis.com"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
    }
}));


// Middleware to serve static files
app.use(express.static('public'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// 404 Page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(2000, () => {
    console.log('Listening on http://localhost:2000');
});
