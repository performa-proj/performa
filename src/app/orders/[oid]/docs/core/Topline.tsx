"use client";

import React from "react";

export default function Topline({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex w-full">
      <div className="grow h-0.5 border-t-2 border-blue-800 mt-3 sm:mt-5" />
      <p className="uppercase text-xl sm:text-4xl font-normal text-blue-800 px-2">
        {text}
      </p>
      <div className="h-0.5 w-12 border-t-2 border-blue-800 mt-3 sm:mt-5" />
    </div>
  );
}
