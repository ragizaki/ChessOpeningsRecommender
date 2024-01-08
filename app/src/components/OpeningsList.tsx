import { OpeningInfo, RecommendedOpenings } from "../App";

interface OpeningsListProps {
  openings: RecommendedOpenings;
}

interface OpeningProps {
  name: string;
  moves: string;
}

export default function OpeningsList({ openings }: OpeningsListProps) {
  console.log(openings);
  return (
    <div>
      {Object.entries(openings).map(([eco, openingInfo]) => {
        return (
          <div key={eco}>
            <h2>{eco}</h2>
            {openingInfo.map(([name, moves]: OpeningInfo) => (
              <Opening name={name} moves={moves} key={name} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Opening({ name, moves }: OpeningProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{moves}</p>
    </div>
  );
}
