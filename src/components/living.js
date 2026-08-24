const CITIES = {
  tampere: {
    name: "Tampere",
    country: "Finland",
    flag: "🇫🇮",
    timeZone: "Europe/Helsinki",
  },

  astana: {
    name: "Astana",
    country: "Kazakhstan",
    flag: "🇰🇿",
    timeZone: "Asia/Almaty",
  },
};

function getTime(timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getHour(timeZone) {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
}

function getMood(hour) {
  if (hour >= 5 && hour < 12) {
    return {
      emoji: "☀️",
      label: "Good morning",
      period: "morning",
    };
  }

  if (hour >= 12 && hour < 18) {
    return {
      emoji: "🌤️",
      label: "Good afternoon",
      period: "afternoon",
    };
  }

  if (hour >= 18 && hour < 22) {
    return {
      emoji: "🌅",
      label: "Good evening",
      period: "evening",
    };
  }

  return {
    emoji: "🌙",
    label: "Good night",
    period: "night",
  };
}

function getConnectionMessage(tampereHour, astanaHour) {
  const tampereNight =
    tampereHour >= 23 || tampereHour < 6;

  const astanaNight =
    astanaHour >= 23 || astanaHour < 6;

  if (tampereNight && astanaNight) {
    return {
      emoji: "🌙",
      text: "Two cities are sleeping under the same sky.",
    };
  }

  if (tampereNight) {
    return {
      emoji: "🌙",
      text: "While Tampere sleeps, Astana is still awake.",
    };
  }

  if (astanaNight) {
    return {
      emoji: "🌙",
      text: "While Astana sleeps, the countdown keeps ticking in Tampere.",
    };
  }

  if (
    tampereHour >= 18 &&
    astanaHour >= 18
  ) {
    return {
      emoji: "✨",
      text: "Two cities. Two evenings. One very special date ahead.",
    };
  }

  if (
    tampereHour < 9 &&
    astanaHour < 9
  ) {
    return {
      emoji: "☀️",
      text: "Good morning to two people getting closer to November 13.",
    };
  }

  return {
    emoji: "❤️",
    text: "Somewhere between Tampere and Astana, we're getting closer.",
  };
}

export function getLivingMarkup() {
  return `
    <section class="living-section">

      <div class="living-header">

        <span class="section-eyebrow">
          RIGHT NOW
        </span>

        <h2>
          Two cities, one countdown.
        </h2>

        <p>
          Somewhere between here and there, we're getting closer.
        </p>

      </div>

      <div class="city-clocks">

        <div class="city-clock" id="tampereClockCard">

          <div class="clock-top">

            <span class="clock-flag">
              ${CITIES.tampere.flag}
            </span>

            <span
              class="clock-mood"
              id="tampereMood"
            >
              ☀️
            </span>

          </div>

          <strong>
            ${CITIES.tampere.name}
          </strong>

          <span class="clock-country">
            ${CITIES.tampere.country}
          </span>

          <div
            class="live-time"
            id="tampereTime"
          >
            --:--:--
          </div>

          <span
            class="mood-label"
            id="tampereMoodLabel"
          >
            Good morning
          </span>

        </div>

        <div class="clock-connection">

          <div class="connection-line"></div>

          <div class="connection-heart">
            ❤️
          </div>

          <div class="connection-line"></div>

        </div>

        <div class="city-clock" id="astanaClockCard">

          <div class="clock-top">

            <span class="clock-flag">
              ${CITIES.astana.flag}
            </span>

            <span
              class="clock-mood"
              id="astanaMood"
            >
              🌙
            </span>

          </div>

          <strong>
            ${CITIES.astana.name}
          </strong>

          <span class="clock-country">
            ${CITIES.astana.country}
          </span>

          <div
            class="live-time"
            id="astanaTime"
          >
            --:--:--
          </div>

          <span
            class="mood-label"
            id="astanaMoodLabel"
          >
            Good night
          </span>

        </div>

      </div>

      <div class="living-message" id="livingMessage">
        ❤️ Somewhere between Tampere and Astana, we're getting closer.
      </div>

    </section>
  `;
}

function updateCity(cityKey) {
  const city = CITIES[cityKey];

  const timeElement =
    document.querySelector(`#${cityKey}Time`);

  const moodElement =
    document.querySelector(`#${cityKey}Mood`);

  const moodLabel =
    document.querySelector(`#${cityKey}MoodLabel`);

  const card =
    document.querySelector(`#${cityKey}ClockCard`);

  if (
    !timeElement ||
    !moodElement ||
    !moodLabel ||
    !card
  ) {
    return;
  }

  const hour = getHour(city.timeZone);
  const mood = getMood(hour);

  timeElement.textContent =
    getTime(city.timeZone);

  moodElement.textContent =
    mood.emoji;

  moodLabel.textContent =
    mood.label;

  card.dataset.period =
    mood.period;
}

function updateConnection() {
  const messageElement =
    document.querySelector("#livingMessage");

  if (!messageElement) {
    return;
  }

  const tampereHour =
    getHour(CITIES.tampere.timeZone);

  const astanaHour =
    getHour(CITIES.astana.timeZone);

  const connection =
    getConnectionMessage(
      tampereHour,
      astanaHour
    );

  messageElement.innerHTML = `
    <span class="living-message-emoji">
      ${connection.emoji}
    </span>

    ${connection.text}
  `;
}

export function initializeLiving() {
  const update = () => {
    updateCity("tampere");
    updateCity("astana");
    updateConnection();
  };

  update();

  setInterval(update, 1000);
}
