const authPage = document.getElementById('authPage');
const appPage = document.getElementById('appPage');
const loginForm = document.getElementById('loginForm');
const alertBox = document.getElementById('alertBox');
const togglePasswordBtn = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');
const storyStrip = document.getElementById('storyStrip');
const suggestionsList = document.getElementById('suggestionsList');

const stories = [
  { name: 'tc_demmy', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80' },
  { name: 'miss.narlyn', image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=250&q=80' },
  { name: '_btry', image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=250&q=80' },
  { name: 'theytc_bw...', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=250&q=80' },
  { name: 'lovies.tridah', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
  { name: 'wwf.caren', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80' },
  { name: 'niahh', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80' }
];

const suggestions = [
  { name: 'ur_girl_larith', note: 'Followed by sarah_ig', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Iamextraordinary', note: 'Followed by beinjg.dorlie + 2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { name: 'trici', note: 'Followed by elisabeth.schwab', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' },
  { name: 'bein_g_Mieh', note: 'Followed by the_dk_2600', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Mack@_p_tz', note: 'Suggested for you', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80' }
];

function renderStories() {
  storyStrip.innerHTML = stories
    .map(
      (story, index) => `
        <div class="story-item" data-index="${index}">
          <div class="story-ring">
            <span style="background-image: url('${story.image}');"></span>
          </div>
          <div>${story.name}</div>
        </div>
      `
    )
    .join('');
}

function renderSuggestions() {
  suggestionsList.innerHTML = suggestions
    .map(
      (item) => `
        <li class="suggestion-item">
          <div class="suggestion-avatar" style="background-image: url('${item.image}')"></div>
          <div>
            <div class="suggestion-name">${item.name}</div>
            <span class="suggestion-note">${item.note}</span>
          </div>
          <button type="button" class="follow-btn">Follow</button>
        </li>
      `
    )
    .join('');
}

function showApp() {
  authPage.classList.add('hidden');
  appPage.classList.add('active');
}

function showAlert(message = 'The login information you entered is incorrect. Find your account and log in.') {
  alertBox.innerHTML = `
    <span class="alert-icon">i</span>
    <span>${message}</span>
  `;
  alertBox.style.display = 'flex';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showAlert('Please enter your email or username and password.');
    return;
  }

  if (password.length < 6) {
    showAlert('Your password is too short. Please enter a valid password.');
    return;
  }

  showApp();
});

togglePasswordBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePasswordBtn.textContent = isHidden ? '◐' : '◌';
});

storyStrip.addEventListener('click', (event) => {
  const storyItem = event.target.closest('.story-item');
  if (!storyItem) return;

  const index = Number(storyItem.dataset.index);
  const activeStory = stories[index];

  const previousLive = document.querySelector('.story-item.active');
  if (previousLive) previousLive.classList.remove('active');
  storyItem.classList.add('active');

  showAlert(`Viewing ${activeStory.name}'s story.`);
});

renderStories();
renderSuggestions();
showAlert();
