import React, { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

type Player = {
  id: number;
  name: string;
  age: number;
  sport: string;
  skill: string;
  distance: string;
  time: string;
  image: string;
  bio: string;
  rating: number;
  matches: number;
};

interface SwipeDeckProps {
  players: Player[];
  onLike?: (player: Player) => void;
  onPass?: (player: Player) => void;
}

const SwipeDeck: React.FC<SwipeDeckProps> = ({ players, onLike, onPass }) => {
  const [index, setIndex] = useState(0);
  const current = players[index];

  const handlePass = () => {
    if (!current) return;
    onPass?.(current);
    setIndex((i) => Math.min(i + 1, players.length));
  };

  const handleLike = () => {
    if (!current) return;
    onLike?.(current);
    setIndex((i) => Math.min(i + 1, players.length));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-[520px]">
        {players.slice(index, index + 3).map((p, i) => (
          <Card key={p.id} className={`absolute inset-0 overflow-hidden transition-transform ${i === 0 ? "z-20" : i === 1 ? "z-10 scale-95 translate-y-3" : "z-0 scale-90 translate-y-6"}`}>
            <div className="relative h-full">
              <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-2xl font-bold mb-1">{p.name}, {p.age}</h3>
                <p className="text-white/90 mb-3">{p.sport} · {p.skill} · ⭐ {p.rating}</p>
                <p className="text-white/80 line-clamp-2 mb-3">{p.bio}</p>
                <div className="text-white/70 text-sm">{p.distance} • {p.time}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Button variant="outline" size="lg" className="h-14 w-14 rounded-full" onClick={handlePass}>
          <X className="h-6 w-6" />
        </Button>
        <Button className="h-14 w-14 rounded-full bg-accent hover:bg-accent-light" size="lg" onClick={handleLike}>
          <Heart className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeDeck;


