const SURPRISES = [
  {
    emoji: "🫂",
    text: "This is a virtual hug. The real one is reserved for November 13.",
  },
  {
    emoji: "✈️",
    text: "Somewhere between Tampere and Astana, the distance is getting smaller.",
  },
  {
    emoji: "💋",
    text: "One kiss has officially been added to the November 13 agenda.",
  },
  {
    emoji: "🥰",
    text: "If you're smiling right now, the surprise worked.",
  },
  {
    emoji: "❤️",
    text: "Two cities. One countdown. One very special person waiting at the other end.",
  },
  {
    emoji: "🌸",
    text: "Today's reminder: the waiting is temporary. The memory will stay.",
  },
  {
    emoji: "😭",
    text: "Imagine seeing each other after all these days. Yeah... that's going to be emotional.",
  },
  {
    emoji: "🎀",
    text: "This button contains absolutely no useful information. Just affection.",
  },
];

export function getSurpriseMarkup() {
  return `
    <section class="surprise-section">

      <div class="surprise-card">

        <div class="surprise-sparkles">
          ✦ ✧ ✦
        </div>

        <div
          class="surprise-icon"
          id="surpriseIcon"
        >
          🎁
        </div>

        <span class="section-eyebrow">
          A LITTLE SOMETHING
        </span>

        <h2>
          Need a tiny reminder?
        </h2>

        <p id="surpriseText">
          Press the button.
          You never know what you'll get.
        </p>

        <button
          class="surprise-button"
          id="surpriseButton"
          type="button"
        >
          <span>💗</span>
          Surprise me
        </button>

      </div>

    </section>
  `;
}

export function initializeSurprise() {
  const button = document.querySelector("#surpriseButton");
  const icon = document.querySelector("#surpriseIcon");
  const text = document.querySelector("#surpriseText");

  if (!button || !icon || !text) {
    return;
  }

  let lastIndex = -1;

  button.addEventListener("click", () => {

    let index;

    do {
      index = Math.floor(
        Math.random() * SURPRISES.length
      );
    } while (
      index === lastIndex &&
      SURPRISES.length > 1
    );

    lastIndex = index;

    const surprise = SURPRISES[index];

    icon.classList.remove("surprise-pop");

    void icon.offsetWidth;

    icon.textContent = surprise.emoji;
    text.textContent = surprise.text;

    icon.classList.add("surprise-pop");
  });
}
