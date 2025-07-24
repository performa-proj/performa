"use client";

import React, { Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { authenticate } from "@/actions/auth";
import LoadingPage from "@/containers/core/LoadingPage";

const CallbackRedirecting = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("cb") || "/";
  redirect(callback);
};

export default function Page() {
  const [isPasswordShown, setPasswordShown] = React.useState(false);
  const [state, formAction, pending] = React.useActionState(authenticate, {
    success: false,
  });
  let message = undefined

  if (pending) {
    return (<LoadingPage message="Signing in..." />);
  }

  if (state.success) {
    return (
      <Suspense fallback={<LoadingPage message="Redirecting..." />}>
        <CallbackRedirecting />
      </Suspense>
    )
  } else {
    if (state.error === "Unauthenticated") {
      message = "Mobile or Password is incorrect.";
    } else if (state.error === "Invalid") {
      message = "Invalid credentials provided.";
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-8 pt-30">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base font-normal text-gray-600">
          Please enter your credentials to access
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="mobile"
                required
                autoComplete="mobile"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2 grid grid-cols-1">
              <input
                id="password"
                name="password"
                type={isPasswordShown ? "text" : "password"}
                required
                autoComplete="current-password"
                className="col-start-1 row-start-1 block w-full rounded-md bg-white pl-3 pr-10 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              {isPasswordShown ? (
                <EyeIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 mr-3 size-5 sm:size-4 self-center justify-self-end text-gray-600"
                  onClick={() => setPasswordShown(false)}
                />
              ) : (
                <EyeSlashIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 mr-3 size-5 sm:size-4 self-center justify-self-end text-gray-600"
                  onClick={() => setPasswordShown(true)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    defaultChecked
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label htmlFor="remember" className="block text-sm/6 text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm/6">
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          {message && (
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <p className="mt-0.5 text-sm text-red-600">
                {message}
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              disabled={pending}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
