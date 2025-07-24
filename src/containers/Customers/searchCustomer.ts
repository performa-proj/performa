import { ICustomer } from "@/services/Identities/Customers/ICustomer";

export const searchCustomer = async (payloads: {
  mobile: string;
}): Promise<ICustomer | null> => {
  const response = await fetch(`/api/identities/customers/mobile/${payloads.mobile}`, {
    method: "GET",
  });

  const json = await response.json();

  if (json) {
    json.createdAt = new Date(json.createdAt);
    json.updatedAt = new Date(json.updatedAt);
  }

  return json;
};
