import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  badge?: string; // Make badge optional
}

interface PizzaMenuItemProps {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (id: number, newQuantity: number) => void;
}

export const PizzaMenuItem = ({
  item,
  quantity,
  onQuantityChange,
}: PizzaMenuItemProps) => {
  const handleMinus = () => {
    if (quantity > 0) {
      onQuantityChange(item.id, quantity - 1);
    }
  };

  const handlePlus = () => {
    onQuantityChange(item.id, quantity + 1);
  };

  return (
    <Card className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover-lift relative overflow-hidden">
      {/* Animated background for gamification */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="text-3xl sm:text-4xl w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center shrink-0 relative z-10 border-2 border-primary/20">
        {item.icon}
      </div>

      <div className="flex-grow min-w-0 relative z-10 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0">
          <h3 className="font-bold text-base sm:text-lg text-foreground">
            {item.name}
          </h3>
          {item.badge && (
            <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded-full self-start sm:self-auto animate-pulse">
              {item.badge}
            </Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
          {item.description}
        </p>
        <p className="font-bold text-primary mt-2 text-base sm:text-lg">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10 w-full sm:w-auto justify-between sm:justify-start pt-2 sm:pt-0">
        <div className="flex items-center gap-2">
          <Button
            variant="quantity"
            size="icon"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md hover:shadow-lg"
            onClick={handleMinus}
            disabled={quantity === 0}
          >
            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <span className="text-lg sm:text-xl font-bold w-8 sm:w-10 text-center bg-primary/10 rounded-lg py-1">
            {quantity}
          </span>
          <Button
            variant="quantity"
            size="icon"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md hover:shadow-lg"
            onClick={handlePlus}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
