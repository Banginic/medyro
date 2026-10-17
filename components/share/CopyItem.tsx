"use client";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyItem({ link }: { link: string }) {
  const [isCopied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <Button
      disabled={isCopied}
      onClick={handleCopyLink}
      title="Copy "
      size={"sm"}
      variant={"ghost"}
      className="text-xs w-22"
    >
      {isCopied ? <Check /> : <Copy />}{" "}
      <span>{isCopied ? "Copied" : "Copy"}</span>
    </Button>
  );
}

export default CopyItem;
