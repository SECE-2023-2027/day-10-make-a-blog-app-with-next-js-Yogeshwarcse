'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBlog } from '@/context/BlogContext';
import { Calendar, User, ArrowLeft, Trash2, Clock, Eye, Heart, Share2 } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { getPost, deletePost } = useBlog();
  
  const post = getPost(params.id as string);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-effect rounded-3xl p-12 max-w-md mx-4">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Story Lost in Space
          </h1>
          <p className="text-gray-600 mb-6">
            This story seems to have drifted away into the cosmic void or never existed in our universe.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-gradient flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Universe</span>
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this story? This action will remove it from the universe forever.')) {
      deletePost(post.id);
      router.push('/');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Universe</span>
          </button>
        </div>

        {/* Article */}
        <article className="glass-effect rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1">
            <div className="bg-white rounded-t-3xl p-8">
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{post.author}</div>
                      <div className="text-xs">Storyteller</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{getReadingTime(post.content)} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span>{Math.floor(Math.random() * 500) + 50} views</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
                  {post.description}
                </p>
              </header>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed text-lg">
                {post.content}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 px-8 py-6 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">
                <div className="flex items-center space-x-1 mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Last updated: {formatDate(post.updatedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-4 py-2 rounded-xl transition-all duration-300 group"
                >
                  <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Share</span>
                </button>
                
                <button className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-800 hover:bg-pink-50 px-4 py-2 rounded-xl transition-all duration-300 group">
                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{Math.floor(Math.random() * 50) + 5}</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center space-x-2 text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-300 group"
                >
                  <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}