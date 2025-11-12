import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState({ to: '', subject: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await axios.post('http://localhost:5674/sendmail', form);
      setStatus('Email sent successfully!');
      setForm({ to: '', subject: '', text: '' });
    } catch (err) {
      console.error(err);
      setStatus('Failed to send email. Check backend or SMTP config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
         MailPilot
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700">Your Email</label>
          <input
            type="email"
            name="to"
            value={form.to}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="user1@gmail.com"
          />

          <label className="block mb-2 text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Email subject"
          />

          <label className="block mb-2 text-gray-700">Message</label>
          <textarea
            name="text"
            required
            rows="5"
            value={form.text}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type your message here..."
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>

        {status && (
          <p
            className={`text-center mt-4 font-medium ${
              status.toLowerCase().includes('sent')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
