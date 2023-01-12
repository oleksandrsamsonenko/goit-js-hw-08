import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function () {
    player
      .getCurrentTime()
      .then(function (seconds) {
        console.log(`throttled current time:`, seconds);
        localStorage.setItem('videoplayer-current-time', seconds);
      })
      .catch(function (error) {});
  }, 1000)
);

console.log('saved time ->', localStorage.getItem('videoplayer-current-time'));
const currentTime = localStorage.getItem('videoplayer-current-time');
player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
