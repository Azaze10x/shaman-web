import { assetPath } from "@/lib/asset-path";

/**
 * Decorative pixel-art gimmick: the shaman sprinting across a ground strip with
 * the black cat hot on its heels, looping forever. Sits just above the footer.
 *
 * Pure CSS animation (see `.footer-runner` in globals.css): each sprite plays its
 * run-cycle in place via stepped background-position, while the shared `.runner-pack`
 * translates the pair across the screen. Hidden under prefers-reduced-motion.
 * Decorative only — aria-hidden.
 */
export default function FooterRunner() {
  return (
    <div className="footer-runner" aria-hidden>
      <div className="runner-pack">
        <span
          className="runner-sprite runner-cat"
          style={{ backgroundImage: `url(${assetPath("/sprites/cat-run.png")})` }}
        />
        <span
          className="runner-sprite runner-shaman"
          style={{ backgroundImage: `url(${assetPath("/sprites/shaman-run.png")})` }}
        />
      </div>
    </div>
  );
}
