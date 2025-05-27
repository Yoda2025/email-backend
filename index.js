const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const {
    name,
    phone,
    date,
    time,
    pickup,
    destination,
    passengers,
    luggageHand,
    luggageSmall,
    luggageLarge
  } = req.body;

  const templateParams = {
    name,
    phone,
    date,
    time,
    pickup,
    destination,
    passengers,
    luggageHand,
    luggageSmall,
    luggageLarge
  };

  try {
   const response = await axios.post(
  'https://api.emailjs.com/api/v1.0/email/send',
  {
    service_id: 'service_mj8y5tl',
    template_id: 'template_j6409i3',
    template_params: {
      name,
      phone,
      date,
      time,
      pickup,
      destination,
      passengers,
      luggageHand,
      luggageSmall,
      luggageLarge
    }
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer a2FHdsm7E6XnY808PNSo2' // ✅ PRIVATE KEY v hlavičce
    }
  }
);


app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
