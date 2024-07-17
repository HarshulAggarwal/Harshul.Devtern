const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Allow CORS for all origins (for development purposes)
app.use(cors());

app.use(bodyParser.json());

// Dummy user data (replace with a real database in production)
const users = [
    {
        username: 'testuser',
        password: '$2b$10$w3TIRFZy5Qh.Qb.W6s.dl.OX8jvQdRtpI/NOhLqE8tZ9N5iv4K8J2' // hashed password for 'password123'
    }
];

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Incorrect username or password');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
