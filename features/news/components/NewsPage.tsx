'use client'
import { DataRenderer } from "@/components/index";
import { NewsTypes } from "../types";
import NewsDetails from "./NewsDetails";

function NewsPage({ news }: { news: NewsTypes }) {
  return (
    <DataRenderer data={news?.data} isError={!news} title="News Details">
      {(news) => <NewsDetails news={news} />}
    </DataRenderer>
  );
}

export default NewsPage;
