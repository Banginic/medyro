
import { projectDetails } from "@/constants/project-details";
import { ProfileType } from "@/features/profiles/types";


function SocialLinks({ profile }: { profile: ProfileType | undefined }) {
  return (
    <section className="flex items-center gap-2">
     

      {profile?.facebook && (
        <a
          title="Visit our Facebook page"
          href={profile.facebook}
          target="blank"
          className="cursor-pointer "
        >
          <img
            className="size-7 md:size-10 md:hover:scale-110   trans"
            src={"/icons/facebook.png"}
            width={30}
            height={30}
            aria-label="Social link image"
            alt={`${projectDetails.projectName} facebook`}
          />
        </a>
      )}
      {profile?.instagram && (
        <a
          title="Visit our Instagram page"
          href={profile.instagram}
          target="blank"
          className="cursor-pointer "
        >
          <img
            className="size-7 md:size-10  md:hover:scale-110  trans"
            src={"/icons/instagram.png"}
            width={30}
            height={30}
            aria-label="Social link image"
             alt={`${projectDetails.projectName} instagram`}
          />
        </a>
      )}
      {profile?.tiktok && (
        <a
          title="Visit our Tiktok page"
          href={profile.tiktok}
          target="blank"
          className="cursor-pointer "
        >
          <img
            className="size-7 md:size-10 md:hover:scale-110  trans"
            src={"/icons/tiktok.png"}
            width={30}
            height={30}
            loading="lazy"
            aria-label="Social link image"
             alt={`${projectDetails.projectName} tiktok`}
          />
        </a>
      )}
       <a
        title="Visit our LinkedIn page"
        href={"https://www.linkedin.com/in/boris-ayam-ndoh-16243037b/"}
        target="blank"
        className="cursor-pointer"
      >
        <img
          className="size-7 md:size-10 md:hover:scale-110   trans bg-w"
          src={"/icons/linkin.png"}
          width={30}
          height={30}
          loading="lazy"
          aria-label="Social link image"
          alt={`${projectDetails.projectName} linkedIn`}
        />
      </a>
    </section>
  );
}

export default SocialLinks;
