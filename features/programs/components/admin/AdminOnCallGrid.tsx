import { OnCallType } from "../../types";
import AdminOnCallCard from "./AdminOnCallCard";

function AdminOnCallGrid({ onCalls }: { onCalls: OnCallType[] }) {
  return (
    <div className="text-xs 2xl:text-sm border max-w-2xl mx-auto space-y-2">
     
        {onCalls.map((onCall, index) => (
          <AdminOnCallCard key={index} onCall={onCall}  />
        ))}
      
    </div>
  );
}

export default AdminOnCallGrid;
