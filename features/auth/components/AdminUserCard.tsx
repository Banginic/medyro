import ActionsPopover from "@/components/share/ActionsPopover";

import { TableCell, TableRow } from "@/components/ui/table";
import { UserType } from "../types";
import { usePathname } from "next/navigation";

function AdminUserCard({ user, index }: { user: UserType; index: number }) {
  return (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell className={user.role === "admin" ? "danger" : ""}>
        {user.role}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>
        {new Date(user.createdAt).toLocaleDateString("en-GB")}
      </TableCell>

      <TableCell className="flex justify-end">
        <ActionsPopover
          remove={{
            endpoint: `/admins/${user.id}`,
            title: "User",
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default AdminUserCard;
