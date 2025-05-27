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
    template_params: templateParams
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer a2FHdsm7E6XnY808PNSo2' // ✅ private key v hlavičce
    }
  }
);

    console.log('✅ Email odeslán:', response.status);
    res.status(200).json({ message: 'Email odeslán' });
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('❌ Chyba při odesílání e-mailu:', errorData);
    res.status(500).json({
      message: 'Chyba při odesílání e-mailu',
      error: errorData
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
