import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      aria-pressed={isFavorite}
      className={`rounded-lg p-2 transition-colors cursor-pointer ${
        isFavorite
          ? 'text-warning hover:bg-warning/10'
          : 'text-gray-400 hover:bg-gray-100 hover:text-warning'
      }`}
    >
      <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
}
