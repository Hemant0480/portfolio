// =========================================================================
// SIMPLE NODE.JS & EXPRESS.JS SERVER FOR HEMANT KUMAR PORTFOLIO
// =========================================================================

// Import required Express and Node modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize the Express app
const app = express();
let PORT = process.env.PORT || 3000;

// Middleware to parse incoming form data and JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static website files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Path to portfolio JSON data file
const dataPath = path.join(__dirname, 'data', 'portfolioData.json');

// Helper function to read portfolio data safely
function loadData() {
  try {
    const fileData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.log('Error reading portfolio data:', error);
    return {};
  }
}

// =========================================================================
// ROUTE 1: GET /api/all - Fetch all portfolio data
// =========================================================================
app.get('/api/all', (req, res) => {
  const data = loadData();
  res.json({ success: true, data: data });
});

// =========================================================================
// ROUTE 2: GET /api/projects - Fetch project list or single project details
// =========================================================================


// =========================================================================
// ROUTE 3: POST /api/contact - Receive and save contact form messages
// =========================================================================
app.post('/api/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject || 'Portfolio Message';
  const message = req.body.message;

  // Simple validation check
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in your name, email, and message.'
    });
  }

  // Create new message object
  const newMessage = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    date: new Date().toLocaleString()
  };

  // Save to messages log file
  const messagesFilePath = path.join(__dirname, 'data', 'messages.json');
  let messagesList = [];

  if (fs.existsSync(messagesFilePath)) {
    try {
      const existingContent = fs.readFileSync(messagesFilePath, 'utf8');
      messagesList = JSON.parse(existingContent);
    } catch (err) {
      messagesList = [];
    }
  }

  messagesList.push(newMessage);
  fs.writeFileSync(messagesFilePath, JSON.stringify(messagesList, null, 2));

  console.log(`[New Message] Received from ${name} (${email})`);

  // Send success response
  res.json({
    success: true,
    message: `Thank you ${name}! Your message has been received successfully.`
  });
});

// =========================================================================
// ROUTE 4: GET /api/download-resume - Download Hemant Kumar's Resume file
// =========================================================================
app.get('/api/download-resume', (req, res) => {
  const resumeText = `
===========================================================
                     HEMANT KUMAR
===========================================================
Bareilly, Uttar Pradesh, India | +91 8299027489
Email: hemantmishra8299@gmail.com
LinkedIn: linkedin.com/in/hemant-kumar-3a9175339
GitHub: github.com/Hemant0480

SUMMARY:
Final-year B.Tech student (Invertis University, 2023-2026, CGPA 7.86)
with hands-on experience in full-stack web development (Node.js, Express, 
JavaScript, HTML/CSS) and backend database management (MongoDB).

EDUCATION:
- B.Tech (2023 - 2026), Invertis University - CGPA: 7.86
- Class 12 (2023), UP Board
- Class 10 (2021), UP Board - 74%

EXPERIENCE:
Backend Developer Intern | techiguru.in
- Built web solutions using MERN stack (MongoDB, Express, React, Node.js).
- Optimized database schemas in MongoDB.
- Identified and fixed front-end and back-end bugs.

PROJECTS:
- Myntra Clone (HTML5, CSS3, JavaScript Flexbox layout)
- MERN Stack Web Platform (Node.js, Express REST API, MongoDB)
- Sales Data Analytics Dashboard (Power BI, DAX)

LEADERSHIP & ACHIEVEMENTS:
- Presented paper at ICCT-2025 International Conference on Neuralink.
- Team Lead for college projects (3-5 members).
- Awarded Best Project Presentation during academics.
===========================================================
  `;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="Hemant_Kumar_Resume.txt"');
  res.send(resumeText.trim());
});

// Start Express server with automatic port error handling
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Hemant Kumar Portfolio Server running on: http://localhost:${PORT}`);
  console.log(`====================================================`);
});

// Handle EADDRINUSE (port already in use) gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is already in use. Switching to port ${Number(PORT) + 1}...`);
    PORT = Number(PORT) + 1;
    server.listen(PORT);
  } else {
    console.error('Server error:', err);
  }
});
