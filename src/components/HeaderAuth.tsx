"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function HeaderAuth() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  // Handle click outside to close the dropdown popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle user sign out process
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(error.message || "Sign out failed.");
        return;
      }

      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-lg border border-[#19b526] px-4 py-2 text-sm font-semibold text-[#19b526] transition hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-[#19b526] px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 shadow-sm transition hover:bg-gray-50 focus:outline-none"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-8 w-8 shrink-0 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-[#FC3F33]">
            {(user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <span className="max-w-28 truncate text-sm font-semibold text-gray-800 sm:max-w-40">
          {user.name || user.email}
        </span>

        {/* Dropdown Arrow Indicator */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
          {/* User Full Info Header */}
          <div className="mb-3 border-b border-gray-100 pb-3">
            <h4 className="truncate text-base font-bold text-gray-900">
              {user.name || "User"}
            </h4>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Action Links & Buttons */}
          <div className="space-y-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-green-600"
            >
              <span className="text-base">👤</span>
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
            >
              <span className="text-base">↵</span>
              {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}