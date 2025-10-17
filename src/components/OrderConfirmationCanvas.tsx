import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MENU_CATEGORIES } from "@/menuData";
import { MessageCircle, Star } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  variantType?: string;
}

interface OrderConfirmationCanvasProps {
  order: Record<string, number>;
  totalAmount: number;
  onClose: () => void;
  onConfirm: (customerName: string) => void;
}

export const OrderConfirmationCanvas = ({
  order,
  totalAmount,
  onClose,
  onConfirm,
}: OrderConfirmationCanvasProps) => {
  const [customerName, setCustomerName] = useState("");
  const [nameError, setNameError] = useState("");

  // Calculate items from order
  const orderItems: OrderItem[] = [];

  Object.entries(order).forEach(([itemId, quantity]) => {
    if (quantity <= 0) return;

    // Parse item ID to determine if it's a variant
    const parts = itemId.split("_");
    const baseId = parseInt(parts[0]);

    // Find the item in the menu structure
    for (const category of MENU_CATEGORIES) {
      const item = category.items.find((i) => i.id === baseId);
      if (item) {
        let price = 0;
        let variantType = undefined;

        if (parts.length > 1) {
          // This is a variant
          const variantTypeStr = parts[1];
          const variant = item.variants?.find((v) => v.type === variantTypeStr);
          price = variant ? variant.price : 0;
          variantType = variantTypeStr;
        } else {
          // This is a regular item
          price = item.price || 0;
        }

        orderItems.push({
          id: itemId,
          name: item.name,
          category: category.name,
          quantity,
          price,
          variantType,
        });
        break;
      }
    }
  });

  const handleConfirm = () => {
    if (!customerName || customerName.trim() === "") {
      setNameError("Please add your name.");
      return;
    }
    setNameError("");
    onConfirm(customerName.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-card z-10 border-b border-border p-6 rounded-t-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <h2 className="text-2xl font-bold text-foreground">
                Made for You!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Your Order
            </h3>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">
                      {item.name} {item.variantType && `(${item.variantType})`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extras removed per request */}

          {/* Customer Name */}
          <div className="mb-2">
            <label
              htmlFor="customer-name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Name
            </label>
            <Input
              id="customer-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
            {/* Extras info line */}
            <p className="text-sm text-muted-foreground mt-2">
              🧀 Extra cheese ₹15 / 📦 Pizza box ₹5 — optional!
            </p>
            {nameError && (
              <p className="text-sm text-destructive mt-2" role="alert">
                {nameError}
              </p>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-primary/5 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-lg mb-3 text-foreground text-center">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Total</span>
                <span className="font-medium text-foreground">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
