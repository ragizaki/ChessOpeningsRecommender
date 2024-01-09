import { OpeningInfo, RecommendedOpenings } from "../App";
import OpeningCard from "./OpeningCard";

interface OpeningsListProps {
  openings: RecommendedOpenings;
}

export default function OpeningsList({ openings }: OpeningsListProps) {
  console.log(openings[0]);
  return (
    <div className="w-full h-fit border-2 rounded-md p-4">
      <p className="text-lg tracking-wide text-slate-900 font-medium mb-3">
        Based on your Chess.com games, it looks like you would enjoy the
        following openings:
      </p>
      <ul className=" flex flex-col gap-5">
        {Object.entries(openings).map(([eco, openingInfo]) => {
          return (
            <li key={eco}>
              {openingInfo.map(([name, moves]: OpeningInfo) => (
                <OpeningCard name={name} moves={moves} key={name} />
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
