"use client";
import { useAuthSessionStore } from "@/store/session-store";

const SessionStatus = () => {
  const session = useAuthSessionStore()._session;
  if (!session?.user?.id) return null;
  return (
    <>
      <span className="text-[0.6rem] text-muted-foreground">Session ID: </span>
      <span className="text-[0.6rem] text-muted-foreground">
        {session.user.id.slice(0, 6)}-
        {session.user.id.slice(
          session.user.id.length - 6,
          session.user.id.length
        )}
      </span>
    </>
  );
};

export default SessionStatus;
