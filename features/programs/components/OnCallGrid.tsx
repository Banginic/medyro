import { OnCallType } from "../types";
import OnCallCard from "./OnCallCard";

function OnCallGrid({ onCalls }: { onCalls: OnCallType[] }) {
  return (
    <div className="text-xs 2xl:text-sm  max-w-2xl mx-auto space-y-2">
     
        {onCalls.map((onCall, index) => (
          <OnCallCard key={index} onCall={onCall}  />
        ))}
      
    </div>
  );
}

export default OnCallGrid;
