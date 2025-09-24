import { GoogleGenerativeAI } from '@google/generative-ai';

// Use your provided API key
const GEMINI_API_KEY = 'AIzaSyB_m4QBbI8-BMfYdMLWc7PmQf8xtUkdCAk';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateCaptions(prompt: string, count: number = 6): Promise<string[]> {
    try {
      const enhancedPrompt = `Generate ${count} engaging Instagram captions for: "${prompt}". 
      Each caption should be:
      - Between 150-200 characters
      - Include relevant emojis
      - Have a conversational tone
      - Include a call-to-action or question
      - Be unique and creative
      
      Format as a JSON array of strings only, no additional text.`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const captions = JSON.parse(text);
        return Array.isArray(captions) ? captions : [text];
      } catch {
        // Fallback if JSON parsing fails
        return text.split('\n').filter(line => line.trim()).slice(0, count);
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      return this.getFallbackCaptions(count);
    }
  }

  async generateHashtags(prompt: string, count: number = 6): Promise<string[][]> {
    try {
      const hashtagSets: string[][] = [];
      
      for (let i = 0; i < count; i++) {
        const enhancedPrompt = `Generate 20 relevant Instagram hashtags for: "${prompt}". 
        Include a mix of:
        - Popular trending hashtags (high reach)
        - Niche-specific hashtags (targeted audience)
        - Branded/community hashtags
        - Location-based hashtags if relevant
        
        Format as a JSON array of hashtag strings (include # symbol).`;

        const result = await this.model.generateContent(enhancedPrompt);
        const response = await result.response;
        const text = response.text();
        
        try {
          const hashtags = JSON.parse(text);
          hashtagSets.push(Array.isArray(hashtags) ? hashtags : text.split(' ').filter(h => h.startsWith('#')));
        } catch {
          // Fallback parsing
          const hashtags = text.split(/[\s,\n]+/).filter(h => h.includes('#')).slice(0, 20);
          hashtagSets.push(hashtags.length > 0 ? hashtags : this.getFallbackHashtags()[0]);
        }
      }
      
      return hashtagSets;
    } catch (error) {
      console.error('Error generating hashtags:', error);
      return this.getFallbackHashtags();
    }
  }

  async generateContentIdeas(prompt: string, count: number = 6): Promise<string[]> {
    try {
      const enhancedPrompt = `Generate ${count} creative content ideas for: "${prompt}". 
      Each idea should be:
      - Specific and actionable
      - Include content format (photo, video, carousel, story)
      - Be engaging and shareable
      - Target audience-appropriate
      - Include specific tips or angles
      
      Format as a JSON array of detailed idea strings.`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const ideas = JSON.parse(text);
        return Array.isArray(ideas) ? ideas : [text];
      } catch {
        // Fallback if JSON parsing fails
        return text.split('\n').filter(line => line.trim()).slice(0, count);
      }
    } catch (error) {
      console.error('Error generating content ideas:', error);
      return this.getFallbackContentIdeas(count);
    }
  }

  async chatResponse(userMessage: string): Promise<string> {
    try {
      const enhancedPrompt = `You are AutoGram's AI assistant, a helpful social media management platform. 
      Respond to this user message: "${userMessage}"
      
      AutoGram features include:
      - AI Content Generation (captions, hashtags, content ideas)
      - Smart Scheduling with optimal timing
      - Real-time Analytics and Performance Reports
      - Content Workflow Management
      - Multi-timezone support
      - Team collaboration tools
      
      Be helpful, friendly, and focus on how AutoGram can solve their social media needs. 
      Keep responses under 150 words.`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating chat response:', error);
      return "I'm here to help with AutoGram! I can assist with features, pricing, getting started, or any questions about our social media management platform.";
    }
  }

  // Fallback methods for when API fails
  private getFallbackCaptions(count: number): string[] {
    const fallbacks = [
      "Creating magic one post at a time ✨ What's inspiring you today?",
      "Behind every great post is a story worth telling 📖",
      "Capturing moments that matter 📸 #blessed",
      "Living life in full color 🌈 What's your favorite shade?",
      "Making memories and sharing the joy ❤️",
      "Every day is a new opportunity to shine ⭐"
    ];
    return fallbacks.slice(0, count);
  }

  private getFallbackHashtags(): string[][] {
    return [
      ["#content", "#creative", "#inspiration", "#lifestyle", "#motivation"],
      ["#trending", "#viral", "#engagement", "#community", "#authentic"],
      ["#brand", "#business", "#entrepreneur", "#success", "#growth"]
    ];
  }

  private getFallbackContentIdeas(count: number): string[] {
    const fallbacks = [
      "Create a behind-the-scenes video showing your creative process",
      "Share a photo carousel of your daily routine with tips",
      "Post a before/after transformation with your story",
      "Create a trending audio reel with your unique twist",
      "Share user-generated content and tag the creators",
      "Post a question sticker story to engage your audience"
    ];
    return fallbacks.slice(0, count);
  }
}

export const geminiService = new GeminiService();