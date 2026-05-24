import { notFound } from "next/navigation";

// At the top of your page function
export default function LeaderBoard() {
  const isUnderConstruction = true; // Change this condition as needed

  if (isUnderConstruction) {
    notFound(); // This will trigger the not-found.tsx page
  }
}
