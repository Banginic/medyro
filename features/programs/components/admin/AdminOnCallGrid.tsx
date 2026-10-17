import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OnCallType } from "../../types";
import AdminOnCallCard from "./AdminOnCallCard";

function AdminOnCallGrid({ onCalls }: { onCalls: OnCallType[] }) {
  return (
    <Table className="text-xs 2xl:text-sm border">
      <TableHeader className="bg-background/70">
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Start time</TableHead>
          <TableHead>End time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {onCalls.map((onCall, index) => (
          <AdminOnCallCard key={index} onCall={onCall} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminOnCallGrid;
