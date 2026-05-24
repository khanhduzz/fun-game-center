import { notFound } from "next/navigation";

export default function LeaderBoard() {
  const isUnderConstruction = true; // Change this condition as needed

  if (isUnderConstruction) {
    notFound(); // This will trigger the not-found.tsx page
  }
}
