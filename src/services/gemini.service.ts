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

  async generateCaptions(prompt: string, count: number = 6, mediaFiles?: File[]): Promise<string[]> {
    try {
      let enhancedPrompt = `Generate exactly ${count} engaging Instagram captions for: "${prompt}". 
      Each caption should be:
      - Between 150-200 characters
      - Include relevant emojis
      - Have a conversational tone
      - Include a call-to-action or question
      - Be unique and creative
      
      Return ONLY a simple array of strings, no JSON formatting, no markdown, no extra text.
      Example format:
      ["Caption 1 here ✨", "Caption 2 here 🌟", "Caption 3 here 💫"]`;

      let result;
      
      if (mediaFiles && mediaFiles.length > 0) {
        // Analyze uploaded media and generate captions based on content
        const imageData = await this.convertFileToBase64(mediaFiles[0]);
        enhancedPrompt = `Analyze this image and generate exactly ${count} engaging Instagram captions based on what you see. ${enhancedPrompt}`;
        
        result = await this.model.generateContent([
          enhancedPrompt,
          {
            inlineData: {
              data: imageData.split(',')[1],
              mimeType: mediaFiles[0].type
            }
          }
        ]);
      } else {
        result = await this.model.generateContent(enhancedPrompt);
      }
      const response = await result.response;
      let text = response.text().trim();
      
      // Clean up any markdown formatting
      text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').replace(/^\s*[\[\{]/, '[').replace(/[\]\}]\s*$/, ']');
      
      try {
        const captions = JSON.parse(text);
        return Array.isArray(captions) ? captions.slice(0, count) : [text];
      } catch {
        // Enhanced fallback parsing
        const lines = text.split(/\n|,/).map(line => 
          line.replace(/^[\s\d\.\-\*"'\[\]]+/, '').replace(/["'\[\]]+$/, '').trim()
        ).filter(line => line.length > 20);
        return lines.slice(0, count).length > 0 ? lines.slice(0, count) : this.getFallbackCaptions(count);
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      return this.getFallbackCaptions(count);
    }
  }

  async generateHashtags(prompt: string, count: number = 6, mediaFiles?: File[]): Promise<string[][]> {
    try {
      const hashtagSets: string[][] = [];
      
      for (let i = 0; i < count; i++) {
        let enhancedPrompt = `Generate exactly 20 relevant Instagram hashtags for: "${prompt}". 
        Include a mix of:
        - Popular trending hashtags (high reach)
        - Niche-specific hashtags (targeted audience)
        - Branded/community hashtags
        - Location-based hashtags if relevant
        
        Return ONLY a simple array of hashtag strings with # symbol, no JSON formatting, no extra text.
        Example format:
        ["#hashtag1", "#hashtag2", "#hashtag3"]`;

        let result;
        
        if (mediaFiles && mediaFiles.length > 0 && i === 0) {
          // Only analyze the first uploaded image for hashtag generation
          const imageData = await this.convertFileToBase64(mediaFiles[0]);
          enhancedPrompt = `Analyze this image and generate hashtags based on what you see. ${enhancedPrompt}`;
          
          result = await this.model.generateContent([
            enhancedPrompt,
            {
              inlineData: {
                data: imageData.split(',')[1],
                mimeType: mediaFiles[0].type
              }
            }
          ]);
        } else {
          result = await this.model.generateContent(enhancedPrompt);
        }
        const response = await result.response;
        let text = response.text().trim();
        
        // Clean up formatting
        text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').replace(/^\s*[\[\{]/, '[').replace(/[\]\}]\s*$/, ']');
        
        try {
          const hashtags = JSON.parse(text);
          hashtagSets.push(Array.isArray(hashtags) ? hashtags.slice(0, 20) : text.split(' ').filter(h => h.startsWith('#')).slice(0, 20));
        } catch {
          // Enhanced fallback parsing
          const hashtags = text.split(/[\s,\n]+/)
            .map(h => h.trim())
            .filter(h => h.includes('#'))
            .map(h => h.startsWith('#') ? h : '#' + h.replace(/[^\w]/g, ''))
            .slice(0, 20);
          hashtagSets.push(hashtags.length > 0 ? hashtags : this.getFallbackHashtags()[0]);
        }
      }
      
      return hashtagSets;
    } catch (error) {
      console.error('Error generating hashtags:', error);
      return this.getFallbackHashtags();
    }
  }

  async generateImages(prompt: string, count: number = 6): Promise<string[]> {
    // For now, return curated images based on prompt keywords
    const imageCategories = {
      coffee: [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1521302200778-33500795e128?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      ],
      travel: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop"
      ],
      food: [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299507177-b0ac66763ed1?w=400&h=400&fit=crop"
      ],
      fitness: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
      ]
    };

    const lowerPrompt = prompt.toLowerCase();
    let selectedImages = imageCategories.travel; // default

    if (lowerPrompt.includes('coffee') || lowerPrompt.includes('cafe') || lowerPrompt.includes('morning')) {
      selectedImages = imageCategories.coffee;
    } else if (lowerPrompt.includes('food') || lowerPrompt.includes('recipe') || lowerPrompt.includes('cooking')) {
      selectedImages = imageCategories.food;
    } else if (lowerPrompt.includes('fitness') || lowerPrompt.includes('workout') || lowerPrompt.includes('gym')) {
      selectedImages = imageCategories.fitness;
    } else if (lowerPrompt.includes('travel') || lowerPrompt.includes('adventure') || lowerPrompt.includes('explore')) {
      selectedImages = imageCategories.travel;
    }

    return selectedImages.slice(0, count);
  }

  async generateContentIdeas(prompt: string, count: number = 6, mediaFiles?: File[]): Promise<string[]> {
    try {
      let enhancedPrompt = `Generate exactly ${count} creative content ideas for: "${prompt}". 
      Each idea should be:
      - Specific and actionable
      - Include content format (photo, video, carousel, story)
      - Be engaging and shareable
      - Target audience-appropriate
      - Include specific tips or angles
      
      Return ONLY a simple array of detailed idea strings, no JSON formatting, no extra text.
      Example format:
      ["Idea 1 with specific details", "Idea 2 with format suggestions", "Idea 3 with engagement tips"]`;

      let result;
      
      if (mediaFiles && mediaFiles.length > 0) {
        // Analyze uploaded media and generate content ideas based on content
        const imageData = await this.convertFileToBase64(mediaFiles[0]);
        enhancedPrompt = `Analyze this image and generate content ideas based on what you see. ${enhancedPrompt}`;
        
        result = await this.model.generateContent([
          enhancedPrompt,
          {
            inlineData: {
              data: imageData.split(',')[1],
              mimeType: mediaFiles[0].type
            }
          }
        ]);
      } else {
        result = await this.model.generateContent(enhancedPrompt);
      }
      const response = await result.response;
      let text = response.text().trim();
      
      // Clean up formatting
      text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').replace(/^\s*[\[\{]/, '[').replace(/[\]\}]\s*$/, ']');
      
      try {
        const ideas = JSON.parse(text);
        return Array.isArray(ideas) ? ideas.slice(0, count) : [text];
      } catch {
        // Enhanced fallback parsing
        const lines = text.split(/\n|,/).map(line => 
          line.replace(/^[\s\d\.\-\*"'\[\]]+/, '').replace(/["'\[\]]+$/, '').trim()
        ).filter(line => line.length > 30);
        return lines.slice(0, count).length > 0 ? lines.slice(0, count) : this.getFallbackContentIdeas(count);
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

  // Helper method to convert File to base64
  private async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiService();