import DataTable from "@/components/custom-table";
const columns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "email",
    sorKey: "name",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
  },
];

const data = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
];

const actions = [
  {
    label: "Edit",
    onClick: (row: any) => {
      // Handle edit action
      console.log("Edit:", row);
    },
  },
  {
    label: "Delete",
    onClick: (row: any) => {
      // Handle delete action
      console.log("Delete:", row);
    },
  },
];
export default function index() {
  return <DataTable columns={columns} data={data} actions={actions} />;
}
