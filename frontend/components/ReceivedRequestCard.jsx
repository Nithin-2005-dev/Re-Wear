import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReceivedRequestCard = ({ request, onAction }) => {
  const [status, setStatus] = useState(request.status);

  const getStatusColor = (status) => {
    return status === 'accepted'
      ? 'text-green-400'
      : status === 'rejected'
      ? 'text-red-400'
      : 'text-yellow-400';
  };

  const handleAction = async (action) => {
    try {
      const endpoint =
        action === 'reject'
          ? `${import.meta.env.VITE_API_BASE_URL}/api/swap/reject/${request._id}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/swap/accept/${request._id}`;

      await axios.patch(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      setStatus(action);
      onAction?.(); 
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} request`);
    }
  };

  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-md space-y-3">
      <div className="flex items-center gap-4">
        <img
          src={request.targetItem?.images?.[0] || '/fallback.jpg'}
          alt={request.targetItem?.title || 'Item'}
          className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
        />
        <div>
          <p className="font-medium text-white">{request.targetItem?.title || 'Deleted Item'}</p>
          <p className="text-sm text-zinc-400">
            <strong>From:</strong> {request.requester?.name || 'Unknown'}<br />
            <strong>Type:</strong> Swap
          </p>
          <p className={`text-sm mt-1 font-semibold ${getStatusColor(status)}`}>
            Status: {status}
          </p>
        </div>
      </div>

      {status === 'pending' && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleAction('accept')}
            className="px-4 py-1.5 text-sm rounded bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            ✅ Accept
          </button>
          <button
            onClick={() => handleAction('reject')}
            className="px-4 py-1.5 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
          >
            ❌ Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceivedRequestCard;
