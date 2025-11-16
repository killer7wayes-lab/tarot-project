'use client'
import { useState, useEffect } from 'react'

// Complete 78-card Tarot deck
const tarotCards = [
  // Major Arcana (22 cards)
  { id: 0, name: "The Fool", icon: "🃏" },
  { id: 1, name: "The Magician", icon: "🪄" },
  { id: 2, name: "The High Priestess", icon: "🌙" },
  { id: 3, name: "The Empress", icon: "👑" },
  { id: 4, name: "The Emperor", icon: "🏛️" },
  { id: 5, name: "The Hierophant", icon: "⛪" },
  { id: 6, name: "The Lovers", icon: "💑" },
  { id: 7, name: "The Chariot", icon: "🛡️" },
  { id: 8, name: "Strength", icon: "🦁" },
  { id: 9, name: "The Hermit", icon: "🧙" },
  { id: 10, name: "Wheel of Fortune", icon: "🎡" },
  { id: 11, name: "Justice", icon: "⚖️" },
  { id: 12, name: "The Hanged Man", icon: "🙃" },
  { id: 13, name: "Death", icon: "💀" },
  { id: 14, name: "Temperance", icon: "🥃" },
  { id: 15, name: "The Devil", icon: "😈" },
  { id: 16, name: "The Tower", icon: "🏰" },
  { id: 17, name: "The Star", icon: "⭐" },
  { id: 18, name: "The Moon", icon: "🌕" },
  { id: 19, name: "The Sun", icon: "☀️" },
  { id: 20, name: "Judgement", icon: "👼" },
  { id: 21, name: "The World", icon: "🌍" },
  
  // Wands Suite (14 cards)
  { id: 22, name: "Ace of Wands", icon: "🔥" },
  { id: 23, name: "Two of Wands", icon: "🔥" },
  { id: 24, name: "Three of Wands", icon: "🔥" },
  { id: 25, name: "Four of Wands", icon: "🔥" },
  { id: 26, name: "Five of Wands", icon: "🔥" },
  { id: 27, name: "Six of Wands", icon: "🔥" },
  { id: 28, name: "Seven of Wands", icon: "🔥" },
  { id: 29, name: "Eight of Wands", icon: "🔥" },
  { id: 30, name: "Nine of Wands", icon: "🔥" },
  { id: 31, name: "Ten of Wands", icon: "🔥" },
  { id: 32, name: "Page of Wands", icon: "🔥" },
  { id: 33, name: "Knight of Wands", icon: "🔥" },
  { id: 34, name: "Queen of Wands", icon: "🔥" },
  { id: 35, name: "King of Wands", icon: "🔥" },
  
  // Cups Suite (14 cards)
  { id: 36, name: "Ace of Cups", icon: "💧" },
  { id: 37, name: "Two of Cups", icon: "💧" },
  { id: 38, name: "Three of Cups", icon: "💧" },
  { id: 39, name: "Four of Cups", icon: "💧" },
  { id: 40, name: "Five of Cups", icon: "💧" },
  { id: 41, name: "Six of Cups", icon: "💧" },
  { id: 42, name: "Seven of Cups", icon: "💧" },
  { id: 43, name: "Eight of Cups", icon: "💧" },
  { id: 44, name: "Nine of Cups", icon: "💧" },
  { id: 45, name: "Ten of Cups", icon: "💧" },
  { id: 46, name: "Page of Cups", icon: "💧" },
  { id: 47, name: "Knight of Cups", icon: "💧" },
  { id: 48, name: "Queen of Cups", icon: "💧" },
  { id: 49, name: "King of Cups", icon: "💧" },
  
  // Swords Suite (14 cards)
  { id: 50, name: "Ace of Swords", icon: "⚔️" },
  { id: 51, name: "Two of Swords", icon: "⚔️" },
  { id: 52, name: "Three of Swords", icon: "⚔️" },
  { id: 53, name: "Four of Swords", icon: "⚔️" },
  { id: 54, name: "Five of Swords", icon: "⚔️" },
  { id: 55, name: "Six of Swords", icon: "⚔️" },
  { id: 56, name: "Seven of Swords", icon: "⚔️" },
  { id: 57, name: "Eight of Swords", icon: "⚔️" },
  { id: 58, name: "Nine of Swords", icon: "⚔️" },
  { id: 59, name: "Ten of Swords", icon: "⚔️" },
  { id: 60, name: "Page of Swords", icon: "⚔️" },
  { id: 61, name: "Knight of Swords", icon: "⚔️" },
  { id: 62, name: "Queen of Swords", icon: "⚔️" },
  { id: 63, name: "King of Swords", icon: "⚔️" },
  
  // Pentacles Suite (14 cards)
  { id: 64, name: "Ace of Pentacles", icon: "💰" },
  { id: 65, name: "Two of Pentacles", icon: "💰" },
  { id: 66, name: "Three of Pentacles", icon: "💰" },
  { id: 67, name: "Four of Pentacles", icon: "💰" },
  { id: 68, name: "Five of Pentacles", icon: "💰" },
  { id: 69, name: "Six of Pentacles", icon: "💰" },
  { id: 70, name: "Seven of Pentacles", icon: "💰" },
  { id: 71, name: "Eight of Pentacles", icon: "💰" },
  { id: 72, name: "Nine of Pentacles", icon: "💰" },
  { id: 73, name: "Ten of Pentacles", icon: "💰" },
  { id: 74, name: "Page of Pentacles", icon: "💰" },
  { id: 75, name: "Knight of Pentacles", icon: "💰" },
  { id: 76, name: "Queen of Pentacles", icon: "💰" },
  { id: 77, name: "King of Pentacles", icon: "💰" }
];

export default function TarotApp() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState('classic');
  const [currentSpread, setCurrentSpread] = useState('single');
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('Your expert tarot reading will appear here.');
  const [loading, setLoading] = useState(false);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  // Fisher-Yates shuffle algorithm
  const fisherYatesShuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleCards = () => {
    setShuffledDeck(fisherYatesShuffle(tarotCards));
    setSelectedCards([]);
    setInterpretation('Your expert tarot reading will appear here.');
  };

  const selectCard = (index) => {
    if (selectedCards[index]) {
      const newSelectedCards = [...selectedCards];
      newSelectedCards[index] = null;
      setSelectedCards(newSelectedCards);
    } else {
      if (shuffledDeck.length === 0) {
        alert('Please shuffle the deck first!');
        return;
      }
      const newSelectedCards = [...selectedCards];
      newSelectedCards[index] = shuffledDeck.pop();
      setSelectedCards(newSelectedCards);
      setShuffledDeck([...shuffledDeck]);
    }
  };

 const generateInterpretation = async () => {
  setLoading(true);
  setInterpretation('');
  
  try {
    const cardNames = selectedCards.filter(card => card).map(card => card.name).join(', ');
    let questionText = "";
    
    if (currentSpread === 'comparison') {
      questionText = `Comparison between "${option1 || 'Option A'}" and "${option2 || 'Option B'}"`;
    } else {
      questionText = question || "general guidance and insight";
    }

    const expertPrompt = `You are "Sage Aurora," a master tarot reader with 30+ years of experience. Provide a insightful tarot reading.

CLIENT'S READING:
- Spread: ${currentSpread}
- Cards: ${cardNames}
- Focus: "${questionText}"

Please provide a warm, insightful reading with card meanings, how they relate to the question, practical guidance, and overall message. Be compassionate and helpful.`;

async function generateInterpretation() {
  try {
    setLoading(true);
    setAiStatus("⏳ Consulting the expert reader...");

    // Build prompt from selected cards
    const cardNames = selectedCards.map(c => c.name).join(", ");
    const question = questionInput || "general guidance";

    const expertPrompt = `
You are "Sage Aurora," a master tarot reader with 30+ years of experience.

CARDS: ${cardNames}
QUESTION: ${question}
Provide a deep, structured tarot interpretation.
`;

    // --- THE FIXED FETCH CALL ---
    const res = await fetch("/api/interpret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: expertPrompt,
        model: "llama-3.1-70b-versatile"
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setInterpretation(`Error: ${errorData.error || "Unknown error"}`);
      setAiStatus("❌ AI Failed");
      return;
    }

    const data = await res.json();

    // Groq returns: data.choices[0].message.content
    const text =
      data?.choices?.[0]?.message?.content ||
      "No interpretation received.";

    setInterpretation(text);
    setAiStatus("✅ Expert Reading Complete");
  } catch (err) {
    console.error("CLIENT ERROR:", err);
    setAiStatus("❌ Client Error");
    setInterpretation("An error occurred. Try again.");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    shuffleCards();
  }, []);

  const spreadLimits = {
    single: 1,
    three: 3,
    nine: 9,
    yesno: 1,
    comparison: 3,
    celtic: 10
  };

  const selectedCount = selectedCards.filter(card => card).length;
  const canGetReading = selectedCount === spreadLimits[currentSpread];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Mystic Tarot - Expert AI Reader</h1>
        <p style={styles.subtitle}>Professional Tarot Readings with Advanced AI</p>
      </header>
      
      <div style={styles.mainContent}>
        <div style={styles.controlPanel}>
          <h2 style={styles.sectionTitle}>Create Your Reading</h2>
          
          {/* Deck Selection */}
          <div style={styles.deckSelection}>
            {['classic', 'goth', 'anime'].map(deck => (
              <div
                key={deck}
                style={{
                  ...styles.deckOption,
                  ...(currentDeck === deck ? styles.selected : {})
                }}
                onClick={() => setCurrentDeck(deck)}
              >
                <div style={styles.deckIcon}>
                  {deck === 'classic' ? '🃏' : deck === 'goth' ? '🖤' : '🌸'}
                </div>
                <h3 style={{textTransform: 'capitalize'}}>{deck}</h3>
              </div>
            ))}
          </div>
          
          {/* Spread Selection */}
          <div style={styles.spreadSelection}>
            {Object.keys(spreadLimits).map(spread => (
              <div
                key={spread}
                style={{
                  ...styles.spreadOption,
                  ...(currentSpread === spread ? styles.selected : {})
                }}
                onClick={() => {
                  setCurrentSpread(spread);
                  setSelectedCards(new Array(spreadLimits[spread]).fill(null));
                }}
              >
                <h3 style={{textTransform: 'capitalize'}}>
                  {spread === 'three' ? 'Three Cards' : 
                   spread === 'yesno' ? 'Yes/No' : 
                   spread === 'celtic' ? 'Celtic Cross' : 
                   spread}
                </h3>
                <p>Select {spreadLimits[spread]} card(s)</p>
              </div>
            ))}
          </div>
          
          {/* Question Input */}
          <textarea
            style={styles.questionInput}
            placeholder="Enter your question or area of focus... (optional)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
          {/* Card Display */}
          <div style={styles.cardDisplay}>
            {selectedCards.map((card, index) => (
              <div
                key={index}
                style={{
                  ...styles.cardSlot,
                  ...(card ? styles.cardSelected : {})
                }}
                onClick={() => selectCard(index)}
              >
                {card ? (
                  <>
                    <div style={styles.cardReveal}>{card.icon}</div>
                    <div style={styles.cardName}>{card.name}</div>
                  </>
                ) : (
                  <div style={styles.cardBack}>?</div>
                )}
              </div>
            ))}
          </div>
          
          {/* Controls */}
          <div style={styles.cardControls}>
            <button style={styles.button} onClick={shuffleCards}>
              <span>🔄</span> Shuffle Cards
            </button>
            <button 
              style={{...styles.button, ...(!canGetReading ? styles.buttonDisabled : {})}}
              onClick={generateInterpretation}
              disabled={!canGetReading}
            >
              <span>🔮</span> Get Expert Reading
            </button>
          </div>
        </div>
        
        <div style={styles.readingArea}>
          <h2 style={styles.sectionTitle}>Your Professional Reading</h2>
          <div style={styles.interpretation}>
            {loading ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Consulting with expert AI tarot reader...</p>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{__html: interpretation.replace(/\n/g, '<br/>')}} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #2c0a3a, #4a235a)',
    color: '#f4ecf7',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  header: {
    textAlign: 'center',
    padding: '20px 0',
    marginBottom: '30px'
  },
  h1: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.8
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  controlPanel: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  readingArea: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#bb8fce'
  },
  deckSelection: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },
  deckOption: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '100px',
    textAlign: 'center'
  },
  selected: {
    background: '#6c3483'
  },
  deckIcon: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  spreadSelection: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },
  spreadOption: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '120px',
    textAlign: 'center'
  },
  questionInput: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    color: 'white',
    fontSize: '1rem',
    marginBottom: '20px',
    resize: 'vertical',
    minHeight: '80px'
  },
  cardDisplay: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardSlot: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    width: '100px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  },
  cardSelected: {
    background: '#bb8fce'
  },
  cardBack: {
    background: 'linear-gradient(135deg, #6c3483, #4a235a)',
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'white'
  },
  cardReveal: {
    animation: 'cardReveal 0.6s ease-out'
  },
  cardName: {
    position: 'absolute',
    bottom: '5px',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '0.7rem',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '2px 4px',
    borderRadius: '4px'
  },
  cardControls: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  button: {
    background: '#6c3483',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    justifyContent: 'center'
  },
  buttonDisabled: {
    background: '#555',
    cursor: 'not-allowed'
  },
  interpretation: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '200px',
    marginBottom: '20px'
  },
  loading: {
    textAlign: 'center',
    padding: '20px'
  },
  spinner: {
    border: '5px solid rgba(255, 255, 255, 0.3)',
    borderTop: '5px solid #bb8fce',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 15px'
  }
};
