import type { Metadata } from "next";
import AdminFaq from "@/components/faq/AdminFaq";

export const metadata: Metadata = {
  title: "Admin FAQ — LUXEN",
  robots: { index: false, follow: false },
};

export default function AdminFaqPage() {
  return <AdminFaq />;
}