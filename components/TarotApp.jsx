"use client";

import { useState } from "react";

const SIMPLE_DECK = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Lovers",
  "The Chariot",
];

export default function TarotApp() {
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState(null);
  const [reading, setReading] = useState("Your reading will appear here.");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Idle");

  // Just to have something for you to click – not important for the API
  function handleShuffle() {
    const random = SIMPLE_DECK[Math.floor(Math.random() * SIMPLE_DECK.length)];
    setCard(random);
  }

  async function handleGetReading() {
    try {
      setLoading(true);
      setStatus("Calling /api/interpret …");
      setReading("Waiting for AI…");

      const promptText = `
You are a tarot expert. The question is: "${question || "general guidance"}".
The selected card is: "${card || "no specific card"}".
Give a short clear reading.
      `.trim();

      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          model: "llama-3.1-70b-versatile",
        }),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const errJson = await res.json();
          msg += errJson.error ? ` – ${errJson.error}` : "";
        } catch (_) {}
        setStatus("Error");
        setReading(`Error from API: ${msg}`);
        return;
      }

      const data = await res.json();
      const text =
        data?.choices?.[0]?.message?.content ||
        "No text returned from API.";

      setStatus("Success");
      setReading(text);
    } catch (err) {
      console.error("CLIENT ERROR calling /api/interpret:", err);
      setStatus("Client error");
      setReading("Client error: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#2b003b",
        color: "#fff",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
        Expert AI Reader – API TEST
      </h1>

      <label style={{ display: "block", marginBottom: "8px" }}>
        Your question (optional):
      </label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #555",
          marginBottom: "16px",
          color: "#000",
        }}
      />

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={handleShuffle}
          style={{
            padding: "10px 16px",
            borderRadius: "4px",
            border: "none",
            background: "#9b59b6",
            color: "#fff",
            fontWeight: 600,
            marginRight: "12px",
            cursor: "pointer",
          }}
        >
          Shuffle (pick random card)
        </button>

        {/* THIS IS THE IMPORTANT BUTTON */}
        <button
          onClick={handleGetReading}
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: "4px",
            border: "none",
            background: loading ? "#555" : "#e74c3c",
            color: "#fff",
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Getting Reading..." : "Get Reading"}
        </button>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>Selected card:</strong>{" "}
        {card ? card : <span style={{ opacity: 0.7 }}>none (optional)</span>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>Status:</strong> {status}
      </div>

      <h2 style={{ marginTop: "24px", marginBottom: "8px" }}>
        Your Professional Reading
      </h2>
      <div
        style={{
          maxWidth: "900px",
          background: "rgba(0,0,0,0.25)",
          padding: "16px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {reading}
      </div>
    </div>
  );
}
