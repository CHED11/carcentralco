import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";

type NotifyContextValue = {
  open: (subject?: string) => void;
};

const NotifyContext = createContext<NotifyContextValue | null>(null);

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used within NotifyProvider");
  return ctx;
}

export function NotifyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback((s?: string) => {
    setSubject(s);
    setEmail("");
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <NotifyContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              className="glass relative z-10 w-full max-w-md rounded-lg p-8 sm:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-5 top-5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <p className="eyebrow mb-3">Private Preview</p>
                  <h3 className="font-display text-3xl text-foreground">
                    {subject ? `Notify me — ${subject}` : "Join the waitlist"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Be the first to know when this artwork enters the collection.
                    Reserved access for collectors.
                  </p>
                  <form onSubmit={submit} className="mt-7 space-y-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="hairline w-full rounded-sm bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-silver/50"
                    />
                    <button
                      type="submit"
                      className="silver-line w-full rounded-sm py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Notify Me
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-silver/40">
                    <Check className="h-6 w-6 text-silver" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">
                    You're on the list
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Thank you. We'll reach out the moment this piece is released.
                  </p>
                  <button
                    onClick={close}
                    className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-silver transition-colors hover:text-foreground"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotifyContext.Provider>
  );
}
