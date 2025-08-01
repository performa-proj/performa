"use client";

import React from "react";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const UserNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function UserNav() {
  const [name, setName] = React.useState("");

  const fetchUserData = async () => {
    const response = await fetch("/api/auth/token");
    const data = await response.json();

    return data;
  };

  React.useEffect(() => {
    fetchUserData().then((data) => {
      if (data && data.name) {
        setName(data.name);
      } else {
        setName("Guest");
      }
    }).catch(() => {
      setName("Guest");
    });
  }, []);

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative flex items-center">
        <UserCircleIcon className="lg:hidden size-6 text-gray-600" />
        <span className="hidden lg:flex lg:items-center">
          <span className="mx-2 text-sm/6 font-semibold text-gray-900">
            {name}
          </span>
          <ChevronDownIcon className="size-5 text-gray-600" />
        </span>
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {UserNavigation.map((item) => (
          <MenuItem key={item.name}>
            <Link
              href={item.href}
              className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
