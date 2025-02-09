import { Outlet } from "react-router";

export default function PlainLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-muted">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
