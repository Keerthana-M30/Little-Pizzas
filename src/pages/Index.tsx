import { useState, useMemo } from "react";
import { OrderSummary } from "@/components/OrderSummary";
import { OrderConfirmationCanvas } from "@/components/OrderConfirmationCanvas";
import { AlertModal } from "@/components/AlertModal";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Zap } from "lucide-react";
import { MenuCategorySection } from "@/components/MenuCategory";
import { MENU_CATEGORIES } from "@/menuData";

// Shop owner's WhatsApp number (with country code, without '+')
const SHOP_OWNER_PHONE = "918098511211";

const Index = () => {
  const [order, setOrder] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      const newOrder = { ...order };
      delete newOrder[id];
      setOrder(newOrder);
    } else {
      setOrder({ ...order, [id]: newQuantity });
    }
    // Trigger animation
    setAnimationTrigger((prev) => prev + 1);
  };

  const totalAmount = useMemo(() => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      // Parse item ID to determine if it's a variant
      const parts = itemId.split("_");
      const baseId = parseInt(parts[0]);

      // Find the item in the new menu structure
      for (const category of MENU_CATEGORIES) {
        const item = category.items.find((i) => i.id === baseId);
        if (item) {
          let price = 0;

          if (parts.length > 1) {
            // This is a variant
            const variantType = parts[1];
            const variant = item.variants?.find((v) => v.type === variantType);
            price = variant ? variant.price : 0;
          } else {
            // This is a regular item
            price = item.price || 0;
          }

          return total + price * Number(quantity);
        }
      }
      return total;
    }, 0);
  }, [order]);

  const totalItems = useMemo(() => {
    return Object.values(order).reduce(
      (total, quantity) => total + quantity,
      0
    );
  }, [order]);

  const handlePlaceOrder = () => {
    if (Object.keys(order).length === 0) {
      setAlertMessage(
        "Cart’s empty… but your stomach isn’t! 😋Time to fill it!"
      );
      setShowAlert(true);
      return;
    }

    // Show the order confirmation canvas instead of directly going to WhatsApp
    setShowOrderConfirmation(true);
  };

  const handleConfirmOrder = (customerName: string) => {
    const finalTotal = totalAmount;

    let message = "Hello Little Pizzas!\n\n";

    if (customerName) {
      message += `Order for: *${customerName}*\n\n`;
    }

    message += "I would like to place the following order:\n\n";
    message += "========================\n";

    // Build order message from the new menu structure
    MENU_CATEGORIES.forEach((category) => {
      category.items.forEach((item) => {
        // Check for regular item
        const itemId = `${item.id}`;
        if (order[itemId] > 0) {
          const quantity = order[itemId];
          const price = item.price || 0;
          message += `*${item.name} (${category.name})*\n`;
          message += `Qty: *${quantity}*\n`;
          message += `Price: ₹${price}\n`;
          message += `Total: ₹${(price * quantity).toFixed(2)}\n`;
          message += "--------------------------------\n";
        }

        // Check for variants
        if (item.variants) {
          item.variants.forEach((variant) => {
            const variantId = `${item.id}_${variant.type}`;
            if (order[variantId] > 0) {
              const quantity = order[variantId];
              const price = variant.price;
              message += `*${item.name} ${variant.type} (${category.name})*\n`;
              message += `Qty: *${quantity}*\n`;
              message += `Price: ₹${price}\n`;
              message += `Total: ₹${(price * quantity).toFixed(2)}\n`;
              message += "--------------------------------\n";
            }
          });
        }
      });
    });

    message += `\n*GRAND TOTAL: ₹${finalTotal.toFixed(2)}*\n`;
    message += "========================\n\n";
    message += "Please confirm my order. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SHOP_OWNER_PHONE}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Close the confirmation canvas
    setShowOrderConfirmation(false);
  };

  // Calculate discount based on total items
  const discount = useMemo(() => {
    if (totalItems >= 6) return 15;
    if (totalItems >= 4) return 10;
    if (totalItems >= 2) return 5;
    return 0;
  }, [totalItems]);

  const discountedTotal = useMemo(() => {
    return totalAmount - (totalAmount * discount) / 100;
  }, [totalAmount, discount]);

  // Get items for the active category
  const getItemsForCategory = () => {
    if (activeCategory === "all") {
      // Return all items without category headings
      return MENU_CATEGORIES.flatMap((category) =>
        category.items.map((item) => ({ item, category: category.name }))
      );
    } else {
      // Return items for the specific category
      const category = MENU_CATEGORIES.find((cat) => cat.id === activeCategory);
      return category
        ? category.items.map((item) => ({ item, category: category.name }))
        : [];
    }
  };

  const itemsToDisplay = getItemsForCategory();

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-40 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary/10 blur-xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-2xl p-3 sm:p-4 md:p-6 lg:p-8 relative z-10">
        {/* Header with gamification elements */}
        <header className="text-center mb-6 sm:mb-8 mt-4 sm:mt-6 animate-float">
          <div className="relative inline-block">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-3 uppercase tracking-wider"
              style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
            >
              Little Pizzas, Salem{" "}
              <span className="inline-block animate-bounce-subtle">🍕</span>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
            <div className="flex items-center bg-primary/10 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Loved Flavors
              </span>
            </div>
            <div className="flex items-center bg-secondary/10 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-secondary mr-1" />
              <span className="text-xs sm:text-sm font-medium text-secondary">
                Fast Delivery
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base max-w-md mx-auto">
            Select your favorite items below and order via WhatsApp!
          </p>
        </header>

        {/* Horizontal Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3 pb-24">
          {activeCategory !== "all" && itemsToDisplay.length > 0 && (
            <h2 className="text-xl font-bold text-foreground mb-3">
              {MENU_CATEGORIES.find((cat) => cat.id === activeCategory)?.name}
            </h2>
          )}
          {itemsToDisplay.map(({ item, category }) => (
            <MenuCategorySection
              key={`item-${item.id}`}
              category={{ id: 0, name: category, icon: "", items: [item] }}
              order={order}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      {/* Order Summary - Fixed at Bottom */}
      <div className="fixed bottom-8 left-0 right-0 z-30">
        <OrderSummary
          totalAmount={discountedTotal}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>

      {/* Site Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-1 text-center text-[0.6rem] sm:text-xs text-muted-foreground z-30">
        <div className="container mx-auto px-1 sm:px-2">
          <p>
            Powered by{" "}
            <a
              href="https://EverydayAiLabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              EverydayAiLabs.com
            </a>{" "}
            | To build like this for your Quick Service Restaurant reach us on{" "}
            <a
              href="tel:+917314851888"
              className="text-primary hover:underline font-medium"
            >
              +91-7314851888
            </a>
          </p>
        </div>
      </footer>

      {/* Order Confirmation Canvas */}
      {showOrderConfirmation && (
        <OrderConfirmationCanvas
          order={order}
          totalAmount={discountedTotal}
          onClose={() => setShowOrderConfirmation(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {/* Alert Modal */}
      <AlertModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
      />
    </div>
  );
};

export default Index;
