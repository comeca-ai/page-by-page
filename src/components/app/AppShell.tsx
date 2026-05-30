import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getUserAgencies } from "@/lib/agency.functions";
import {
  LayoutDashboard,
  MessageSquareQuote,
  Quote,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  UserPlus,
  CreditCard,
  Plus,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/app", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { to: "/app/prompts", label: "Perguntas", icon: MessageSquareQuote },
  { to: "/app/mentions", label: "Menções", icon: Quote },
  { to: "/app/competitors", label: "Concorrentes", icon: Users },
  { to: "/app/alerts", label: "Alertas", icon: Bell },
  { to: "/app/team", label: "Time", icon: UserPlus },
  { to: "/app/billing", label: "Plano", icon: CreditCard },
  { to: "/app/settings", label: "Ajustes", icon: Settings },
];

export function AppShell({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-secondary/40">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-none flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <div className="h-7 w-7 rounded-md bg-foreground" />
          <span className="text-base font-semibold tracking-tight">Mencio</span>
        </div>

        <AgencySwitcher />


        <nav className="mt-5 flex-1 px-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/app"}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl border border-border bg-secondary/50 p-4 text-xs">
          <div className="font-medium">Plano Beta</div>
          <div className="mt-1 text-muted-foreground">
            25 perguntas/dia. Quer mais? Fala com a gente.
          </div>
          <button className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-md bg-foreground text-[11px] font-medium text-background">
            Falar com vendas
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-6 backdrop-blur">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar menções, perguntas, concorrentes…"
              className="h-9 w-full rounded-lg border border-border bg-secondary/40 pl-9 pr-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:border-foreground/40">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-foreground" />
            </button>
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-2 pr-3 text-sm">
              <div className="h-6 w-6 rounded-full bg-foreground/10" />
              <span className="font-medium">Você</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
  centered,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`mb-8 flex items-start gap-4 ${centered ? "justify-center text-center" : "justify-between"}`}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

function AgencySwitcher() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const fetchAgencies = useServerFn(getUserAgencies);
  const { data } = useQuery({ queryKey: ["user-agencies"], queryFn: fetchAgencies });
  const agencies = data?.agencies ?? [];
  const match = pathname.match(/^\/app\/a\/([^/]+)/);
  const currentSlug = match?.[1];
  const current = agencies.find((a: any) => a.slug === currentSlug) ?? agencies[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-4 mt-4 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:border-foreground/40">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-6 w-6 flex-none rounded bg-foreground/10" />
          <div className="leading-tight min-w-0">
            <div className="font-medium truncate">{current?.name ?? "Selecionar agência"}</div>
            <div className="text-[10px] text-muted-foreground truncate">
              {current ? `Cargo: ${current.role}` : "Nenhuma agência"}
            </div>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 flex-none text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Suas agências</DropdownMenuLabel>
        {agencies.map((a: any) => (
          <DropdownMenuItem
            key={a.id}
            onClick={() => navigate({ to: "/app/a/$slug", params: { slug: a.slug } })}
          >
            <span className="truncate">{a.name}</span>
            {a.slug === current?.slug && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        {agencies.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuItem onClick={() => navigate({ to: "/app/onboarding" })}>
          <Plus className="mr-2 h-4 w-4" /> Nova agência
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
