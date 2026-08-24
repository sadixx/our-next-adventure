import { MILESTONES } from "../data/messages.js";

export function getJourneyMarkup(countdown) {
  const currentDays = countdown.totalDays;

  /*
   * A milestone is completed once we have passed it.
   *
   * Example:
   * 80 days remaining:
   *   81-day milestone = completed
   *   60-day milestone = next
   *
   * 59 days remaining:
   *   81 = completed
   *   60 = completed
   *   50 = next
   */

  const nextMilestone = MILESTONES
    .filter((milestone) => milestone.days < currentDays)
    .sort((a, b) => b.days - a.days)[0];

  const progressPercent = Math.round(countdown.progress * 100);

  const milestonesMarkup = MILESTONES.map((milestone) => {
    const isCompleted =
      currentDays < milestone.days;

    const isCurrent =
      nextMilestone &&
      milestone.days === nextMilestone.days;

    const isFinal =
      milestone.days === 0 &&
      countdown.complete;

    return `
      <div class="
        milestone
        ${isCompleted ? "completed" : ""}
        ${isCurrent ? "current" : ""}
        ${isFinal ? "final" : ""}
      ">

        <div class="milestone-dot">
          ${
            isCompleted
              ? "✓"
              : milestone.emoji
          }
        </div>

        <div class="milestone-text">
          <strong>${milestone.shortTitle}</strong>
          <span>${milestone.title}</span>
        </div>

      </div>
    `;
  }).join("");

  return `
    <section class="journey-section">

      <div class="section-heading">
        <span class="section-eyebrow">OUR JOURNEY</span>

        <h2>
          Every day brings us closer.
        </h2>

        <p>
          From two cities to one very special day.
        </p>
      </div>

      <div class="journey-route">

        <div class="journey-city start">
          <span>🇫🇮</span>
          <strong>Tampere</strong>
          <small>where you are</small>
        </div>

        <div class="journey-track">

          <div class="track-line">
            <div
              class="track-progress"
              style="width: ${progressPercent}%"
            ></div>
          </div>

          <div
            class="journey-plane"
            style="left: ${Math.max(
              3,
              Math.min(97, progressPercent)
            )}%"
          >
            ✈️
          </div>

          <div class="journey-heart">
            ❤️
          </div>

        </div>

        <div class="journey-city destination">
          <span>🇰🇿</span>
          <strong>Astana</strong>
          <small>where we're going</small>
        </div>

      </div>

      <div class="journey-progress-info">
        <span>
          ${progressPercent}% of the wait is behind us
        </span>

        <span>
          ${countdown.days} days remaining
        </span>
      </div>

      <div class="milestones">
        ${milestonesMarkup}
      </div>

      ${
        nextMilestone
          ? `
            <div class="next-milestone">

              <div class="next-milestone-icon">
                ${nextMilestone.emoji}
              </div>

              <div>
                <span>NEXT MILESTONE</span>

                <strong>
                  ${nextMilestone.title}
                </strong>

                <p>
                  ${nextMilestone.message}
                </p>
              </div>

            </div>
          `
          : `
            <div class="next-milestone">

              <div class="next-milestone-icon">
                ❤️
              </div>

              <div>
                <span>THE MOMENT IS HERE</span>

                <strong>
                  Today
                </strong>

                <p>
                  No more counting. Go make the memory.
                </p>
              </div>

            </div>
          `
      }

    </section>
  `;
}
