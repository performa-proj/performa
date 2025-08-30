import { SidebarLayout } from "@/components/core/sidebar-layout";
import { PoSSidebar, PoSNavbar } from "@/features/pos/components/PoSNavi";

export default function PoSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout
      sidebar={<PoSSidebar />}
      navbar={<PoSNavbar />}
    >
      {children}
    </SidebarLayout>
  );
}
