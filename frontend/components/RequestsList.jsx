import SentRequestCard from './SentRequestCard';
import ReceivedRequestCard from './ReceivedRequestCard';

const RequestsList = ({ title, type, requests }) => {
  const isSent = type === 'sent';
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4">
        {requests.length === 0 ? (
          <p className="text-zinc-400">No {type} requests.</p>
        ) : (
          requests.map((req) =>
            isSent ? (
              <SentRequestCard key={req._id} request={req} />
            ) : (
              <ReceivedRequestCard key={req._id} request={req} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default RequestsList;
