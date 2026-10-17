
import Image from "next/image";

type Props = {
  textSize: string;
  logoSize: number;
};
function Logo(props: Props) {
  return (
    <div className="flex items-center gap-1">
      <Image width={props.logoSize} alt={"./placeholder.png"} height={48}  src={'/logo.png'} />
     
    </div>
  );
}

export default Logo;
