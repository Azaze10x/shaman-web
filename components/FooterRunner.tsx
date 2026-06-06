import { assetPath } from "@/lib/asset-path";
import RunnerSpeech from "@/components/RunnerSpeech";

/**
 * Decorative pixel-art gimmick above the footer: the shaman mascot sprints back
 * and forth across a ground strip, fleeing a different cat each way — the black
 * cat chasing rightward, the orange tabby chasing back leftward. Loops forever.
 *
 * Pure CSS (see `.footer-runner` in globals.css): two packs share the strip; the
 * right pack crosses in the first half of the cycle and the left pack (sprites
 * flipped via `.runner-flip`) in the second half, each parked off-screen while
 * the other runs. Each sprite plays its 8-frame run-cycle via stepped
 * background-position. Hidden under prefers-reduced-motion. Decorative — aria-hidden.
 */
export default function FooterRunner() {
  return (
    <div className="footer-runner" aria-hidden>
      {/* → the shaman flees the black cat to the right */}
      <div className="runner-pack runner-pack--right">
        <span
          className="runner-sprite runner-cat"
          style={{ backgroundImage: `url(${assetPath("/sprites/cat-run.png")})` }}
        />
        <span className="runner-actor">
          <RunnerSpeech />
          <span
            className="runner-sprite runner-shaman"
            style={{ backgroundImage: `url(${assetPath("/sprites/shaman-run.png")})` }}
          />
        </span>
      </div>

      {/* ← the shaman flees the orange tabby back to the left (sprites flipped) */}
      <div className="runner-pack runner-pack--left">
        <span className="runner-actor">
          <RunnerSpeech />
          <span
            className="runner-sprite runner-shaman runner-flip"
            style={{ backgroundImage: `url(${assetPath("/sprites/shaman-run.png")})` }}
          />
        </span>
        <span
          className="runner-sprite runner-cat-tabby runner-flip"
          style={{ backgroundImage: `url(${assetPath("/sprites/cat-tabby-run.png")})` }}
        />
      </div>
    </div>
  );
}
