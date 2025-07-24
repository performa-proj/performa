"use client";

import React, { Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";

const TokenRefreshing = () => {
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("rt");
  const callback = searchParams.get("cb") || "/";

  React.useEffect(() => {
    if (refreshToken === null)
      return redirect(`/auth/signin?cb=${callback}`);

    fetch(`/api/auth/token?rt=${refreshToken}&cb=${callback}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success && json.data.cb) {
          redirect(json.data.cb);
        } else {
          redirect(`/auth/signin?cb=${callback}`);
        }
      });
  }, [refreshToken, callback]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-base text-gray-600">Authenticating...</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    }>
      <TokenRefreshing />
    </Suspense>
  );
}
