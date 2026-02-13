const Sentiment = require('sentiment');
const sentiment = new Sentiment();

exports.analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);
    return result; // { score: 2, comparative: 0.66, ... }
};

exports.getChatbotResponse = async (message) => {
    // Placeholder for AI Chatbot integration (e.g., OpenAI)
    // For now, return a simple scripted response based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('unhappy')) {
        return "I'm sorry to hear that you're feeling down. Would you like to try a guided meditation or write in your journal?";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('stress')) {
        return "It sounds like you're experiencing some anxiety. Let's try a breathing exercise together. Breathe in for 4 seconds, hold for 7, and exhale for 8.";
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
        return "That's wonderful to hear! What's making you feel good today? Identifying our sources of joy can help us revisit them later.";
    } else {
        return "I'm here to listen. Tell me more about how you're feeling.";
    }
};
