import { NewsType } from "../../types";
import AdminNewsCard from "./AdminNewsCard";

function AdminNewsGrid({ news }: { news: NewsType[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 w-[98%] max-w-xl mx-auto">
      {news.map((item) => (
        <AdminNewsCard news={item} key={item.id} />
      ))}
    </div>
  );
}

export default AdminNewsGrid;
