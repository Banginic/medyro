import { getTodayCall } from "../lib/getTodayCall";
import { OnCallType } from "../types";

function OnCallDetails({ onCalls }: { onCalls: OnCallType[] }) {
  const todayOnCall = getTodayCall(onCalls);

  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-primary mb-3">On-Call Today</h2>
        {todayOnCall ? (
          <div className="rounded-lg border border-primary/30 bg-green-400 p-4 ">
            <p className="font-medium">Pharmacy on-call active</p>
            <p className="text-sm text-muted-foreground">
              {todayOnCall.startTime.slice(0,5)}{" "}
              {todayOnCall.endTime ? `- ${todayOnCall.endTime.slice(0,5)}` : "- Open"}
              {todayOnCall.note ? ` · ${todayOnCall.note}` : ""}
            </p>
          </div>
        ) : (
          <p className="danger">Not On-Call Today</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">On-Calls date this month</h2>
        <ul className="space-y-2 rounded-lg border border-primary/30 bg-muted  p-4 ">
          {onCalls.map((entry) => (
            <li key={entry.id} className="text-sm">
              {new Date(entry.date).toDateString()}
             
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default OnCallDetails;
