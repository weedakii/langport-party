import { useCallback, useEffect, useState } from "react";
import { sessionRepo } from "./data/store";
import type { Session } from "./data/types";

/** Client-only session hook: null while hydrating, then the stored session. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(sessionRepo.current());
    setReady(true);
  }, []);

  const logout = useCallback(() => {
    sessionRepo.logout();
    setSession(null);
  }, []);

  return { session, ready, setSession, logout };
}