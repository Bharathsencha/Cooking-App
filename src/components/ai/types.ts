export interface AIResponse {
    suggestions: string[];
    substitutions: {
      original: string;
      alternatives: string[];
    }[];
    instructions: string[];
  }