import type { Metadata } from "next";
import { WallMountingClient } from "./WallMountingClient";

export const metadata: Metadata = {
  title: "Wall Mounting Digital Signage - Sakthi Solutions | Slim Indoor LCD Displays 22\" to 70\"",
  description: "Godspeed wall mounted indoor LCD advertising displays. Available from 22\" to 70\" with network version for remote content management. Slim design, full HD, ideal for retail and corporate.",
};

export default function WallMountingPage() {
  return <WallMountingClient />;
}
