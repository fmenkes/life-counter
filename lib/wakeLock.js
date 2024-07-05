let wakeLock = null;

// Function to request a wake lock
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake lock is active.');

    wakeLock.addEventListener('release', () => {
      console.log('Wake lock was released.');
    });
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// Function to release the wake lock
function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release()
      .then(() => {
        wakeLock = null;
        console.log('Wake lock released.');
      })
      .catch((err) => {
        console.error(`${err.name}, ${err.message}`);
      });
  }
}

// Request a wake lock when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
  requestWakeLock();
});

// Optionally, request a wake lock on a specific user action
document.querySelector('#start-button').addEventListener('click', () => {
  requestWakeLock();
});

// Release the wake lock when the user leaves the page
window.addEventListener('beforeunload', () => {
  releaseWakeLock();
});
