import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from 'lucide-react';

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl overflow-hidden group">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer relative"
      >
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Only {product?.totalStock} left
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4 bg-white">
        <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2 text-gray-500 text-sm">
          {/* <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {categoryOptionsMap[product?.category]}
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            {brandOptionsMap[product?.brand]}
          </Badge> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <span className={`${product?.salePrice > 0 ? "line-through text-gray-400" : "text-gray-800"} text-lg font-semibold`}>
              Rs {product?.price.toFixed(2)}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-green-600">
                Rs {product?.salePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-300 text-gray-600 cursor-not-allowed shadow-md" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;