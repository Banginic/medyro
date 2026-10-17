import ActionsPopover from "@/components/share/ActionsPopover";
import { OnCallType } from "../../types";
import { TableCell, TableRow } from "@/components/ui/table";

function AdminOnCallCard({
  onCall,
  index,
}: {
  onCall: OnCallType;
  index: number;
}) {
  return (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{new Date(onCall.date).toDateString()}</TableCell>
      <TableCell>{onCall.startTime}</TableCell>
      <TableCell>{onCall.endTime}</TableCell>
      <TableCell>{onCall.isActive ? "Active" : "Inactive"}</TableCell>

      <TableCell className="flex justify-end">
        <ActionsPopover
          remove={{
            endpoint: `/on-calls/${onCall.id}`,
            title: "Schedule",
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default AdminOnCallCard;
