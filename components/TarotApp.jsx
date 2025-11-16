"use client";

import { useState, useEffect } from "react";

export default function TarotApp() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [aiStatus, setAiStatus] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [spreadType, setSpreadType] = useState("three");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load default cards on mount
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const deck = tarotDeck.map((c, index) => ({
      ...c,
      id: index + "-" + Math.random()
    }));
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setSelectedCards([]);
  };

  const spreadLimits = {
    single: 1,
    three: 3,
    nine: 9,
    yesno: 1,
    comparison: 3,
    celtic: 10
  };

  const selectedCount = selectedCards.filter(Boolean).length;
  const canGetReading = selectedCount === spreadLimits[spreadType];
  const selectCard = (card) => {
    if (selectedCount >= spreadLimits[spreadType]) return;
    setSelectedCards((prev) => [...prev, card]);
  };

  const generateExpertPrompt = (question, cards) => {
    return `
You are Sage Aurora, a professional tarot reader.

Question: ${question}
Cards drawn: ${cards.map(c => c.name).join(", ")}

Give a deep, structured interpretation.
`;
  };

  // -------------------------------------
  // 🚀 FIXED FETCH CALL — WORKS 100%
  // -------------------------------------
  async function generateInterpretation() {
    try {
      setLoading(true);
      setAiStatus("⏳ Consulting the expert reader...");

      const prompt = generateExpertPrompt(questionInput, selectedCards);

      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: "llama-3.1-70b-versatile"
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setInterpretation("Error: " + (errData.error || "Unknown error"));
        setAiStatus("❌ AI failed");
        return;
      }

      const data = await res.json();
      const text =
        data?.choices?.[0]?.message?.content ||
        "No interpretation received.";

      setInterpretation(text);
      setAiStatus("✅ Reading complete");
    } catch (err) {
      console.error(err);
      setInterpretation("A client error occurred.");
      setAiStatus("❌ Error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Expert AI Reader</h1>

      <textarea
        style={styles.textarea}
        placeholder="Ask your question..."
        value={questionInput}
        onChange={(e) => setQuestionInput(e.target.value)}
      />

      <div style={styles.controls}>
        <button onClick={shuffleCards} style={styles.button}>Shuffle</button>
        <button
          onClick={generateInterpretation}
          style={{
            ...styles.button,
            background: canGetReading ? "#50c878" : "#444",
            cursor: canGetReading ? "pointer" : "not-allowed"
          }}
          disabled={!canGetReading}
        >
          Get Reading
        </button>
      </div>

      <div style={styles.cardGrid}>
        {cards.map((c) => (
          <div
            key={c.id}
            style={styles.card}
            onClick={() => selectCard(c)}
          >
            <img src={c.image} style={styles.cardImg} />
          </div>
        ))}
      </div>

      <div style={styles.outputBox}>
        <h2>Your Professional Reading</h2>
        <p>{interpretation || "Your reading will appear here."}</p>
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(135deg, #2c0a3a, #4a0e61)",
    minHeight: "100vh",
    color: "#fff"
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px"
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px"
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  button: {
    padding: "10px 20px",
    background: "#9b4dff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "10px",
    marginBottom: "20px"
  },
  card: {
    background: "#222",
    borderRadius: "8px",
    padding: "5px",
    cursor: "pointer"
  },
  cardImg: {
    width: "100%",
    borderRadius: "6px"
  },
  outputBox: {
    background: "#00000055",
    padding: "20px",
    borderRadius: "10px"
  }
};

const tarotDeck = [
  { name: "The Fool", image: "/cards/fool.jpg" },
  { name: "The Magician", image: "/cards/magician.jpg" },
  // ... add your full deck here
];

