export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryCounts = { [category: string]: number };
