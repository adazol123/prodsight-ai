"use client";
import { cn } from "@/lib/utils";
import { useAuthSessionStore } from "@/store/session-store";
import { layoutVariants } from "@/styles/variants/layout.variant";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../assets/prodsight-logo-sm.svg";
import SignOutButton from "../login/_components/signout-button";
import LoginButton from "./login-button";
import NewProjectButton from "./new-project-button";

const HeaderSection = () => {
  const supabase = createClient();
  const _session = useAuthSessionStore()._session;
  const setAuthSession = useAuthSessionStore().setAuthSession;
  // call unsubscribe to remove the callback
  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthSession(session);
    });
    return () => {
      setAuthSession(null);
      data.subscription.unsubscribe();
    };
  }, [supabase.auth, setAuthSession]);

  return (
    <header className={cn(layoutVariants({ className: "min-h-16 py-3" }))}>
      <nav className="flex justify-between items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 select-none relative"
          tabIndex={0}
          replace
        >
          <Image src={Logo} alt="ProdSight Logo" />
          <span className="hidden sm:inline">Adazolhub | ProdSight AI</span>
          <span className="hidden sm:block text-[0.35rem] absolute -top-0.5 -right-1.5 opacity-70">BETA</span>
        </Link>
        <div className="flex gap-2 items-center">
          {!!_session && !_session?.user?.is_anonymous ? (
            <SignOutButton />
          ) : (
            <>
              <LoginButton />
              <NewProjectButton>New Project</NewProjectButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;
