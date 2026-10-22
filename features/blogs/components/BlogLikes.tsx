import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function BlogLikes({ likes }: { likes: number }) {
  const [like, setLike] = useState(
    likes || Math.floor(Math.random() * 90) + 10
  );
  const [filledHeart, setHeart] = useState(false);

  function handleLike() {
    if (!filledHeart) {
      setLike((prev) => prev + 1);
      setHeart(true);
    } else {
      setLike((prev) => prev - 1);
      setHeart(false);
    }
  }

  return (
    <Button
      onClick={handleLike}
      variant="outline"
      size="sm"
      className="gap-2 border-primary/30 hover:bg-primary/10"
    >
      <Heart className={`size-4 ${filledHeart ? "fill-foreground" : ""}`} />
      <span>{like}k</span>
    </Button>
  );
}