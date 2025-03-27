import { useWorkspace } from "@/hooks/useWorkspace";
import { useEffect } from "react";

export default function Index() {
  const workspace = useWorkspace();

  useEffect(() => {
    // Set the breadcrumbs
    workspace.setBreadcrumbs([
      {
        name: "Dashboard",
        active: true,
      },
    ]);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
