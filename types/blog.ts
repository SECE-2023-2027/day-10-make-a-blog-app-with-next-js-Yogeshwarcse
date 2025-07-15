export interface BlogPost {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogFormData {
  title: string;
  author: string;
  description: string;
  content: string;
}