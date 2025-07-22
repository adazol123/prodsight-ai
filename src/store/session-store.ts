import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface SessionState {
  _session: Session;
  setAuthSession: (session: Session) => void;
}

export const useAuthSessionStore = create<SessionState>((set) => ({
  _session: null,
  setAuthSession: (session: Session) => set({ _session: session }),
}));
