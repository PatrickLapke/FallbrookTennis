import React from "react";
import Toggle from "./app/components/Toggle";
import TennisBooking from "./app/screens/TennisBooking";
import CourtDisplayBox from "./app/components/CourtDisplayBox";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <Screen>
      <CourtDisplayBox></CourtDisplayBox>
    </Screen>
  );
}
