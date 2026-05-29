import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Mail, MoreHorizontal, Plus } from "lucide-react";

export const Route = createFileRoute("/app/team")({
  head: () => ({ meta: [{ title: "Time — Mencio" }] }),
  component: Team,
});

const MEMBERS = [
  { name: "Você", email: "voce@suamarca.com.br", role: "Dono", status: "Ativo" },
  { name: "Marina Alves", email: "marina@suamarca.com.br", role: "Admin", status: "Ativo" },
  { name: "Bruno Tavares", email: "bruno@suamarca.com.br", role: "Editor", status: "Ativo" },
  { name: "—", email: "ana@agencia.com.br", role: "Editor", status: "Convite pendente" },
];

function Team() {
  return (
    <>
      <PageHeader
        title="Quem está com você"
        subtitle="Convide quem cuida da marca e da estratégia de IA."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
            <Plus className="h-4 w-4" /> Convidar pessoa
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Pessoa</th>
                  <th className="px-5 py-3 text-left font-medium">Função</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="w-10 px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((m, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium">
                          {m.name === "—" ? "?" : m.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        defaultValue={m.role}
                        className="h-8 rounded-md border border-border bg-background px-2 text-xs"
                      >
                        <option>Dono</option>
                        <option>Admin</option>
                        <option>Editor</option>
                        <option>Leitor</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs ${
                          m.status === "Ativo"
                            ? "bg-foreground text-background"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold">Convidar por e-mail</div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Mandamos um convite com o passo a passo pra começar.
          </p>
          <input
            placeholder="nome@suaempresa.com.br"
            className="mt-4 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
          />
          <select className="mt-3 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
            <option>Editor — pode criar prompts e ver tudo</option>
            <option>Admin — gerencia o time e a marca</option>
            <option>Leitor — só visualiza</option>
          </select>
          <button className="mt-4 h-10 w-full rounded-lg bg-foreground text-sm font-medium text-background">
            Enviar convite
          </button>

          <div className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
            <p>Seu plano permite até 5 pessoas. Quer mais?</p>
            <a className="mt-1 inline-block text-foreground hover:underline" href="/app/billing">
              Ver opções de plano →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
