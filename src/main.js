import { CONFIG } from "./config.js";
import { getCountdown } from "./data/countdown.js";
import { DAILY_MOMENTS } from "./data/daily-moments.js";

import { getJourneyMarkup } from "./components/journey.js";

import {
  getLoveLettersMarkup,
  initializeLoveLetters,
} from "./components/love-letters.js";

import {
  getSurpriseMarkup,
  initializeSurprise,
} from "./components/surprise.js";

import {
  getLivingMarkup,
  initializeLiving,
} from "./components/living.js";

import "./styles/main.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "./styles/living.css";
import "./styles/living-responsive.css";
import "./styles/flight.css";
import "./styles/letters-phase4.css";

const app = document.querySelector("#app");

function getDailyMoment(daysRemaining) {
  let closest = DAILY_MOMENTS[0];

  for (const moment of DAILY_MOMENTS) {
    if (daysRemaining <= moment.days) {
      closest = moment;
    }
  }

  return closest;
}

function createFloatingElements() {
  const symbols = [
    "❤️",
    "✨",
    "🌸",
    "💗",
    "🦋",
    "💕",
    "✈️",
  ];

  return Array.from(
    { length: 18 },
    (_, index) => {
      const symbol =
        symbols[index % symbols.length];

      return `
        <span
          class="floating-item floating-${index}"
          aria-hidden="true"
        >
          ${symbol}
        </span>
      `;
    }
  ).join("");
}

function render() {
  const countdown = getCountdown();

  const moment =
    getDailyMoment(countdown.totalDays);

  app.innerHTML = `
    <main class="page">

      <div class="ambient-glow glow-one"></div>
      <div class="ambient-glow glow-two"></div>

      <div class="floating-layer">
        ${createFloatingElements()}
      </div>

      <!-- HERO -->

      <section class="hero-card">

        <div class="top-label">
          <span class="tiny-heart">♥</span>

          ${CONFIG.title}

          <span class="tiny-heart">♥</span>
        </div>

        <h1>
          ${CONFIG.names.personA}

          <span class="heart">
            ❤️
          </span>

          ${CONFIG.names.personB}
        </h1>

        <p class="subtitle">
          Two cities · One adventure · One very special day
        </p>

        <div class="route">

          <div class="city">

            <span class="flag">
              ${CONFIG.cities.from.flag}
            </span>

            <strong>
              ${CONFIG.cities.from.name}
            </strong>

            <span>
              ${CONFIG.cities.from.country}
            </span>

          </div>

          <div class="flight-path">

            <div class="path-line">
              <div class="path-glow"></div>
            </div>

            <div
              class="plane"
              style="
                --flight-progress:
                  ${Math.max(
                    0,
                    Math.min(
                      100,
                      countdown.progress * 100
                    )
                  )}%;
              "
            >
              ✈️
            </div>

            <div class="route-heart">
              ♥
            </div>

          </div>

          <div class="city">

            <span class="flag">
              ${CONFIG.cities.to.flag}
            </span>

            <strong>
              ${CONFIG.cities.to.name}
            </strong>

            <span>
              ${CONFIG.cities.to.country}
            </span>

          </div>

        </div>

        <div class="countdown-section">

          ${
            countdown.complete
              ? `
                <div class="today-badge">
                  ❤️ TODAY ❤️
                </div>

                <div class="final-title">
                  The wait is over.
                </div>
              `
              : `
                <p class="countdown-label">
                  until we are together again
                </p>

                <div class="countdown">

                  <div class="time-unit">

                    <span id="days">
                      ${String(
                        countdown.days
                      ).padStart(2, "0")}
                    </span>

                    <small>
                      DAYS
                    </small>

                  </div>

                  <div class="colon">
                    :
                  </div>

                  <div class="time-unit">

                    <span id="hours">
                      ${String(
                        countdown.hours
                      ).padStart(2, "0")}
                    </span>

                    <small>
                      HOURS
                    </small>

                  </div>

                  <div class="colon">
                    :
                  </div>

                  <div class="time-unit">

                    <span id="minutes">
                      ${String(
                        countdown.minutes
                      ).padStart(2, "0")}
                    </span>

                    <small>
                      MINUTES
                    </small>

                  </div>

                  <div class="colon">
                    :
                  </div>

                  <div class="time-unit seconds-unit">

                    <span id="seconds">
                      ${String(
                        countdown.seconds
                      ).padStart(2, "0")}
                    </span>

                    <small>
                      SECONDS
                    </small>

                  </div>

                </div>
              `
          }

        </div>

        <div class="date-pill">

          <span>♡</span>

          Friday · November 13 · 2026

          <span>♡</span>

        </div>

        <div class="daily-card">

          <div class="daily-emoji">
            ${moment.emoji}
          </div>

          <div class="daily-content">

            <div class="daily-kicker">
              TODAY'S LITTLE MOMENT
            </div>

            <h2>
              ${moment.title}
            </h2>

            <p>
              ${moment.message}
            </p>

          </div>

        </div>

      </section>

      <!-- JOURNEY -->

      ${getJourneyMarkup(countdown)}

      <!-- LIVE CITY CLOCKS -->

      ${getLivingMarkup()}

      <!-- LOVE LETTERS -->

      ${getLoveLettersMarkup(countdown)}

      <!-- SURPRISE -->

      ${getSurpriseMarkup()}

      <footer>

        Tampere 🇫🇮

        <span>
          ♡
        </span>

        Astana 🇰🇿

      </footer>

    </main>
  `;

  initializeLoveLetters();
  initializeSurprise();
  initializeLiving();

  if (!countdown.complete) {
    startLiveCountdown();
  }
}

function startLiveCountdown() {
  setInterval(() => {
    const countdown =
      getCountdown();

    const days =
      document.querySelector("#days");

    const hours =
      document.querySelector("#hours");

    const minutes =
      document.querySelector("#minutes");

    const seconds =
      document.querySelector("#seconds");

    if (
      !days ||
      !hours ||
      !minutes ||
      !seconds ||
      countdown.complete
    ) {
      return;
    }

    days.textContent =
      String(
        countdown.days
      ).padStart(2, "0");

    hours.textContent =
      String(
        countdown.hours
      ).padStart(2, "0");

    minutes.textContent =
      String(
        countdown.minutes
      ).padStart(2, "0");

    seconds.textContent =
      String(
        countdown.seconds
      ).padStart(2, "0");
  }, 1000);
}

render();
