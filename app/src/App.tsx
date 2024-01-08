import { useState } from "react";
import OpeningsList from "./components/OpeningsList";
import Form from "./components/Form";

export interface OpeningInfo extends Array<string> {
  0: string; // name
  1: string; // moves
}

export interface RecommendedOpenings {
  [ecoCategory: string]: OpeningInfo[];
}

export default function App() {
  const [openings, setOpenings] = useState<RecommendedOpenings | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-10">
      <Form setOpenings={setOpenings} />
      {openings && (
        <div className="md:col-span-2">
          <OpeningsList openings={openings} />
        </div>
      )}
    </div>
  );
}
