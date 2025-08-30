import { SidebarItem, SidebarLabel } from "./core/sidebar";

export const NaviItems = ({
  items,
  currentPath,
}: {
  items: {
    Icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
    label: string;
    href: string;
  }[];
  currentPath: string;
}) => (
  <>
    {items.map(({ Icon, label, href }, index) => (
      <SidebarItem
        key={index}
        href={href}
        current={href === currentPath}
      >
        <Icon />
        <SidebarLabel>{label}</SidebarLabel>
      </SidebarItem>
    ))}
  </>
);
