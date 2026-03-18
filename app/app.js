const express = require("express");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const environment = process.env.NODE_ENV || "development";
const version = process.env.APP_VERSION || "1.0.0";

app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>DevOps CI/CD Demo</title>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

      <style>
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #1e3a8a, #0f172a);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }

        .card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          padding: 50px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          max-width: 650px;
        }

        h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        p {
          font-size: 18px;
          opacity: 0.9;
        }

        .stack {
          margin-top: 25px;
          font-weight: 600;
        }

        .info {
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.7;
        }

      </style>
    </head>

    <body>

      <div class="card">

        <h1>💻 DevOps Platform Demo 🍀</h1>

        <p>Welcome to my AWS deployment</p>

        <div class="stack">
          Terraform • Docker • Kubernetes • GitHub Actions • AWS EKS
        </div>

        <div class="info">
          Environment: ${environment} <br>
          Version: ${version} <br>
          Uptime: ${process.uptime().toFixed(2)} seconds
        </div>

        <p style="margin-top:30px;">
          If you are seeing this page, the CI/CD pipeline worked 🎉
        </p>

      </div>

    </body>
  </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});