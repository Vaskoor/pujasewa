import { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Booking',
      questions: [
        { q: 'How do I book a pandit for a ceremony?', a: 'Simply browse our verified pandits, select your preferred date and time, and complete the booking. You will receive confirmation within minutes.' },
        { q: 'Can I book a pandit for an urgent ceremony?', a: 'Yes, we offer emergency booking services. Contact our support team at +91 98765 43210 for immediate assistance.' },
        { q: 'What is the cancellation policy?', a: 'Cancellations made 48 hours before the ceremony receive a full refund. Cancellations within 24 hours receive a 50% refund.' },
      ]
    },
    {
      category: 'Pandits',
      questions: [
        { q: 'How are pandits verified?', a: 'All pandits undergo a rigorous verification process including background checks, credential verification, and community references.' },
        { q: 'Can I choose a pandit based on language?', a: 'Yes, you can filter pandits by language, region, and specialization to find the perfect match for your ceremony.' },
        { q: 'What if the assigned pandit is unavailable?', a: 'We automatically assign a backup pandit with similar qualifications. You will be notified immediately.' },
      ]
    },
    {
      category: 'Payments',
      questions: [
        { q: 'What payment methods are accepted?', a: 'We accept UPI, credit/debit cards, net banking, and digital wallets. All transactions are secure and encrypted.' },
        { q: 'Is there an advance payment required?', a: 'Yes, a 30% advance is required to confirm your booking. The remaining balance is due on the day of the ceremony.' },
        { q: 'Are there any hidden charges?', a: 'No, our pricing is completely transparent. The quoted price includes all fees unless additional services are requested.' },
      ]
    },
    {
      category: 'Services',
      questions: [
        { q: 'What types of ceremonies can I book?', a: 'We offer a wide range of services including Griha Pravesh, Satyanarayan Puja, Marriage ceremonies, Havan, and more.' },
        { q: 'Do you provide puja materials?', a: 'Yes, our packages include all necessary puja samagri. You can also opt for premium materials at an additional cost.' },
        { q: 'Can I customize a ceremony package?', a: 'Absolutely. Contact us to create a custom package tailored to your specific requirements and traditions.' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">FAQ</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Find answers to common questions about our services, booking process, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="space-y-8">
            {faqs.map((category, ci) => (
              <div key={ci}>
                <h2 className="font-serif text-2xl font-semibold text-text mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" /> {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, fi) => {
                    const index = ci * 10 + fi;
                    const isOpen = openIndex === index;
                    return (
                      <div key={fi} className="card overflow-hidden">
                        <button onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full flex items-center justify-between p-5 sm:p-6 text-left">
                          <span className="font-medium text-sm sm:text-base text-text pr-4">{faq.q}</span>
                          <ChevronDown className={`w-5 h-5 text-muted shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                            <div className="h-px bg-border mb-4" />
                            <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 card p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-text mb-2">Still have questions?</h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Can not find the answer you are looking for? Our support team is here to help.
            </p>
            <Link to="/contact" className="btn-primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
