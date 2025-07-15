'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, BlogFormData } from '@/types/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (postData: BlogFormData) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  loading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      }));
      setPosts(parsedPosts);
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: BlogFormData) => {
    setLoading(true);
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPosts(prev => [newPost, ...prev]);
    setLoading(false);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const value: BlogContextType = {
    posts,
    addPost,
    deletePost,
    getPost,
    loading,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};