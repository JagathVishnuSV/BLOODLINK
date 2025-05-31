import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact Form Submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you! Whether it's feedback, support, or partnership queries, fill out the form below and we’ll get back to you soon.
        </p>

        {submitted && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            ✅ Thank you! We'll get back to you shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
