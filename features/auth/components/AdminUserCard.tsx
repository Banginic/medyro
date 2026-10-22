import ActionsPopover from "@/components/share/ActionsPopover";
import { UserType } from "../types";
import { Card } from "@/components/ui/card";


function AdminUserCard({ user }: { user: UserType }) {

  return (
    <Card className={`p-2 flex justify-between gap-4 lg:items-center ${user.role === 'profile' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
      <div className="group flex gap-4">
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-sm font-semibold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold ">
            {user.name}{" "}
            <span className="text-muted-foreground text-xs font-medium">
              ({user.role === 'profile' ? 'User' : 'Admin'})
            </span>
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>
      <div>
        
        <div className="font-medium flex justify-end gap-2">
          <ActionsPopover
            remove={{
              endpoint: `/admins/${user.id}`,
              title: "User",
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default AdminUserCard;
