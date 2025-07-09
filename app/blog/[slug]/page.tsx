'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Copy, CheckCircle, User, Quote, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { use } from "react";

// This would normally come from a database or CMS
const blogPosts = {
  "vercel-ai-accelerator": {
    id: "vercel-ai-accelerator",
    title: "Ron AI Joins the Vercel AI Accelerator: Building the Healthcare Operating System",
    headerImage: "/images/photoheader.png",
    content: `
      <p className="lead">We are thrilled to announce that Ron AI has been selected to join the prestigious Vercel AI Accelerator program! This milestone represents a significant achievement for our team as we continue to develop innovative AI solutions for digital advocacy.</p>

      <div className="content-image">
        <img src="/images/vercel.png" alt="Vercel AI Accelerator" />
      </div>

      <h2>About the Vercel AI Accelerator</h2>
      <p>The Vercel AI Accelerator is a highly competitive program designed to support promising AI startups with the resources, mentorship, and technical infrastructure needed to scale their solutions. With a typical acceptance rate of just 2% to 4%, being chosen for this program validates our vision and positions Ron AI among the leading innovators in the AI space. This selective process ensures that only the most promising and impactful AI solutions receive the intensive support and resources the accelerator provides.</p>

      <h2>Our Founding Story</h2>
      <p>Ron AI was founded out of frustration with the lack of equity, accessibility, and transparency in healthcare. As healthcare professionals and patient advocates, our team witnessed firsthand how these systemic issues create barriers for millions of people trying to navigate an increasingly complex healthcare landscape. We saw patients struggle with insurance denials, spend hours on hold trying to book appointments, and face financial hardship from unexpected medical costs. We believe in disrupting the industry through innovative AI solutions that put patients first, and we're convinced that now is the perfect time to drive meaningful change.</p>

      <div style="margin: 4rem auto; max-width: 1200px;">
        <div style="position: relative; padding: 4rem; background: linear-gradient(to right, #111827, #1f2937); border-radius: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border-left: 8px solid #3B82F6;">
          <blockquote style="margin: 0;">
            <p style="font-size: 2rem; line-height: 1.4; font-weight: 700; color: white; margin-bottom: 1.5rem;">
              Healthcare is the only industry where you can't see prices before buying, where coverage is deliberately opaque, and where one visit triggers months of confusing bills. Patients deserve transparency. Providers deserve time to actually provide care. This industry is overdue for disruption.
            </p>
            <cite style="font-size: 1.125rem; color: #60A5FA; font-weight: 600; font-style: normal;">— Tim Hunter, MS, RN, CCM, CSPO</cite>
          </blockquote>
        </div>
      </div>

      <h2>Introducing Ron AI's Healthcare Solutions</h2>
      <p>At the heart of our participation in the accelerator is our comprehensive healthcare navigation platform. Ron AI is building the operating system for healthcare - a suite of AI-powered tools that solve the most frustrating parts of the patient experience.</p>

      <p>Our platform includes:</p>
      <ul className="feature-list">
        <li>AI-powered provider search that actually verifies insurance coverage in real-time, solving the problem where 68% of users abandon healthcare searches due to insurance uncertainty</li>
        <li>Voice AI that calls doctor offices for you, navigates phone trees, and books appointments - saving 45+ minutes per booking</li>
        <li>Medication price comparison across all pharmacies, finding discounts and copay assistance programs - users save an average of $1,704 annually</li>
        <li>Unified health records management with AI insights to help patients understand and organize their medical information</li>
      </ul>

      <p>Powered by Browser-Use AI agents, our platform maintains human-in-the-loop control, giving users full transparency and authority over every action. This isn't about replacing healthcare workers - it's about giving both patients and providers the tools they desperately need.</p>

      <h2>Our Journey So Far</h2>
      <p>Since joining the accelerator, our team has been working tirelessly to refine the Advocacy Co-Pilot, incorporating valuable feedback from mentors and early users. The program has provided us with unparalleled access to technical expertise and industry connections that have accelerated our development timeline.</p>

      <div className="highlight-box">
        <h2>Demo Day: Mark Your Calendars!</h2>
        <p>We are excited to showcase Ron AI's healthcare navigation platform at the Vercel AI Accelerator Demo Day on <strong>July 18th in San Francisco</strong>. This event will be our opportunity to demonstrate how our AI-powered solutions are already helping patients save time and money while giving healthcare providers their time back.</p>
      </div>

      <h2>The Future of Healthcare Navigation</h2>
      <p>As healthcare becomes increasingly complex and expensive, the need for intelligent tools that help patients navigate the system becomes critical. Ron AI represents our commitment to making healthcare accessible, transparent, and affordable for everyone - not through vague "advocacy" but through concrete tools that solve real problems people face every day.</p>

      <h2>Join Us on This Journey</h2>
      <p>We invite you to follow our progress as we approach Demo Day and beyond. Stay tuned for updates on our social media channels and website as we continue to develop Ron Search, Ron Scheduler, Ron Meds, and Ron Health - the tools that are already making healthcare navigation possible for thousands of users.</p>

      <p>For more information about Ron AI, or to request early access to our platform, please visit our website at <a href="https://www.ron-ai.io" target="_blank" rel="noopener noreferrer">https://www.ron-ai.io</a>.</p>

      <div className="author-bio">
        <h2>About Ron AI</h2>
        <p>Ron AI is dedicated to developing ethical AI solutions that enhance human capabilities in healthcare navigation and patient advocacy. Founded by Tim Hunter, MS, RN, CCM, CSPO and a team of dedicated healthcare professionals, patient advocates, and clinical experts, our mission is to create technology that empowers patients and their families to effectively navigate the healthcare system and receive the care they deserve. Tim's unique combination of clinical expertise, case management experience, and product development skills, combined with our team's decades of combined experience from emergency medicine, nursing, health insurance navigation, and patient advocacy, enables us to solve real problems we've seen firsthand in clinical practice.</p>
        
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="font-weight: 600; margin-bottom: 1rem;">Connect with Ron AI:</p>
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <a href="https://www.linkedin.com/company/hi-ron" target="_blank" rel="noopener noreferrer" style="color: #60A5FA; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://x.com/HiRonHealth" target="_blank" rel="noopener noreferrer" style="color: #60A5FA; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </a>
            <a href="https://www.instagram.com/ronhealthinfotech/" target="_blank" rel="noopener noreferrer" style="color: #60A5FA; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    `,
    date: "July 8, 2025",
    readTime: "5 min read",
    author: "Tim Hunter, MS, RN, CCM, CSPO",
    authorTitle: "Founder & CEO",
    category: "Company News",
    tags: ["Vercel", "AI Accelerator", "Company News", "Product Launch", "Healthcare AI"]
  }
};

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [copied, setCopied] = useState(false);
  const resolvedParams = use(params);
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];

  if (!post) {
    return <div>Post not found</div>;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <>
      <Header />
      
      {/* Premium CSS for Blog Post */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .blog-content {
          font-family: 'Crimson Text', serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #e5e7eb;
        }

        @media (min-width: 640px) {
          .blog-content {
            font-size: 1.25rem;
          }
        }

        .blog-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          margin: 2rem 0 1rem;
          position: relative;
          padding-bottom: 1rem;
        }

        @media (min-width: 640px) {
          .blog-content h2 {
            font-size: 2.25rem;
            margin: 3rem 0 1.5rem;
          }
        }

        @media (min-width: 768px) {
          .blog-content h2 {
            font-size: 2.5rem;
          }
        }

        .blog-content h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #008CFF 0%, #8B5CF6 100%);
          border-radius: 2px;
        }

        .blog-content h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.375rem;
          font-weight: 600;
          color: #ffffff;
          margin: 1.5rem 0 0.75rem;
        }

        @media (min-width: 640px) {
          .blog-content h3 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
          }
        }

        @media (min-width: 768px) {
          .blog-content h3 {
            font-size: 1.75rem;
          }
        }

        .blog-content p {
          margin-bottom: 1.5rem;
        }

        .blog-content p.lead {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #d1d5db;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 640px) {
          .blog-content p.lead {
            font-size: 1.375rem;
            margin-bottom: 2rem;
          }
        }

        @media (min-width: 768px) {
          .blog-content p.lead {
            font-size: 1.5rem;
          }
        }

        .blog-content a {
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.3s ease;
        }

        .blog-content a:hover {
          color: #93bbfc;
          text-decoration-thickness: 2px;
        }

        .blog-content ul.feature-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }

        .blog-content ul.feature-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #e5e7eb;
        }

        @media (min-width: 640px) {
          .blog-content ul.feature-list li {
            padding-left: 2rem;
          }
        }

        .blog-content ul.feature-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #60a5fa;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .featured-quote {
          position: relative;
          margin: 2rem -1rem;
          padding: 2rem 1.5rem;
          background: linear-gradient(135deg, rgba(0, 140, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
          border-left: 4px solid;
          border-image: linear-gradient(180deg, #008CFF 0%, #8B5CF6 100%) 1;
          backdrop-filter: blur(20px);
          border-radius: 0 1rem 1rem 0;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 0 100px rgba(0, 140, 255, 0.05);
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .featured-quote {
            margin: 3rem -2rem;
            padding: 3rem 2.5rem;
            border-left-width: 5px;
            border-radius: 0 1.5rem 1.5rem 0;
          }
        }

        @media (min-width: 768px) {
          .featured-quote {
            margin: 4rem -4rem;
            padding: 4rem 5rem;
            border-left-width: 6px;
            border-radius: 0 2rem 2rem 0;
          }
        }

        .featured-quote::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 140, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(100px, -100px);
        }

        .featured-quote .quote-icon {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          opacity: 0.2;
          z-index: 1;
        }

        @media (min-width: 640px) {
          .featured-quote .quote-icon {
            top: 2rem;
            left: 2rem;
          }
        }

        @media (min-width: 768px) {
          .featured-quote .quote-icon {
            top: 3rem;
            left: 3rem;
          }
        }

        .featured-quote p {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          line-height: 1.4;
          color: #ffffff;
          font-style: italic;
          margin-bottom: 1rem;
          padding-left: 0;
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 640px) {
          .featured-quote p {
            font-size: 1.5rem;
            line-height: 1.3;
            padding-left: 2rem;
            margin-bottom: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .featured-quote p {
            font-size: 2rem;
            padding-left: 4rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .featured-quote p {
            font-size: 2.25rem;
          }
        }

        .featured-quote cite {
          display: block;
          text-align: right;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #60a5fa;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 640px) {
          .featured-quote cite {
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .featured-quote cite {
            font-size: 1.125rem;
          }
        }

        @media (min-width: 1024px) {
          .featured-quote cite {
            font-size: 1.25rem;
          }
        }

        .highlight-box {
          background: rgba(0, 140, 255, 0.05);
          border: 1px solid rgba(0, 140, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          margin: 3rem 0;
          backdrop-filter: blur(10px);
        }

        .highlight-box h3 {
          color: #60a5fa;
          margin-top: 0;
        }

        .author-bio {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .content-image {
          margin: 3rem 0;
          text-align: center;
        }

        .content-image img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .simple-blockquote {
          margin: 3rem 0;
          padding-left: 2rem;
          border-left: 4px solid #4b5563;
        }

        .simple-blockquote p {
          font-size: 1.5rem !important;
          line-height: 1.5 !important;
          font-style: italic !important;
          color: #e5e7eb !important;
          margin-bottom: 0.5rem !important;
        }

        .simple-blockquote cite {
          display: block;
          font-size: 1rem;
          color: #9ca3af;
          font-style: normal;
          margin-top: 0.5rem;
        }

        .header-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 768px) {
          .header-image {
            height: 250px;
          }
        }

        .share-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          color: #e5e7eb;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
        }

        @media (min-width: 640px) {
          .share-button {
            padding: 0.75rem 1.5rem;
            gap: 0.5rem;
            font-size: 1rem;
          }
        }

        .share-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .article-header {
          position: relative;
          overflow: hidden;
        }

        .article-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 140, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          opacity: 0.5;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .highlight-box {
            margin: 2rem 0;
            padding: 1.5rem;
          }

          .highlight-box h3 {
            font-size: 1.25rem;
          }

          .content-image {
            margin: 2rem -1rem;
          }

          .content-image img {
            border-radius: 0;
          }

          .author-bio {
            margin-top: 3rem;
            padding-top: 2rem;
          }

          /* Fix blockquote styles on mobile */
          blockquote {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        
        {/* Article Header */}
        <article className="relative z-10">
          {/* Header Image */}
          {post.headerImage && (
            <div className="relative w-full overflow-hidden">
              <img 
                src={post.headerImage} 
                alt={post.title}
                className="header-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
          )}

          <div className="article-header pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 -mt-24 sm:-mt-32 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Category */}
                <span className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider">
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-400 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">{post.author}</span>
                    {post.authorTitle && <span className="text-gray-600 hidden sm:inline">• {post.authorTitle}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-4 pb-16 sm:pb-24">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 pt-8 border-t border-gray-800"
              >
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Share Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Share this article</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button onClick={shareOnTwitter} className="share-button text-sm sm:text-base">
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Twitter</span>
                    </button>
                    <button onClick={shareOnLinkedIn} className="share-button text-sm sm:text-base">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </button>
                    <button onClick={copyToClipboard} className="share-button text-sm sm:text-base">
                      {copied ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
