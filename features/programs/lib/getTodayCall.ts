import { OnCallType } from "../types";

export function getTodayCall(onCalls: OnCallType[]) {
  const today = new Date();
  const todayOnCall = onCalls.find((item) => {
    const onCallDate = new Date(item.date);

    return (
      onCallDate.getFullYear() === today.getFullYear() &&
      onCallDate.getMonth() === today.getMonth() &&
      onCallDate.getDate() === today.getDate()
    );
  });
  return todayOnCall
}
