interface OpeningProps {
  name: string;
  moves: string;
}

export default function OpeningCard({ name, moves }: OpeningProps) {
  return (
    <li className="flex flex-col justify-center">
      <h3>{name}</h3>
      <p>Move Order: {moves}</p>
    </li>
  );
}
