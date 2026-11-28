import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Icon } from "@/components/common/icon";
import { PageHeader, Panel, SectionHeader } from "@/components/common/page";
import { moduleById } from "@/data/modules";

export const Route = createFileRoute("/modules/$moduleId")({
  component: ModulePage,
  notFoundComponent: () => {
    throw notFound();
  },
});

function ModulePage() {
  const { moduleId } = Route.useParams();
  const mod = moduleById(moduleId);

  if (!mod) {
    return (
      <div className="pt-6">
        <div className="rounded-xl border border-hairline bg-card p-8 text-center">
          <Icon
            name="extension_off"
            size={32}
            className="text-muted-foreground"
          />
          <p className="mt-3 font-semibold text-on-surface">Unknown module</p>
          <p className="text-sm text-muted-foreground">
            No module brief exists for “{moduleId}”.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow={`${mod.layer} layer`}
        title={mod.title}
        description={mod.summary}
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <Panel className="lg:col-span-7">
          <SectionHeader title="Planned capabilities" />
          <ul className="mt-4 space-y-2.5">
            {mod.capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-sm text-on-surface-variant"
              >
                <Icon
                  name="check_circle"
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-strong"
                />
                {c}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="lg:col-span-5">
          <SectionHeader title="Data inputs" />
          {mod.inputs.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              This module has no upstream dependencies.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {mod.inputs.map((i) => (
                <Link
                  key={i.label}
                  to={i.to as never}
                  className="flex items-center justify-between rounded-lg border border-hairline px-3 py-2 text-sm text-on-surface transition-colors hover:border-brand/40"
                >
                  <span>{i.label}</span>
                  <Icon
                    name="arrow_forward"
                    size={16}
                    className="text-brand-strong"
                  />
                </Link>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
