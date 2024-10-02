import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.text(); // PayFast sends the data as a URL-encoded string, not JSON
    
    const params = new URLSearchParams(body);
    const paymentStatus = params.get('payment_status');
    const paymentAmount = params.get('amount_gross');
    const transactionId = params.get('m_payment_id'); // Your custom identifier

    const validateResponse = await fetch('https://sandbox.payfast.co.za/eng/query/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const validationResult = await validateResponse.text();

    if (validationResult === 'VALID') {
      console.log('Payment is valid, update booking status.');
      return NextResponse.json({ message: 'Payment validated and processed' });
    } else {
      console.error('Invalid payment notification');
      return NextResponse.json({ message: 'Invalid payment notification' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing payment notification:', error);
    return NextResponse.json({ message: 'Error processing notification' }, { status: 500 });
  }
}
