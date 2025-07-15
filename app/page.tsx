'use client';

import React from 'react';
import { useBlog } from '@/context/BlogContext';
import BlogCard from '@/components/BlogCard';
import { PenTool, Sparkles, BookOpen, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { posts } = useBlog();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 opacity-70"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="floating-animation">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Welcome to</span>
              <br />
              <span className="gradient-text">BlogVerse</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary stories, share your unique voice, and connect with a vibrant community of storytellers from around the universe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/create"
              className="btn-gradient text-lg px-8 py-4 flex items-center space-x-3"
            >
              <PenTool className="h-6 w-6" />
              <span>Start Your Story</span>
              <Sparkles className="h-5 w-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-purple-300 rounded-2xl text-purple-700 hover:bg-purple-50 transition-all duration-300 font-semibold text-lg">
              Explore Stories
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
              <div className="text-gray-600">Stories Published</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.max(1, posts.length)}</div>
              <div className="text-gray-600">Active Writers</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{posts.length * 47 + 156}</div>
              <div className="text-gray-600">Total Reads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block mb-8">
                <PenTool className="h-32 w-32 text-purple-300 mx-auto floating-animation" />
                <Sparkles className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No stories yet in the universe
              </h2>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                Be the first cosmic storyteller to share your amazing journey with the world!
              </p>
              <Link
                href="/create"
                className="btn-gradient text-lg px-8 py-4 inline-flex items-center space-x-3"
              >
                <PenTool className="h-6 w-6" />
                <span>Create Your First Story</span>
                <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  Latest Stories from the Universe
                </h2>
                <p className="text-gray-600 text-lg">
                  Discover {posts.length} amazing {posts.length === 1 ? 'story' : 'stories'} from our community
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}