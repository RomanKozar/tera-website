import { AccentWave } from "@/components/ui/AccentWave";

export function AccentWaveStack({
  tops,
  start = "left",
}: {
  tops: number[];
  start?: "left" | "right";
}) {
  return (
    <>
      {tops.map((top, index) => {
        const isEven = index % 2 === 0;
        const leftFirst = start === "left";
        const isLeft = leftFirst ? isEven : !isEven;

        return (
          <AccentWave
            key={top}
            className={isLeft ? "-left-32 -scale-x-100" : "-right-40"}
            style={{ top }}
          />
        );
      })}
    </>
  );
}

