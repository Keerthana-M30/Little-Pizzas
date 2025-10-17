import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import type { MenuCategory, MenuItem, MenuItemVariant } from "@/menuData";

interface MenuCategoryProps {
  category: MenuCategory;
  order: Record<string, number>;
  onQuantityChange: (id: string, newQuantity: number) => void;
}

export const MenuCategorySection = ({
  category,
  order,
  onQuantityChange,
}: MenuCategoryProps) => {
  const getItemQuantity = (itemId: string) => {
    return order[itemId] || 0;
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    onQuantityChange(itemId, newQuantity);
  };

  // Generate unique ID for each variant
  const getVariantId = (itemId: number, variantType: string) => {
    return `${itemId}_${variantType}`;
  };

  // Generate unique ID for items without variants
  const getItemId = (itemId: number) => {
    return `${itemId}`;
  };

  // Since we're now passing single items, we only need to render the first item
  const item = category.items[0];

  return (
    <Card className="p-3 sm:p-4 flex flex-col shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover-lift relative overflow-hidden">
      {/* Animated background for gamification */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="flex items-start gap-3 relative z-10">
        <div className="text-2xl sm:text-3xl w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
          {item.icon}
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0">
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              {item.name}
            </h3>
          </div>

          {item.description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          )}

          {/* Price Display */}
          <div className="mt-2">
            {item.price ? (
              <div className="flex items-center justify-between">
                <p className="font-bold text-primary text-base sm:text-lg">
                  ₹{item.price}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="quantity"
                    size="icon"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      const itemId = getItemId(item.id);
                      handleQuantityChange(
                        itemId,
                        Math.max(0, getItemQuantity(itemId) - 1)
                      );
                    }}
                    disabled={getItemQuantity(getItemId(item.id)) === 0}
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <span className="text-base sm:text-lg font-bold w-6 sm:w-8 text-center bg-primary/10 rounded-lg py-0.5">
                    {getItemQuantity(getItemId(item.id))}
                  </span>
                  <Button
                    variant="quantity"
                    size="icon"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      const itemId = getItemId(item.id);
                      handleQuantityChange(itemId, getItemQuantity(itemId) + 1);
                    }}
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            ) : item.variants ? (
              <div className="space-y-2">
                {item.variants.map((variant) => (
                  <div
                    key={variant.type}
                    className="flex items-center justify-between bg-secondary/5 p-2 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-secondary mr-2">
                        {variant.type}:
                      </span>
                      <span className="font-bold text-primary">
                        ₹{variant.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="quantity"
                        size="icon"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          const variantId = getVariantId(item.id, variant.type);
                          handleQuantityChange(
                            variantId,
                            Math.max(0, getItemQuantity(variantId) - 1)
                          );
                        }}
                        disabled={
                          getItemQuantity(
                            getVariantId(item.id, variant.type)
                          ) === 0
                        }
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <span className="text-base sm:text-lg font-bold w-6 sm:w-8 text-center bg-primary/10 rounded-lg py-0.5">
                        {getItemQuantity(getVariantId(item.id, variant.type))}
                      </span>
                      <Button
                        variant="quantity"
                        size="icon"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          const variantId = getVariantId(item.id, variant.type);
                          handleQuantityChange(
                            variantId,
                            getItemQuantity(variantId) + 1
                          );
                        }}
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};
