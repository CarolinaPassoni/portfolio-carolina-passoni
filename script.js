const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-nav');
const navLinks = nav.querySelectorAll('a');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Abrir menu');
  nav.classList.remove('open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open',open);
});
navLinks.forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = [...document.querySelectorAll('.project-card')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(b => {b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button));});
  projectCards.forEach(card => {card.hidden = filter !== 'todos' && !card.dataset.categories.split(' ').includes(filter);});
}));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {if(entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}});
  },{threshold:0.08,rootMargin:'0px 0px 50px 0px'});
  revealItems.forEach(item=>observer.observe(item));
} else revealItems.forEach(item=>item.classList.add('visible'));

const toast = document.getElementById('toast');
let toastTimeout;
function showToast(message) {
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>toast.classList.remove('show'),2600);
}
document.getElementById('copy-email').addEventListener('click',async()=>{
  const email='passonicarol@gmail.com';
  try {await navigator.clipboard.writeText(email);showToast('E-mail copiado!');}
  catch {showToast('E-mail: '+email);}
});
document.getElementById('year').textContent=String(new Date().getFullYear());
