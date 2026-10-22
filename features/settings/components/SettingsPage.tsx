"use client";
import { Title } from "@/components/index";
import AddressSettings from "@/features/settings/components/AddressSettings";
import ContactSettings from "@/features/settings/components/ContactSettings";
import DeleteSettings from "@/features/settings/components/DeleteSettings";
import ProfileSettings from "@/features/settings/components/ProfileSettings";
import TransferSettings from "@/features/settings/components/TransferSettings";
import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../actions/getProfileInfo";
import SettingSkeleton from "./SettingSkeleton";

function SettingsPage() {
  const { data, isPending } = useQuery({
    queryKey: ["admin-profile-info"],
    queryFn: getProfileInfo,
  });
  if (isPending) return <div className="py-16">
    <SettingSkeleton />
  </div>;

  const project = data?.data[0];
  return (
    <div className="bg-background text-foreground min-h-[88dvh] py-8 px-2">
      <Title message="Settings" />
      <div className="space-y-6 mt-6 lg:mt-8">
        <ProfileSettings project={project} />
        <>
          {project && data.data.length > 0 && (
            <>
              <ContactSettings projectId={project.id} />
              <AddressSettings projectId={project.id} />
              <TransferSettings projectId={project.id} />
              <DeleteSettings projectId={project.id} />
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default SettingsPage;
