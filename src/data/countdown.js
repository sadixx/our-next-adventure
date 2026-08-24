import { CONFIG } from "../config.js";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export function getCountdown() {
  const target = new Date(CONFIG.meetingDate).getTime();
  const now = Date.now();

  let difference = target - now;

  if (difference <= 0) {
    return {
      complete: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      progress: 1,
    };
  }

  const totalDays = Math.floor(difference / MS_PER_DAY);

  difference %= MS_PER_DAY;

  const hours = Math.floor(difference / MS_PER_HOUR);
  difference %= MS_PER_HOUR;

  const minutes = Math.floor(difference / MS_PER_MINUTE);
  difference %= MS_PER_MINUTE;

  const seconds = Math.floor(difference / MS_PER_SECOND);

  /*
   * November 13 is our destination.
   *
   * We calculate progress based on the original countdown
   * duration rather than hard-coding "81 days".
   */
  const targetTime = new Date(CONFIG.meetingDate).getTime();

  const journeyStart = new Date(targetTime);

  /*
   * The current implementation uses the first moment
   * at which this website is opened as the journey start.
   *
   * For our actual launch we'll replace this with the
   * fixed August 24, 2026 start date.
   */
  const startTime = new Date("2026-08-24T00:00:00+03:00").getTime();

  const totalJourney = targetTime - startTime;
  const elapsedJourney = Math.max(0, now - startTime);

  const progress = Math.min(
    1,
    Math.max(0, elapsedJourney / totalJourney)
  );

  return {
    complete: false,
    days: totalDays,
    hours,
    minutes,
    seconds,
    totalDays,
    progress,
  };
}
