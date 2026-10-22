"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchState, setSearchState] = useState(
    searchParams.get("query") || ""
  );
  const debounceValue = useDebounce(searchState);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounceValue === "") {
      params.delete("query");
    } else {
      params.set("query", debounceValue);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, pathname]);

  return (
    <div className="relative flex flex-col gap-1.5 max-w-xl mx-auto mt-4">
      <Label htmlFor="searchOrder" className="text-muted-foreground m-1 sr-only">
        Search
      </Label>

      <Input
        id="searchOrder"
        
        value={searchState}
        onChange={(e) => setSearchState(e.target.value)}
        className="border-ring/40 border"
        placeholder={"Search pharmacy"}
        maxLength={12}
      />

      <Search className="absolute top-3 right-4 size-4 text-muted-foreground" />
    </div>
  );
}

export default SearchFilter;