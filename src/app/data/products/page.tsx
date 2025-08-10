"use client";

import React from "react";

import NewProductButton from "@/containers/Products/NewProductButton";
import { ListBulletIcon } from "@heroicons/react/24/solid";

import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { ReloadButton } from "@/containers/core/ReloadButton";
import { LoadingMessage } from "@/containers/core/LoadingMessage";
import { Products } from "@/containers/Products";
import { PriceStructures } from "@/containers/PriceStructures";
import { IProductItem } from "@/services/Products/Items/IProductItem";
import ProductDetail from "@/containers/Products/ProductDetail";
import ProductsList from "@/containers/Products/ProductsList";
import ProductsTable from "@/containers/Products/ProductsTable";
import EditProductDialog from "@/containers/Products/EditProductDialog";
import NewProductItemDialog from "@/containers/Products/NewProductItemDialog";
import EditProductItemDialog from "@/containers/Products/EditProductItemDialog";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { classnames } from "@/containers/core/classnames";

export default function Page() {
  const [state, setState] = React.useState<{
    products: IProduct[];
    structuresMap: { [id: string]: IPriceStructure; };
  }>({
    products: [],
    structuresMap: {},
  });
  const [isLoading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<"list" | "table">("list");
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
  const [detailProduct, setDetailProduct] = React.useState<{
    index: number,
    data: IProduct | undefined;
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

    const structuresMap = (await PriceStructures.listPriceStructures()).reduce((result, each) => {
      each.createdAt = new Date(each.createdAt);
      each.updatedAt = new Date(each.updatedAt);
      result[each._id] = each;

      return result;
    }, {} as { [key: string]: IPriceStructure; });

    setState({
      products,
      structuresMap,
    });

    setLoading(false);
  };

  const handleEditProductOpened = (productID: string) => {
    const index = state.products.findIndex((each) => each._id === productID);
    setEditProduct({
      index,
      data: state.products[index],
    });
  };

  const handleProductCreated = (product: IProduct) => {
    setState({
      products: [...state.products, product],
      structuresMap: state.structuresMap,
    });
  };

  const handleProductDeleted = () => {
    const nState = {
      ...state,
      products: [...state.products],
      structuresMap: state.structuresMap,
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
      ...state,
      products: [...state.products],
      structuresMap: state.structuresMap,
    };
    nState.products[editProduct.index] = product;

    setState(nState);
    setEditProduct({
      index: -1,
      data: undefined,
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

  const handleDetail = (productID: string) => {
    const index = state.products.findIndex((each) => each._id === productID);
    setDetailProduct({
      index,
      data: state.products[index],
    });
  };

  const handleDetailBack = () => {
    setDetailProduct({
      index: -1,
      data: undefined,
    });
  };

  const handlePriceUpdate = (data: { product: IProduct; }) => {
    const nState = {
      products: [...state.products],
      structuresMap: { ...state.structuresMap },
    };
    nState.products[detailProduct.index] = data.product;
    setState(nState);

    setDetailProduct({
      index: -1,
      data: undefined,
    });
  };

  return (
    <div className="w-full">
      {detailProduct.data ? (
        <ProductDetail
          product={detailProduct.data}
          structuresMap={state.structuresMap}
          onBack={handleDetailBack}
          onUpdate={handlePriceUpdate}
        />
      ) : (
        <>
          <div className="flex px-4 sm:px-6 py-2 border-b border-gray-200">
            <div className="flex flex-1 items-center">
              <div className="flex gap-x-1.5">
                <button
                  type="button"
                  className={classnames(selected === "list" ? "bg-white ring-blue-600 text-blue-600" : "bg-white ring-gray-300 hover:ring-gray-600 text-gray-600",
                    "cursor-pointer rounded p-1 ring-1")}
                  onClick={() => setSelected("list")}
                >
                  <ListBulletIcon aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  className={classnames(selected === "table" ? "bg-white ring-blue-600 text-blue-600" : "bg-white ring-gray-300 hover:ring-gray-600 text-gray-600",
                    "cursor-pointer rounded p-1 ring-1")}
                  onClick={() => setSelected("table")}
                >
                  <TableCellsIcon aria-hidden="true" className="size-4" />
                </button>
              </div>
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

          {isLoading ?
            (<LoadingMessage />) :
            (selected === "list" ?
              (<ProductsList
                products={state.products}
                structuresMap={state.structuresMap}
                onEditProductOpened={handleEditProductOpened}
                onNewProductItemOpened={handleNewProductItemOpened}
                onEditProductItemOpened={handleEditProductItemOpened}
                onDetail={handleDetail}
              />) :
              (<ProductsTable
                products={state.products}
                structuresMap={state.structuresMap}
                onEditProductItemOpened={handleEditProductItemOpened}
                onDetail={handleDetail}
              />)
            )
          }
        </>
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
          structures={Object.values(state.structuresMap)}
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
          structures={Object.values(state.structuresMap)}
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
