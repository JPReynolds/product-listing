import type { Product } from "@/api/products/products.type";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  const { productName, image, price, averageRating, reviewsCount, attributes } =
    product;

  return (
    <Card className="relative h-full overflow-hidden p-0">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={image.url}
            alt={image.attributes.imageAltText}
            className="h-full w-full object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 p-4">
        <CardTitle className="line-clamp-2 min-h-10 text-sm font-medium leading-tight text-foreground/90">
          {productName}
        </CardTitle>

        {reviewsCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewsCount.toLocaleString()})
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {attributes.isBestSeller && (
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">
              Best Seller
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col items-start gap-1 border-t bg-muted/20 p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            £{price.priceIncTax.toFixed(2)}
          </span>
          {price.isOnPromotion && price.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              £{price.wasPriceIncTax.toFixed(2)}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
