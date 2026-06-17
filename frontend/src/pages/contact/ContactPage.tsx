import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['123 Temple Street', 'Varanasi, Uttar Pradesh 221001'] },
    { icon: Phone, title: 'Call Us', details: ['+91 98765 43210', '+91 98765 43211'] },
    { icon: Mail, title: 'Email Us', details: ['hello@panditji.com', 'support@panditji.com'] },
    { icon: Clock, title: 'Working Hours', details: ['Mon - Sun: 6:00 AM - 9:00 PM', 'Emergency: 24/7'] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">Contact Us</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Have questions about our services? We are here to help you plan the perfect ceremony.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="card p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-text mb-2">{info.title}</h3>
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-sm text-muted">{detail}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8 lg:p-10">
                <h2 className="font-serif text-2xl font-bold text-text mb-6">Send us a Message</h2>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-text mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted">We will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Full Name</label>
                        <input type="text" required className="input-field" placeholder="Your name"
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="label">Email</label>
                        <input type="email" required className="input-field" placeholder="your@email.com"
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Phone</label>
                        <input type="tel" className="input-field" placeholder="+91 98765 43210"
                          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className="label">Subject</label>
                        <select className="input-field" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                          <option value="">Select a subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="pandit">Pandit Registration</option>
                          <option value="support">General Support</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">Message</label>
                      <textarea rows={5} required className="input-field resize-none" placeholder="How can we help you?"
                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
