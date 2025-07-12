const SentRequestCard = ({ request }) => {
  const getStatusColor = (status) => {
    return status === 'accepted'
      ? 'text-green-400'
      : status === 'rejected'
      ? 'text-red-400'
      : 'text-yellow-400';
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
            <strong>Type:</strong> {request.type === 'redeem' ? 'Redeem' : 'Swap'}
          </p>
          <p className={`text-sm mt-1 font-semibold ${getStatusColor(request.status)}`}>
            Status: {request.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentRequestCard;
