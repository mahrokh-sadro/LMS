"use client";

import dynamic from "next/dynamic";

const DynamicSearchBar = dynamic(() => import("./SearchBar"), {
  ssr: false,
});

const DynamicSearchBarWrapper = () => {
  return <DynamicSearchBar />;
};

export default DynamicSearchBarWrapper;
