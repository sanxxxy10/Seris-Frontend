import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5500;  

// Set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.redirect("/home"));
    
app.get("/SerisWebs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
           
app.get("/buildyoursite", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "service.html"));
});   
 
app.get("/yourprojects", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "yurp.html"));
});

app.get("/authentication", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "auth.html"));
});
app.get("/serisclients", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "client.html"));
});


// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () =>
  console.log(`🌐 Frontend server running on http://localhost:${PORT}`)
);
