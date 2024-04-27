import React, { useState, useEffect } from "react";

import AppStack from "@/navigation/AppStack";
import AuthStack from "@/navigation/AuthStack";
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const RootNavigation = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {session ? <AppStack /> : <AuthStack />}
    </AuthContext.Provider>
  );
};

export default RootNavigation;
