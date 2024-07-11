const apiUrl = '/api/fetchTikTokVideo';
let autoNextEnabled = false;
let isLoading = false;
let isFailed = false;

document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.getElementById('nextButton');
  const autoNextButton = document.getElementById('autoNextButton');
  const refreshButton = document.getElementById('refreshButton');

  refreshButton.addEventListener('click', async () => {
    if (isFailed) {
      fetchAndDisplayTikTokVideo();
    }
  });

  nextButton.addEventListener('click', fetchAndDisplayTikTokVideo);

  autoNextButton.addEventListener('click', () => {
    autoNextEnabled = !autoNextEnabled;
    autoNextButton.textContent = `Auto Next: ${autoNextEnabled ? 'ON' : 'OFF'}`;

    if (autoNextEnabled && !isLoading) {
      fetchAndDisplayTikTokVideo();
    }
  });

  refreshButton.disabled = true;
  fetchAndDisplayTikTokVideo();
});

async function fetchTikTokVideo() {
  const refreshButton = document.getElementById('refreshButton');
  refreshButton.disabled = true;

  try {
    const response = await axios.post(apiUrl);

    if (response.status !== 200) {
      throw new Error('Failed to fetch video');
    }

    const { videoUrl, title, region, username, nickname } = response.data;

    const videoElement = document.getElementById('tiktokVideo');
    const videoTitleElement = document.getElementById('videoTitle');
    const regionElement = document.getElementById('region');
    const usernameElement = document.getElementById('username');
    const nicknameElement = document.getElementById('nickname');

    videoElement.src = videoUrl;
    videoTitleElement.textContent = title;
    regionElement.textContent = `Region: ${region}`;
    usernameElement.textContent = `Username: ${username}`;
    nicknameElement.textContent = `Nickname: ${nickname}`;

    videoElement.addEventListener('loadedmetadata', () => {
      isLoading = false;
      isFailed = false;
      document.getElementById('nextButton').disabled = false;
      refreshButton.disabled = true;
    });

    if (autoNextEnabled) {
      videoElement.addEventListener('ended', () => {
        if (!isLoading) {
          fetchAndDisplayTikTokVideo();
        }
      });
    }
  } catch (error) {
    console.error('Error fetching TikTok video:', error);
    isFailed = true;
    isLoading = false;
    refreshButton.disabled = false;
  }
}

function fetchAndDisplayTikTokVideo() {
  isLoading = true;
  document.getElementById('nextButton').disabled = true;
  document.getElementById('refreshButton').disabled = true;
  fetchTikTokVideo();
}
