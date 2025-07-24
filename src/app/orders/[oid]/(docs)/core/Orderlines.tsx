import { IOrderline } from "@/services/Orders/IOrderline";

export default function Orderlines({
  order
}: {
  order: {
    orderlines: IOrderline[];
    weight: number;
    total: number;
  };
}) {

  return (
    <table className="w-full border-y border-gray-400 divide-y divide-gray-400">
      <thead>
        <tr>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            QTY.
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-left">
            Title
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Price
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Total
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-300">
        {order.orderlines.map((each) => {
          const sellingTotal = each.quantity * each.sellingAt;
          return (
            <tr key={each.sku}>
              <td
                scope="col"
                className="whitespace-nowrap p-2 text-right"
              >
                <p className="text-sm font-medium text-gray-900">{each.quantity}</p>
              </td>
              <td
                scope="col"
                className="whitespace-nowrap p-2 text-left"
              >
                <div className="block sm:flex sm:grow">
                  <p className="text-sm font-medium text-gray-900 sm:order-1">{each.label}</p>
                  <p className="mt-1 sm:mt-0 sm:mr-1 text-sm font-normal sm:font-medium text-gray-900">[{each.sku}]</p>
                </div>
              </td>
              <td
                scope="col"
                className="whitespace-nowrap p-2 text-right"
              >
                <p className="text-sm font-medium text-gray-900">{each.sellingAt.toLocaleString()}.00</p>
              </td>
              <td
                scope="col"
                className="whitespace-nowrap p-2 text-right"
              >
                <p className="text-sm font-medium text-gray-900">{sellingTotal.toLocaleString()}.00</p>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="border-t border-gray-400">
          <th
            scope="row"
            colSpan={3}
            className="p-2 text-left"
          >
            <div className="flex items-baseline">
              <p className="text-sm/6 font-semibold text-gray-900">Total</p>
              <p className="mx-2 text-sm/6 font-semibold text-gray-900">[<span>{order.weight} KG</span>]</p>
            </div>
          </th>
          <th
            scope="row"
            className="p-2 text-right"
          >
            <div className="text-base font-semibold text-gray-900">{order.total.toLocaleString()}.00</div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
}