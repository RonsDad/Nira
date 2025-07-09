'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";
import { Calendar, Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image?: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "vercel-ai-accelerator",
    title: "Ron AI Joins the Vercel AI Accelerator: Building the Healthcare Operating System",
    excerpt: "We are thrilled to announce that Ron AI has been selected to join the prestigious Vercel AI Accelerator program! This milestone represents a significant achievement for our team.",
    date: "July 8, 2025",
    readTime: "5 min read",
    author: "Tim Hunter",
    category: "Company News",
    featured: true,
    image: "/images/vercel.png"
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Company News", "Product Updates", "Healthcare", "Technology", "AI Innovation"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      
      {/* Premium CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

        .blog-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .blog-glass:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 0 40px rgba(0, 140, 255, 0.05);
        }

        .category-pill {
          background: linear-gradient(135deg, rgba(0, 140, 255, 0.1), rgba(0, 140, 255, 0.05));
          border: 1px solid rgba(0, 140, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .category-pill:hover {
          background: linear-gradient(135deg, rgba(0, 140, 255, 0.2), rgba(0, 140, 255, 0.1));
          border-color: rgba(0, 140, 255, 0.4);
          transform: scale(1.05);
        }

        .category-pill.active {
          background: rgba(0, 140, 255, 0.2);
          border-color: rgba(0, 140, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 140, 255, 0.3);
        }

        .search-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .search-glass:focus-within {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 140, 255, 0.3);
          box-shadow: 0 0 30px rgba(0, 140, 255, 0.1);
        }

        .featured-gradient {
          background: linear-gradient(135deg, 
            rgba(0, 140, 255, 0.1) 0%,
            rgba(0, 140, 255, 0.05) 50%,
            rgba(139, 92, 246, 0.05) 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, #008CFF 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl float-animation" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl float-animation" style={{animationDelay: '3s'}} />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ron AI <span className="text-gradient">Blog</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Insights, updates, and stories from the future of healthcare AI
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="search-glass rounded-full px-6 py-4 flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder:text-gray-400 outline-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-pill px-6 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category ? 'active text-white' : 'text-gray-300 hover:text-white'}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="relative px-4 sm:px-6 pb-24 z-10">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No posts found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`blog-glass rounded-2xl overflow-hidden group ${
                      post.featured ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className={`${post.featured ? 'grid md:grid-cols-2 gap-8' : ''}`}>
                        {/* Featured Image Area */}
                        {post.featured && (
                          <div className="relative h-64 md:h-full overflow-hidden">
                            {post.image ? (
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="featured-gradient h-full flex items-center justify-center">
                                <div className="text-center p-8">
                                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-blue-400" />
                                  </div>
                                  <p className="text-blue-400 font-semibold text-lg">Featured Article</p>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-300 text-sm font-semibold border border-blue-500/30">
                                Featured
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="p-8">
                          {/* Category Badge */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <h2 className={`font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300
                            ${post.featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {post.title}
                          </h2>
                          
                          <p className={`text-gray-400 mb-6 line-clamp-3
                            ${post.featured ? 'text-lg' : ''}`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {post.excerpt}
                          </p>
                          
                          {/* Meta Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                              <span className="text-sm font-medium">Read More</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          
                          {/* Author */}
                          <div className="mt-6 pt-6 border-t border-gray-800">
                            <p className="text-sm text-gray-500">
                              By <span className="text-white font-medium">{post.author}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative py-24 px-4 sm:px-6 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="blog-glass rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Stay Updated
              </h2>
              <p className="text-lg text-gray-300 mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Get the latest insights on healthcare AI delivered to your inbox
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 transition-colors"
                />
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
