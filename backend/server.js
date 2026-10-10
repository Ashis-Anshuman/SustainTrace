import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

if(process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));
}

// In-memory vault storage for uploaded PDFs and images
const vaultDocuments = [];

app.post("/api/vault/upload", (req, res) => {
    const { filename, fileType, fileSize, fileHash, category } = req.body;
    if (!filename) {
        return res.status(400).json({ success: false, message: "Filename is required" });
    }
    const document = {
        id: `vault-${Date.now()}`,
        filename,
        fileType: fileType || "application/octet-stream",
        fileSize: fileSize || "1.0 MB",
        fileHash: fileHash || `sha256:${Date.now().toString(16)}`,
        category: category || "General Evidence",
        status: "Stamped & Stored",
        uploadedAt: new Date().toISOString()
    };
    vaultDocuments.push(document);
    return res.status(201).json({ success: true, document });
});

app.get("/api/vault/files", (req, res) => {
    return res.json({ success: true, count: vaultDocuments.length, files: vaultDocuments });
});

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.use((req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//     });
// }

app.listen(PORT, () => {
    console.log(`app listen on the port ${PORT}`);
});