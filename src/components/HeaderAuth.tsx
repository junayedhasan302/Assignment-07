"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function HeaderAuth() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(error.message || "Sign out করা যায়নি।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <Link
        href="/profile"
        className="flex min-w-0 items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100"
        title="প্রোফাইল দেখুন"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-9 w-9 shrink-0 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-[#FC3F33]">
            {(user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <span className="max-w-28 truncate text-sm font-semibold text-gray-800 sm:max-w-40">
          {user.name || user.email}
        </span>
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="shrink-0 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-[#FC3F33] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
      </button>

      {errorMessage && (
        <p className="w-full text-xs text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
