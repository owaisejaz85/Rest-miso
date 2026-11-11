const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const gallery = document.querySelector('.gallery-track');
document.querySelector('.gallery-next').addEventListener('click', () => {
  gallery.scrollBy({ left: gallery.clientWidth * 0.7, behavior: 'smooth' });
});
document.querySelector('.gallery-prev').addEventListener('click', () => {
  gallery.scrollBy({ left: -gallery.clientWidth * 0.7, behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
dateInput.min = localDate;

document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    'Hello MISO! I would like to request a reservation.',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Date: ${data.get('date')}`,
    `Guests: ${data.get('guests')}`,
    `Location: ${data.get('location')}`,
    `Note: ${data.get('note') || 'None'}`
  ].join('\n');

  // Demo behaviour: opens WhatsApp with the reservation details.
  // Replace this number with the restaurant's real WhatsApp number.
  const whatsappNumber = '922112345678';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  document.querySelector('.form-message').textContent = 'Opening WhatsApp with your reservation request…';
  window.open(whatsappUrl, '_blank', 'noopener');
});
