// src/app/cancel/page.tsx

import React from 'react';

const CancelPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Payment Canceled</h1>
      <p>Your payment has been canceled. You can try again if you wish to complete your booking.</p>
      <a href="/bookings" style={{ color: 'blue', textDecoration: 'underline' }}>Return to Bookings</a>
    </div>
  );
};

export default CancelPage;
