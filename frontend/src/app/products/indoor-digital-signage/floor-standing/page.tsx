import type { Metadata } from "next";
import { FloorStandingClient } from "./FloorStandingClient";

export const metadata: Metadata = {
  title: "Floor Standing Digital Signage - Sakthi Solutions | Round Corner Series 42\" to 65\"",
  description: "Godspeed floor standing digital signage with round corner design. Available in 42\", 46\", 55\" and 65\". High brightness, full HD 1920x1080, 60000 hrs lifetime.",
};

export default function FloorStandingPage() {
  return <FloorStandingClient />;
}
