import { LOVE_LETTERS } from "../data/messages.js";

export function getLoveLettersMarkup(countdown) {
  return `
    <section class="letters-section">

      <div class="section-heading">
        <span class="section-eyebrow">LOVE LETTERS</span>

        <h2>
          Little pieces of us.
        </h2>

        <p>
          Some letters are still waiting for their day.
        </p>
      </div>

      <div class="letters-grid">

        ${LOVE_LETTERS.map((letter) => {
          const unlocked =
            countdown.totalDays <= letter.unlockDays;

          return `
            <article
              class="letter-card ${unlocked ? "unlocked" : "locked"}"
              data-letter="${letter.id}"
            >

              <div class="letter-top">

                <div class="letter-icon">
                  ${unlocked ? letter.emoji : "🔒"}
                </div>

                <div class="letter-status">
                  ${
                    unlocked
                      ? "OPEN"
                      : `${letter.unlockDays} DAYS`
                  }
                </div>

              </div>

              <h3>
                ${
                  unlocked
                    ? letter.title
                    : "A letter is waiting..."
                }
              </h3>

              <p>
                ${
                  unlocked
                    ? letter.message
                    : letter.teaser
                }
              </p>

              ${
                unlocked
                  ? `
                    <div class="letter-open">
                      ✨ Unlocked
                    </div>
                  `
                  : `
                    <div class="letter-locked">
                      🔒 Opens at ${letter.unlockDays} days
                    </div>
                  `
              }

            </article>
          `;
        }).join("")}

      </div>

    </section>
  `;
}

export function initializeLoveLetters() {
  document
    .querySelectorAll(".letter-card.unlocked")
    .forEach((card) => {

      card.addEventListener("click", () => {
        card.classList.toggle("expanded");
      });

    });
}
