"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          Get in Touch
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Start a Conversation.
        </h1>
        <p className="text-zinc-400">
          Have questions about chemical processing, custom API limits, shipping queries, or bulk wholesale print order volumes? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-900">
          
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Message Sent Successfully!</h2>
              <p className="text-zinc-400 max-w-sm mx-auto text-sm leading-relaxed">
                Thank you for reaching out. A TryPolaroid team member will review your inquiry and respond to your email address within 12 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm text-white font-semibold rounded-full transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-zinc-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-zinc-300">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-zinc-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Physical box tracking / API bulk exports"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-zinc-300">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you're working on or how we can help..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-200/50 disabled:cursor-not-allowed font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending message...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

            </form>
          )}

        </div>

        {/* Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Support Info */}
          <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 space-y-3">
            <h3 className="font-bold text-white text-base">Direct Customer Support</h3>
            <p className="text-sm text-zinc-400 leading-normal">
              Already placed a physical box order and need tracking details or custom modifications?
            </p>
            <div className="text-sm font-semibold text-orange-400">
              support@trypolaroid.com
            </div>
          </div>

          {/* Business Info */}
          <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 space-y-3">
            <h3 className="font-bold text-white text-base">Business & Partnerships</h3>
            <p className="text-sm text-zinc-400 leading-normal">
              Interested in white-label darkroom processing API plugins for photography studios or event apps?
            </p>
            <div className="text-sm font-semibold text-orange-400">
              partners@trypolaroid.com
            </div>
          </div>

          {/* Location Info */}
          <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 space-y-3">
            <h3 className="font-bold text-white text-base">Darkroom Labs & Office</h3>
            <p className="text-sm text-zinc-400 leading-normal">
              Our chemical exposure laboratory and fulfillment centers are located at:
            </p>
            <address className="text-sm text-zinc-300 not-italic leading-relaxed">
              TryPolaroid Inc. <br />
              142 Vintage Street, Industrial District <br />
              Brooklyn, NY 11205
            </address>
          </div>

        </div>

      </div>

    </div>
  );
}
