const express = require('express');
const cors = require('cors');
const params = new URLSearchParams();
params.append('service_id', 'service_mj8y5tl');
params.append('template_id', 'template_j6409i3');
params.append('public_key', 'PCFvQygyFiUr27q6T');

// přidej každou hodnotu zvlášť
for (const key in templateParams) {
  params.append(`template_params[${key}]`, templateParams[key]);
}

const response = await axios.post(
  'https://api.emailjs.com/api/v1.0/email/send-form',
  params,
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);

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
const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send-form', {
  service_id: 'service_mj8y5tl',
  template_id: 'template_j6409i3',
  public_key: 'PCFvQygyFiUr27q6T',
  template_params: templateParams
});

    res.status(200).json({ message: 'Email odeslán' });
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error.response?.data || error.message);
    res.status(500).json({ message: 'Chyba při odesílání e-mailu' });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
