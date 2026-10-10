"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  // 01. Get the logged-in user's session
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  // 02. Profile form states
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 03. Current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 04. Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  // 05. Load existing profile information
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setImage(user.image ?? "");
    }
  }, [user]);

  // 06. Update profile information
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    // Validate the optional profile image URL
    if (image.trim()) {
      try {
        const imageUrl = new URL(image.trim());

        if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") {
          setError("ছবির সঠিক URL দিন।");
          return;
        }
      } catch {
        setError("ছবির সঠিক URL দিন।");
        return;
      }
    }

    setIsSaving(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (updateError) {
        setError(updateError.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      // Refresh the latest user session
      await refetch();

      setMessage("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  // 07. Loading state
  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8f5]">
        <p className="animate-pulse text-sm text-[#07883F]">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  // 08. Format account creation date
  const createdAt = user.createdAt
    ? new Date(String(user.createdAt)).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "তথ্য পাওয়া যায়নি";

  // 09. Profile page UI
  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 text-[#29352D]">
      <div className="mx-auto max-w-2xl">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#657368] transition hover:text-[#07883F]"
        >
          <FaArrowLeft size={12} />
          হোম পেজে ফিরে যান
        </Link>

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

          <p className="mt-2 text-sm text-[#718075]">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং প্রোফাইল আপডেট করুন।
          </p>
        </div>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-[#DFE8DF] bg-white shadow-sm">
          {/* Green profile header */}
          <div className="h-24 bg-gradient-to-r from-[#07883F] to-[#48A96A]" />

          <div className="px-5 pb-6 sm:px-8">
            {/* Profile image */}
            <div className="-mt-12 mb-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile picture"}
                  className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#E8F4EB] text-[#07883F] shadow-sm">
                  <FaUser size={32} />
                </div>
              )}
            </div>

            {/* User name and email */}
            <h2 className="text-xl font-bold">
              {user.name || "নাম যোগ করা হয়নি"}
            </h2>

            <p className="mt-1 break-all text-sm text-[#718075]">
              {user.email}
            </p>

            {/* Account information */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E2EAE2] bg-[#F8FBF8] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#07883F]">
                  <FaCalendarAlt size={14} />
                  <span className="text-xs font-semibold">অ্যাকাউন্ট তৈরি</span>
                </div>

                <p className="text-sm font-medium">{createdAt}</p>
              </div>

              <div className="rounded-xl border border-[#E2EAE2] bg-[#F8FBF8] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#07883F]">
                  <FaClock size={14} />
                  <span className="text-xs font-semibold">বর্তমান সময়</span>
                </div>

                <p className="text-sm font-medium">
                  {currentTime.toLocaleTimeString("bn-BD", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>

                <p className="mt-1 text-xs text-[#718075]">
                  {currentTime.toLocaleDateString("bn-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Profile update form */}
            <div className="mt-8 border-t border-[#E7ECE7] pt-6">
              <h3 className="text-lg font-bold">প্রোফাইল আপডেট করুন</h3>

              <p className="mt-1 text-xs text-[#718075]">
                আপনার নাম ও প্রোফাইল ছবি পরিবর্তন করতে পারবেন।
              </p>

              {message && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  {message}
                </p>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
                {/* Editable name */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    আপনার নাম
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setMessage("");
                      setError("");
                    }}
                    placeholder="আপনার নাম লিখুন"
                    autoComplete="name"
                    className="h-11 w-full rounded-lg border border-[#DFE7DF] bg-white px-3 text-sm outline-none transition focus:border-[#07883F] focus:ring-2 focus:ring-[#07883F]/10"
                    disabled={isSaving}
                    required
                  />
                </div>

                {/* Read-only email */}
                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    ইমেইল ঠিকানা
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="h-11 w-full cursor-not-allowed rounded-lg border border-[#DFE7DF] bg-[#F3F6F3] px-3 text-sm text-[#718075] outline-none"
                  />

                  <p className="mt-1 text-xs text-[#718075]">
                    এই পেজ থেকে ইমেইল পরিবর্তন করা যাবে না।
                  </p>
                </div>

                {/* Editable profile image URL */}
                <div>
                  <label
                    htmlFor="profile-image"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    প্রোফাইল ছবির URL
                  </label>

                  <input
                    id="profile-image"
                    type="url"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setMessage("");
                      setError("");
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="h-11 w-full rounded-lg border border-[#DFE7DF] bg-white px-3 text-sm outline-none transition focus:border-[#07883F] focus:ring-2 focus:ring-[#07883F]/10"
                    disabled={isSaving}
                  />

                  <p className="mt-1 text-xs text-[#718075]">
                    ছবি পরিবর্তন করতে নতুন ছবির URL দিন। খালি রাখলে প্রোফাইল ছবি
                    সরিয়ে দেওয়া হবে।
                  </p>
                </div>

                {/* Save button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-[#07883F] px-4 text-sm font-semibold text-white transition hover:bg-[#067535] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
