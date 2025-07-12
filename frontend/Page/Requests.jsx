import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestsList from '../components/RequestsList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"
const Requests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const user=jwtDecode(token);
      const sent = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/swap/getMyRequests/${user.userId}`, { headers });
      setSentRequests(sent.data.requests)
      const received = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/swap/getRecievedRequests/${user.userId}`, { headers });
      console.log(received)
      setSentRequests(sent.data.requests);
      setReceivedRequests(received.data.requests);
    };

    fetchRequests();
  }, []);

  return (
    <main className='bg-base-200'>
    <NavBar/>
    <div className='min-h-screen flex flex-col p-2 m-3'>
      <RequestsList title="📤 Sent Requests" type="sent" requests={sentRequests} />
      <RequestsList title="📥 Received Requests" type="received" requests={receivedRequests} />
      </div>
      <Footer/>
    </main>
  );
};

export default Requests;
