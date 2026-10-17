"use client";
import { Button } from "../ui/button";
import { Check, Copy, Share } from "lucide-react";
import { useState } from "react";

function ShareLink({ link, title }: { link: string; title: string }) {
  const [isCopied, setCopied] = useState(false);
  const url = `${window.location.origin}${link}`;

  function handleCopyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
  }

  async function handleShareLink() {
    await navigator.share({
      title: `Check this ${title}`,
      text: "I found this useful",
      url,
    });
  }
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handleShareLink}
        title="Share link"
        size={"sm"}
        variant={"ghost"}
        className="text-xs"
      >
        <Share />
        Share
      </Button>
      <Button
        disabled={isCopied}
        onClick={handleCopyLink}
        title="Copy link"
        size={"sm"}
        variant={"ghost"}
        className="text-xs w-22"
      >
        {isCopied ? <Check /> : <Copy />}{" "}
        <span>{isCopied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  );
}

export default ShareLink;
