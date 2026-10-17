import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsType } from "../types";
import ShareLink from "@/components/share/ShareLink";
import { usePathname } from "next/navigation";

function NewsDetails({ news }: { news: NewsType[] }) {
  const selectedNews = news[0];
  const pathname = usePathname();
  return (
    <Card className="w-[98%] max-w-2xl mx-auto mt-12 p-4 lg:p-8">
      <CardHeader>
        <CardTitle className="flex gap-2 flex-wrap justify-between ">
          {selectedNews.subject}

          <span className="text-xs text-muted-foreground bg-muted px-2 p-1 rounded-full">
            {new Date(selectedNews.createdAt).toLocaleDateString("en-GB")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-muted-foreground">{selectedNews.body}</p>
      </CardContent>
      <CardFooter className="flex justify-end mt-8">
        <ShareLink title="News" link={pathname} />
      </CardFooter>
    </Card>
  );
}

export default NewsDetails;
