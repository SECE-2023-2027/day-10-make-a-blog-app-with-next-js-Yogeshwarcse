'use client';

import React from 'react';
import Link from 'next/link';
import { PenTool, Home, BookOpen, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <BookOpen className="h-10 w-10 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <span className="text-3xl font-bold gradient-text">BlogVerse</span>
              <p className="text-xs text-gray-500 font-medium">Share Your Universe</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/create"
              className="btn-gradient flex items-center space-x-2"
            >
              <PenTool className="h-5 w-5" />
              <span>Create Story</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;