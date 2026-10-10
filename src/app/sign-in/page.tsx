
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("ইমেইল এবং পাসওয়ার্ড দিন।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setErrorMessage("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || `${provider} sign in ব্যর্থ হয়েছে।`
        );
        setSocialLoading("");
      }
    } catch {
      setErrorMessage("Social sign in করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  };

  const isBusy = isLoading || socialLoading !== "";

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl md:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0f931a] p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              Bazar Dor
            </Link>
            <p className="mt-2 text-sm text-white/80">
              আপনার বাজার, আপনার হিসাব।
            </p>
          </div>

          <div className="relative z-10 py-12">
            <span className="text-5xl">🛒</span>
            <h1 className="mt-6 text-3xl font-bold leading-snug lg:text-4xl">
              বাজারের দামের আপডেট থাকুক আপনার হাতেই।
            </h1>
            <p className="mt-4 leading-7 text-white/85">
              পণ্যের দাম দেখুন, পরিবর্তন বুঝুন এবং আপনার
              বাজারের সিদ্ধান্ত নিন আরও সহজে।
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/75">
            Bazar Dor — Smart Shopping Starts Here
          </p>
        </div>

        {/* Sign in form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="inline-block text-xl font-extrabold text-[#FC3F33] md:hidden"
            >
              Bazar Dor
            </Link>

            <div className="mb-8 mt-5 md:mt-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#19b526]">
                Welcome Back
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                সাইন ইন করুন
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  ইমেইল অ্যাড্রেস
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#19b526] focus:ring-4 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  পাসওয়ার্ড
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="আপনার পাসওয়ার্ড দিন"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#19b526] focus:ring-4 focus:ring-red-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-[#19b526]"
                  >
                    {showPassword ? "লুকান" : "দেখুন"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#19b526] px-4 py-3.5 font-bold text-white shadow-md shadow-red-200 transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                অথবা
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSocialSignIn("google")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                <span className="font-bold text-base">G</span>
                {socialLoading === "google"
                  ? "অপেক্ষা করুন..."
                  : "Google"}
              </button>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSocialSignIn("github")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                <span className="font-bold text-base">GH</span>
                {socialLoading === "github"
                  ? "অপেক্ষা করুন..."
                  : "GitHub"}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#19b526] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>

            <p className="mt-5 text-center text-xs text-gray-400">
              <Link href="/" className="hover:text-[#19b526]">
                ← হোম পেজে ফিরে যান
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
