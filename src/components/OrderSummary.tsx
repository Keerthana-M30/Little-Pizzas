import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface OrderSummaryProps {
  totalAmount: number;
  originalAmount?: number;
  discount?: number;
  onPlaceOrder: () => void;
}

export const OrderSummary = ({
  totalAmount,
  originalAmount,
  discount,
  onPlaceOrder,
}: OrderSummaryProps) => {
  const hasDiscount = discount && discount > 0;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card shadow-elevated rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 border-t-2 border-primary z-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Total:{" "}
            <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
          </h2>
          {hasDiscount && originalAmount && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground line-through">
                ₹{originalAmount.toFixed(2)}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-2 flex items-center">
                <Star className="w-2.5 h-2.5 mr-1" />
                {discount}% OFF
              </span>
            </div>
          )}
        </div>
        <Button
          variant="gamified"
          size="sm"
          className="rounded-full font-bold shadow-md hover:shadow-lg w-full sm:w-auto text-sm sm:text-base h-10 sm:h-12"
          onClick={onPlaceOrder}
        >
          <span>VIEW ORDER</span>
        </Button>
      </div>
    </div>
  );
};
