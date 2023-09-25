const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Dummy authentication function (replace with your actual authentication logic)
function isAuthenticated(req) {
  // Implement your authentication logic here
  // For example, check for a session variable
  return req.session.isAuthenticated === true;
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Protect access to the script.js file
app.get('/js/script.js', (req, res) => {
  if (isAuthenticated(req)) {
    // If authenticated, send the JavaScript file
    res.sendFile(path.join(__dirname, 'public/js/script.js'));
  } else {
    // If not authenticated, deny access with a 403 status
    res.status(403).send('Access denied');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
