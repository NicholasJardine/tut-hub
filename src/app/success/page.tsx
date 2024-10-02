// src/app/success/page.tsx

import React from 'react';

const SuccessPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your booking has been confirmed.</p>
      <p>You will receive an email confirmation shortly.</p>
      <a href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>Go to your Dashboard</a>
    </div>
  );
};

export default SuccessPage;
