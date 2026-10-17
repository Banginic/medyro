import React from "react";

import Image from "next/image";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // Expected range: 1 to 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      className={`w-5 h-5  inline-block ${index < rating ? "fill-muted-foreground text-muted-foreground" : "text-muted fill-muted "}`}
    />
  ));

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
