import SimulatedDashboard from "@/features/dashboard-preview/SimulatedDashboard";

export default function DashboardPreview() {
  return (
    <section className="pb-24 overflow-hidden">
      <div className="w-[960px] mx-auto">
        <div className="rounded-[32px] p-[6px] bg-gradient-to-b from-[rgba(255,255,255,0.18)] via-[rgba(255,255,255,0.06)] to-[rgba(89,159,138,0.08)] shadow-[0_0_0_1px_rgba(89,159,138,0.08)]">
          <SimulatedDashboard />
        </div>
      </div>
    </section>
  );
}
