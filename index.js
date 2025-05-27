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
    const params = new URLSearchParams();
    params.append('service_id', 'service_mj8y5tl');
    params.append('template_id', 'template_j6409i3');
    params.append('public_key', 'PCFvQygyFiUr27q6T');

    for (const key in templateParams) {
      params.append(key, templateParams[key]);
    }

    console.log('Odesílám EmailJS formulář:', params.toString());

    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send-form',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.status(200).json({ message: 'Email odeslán' });
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('Chyba při odesílání e-mailu:', errorData);
    res.status(500).json({
      message: 'Chyba při odesílání e-mailu',
      error: errorData
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
