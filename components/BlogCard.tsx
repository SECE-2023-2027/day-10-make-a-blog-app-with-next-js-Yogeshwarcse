'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { Calendar, User, ArrowRight, Clock, Eye } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
      <div className="relative glass-effect rounded-3xl overflow-hidden card-hover group-hover:border-purple-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4 text-purple-500" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{getReadingTime(post.content)} min read</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center space-x-2 text-purple-600 hover:text-pink-600 font-semibold transition-colors duration-300 group/link"
            >
              <span>Read Story</span>
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Eye className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 100) + 10} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;