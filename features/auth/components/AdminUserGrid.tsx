import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from '../types';
import AdminUserCard from "./AdminUserCard";

function AdminUserGrid({users}: { users: UserType[]}) {
  return (
       <Table className="text-xs 2xl:text-sm border">
      <TableHeader className="bg-background/70">
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user, index) => (
          <AdminUserCard key={index} user={user} index={index} />
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminUserGrid