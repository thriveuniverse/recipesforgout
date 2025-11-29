'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response?.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await response?.json();
        setError(data?.error || 'Failed to send message');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center space-y-4">
            <MessageSquare className="h-16 w-16 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
            <p className="text-xl text-teal-100">
              Have questions or feedback? We\'d love to hear from you.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="container mx-auto max-w-2xl px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {success && (
              <Alert className="mb-6 bg-emerald-50 border-emerald-200 text-emerald-900">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription>
                  Thank you for your message! We\'ll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e?.target?.value ?? '')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value ?? '')}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={subject}
                  onChange={(e) => setSubject(e?.target?.value ?? '')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what\'s on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value ?? '')}
                  required
                  rows={6}
                />
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-900 mb-1">Privacy Notice</p>
                <p>
                  Your information will be stored securely and used only to respond to your
                  inquiry. We do not share your data with third parties.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                <Send className="mr-2 h-5 w-5" />
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
