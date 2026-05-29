import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Ajustes — Mencio" }] }),
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader
        title="Ajustes da conta"
        subtitle="Personalize sua marca, time e notificações."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <nav className="space-y-1 text-sm">
          {[
            "Perfil",
            "Marca",
            "Time",
            "Notificações",
            "Modelos de IA",
            "Plano e cobrança",
          ].map((s, i) => (
            <button
              key={s}
              className={`block w-full rounded-lg px-3 py-2 text-left ${
                i === 1 ? "bg-foreground text-background" : "hover:bg-secondary"
              }`}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-background p-6">
            <div className="text-base font-semibold">Marca</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Como sua marca é identificada nas respostas das IAs.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Nome da marca" value="Sua Marca" />
              <Field label="Site" value="https://suamarca.com.br" />
              <Field label="Categoria" value="Marketing & Vendas B2B" />
              <Field label="País principal" value="Brasil" />
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium">Variações de nome</label>
              <p className="text-xs text-muted-foreground">
                Outros jeitos que aparecem por aí — ajudamos a casar todas as
                menções.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Sua Marca", "SuaMarca", "sua.marca", "Sua Marca BR"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-xs"
                  >
                    {t}
                  </span>
                ))}
                <button className="inline-flex h-8 items-center rounded-full border border-dashed border-border px-3 text-xs text-muted-foreground hover:text-foreground">
                  + Adicionar
                </button>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-2">
              <button className="h-9 rounded-lg border border-border bg-background px-4 text-sm">
                Cancelar
              </button>
              <button className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background">
                Salvar alterações
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-background p-6">
            <div className="text-base font-semibold">Modelos monitorados</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha em quais IAs você quer aparecer.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {["ChatGPT", "Gemini", "Perplexity", "Copilot", "Claude"].map(
                (m, i) => (
                  <li
                    key={m}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                  >
                    <span className="font-medium">{m}</span>
                    <span
                      className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                        i < 4 ? "bg-foreground" : "bg-secondary"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full bg-background transition ${
                          i < 4 ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        defaultValue={value}
        className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
