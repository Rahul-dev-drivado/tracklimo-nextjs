import { redirect } from "next/navigation";
import { linkFactory } from "@/lib/link-factory";

export default function DashboardPage() {
  redirect(`/${linkFactory.dashboardLinks.bookings.all().join("/")}`);
}
