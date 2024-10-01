// export default function ProfilePage() {

//     const crypto = require("crypto");

// const generateSignature = (data, passPhrase = null) => {
//   // Create parameter string
//   let pfOutput = "";
//   for (let key in data) {
//     if(data.hasOwnProperty(key)){
//       if (data[key] !== "") {
//         pfOutput +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
//       }
//     }
//   }

//   // Remove last ampersand
//   let getString = pfOutput.slice(0, -1);
//   if (passPhrase !== null) {
//     getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
//   }

//   return crypto.createHash("md5").update(getString).digest("hex");
// };
//     return (
//       <div className="conatiner">
//         <h1>Complete your booking</h1>

//         <form action="https://www.payfast.co.za/eng/process" method="post">
//             <input type="hidden" name="merchant_id" value="10000100"/>
//             <input type="hidden" name="merchant_key" value="46f0cd694581a"/>
//             <input type="hidden" name="amount" value="100.00"/>
//             <input type="hidden" name="item_name" value="Test Product"/>
//             <input type="submit"/>
            
//             <input type="hidden" name="merchant_id" value="10000100"/>
//             <input type="hidden" name="merchant_key" value="46f0cd694581a"/>
//             <input type="hidden" name="return_url" value="https://www.example.com/success"/>
//             <input type="hidden" name="cancel_url" value="https://www.example.com/cancel"/>
//             <input type="hidden" name="notify_url" value="https://www.example.com/notify"/>


//             <input type="hidden" name="name_first" value="John"/>
//             <input type="hidden" name="name_last" value="Doe"/>
//             <input type="hidden" name="email_address" value="john@doe.com"/>
//             <input type="hidden" name="cell_number" value="0823456789"/>

//             <input type="hidden" name="m_payment_id" value="01AB"/>
//             <input type="hidden" name="amount" value="100.00"/>
//             <input type="hidden" name="item_name" value="Test Item"/>
//             <input type="hidden" name="item_description" value="A test product"/>
//             <input type="hidden" name="custom_int1" value="2"/>
//             <input type="hidden" name="custom_str1" value="Extra order information"/>

//             <input type="hidden" name="email_confirmation" value="1"/>
//             <input type="hidden" name="confirmation_address" value="john@doe.com"/>

//             <input type="hidden" name="payment_method" value="cc"></input>

// {/* // Security signature */}
//             <input type="hidden" name="signature" value="f103e22c0418655fb03991538c51bfd5"/>
//         </form>

//       </div>
//     );
//   }


// src/app/payments/page.js
"use client"
import { useState } from 'react';

export default function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');
  const [email, setEmail] = useState('');
  const [customStr1, setCustomStr1] = useState('');
  const [customInt1, setCustomInt1] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/payfast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        item_name: itemName,
        email,
        custom_str1: customStr1,
        custom_int1: customInt1,
      }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.payment_url;
    } else {
      alert('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="item_name">Item Name</label>
        <input
          type="text"
          id="item_name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="custom_str1">Custom String 1</label>
        <input
          type="text"
          id="custom_str1"
          value={customStr1}
          onChange={(e) => setCustomStr1(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="custom_int1">Custom Int 1</label>
        <input
          type="number"
          id="custom_int1"
          value={customInt1}
          onChange={(e) => setCustomInt1(parseInt(e.target.value))}
        />
      </div>

      <button type="submit">Pay with PayFast</button>
    </form>
  );
}
