import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection, doc, getDoc, getDocs,
} from "firebase/firestore";
import { auth, db } from "./config/firebase";
import HomePage from "./Pages/HomePage";
import ComposePage from "./Pages/ComposePage";
import UserContext from "./contexts/UserContext";
import Demo from "./Pages/DemoPage";

export default function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid } = currentUser;
        const getUserData = async () => {
          const docRef = doc(db, "user", uid);
          const userSnap = await getDoc(docRef);
          const { name } = userSnap.data();
          const colRef = collection(db, "user", uid, "song");
          const songSnap = await getDocs(colRef);
          setUser({
            name,
            song: songSnap.docs.map((data) => ({ ...data.data() })),
            currentSong: null,
          });
        };
        getUserData();
      } else {
      }
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <UserContext.Provider value={providerValue}>
            <HomePage />
          </UserContext.Provider>
        )}
      />
      <Route
        path="/compose"
        element={(
          <UserContext.Provider value={providerValue}>
            <ComposePage demo={false} />
          </UserContext.Provider>
        )}
      />
      <Route
        path="/demo"
        element={(
          <UserContext.Provider value={providerValue}>
            <Demo />
          </UserContext.Provider>
        )}
      />
    </Routes>
  );
}
