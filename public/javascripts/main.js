// leftbar mobile component
const leftbarBox = document.querySelector('.leftbar-box');
const leftbarToggle = document.querySelector('.leftbar-toggle');
const leftbarOverlay = document.querySelector('.leftbar-box-overlay');

leftbarToggle.addEventListener('click', () => {
  leftbarBox.classList.toggle('hidden');
  leftbarOverlay.classList.toggle('hidden');
})

leftbarOverlay.addEventListener('click', () => {
  leftbarBox.classList.add('hidden');
  leftbarOverlay.classList.add('hidden');
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    leftbarBox.classList.add('hidden');
    leftbarOverlay.classList.add('hidden');
    console.log('wate')
  }
})