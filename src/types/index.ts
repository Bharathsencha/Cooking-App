export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  recipes: number;
}

export interface Recipe {
  id: number;
  title: string;
  author: User;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  tags: string[];
  createdAt: string;
}

export interface Reel {
  id: number;
  video: string;
  thumbnail: string;
  title: string;
  author: User;
  likes: number;
  comments: number;
  shares: number;
  duration: string;
}

export interface Comment {
  id: number;
  text: string;
  author: User;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface Message {
  id: number;
  text: string;
  sender: User;
  receiver: User;
  createdAt: string;
  read: boolean;
}

export interface AIResponse {
  suggestions: Recipe[];
  substitutions: { original: string; alternatives: string[] }[];
  instructions: string[];
}