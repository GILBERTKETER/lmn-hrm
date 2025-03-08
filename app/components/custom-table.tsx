import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface Column {
  id: string;
  header: string;
  isVisible?: boolean;
}
interface Action {
  label: string;
  onClick: (row: any) => void;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
  sortable?: boolean;
  filterable?: boolean;
  dateRangePicker?: boolean;
  advanceFilters?: boolean;
  rowClickable?: boolean;
  rowUrl?: string;
}

export default function index({
  columns: initialColumns,
  data: initialData,
  actions,
  sortable,
  filterable,
  dateRangePicker,
  advanceFilters,
  rowClickable,
  rowUrl,
}: DataTableProps) {
  return (
    <Card>
      <div className={cn("")}></div>
    </Card>
  );
}
