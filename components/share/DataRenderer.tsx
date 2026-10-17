"use client";
import Loading from "@/app/loading";
import ErrorFetching from "./ErrorFetching";
import NoData from "./NoData";
import React from "react";
import Back from "./Back";
import PausedData from "./PausedData";

type DataRendererProps<T> = {
  title: string;
  data?: T;
  isLoading?: boolean;
  isPaused?: boolean;
  isError?: boolean;
  loader?: React.ReactNode;
  renderBack?: boolean;

  children: (data: T) => React.ReactNode;
};

function DataRenderer<T extends object>({
  title,
  data,
  isLoading,
  isPaused,
  isError,
  loader,
  renderBack = false,
  children,
}: DataRendererProps<T>) {
  if (isPaused) {
    return <PausedData />;
  }

  if (isLoading) {
    return loader || <Loading />;
  }

  if (isError) {
    return <ErrorFetching message={`Error fetching ${title}`} />;
  }

  // Generic empty check
  const isEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (isEmpty) {
    return <NoData message={` No ${title} available`} />;
  }

  return (
    <div className="  ">
      <>{renderBack && <Back name="" link="" />}</>
      {children(data)}
    </div>
  );
}

export default DataRenderer;
