"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("সব আবশ্যক তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    if (image.trim()) {
      try {
        const imageUrl = new URL(image.trim());

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          setErrorMessage("Profile image-এর সঠিক URL দিন।");
          return;
        }
      } catch {
        setErrorMessage("Profile image-এর সঠিক URL দিন।");
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
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

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setErrorMessage("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || `${provider} sign up ব্যর্থ হয়েছে।`);
        setSocialLoading("");
      }
    } catch {
      setErrorMessage("Social sign up করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  };

  const isBusy = isLoading || socialLoading !== "";

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl md:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#19b526] p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              বাজার দর
            </Link>
            <p className="mt-2 text-sm text-white/80">
              আপনার বাজার, আপনার হিসাব।
            </p>
          </div>

          <div className="relative z-10 py-12">
            <span className="text-5xl">🛍️</span>
            <h1 className="mt-6 text-3xl font-bold leading-snug lg:text-4xl">
              বাজার দর-এর সঙ্গে স্মার্ট বাজার শুরু করুন।
            </h1>
            <p className="mt-4 leading-7 text-white/85">
              একটি অ্যাকাউন্ট তৈরি করুন এবং পণ্যের দামের আপডেট ও বিস্তারিত আরও
              সহজে দেখুন।
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/75">
            Bazar Dor — Smart Shopping Starts Here
          </p>
        </div>

        {/* Sign up form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="inline-block text-xl font-extrabold text-[#19b526] md:hidden"
            >
              বাজার দর
            </Link>

            <div className="mb-7 mt-5 md:mt-0">
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                সাইন আপ করুন
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                নতুন অ্যাকাউন্ট তৈরি করতে তথ্যগুলো পূরণ করুন।
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  আপনার নাম
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার পুরো নাম"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FC3F33] focus:ring-4 focus:ring-red-100"
                />
              </div>

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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FC3F33] focus:ring-4 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Profile Image URL{" "}
                  <span className="font-normal text-gray-400">(ঐচ্ছিক)</span>
                </label>
                <input
                  id="image"
                  type="url"
                  autoComplete="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FC3F33] focus:ring-4 focus:ring-red-100"
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
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FC3F33] focus:ring-4 focus:ring-red-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-[#FC3F33]"
                  >
                    {showPassword ? "লুকান" : "দেখুন"}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="আবার পাসওয়ার্ড লিখুন"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FC3F33] focus:ring-4 focus:ring-red-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-[#FC3F33]"
                  >
                    {showConfirmPassword ? "লুকান" : "দেখুন"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#19b526] px-4 py-3.5 font-bold text-white shadow-md shadow-green-200 transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {isLoading
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "অ্যাকাউন্ট তৈরি করুন"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">অথবা</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSocialSignUp("google")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                <span className="text-lg">
                  <FcGoogle />
                </span>
                {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
              </button>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSocialSignUp("github")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                <span className="text-lg">
                  <FaGithub />
                </span>
                {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-gray-600">
              আগে থেকেই অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#19b526] hover:underline"
              >
                সাইন ইন করুন
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
