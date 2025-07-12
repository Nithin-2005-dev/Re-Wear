import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AddItem = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    redeemCost: 10,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      if (!token) return setMessage('Login required');

      const { userId } = jwtDecode(token);

      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      data.append('userId', userId);
      images.forEach((img) => data.append('images', img));

      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/item/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Item listed successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        tags: '',
        redeemCost: 10,
      });
      setImages([]);
      setShowForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-semibold text-gray-200 mb-2">“Give Clothes a Second Life, Not the Landfills.”</h2>
      <p className="text-gray-400 mb-4">List your unused clothes and become a part of sustainable fashion.</p>
      <button
        onClick={() => setShowForm(true)}
        className="btn btn-primary px-8 py-3 text-white font-semibold rounded-lg"
      >
        List Your Item
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-zinc-900 w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-200 hover:text-gray-50 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-400">Add Your Item</h3>
            {message && <p className="text-red-500 mb-3">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <input
                type="text"
                name="title"
                placeholder="Item Title"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Item Description"
                rows="3"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select name="category" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md" onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                  <option>Unisex</option>
                </select>
                <select name="type" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md" onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option>Topwear</option>
                  <option>Bottomwear</option>
                  <option>Footwear</option>
                  <option>Accessories</option>
                </select>
                <select name="size" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md" onChange={handleChange} required>
                  <option value="">Select Size</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>Free Size</option>
                </select>
                <select name="condition" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md" onChange={handleChange} required>
                  <option value="">Condition</option>
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Acceptable</option>
                </select>
              </div>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                onChange={handleChange}
              />
              <input
                type="number"
                name="redeemCost"
                placeholder="Redeem Points"
                min="1"
                value={formData.redeemCost}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                onChange={handleChange}
              />
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full bg-gray-800 border-gray-700 text-white"
                onChange={handleImageChange}
                required
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Submit Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;
