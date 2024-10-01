// src/app/api/payfast/route.js
import { NextResponse } from 'next/server';
import payfast from '@payfast/core';

export async function POST(req) {
  const { amount, item_name, email, custom_str1, custom_int1 } = await req.json();

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    amount,
    item_name,
    email_address: email,
    custom_str1,
    custom_int1,
    return_url: process.env.PAYFAST_RETURN_URL,
    cancel_url: process.env.PAYFAST_CANCEL_URL,
    notify_url: process.env.PAYFAST_NOTIFY_URL,
  };

  try {
    const payment = await payfast.transactions.create(paymentData);

    const payment_url = `https://www.payfast.co.za/eng/process?${payment}`; // Build payment URL
    return NextResponse.json({ success: true, payment_url });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
