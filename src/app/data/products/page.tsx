"use client";

import React from "react";

import NewProductButton from "@/containers/Products/NewProductButton";

import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { ReloadButton } from "@/containers/core/ReloadButton";
import { LoadingMessage } from "@/containers/core/LoadingMessage";
import { NoDataMessage } from "@/containers/core/NoDataMessage";
import { Products } from "@/containers/Products";
import { PriceStructures } from "@/containers/PriceStructures";
import { IProductItem } from "@/services/Products/Items/IProductItem";
import ProductsList from "@/containers/Products/ProductsList";
// import ProductsTable from "@/containers/Products/ProductsTable";
import EditProductDialog from "@/containers/Products/EditProductDialog";
import NewProductItemDialog from "@/containers/Products/NewProductItemDialog";
import EditProductItemDialog from "@/containers/Products/EditProductItemDialog";

export default function Page() {
  const [state, setState] = React.useState<{
    products: IProduct[];
    structures: IPriceStructure[];
  }>({
    products: [],
    structures: [],
  });
  const [isLoading, setLoading] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState<{
    index: number,
    data: IProduct | undefined;
  }>({
    index: -1,
    data: undefined,
  });
  const [createProductItem, setCreateProductItem] = React.useState<{
    index: number,
    data: IProduct | undefined;
  }>({
    index: -1,
    data: undefined,
  });
  const [editProductItem, setEditProductItem] = React.useState<{
    index: number,
    data: IProductItem | undefined;
  }>({
    index: -1,
    data: undefined,
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const products = (await Products.listProducts()).map(each => {
      each.createdAt = new Date(each.createdAt);
      each.updatedAt = new Date(each.updatedAt);

      return each;
    });
    const structures = (await PriceStructures.listPriceStructures()).map(each => {
      each.createdAt = new Date(each.createdAt);
      each.updatedAt = new Date(each.updatedAt);

      return each;
    });

    setState({
      products,
      structures,
    });

    setLoading(false);
  };

  const handleProductCreated = (product: IProduct) => {
    setState({
      products: [...state.products, product],
      structures: [...state.structures],
    });
  };

  const handleProductDeleted = () => {
    const nState = {
      products: [...state.products],
      structures: [...state.structures],
    };
    nState.products.splice(editProduct.index, 1);

    setState(nState);
    setEditProduct({
      index: -1,
      data: undefined,
    });
  };

  const handleProductUpdated = (product: IProduct) => {
    const nState = {
      products: [...state.products],
      structures: [...state.structures],
    };
    nState.products[editProduct.index] = product;

    setState(nState);
    setEditProduct({
      index: -1,
      data: undefined,
    });
  };

  const handleProductItemCreated = (data: {
    productID: string;
    item: IProductItem;
    updatedAt: Date;
  }) => {
    const index = state.products.findIndex((each) => each._id === data.productID);
    const nState = { ...state };
    nState.products[index].items.push(data.item);
    nState.products[index].updatedAt = data.updatedAt;

    setState(nState);
    setCreateProductItem({
      index: -1,
      data: undefined,
    });
  };

  const handleProductItemDeleted = (data: {
    sku: string;
    updatedAt: Date;
  }) => {
    const nState = {
      ...state,
    };
    const itemIndex = nState.products[editProductItem.index].items.findIndex((each) => each.sku === data.sku);
    nState.products[editProductItem.index].items.splice(itemIndex, 1);
    nState.products[editProductItem.index].updatedAt = data.updatedAt;

    setState(nState);
    setEditProductItem({
      index: -1,
      data: undefined,
    });
  };

  const handleProductItemUpdated = (data: {
    productID: string;
    item: IProductItem;
    updatedAt: Date;
  }) => {
    const nState = {
      ...state,
    };
    const itemIndex = nState.products[editProductItem.index].items.findIndex((each) => each.sku === data.item.sku);
    nState.products[editProductItem.index].items[itemIndex] = data.item;
    nState.products[editProductItem.index].updatedAt = data.updatedAt;

    setState(nState);
    setEditProductItem({
      index: -1,
      data: undefined,
    });
  };

  const handleEditProductOpened = (productID: string) => {
    const index = state.products.findIndex((each) => each._id === productID);
    setEditProduct({
      index,
      data: state.products[index],
    });
  };

  const handleNewProductItemOpened = (productID: string) => {
    const index = state.products.findIndex((each) => each._id === productID);
    setCreateProductItem({
      index,
      data: state.products[index],
    });
  };

  const handleEditProductItemOpened = (productID: string, sku: string) => {
    const index = state.products.findIndex((each) => each._id === productID);

    if (index >= 0) {
      const itemIndex = state.products[index].items.findIndex((each) => each.sku === sku);

      setEditProductItem({
        index,
        data: state.products[index].items[itemIndex],
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex px-4 sm:px-6 py-2 border-b border-gray-200">
        <div className="flex flex-1 items-center">
          <p className="text-sm font-medium text-gray-900">View:</p>
          <span className="isolate inline-flex rounded-md px-2">
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Product
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Item
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Days
            </button>
          </span>
        </div>
        <div className="flex gap-x-2">
          <NewProductButton
            onCreated={handleProductCreated}
          />
          <ReloadButton
            isLoading={isLoading}
            onClick={loadData}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingMessage />
      ) : (
        <div className="divide-y divide-gray-200 border-b border-gray-200">
          {state.products.length === 0 ? (
            <NoDataMessage />
          ) : (
            <ProductsList
              products={state.products}
              structures={state.structures}
              onEditProductOpened={handleEditProductOpened}
              onNewProductItemOpened={handleNewProductItemOpened}
              onEditProductItemOpened={handleEditProductItemOpened}
            />
          )}
        </div>
      )}

      {editProduct.data && (
        <EditProductDialog
          predata={editProduct.data}
          open={editProduct !== undefined}
          onDeleted={handleProductDeleted}
          onUpdated={handleProductUpdated}
          onClose={() => setEditProduct({
            index: -1,
            data: undefined,
          })}
        />
      )}

      {createProductItem.data && (
        <NewProductItemDialog
          open={createProductItem.data !== undefined}
          metadata={{
            product: createProductItem.data,
          }}
          structures={state.structures}
          onCreated={handleProductItemCreated}
          onClose={() => setCreateProductItem({
            index: -1,
            data: undefined,
          })}
        />
      )}

      {editProductItem.data && (
        <EditProductItemDialog
          metadata={{
            product: state.products[editProductItem.index],
          }}
          predata={editProductItem.data}
          structures={state.structures}
          open={editProductItem !== undefined}
          onDeleted={handleProductItemDeleted}
          onUpdated={handleProductItemUpdated}
          onClose={() => setEditProductItem({
            index: -1,
            data: undefined,
          })}
        />
      )}
    </div>
  );
}
