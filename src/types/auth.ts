export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export type Recipe = {
  id: number;
  title: string;
  author: {
    name: string;
  };
  likes: number;
  comments: number;
  shares: number;
  description: string;
  ingredients: string[];
  cookingTime: string;
  difficulty: string;
  category: string[];
  tags: string[];
};