import { useState, useEffect } from 'react';
import { supabase } from './supabase_client.ts';
// @ts-ignore
import { GitHubCalendar } from 'react-github-calendar';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Tippy from "@tippyjs/react";


function App() {

  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | any>(null);

  const baseUrl = 'http://localhost:5555/api'
  // Get the current session on component mount. Idk what this actually do bellow the hood
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  // Sign up user on session change
  useEffect(() => {
    const syncUser = async () => {
      if (session) {
        console.log(session);

        // Check if user already exists by our own database
        try {
          const checkResponse = await fetch(`${baseUrl}/users?supabase_uid=${session?.user?.id}`, {
            method: 'GET'
          });
          const checkJson = await checkResponse.json();

          console.log(checkJson);
          // If we find a user (and no error), stop here.
          if (checkJson?.data && !checkJson?.data?.error) {
            console.log('User already exists (useEffect)');
            return;
          }

        } catch (error) {
          console.log('Error checking user:', error);
        }

        const metadata = session?.user?.user_metadata;

        const data = {
          email: session?.user?.email,
          phone: session?.user?.phone || '',
          github_username: metadata?.user_name,
          fullname: metadata?.full_name || '',
          supabase_id: session?.user?.id,
          profile_picture: metadata?.avatar_url || '',
        }

        try {
          const signupResponse = await fetch('http://localhost:5555/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const signupJson = await signupResponse.json();
          console.log(signupJson);
        } catch (error) {
          console.log(error);
          setError('Error signing up');
        }
      }
    };

    syncUser();
  }, [session])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  if (!session) {
    return (
      <>
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />; */}
        <button onClick={signUp}>Sign in with Github</button>
      </>
    );
  } else {
    return (
      <div>
        <h2>Welcome, {session?.user?.email}</h2>
        <GitHubCalendar
          username={session?.user?.user_metadata?.user_name}
          renderBlock={(block, activity) => (
            <Tippy
              key={activity.date}
              content={`${activity.count} aportes el ${activity.date}`}
              animation="shift-away"
              placement="top"
            >
              {block}
            </Tippy>
          )}
        />
        <img style={{ width: '200px' }} src={session?.user?.user_metadata?.avatar_url} alt="" />
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
}

export default App
