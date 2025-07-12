import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [otherItems, setOtherItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [selectedMyItem, setSelectedMyItem] = useState('');
   const token=Cookies.get("token");
  const user=jwtDecode(token).userId;
  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/item/${id}`);
      setItem(res.data.item);

      const userId = res.data.item.uploader?._id;
      if(!userId) return;
      const others = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/item/user/${userId}`);
      setOtherItems(others.data.items.filter((i) => i._id !== id));
    };

    const fetchMyItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/item/user/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyItems(res.data.items.filter((i) => i.available));
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
    fetchMyItems();
  }, [id]);

  const handleSwapRequest = async () => {
    if (!selectedMyItem) return alert('Please select your item to swap with.');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/swap/create`,
        {
          requesterItem: selectedMyItem,
          targetItem: id,
          requester:user
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      alert('Swap request sent successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Swap request failed');
    }
  };

  const handleRedeemRequest = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/redeem/create`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Redeem request sent successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Redeem request failed');
    }
  };

  if (!item) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="py-14 px-6 lg:px-24 text-white bg-base-200">
      {/* Main Product */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start border-b border-zinc-800 pb-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden w-full md:w-1/2 border border-zinc-800 bg-zinc-900 shadow-lg">
          <img
            src={item.images[0]}
            alt={item.title}
            className="object-cover w-full h-full max-h-[450px] rounded-2xl"
          />
        </div>

        {/* Details */}
        <div className="space-y-6 w-full md:w-1/2">
          <h2 className="text-4xl font-bold tracking-tight leading-snug">{item.title}</h2>
          <p className="text-zinc-400 text-base leading-relaxed">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 text-sm pt-2">
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Category: {item.category}</span>
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Type: {item.type}</span>
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Size: {item.size}</span>
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Condition: {item.condition}</span>
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Points: {item.redeemCost}</span>
            <span className={`bg-zinc-800 px-3 py-1 rounded-full ${item.available ? 'text-green-400' : 'text-red-400'}`}>
              {item.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <p className="text-sm text-zinc-400 pt-1">
            Uploaded by <span className="text-white font-medium">{item.uploader.name}</span>
          </p>

          {/* Actions */}
           <select
              value={selectedMyItem}
              onChange={(e) => setSelectedMyItem(e.target.value)}
              className="bg-zinc-800 text-white rounded px-4 py-2 outline-none border border-zinc-700"
            >
              <option value="">Select your item to swap</option>
              {myItems.map((myItem) => (
                <option key={myItem._id} value={myItem._id}>
                  {myItem.title} ({myItem.size}, {myItem.type})
                </option>
              ))}
            </select>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <button
              onClick={handleSwapRequest}
              className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition shadow-md"
            >
              🔁 Request Swap
            </button>

            <button
              onClick={handleRedeemRequest}
              className="px-6 py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition shadow-md"
            >
              🎁 Redeem Points
            </button>
          </div>
        </div>
      </div>

      {/* Other Items */}
      {otherItems.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-white">More from {item.uploader.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherItems.map((prod) => (
              <Link
                to={`/products/${prod._id}`}
                key={prod._id}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:scale-[1.02] transition-transform shadow-md group"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="h-48 w-full object-cover rounded-lg mb-3 group-hover:opacity-90 transition"
                />
                <h4 className="text-lg font-medium group-hover:text-emerald-400 transition">{prod.title}</h4>
                <p className="text-sm text-zinc-400">{prod.type} • {prod.size}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
