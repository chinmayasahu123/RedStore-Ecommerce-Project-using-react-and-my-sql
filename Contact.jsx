import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaEnvelopeOpenText, FaPhoneAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendContact } from '../services/api';

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    if (!name || !email || !subject || !message) {
      toast.error('Please fill out all fields');
      return;
    }
    try {
      await sendContact({ name, email, subject, message });
      toast.success('Message sent successfully');
      try { form.reset(); } catch {}
      setShowSuccess(true);
    } catch (err) {
      toast.error('Failed to send message');
    }
  };
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white via-[#faf7f5] to-white dark:from-dark-surface dark:via-[#0f0f14] dark:to-dark-surface">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600"
          >
            Concierge & Customer Care
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            We’re here for elevated support—tailored guidance, swift resolutions, and premium assistance.
          </motion.p>
        </div>

        {/* Concierge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[{icon: FaHeadset, title: 'Concierge', text: 'Personal shopping & product guidance'}, {icon: FaEnvelopeOpenText, title: 'Email', text: 'support@redstore.com'}, {icon: FaPhoneAlt, title: 'Phone', text: '+1 (123) 456-7890'}, {icon: FaClock, title: 'Hours', text: 'Mon–Sat, 9am–8pm IST'}].map((c)=> (
            <div key={c.title} className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow">
              <div className="w-12 h-12 grid place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white mb-3">
                {c.icon && <c.icon />}
              </div>
              <div className="font-semibold text-lg mb-1">{c.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{c.text}</div>
            </div>
          ))}
        </div>

        {/* Contact Form + Info */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Your Name</label>
                <input name="name" type="text" className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-400 outline-none" placeholder="John Doe" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
                <input name="email" type="email" className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-400 outline-none" placeholder="you@example.com" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Subject</label>
                <input name="subject" type="text" className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-400 outline-none" placeholder="How can we help?" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Message</label>
                <textarea name="message" rows="5" className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-400 outline-none" placeholder="Write your message here..."></textarea>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button type="submit" className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:opacity-95 transition">Send Message</button>
                <a href="https://wa.me/11234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                  <FaWhatsapp /> WhatsApp Support
                </a>
              </div>
            </form>
          </div>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow">
              <div className="font-semibold text-lg mb-1">Head Office</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">123 Redstore Street, Cityville, 56789</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Email: support@redstore.com</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Phone: +1 (123) 456-7890</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">We aim to respond within 24 hours.</div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow">
              <iframe
                title="Redstore Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 md:h-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531585!3d-37.81627974202111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzIwLjYiUyAxNDTCsDU3JzE5LjQiRQ!5e0!3m2!1sen!2s!4v1614034540855"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowSuccess(false)} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl p-6 text-center"
            >
              <div className="mx-auto mb-3 w-14 h-14 grid place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white text-2xl">✓</div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">Message send sucessfull</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">Our concierge team will get back to you shortly.</p>
              <button onClick={() => setShowSuccess(false)} className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-semibold hover:opacity-95">Close</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
