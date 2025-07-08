'use client'

import Header from "@/components/ui/Header";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      excerpt: "Exploring how artificial intelligence is revolutionizing patient care and medical administration.",
      date: "July 5, 2024",
      readTime: "5 min read",
      category: "AI & Technology"
    },
    {
      id: 2,
      title: "Navigating Insurance Complexities with Ron",
      excerpt: "How our AI assistant simplifies the insurance verification process for patients and providers.",
      date: "July 1, 2024",
      readTime: "4 min read",
      category: "Product Updates"
    },
    {
      id: 3,
      title: "Voice Technology in Healthcare: A New Era",
      excerpt: "The rise of voice-activated systems in medical settings and their impact on efficiency.",
      date: "June 28, 2024",
      readTime: "6 min read",
      category: "Innovation"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Ron AI Blog
          </h1>
          <p className="text-xl text-slate-600">
            Insights on healthcare innovation, AI technology, and the future of medical administration
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-4 font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600">
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}