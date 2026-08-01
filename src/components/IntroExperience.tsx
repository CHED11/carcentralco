import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

/**
 * First-visit cinematic intro for the homepage. Plays the existing hero clip
 * (public/hero/hero.webm|mp4 — the same asset the hero section's poster is
 * drawn from, nothing new is generated or duplicated) full-screen once, then
 * dissolves into the homepage. Returning visitors skip straight there.
 *
 * Dev flag — force the intro to replay while testing:
 *   - load the homepage with ?intro=1, or
 *   - in devtools: localStorage.setItem("cc_force_intro", "1")
 */
const SEEN_KEY = "cc_intro_seen_v1";
const FORCE_KEY = "cc_force_intro";

type Phase = "checking" | "intro" | "transitioning" | "done";

const RevealContext = createContext(true);
/** Whether homepage chrome (nav + hero content) should be visible/animated in. */
export const useHomepageRevealed = () => useContext(RevealContext);

// A layout effect (client-only) resolves the checking->intro/done decision
// before the browser paints, keeping the "checking" flash imperceptible.
// useLayoutEffect is a no-op-with-warning on the server, so fall back there.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EASE = [0.22, 1, 0.36, 1] as const;
// Start the dissolve this many seconds before the clip's natural end.
const TRANSITION_LEAD = 1.1;
const TRANSITION_DURATION = 1.4;
// Safety net in case autoplay/timeupdate/ended never fire as expected.
const FALLBACK_MS = 9000;

export function IntroExperience({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [phase, setPhase] = useState<Phase>(() => (isHome ? "checking" : "done"));
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedTransition = useRef(false);

  const beginTransition = () => {
    if (startedTransition.current) return;
    startedTransition.current = true;
    setPhase("transitioning");
  };

  // Resolve once, client-only: has this visitor already seen the intro?
  useIsomorphicLayoutEffect(() => {
    if (!isHome) return;
    let seen = false;
    let forced = false;
    try {
      const params = new URLSearchParams(window.location.search);
      forced = params.get("intro") === "1" || localStorage.getItem(FORCE_KEY) === "1";
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage unavailable (private mode, etc.) — treat as a first visit.
    }
    setPhase(seen && !forced ? "done" : "intro");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive playback and trigger the transition near the end of the clip.
  useEffect(() => {
    if (phase !== "intro") return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.play().catch(() => beginTransition());

    const onTimeUpdate = () => {
      if (v.duration && v.duration - v.currentTime <= TRANSITION_LEAD) beginTransition();
    };
    const onEnded = () => beginTransition();
    const fallback = setTimeout(beginTransition, FALLBACK_MS);

    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onEnded);
      clearTimeout(fallback);
    };
  }, [phase]);

  // Once the dissolve has played out, remove the overlay for good and
  // remember that this visitor has now seen it.
  useEffect(() => {
    if (phase !== "transitioning") return;
    const t = setTimeout(() => {
      setPhase("done");
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Non-fatal — worst case the intro replays next visit.
      }
    }, TRANSITION_DURATION * 1000);
    return () => clearTimeout(t);
  }, [phase]);

  const revealed = phase === "transitioning" || phase === "done";
  const showCover = phase !== "done";

  return (
    <RevealContext.Provider value={revealed}>
      {children}
      <AnimatePresence>
        {showCover && (
          <motion.div
            className="fixed inset-0 z-[200] overflow-hidden bg-black"
            initial={false}
            animate={
              phase === "transitioning"
                ? { opacity: 0, scale: 1.06, filter: "blur(28px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === "transitioning" ? TRANSITION_DURATION : 0.3,
              ease: EASE,
            }}
          >
            {phase === "intro" || phase === "transitioning" ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster="/hero/hero-poster.jpg"
                muted
                playsInline
                preload="auto"
                aria-hidden
                tabIndex={-1}
                disablePictureInPicture
              >
                <source src="/hero/hero.webm" type="video/webm" />
                <source src="/hero/hero.mp4" type="video/mp4" />
              </video>
            ) : (
              // "checking" phase — brand-neutral, matches server render 1:1.
              <div className="h-full w-full bg-background" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </RevealContext.Provider>
  );
}
