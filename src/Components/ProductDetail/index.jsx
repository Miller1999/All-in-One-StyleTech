import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";

const ProductDetail = () => {
  const { productDetail, closeProductDetail, productShow } =
    useContext(ShoppingCartContext);
  return (
    <aside
      className={`${
        productDetail ? "flex" : "hidden"
      } flex flex-col fixed bg-white border border-black rounded-lg h-[calc(100vh-80px)] w-[360px] right-0 top-[68px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div onClick={() => closeProductDetail()} className="cursor-pointer">
          <XMarkIcon className="h-6 w-6" />
        </div>
      </div>
      <figure className="px-6 flex justify-center">
        <img
          className="w-3/4 h-full rounded-lg"
          src={productShow.images?.[0]}
          alt={productShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">${productShow.price}</span>
        <span className="font-medium text-xl">{productShow.title}</span>
        <span className="font-light text-md">{productShow.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
