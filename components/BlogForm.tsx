'use client';

import React, { useState } from 'react';
import { BlogFormData } from '@/types/blog';
import { useBlog } from '@/context/BlogContext';
import { useRouter } from 'next/navigation';
import { Save, X, Sparkles, FileText, User, AlignLeft, BookOpen } from 'lucide-react';

const BlogForm = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    author: '',
    description: '',
    content: '',
  });
  const [errors, setErrors] = useState<Partial<BlogFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addPost } = useBlog();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<BlogFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addPost(formData);
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof BlogFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold gradient-text">Create Your Story</h1>
            <Sparkles className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-gray-600 text-lg">Share your thoughts with the world</p>
        </div>

        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span>Story Title *</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  placeholder="Enter your captivating title..."
                />
                {errors.title && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <X className="h-3 w-3" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-purple-500" />
                  <span>Author Name *</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.author ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  placeholder="Your name..."
                />
                {errors.author && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <X className="h-3 w-3" />
                    <span>{errors.author}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <AlignLeft className="h-4 w-4 text-purple-500" />
                <span>Story Description *</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
                  errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="Write a compelling description that draws readers in..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <X className="h-3 w-3" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span>Story Content *</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={16}
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
                  errors.content ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="Tell your story... Let your creativity flow and share your unique perspective with the world."
              />
              {errors.content && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <X className="h-3 w-3" />
                  <span>{errors.content}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Publish Story</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;