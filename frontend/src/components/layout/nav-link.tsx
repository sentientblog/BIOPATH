import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/common/icon";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const base =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand";
const idle =
  "text-on-surface-variant hover:bg-surface-high hover:text-on-surface";
const active = "bg-mint font-semibold text-on-mint";

export function SidebarLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const content = (
    <>
      <Icon name={item.icon} />
      <span className="truncate">{item.label}</span>
    </>
  );
  if (item.moduleId) {
    return (
      <Link
        to="/modules/$moduleId"
        params={{ moduleId: item.moduleId }}
        onClick={onNavigate}
        className={cn(base, idle)}
        activeProps={{ className: cn(base, active), "aria-current": "page" }}
        inactiveProps={{ className: cn(base, idle) }}
      >
        {content}
      </Link>
    );
  }
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      activeOptions={{ exact: item.to === "/" }}
      activeProps={{ className: cn(base, active), "aria-current": "page" }}
      inactiveProps={{ className: cn(base, idle) }}
    >
      {content}
    </Link>
  );
}
