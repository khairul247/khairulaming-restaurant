"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  timeSlot?: string;
  timeslot?: string;
  time_slot?: string;
  waktu?: string;
  timestamp: string;
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ralat mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      } else {
        throw new Error("Gagal mengemaskini status");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ralat berlaku");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Semua tarikh";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ms-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    setFilterDate(dateStr);
    setShowCalendar(false);
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
    );
  };

  const filteredBookings = filterDate
    ? bookings.filter((b) => b.date === filterDate)
    : bookings;

  const getTimeSlot = (booking: Booking): string => {
    return (
      booking.timeSlot ||
      booking.timeslot ||
      booking.time_slot ||
      booking.time ||
      booking.waktu ||
      ""
    );
  };

  const formatTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return "-";
    const slot = timeSlot.toLowerCase();
    if (slot === "lunch" || slot === "tengahari") {
      return "Tengahari (12pm-3pm)";
    } else if (slot === "dinner" || slot === "malam") {
      return "Malam (6pm-10pm)";
    }
    return timeSlot;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "disahkan":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "cancelled":
      case "dibatalkan":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "pending":
      default:
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Blur Elements */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-accent/10 blur-[150px] animate-float" />
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] bg-primary/10 blur-[180px] animate-float delay-200" />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-accent-light/5 blur-[100px] animate-float delay-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-900/80 border-b border-accent/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 blur-xl scale-150" />
                <Image
                  src="/logo.svg"
                  alt="Rembayung"
                  width={120}
                  height={30}
                  priority
                  className="relative"
                />
              </div>
              <div className="hidden sm:block h-8 w-px bg-accent/20" />
              <div className="hidden sm:block">
                <span className="text-accent font-medium tracking-widest text-xs uppercase">
                  Panel Admin
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group px-4 py-2 text-cream/60 hover:text-cream transition-all flex items-center gap-2 hover:bg-white/5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Log Keluar</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Bookings */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-primary/20 blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-accent/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-display font-bold text-cream mb-1">
                      {bookings.length}
                    </div>
                    <div className="text-cream/50 text-sm">Jumlah Tempahan</div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-emerald-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-display font-bold text-emerald-400 mb-1">
                      {
                        bookings.filter(
                          (b) =>
                            b.status.toLowerCase() === "confirmed" ||
                            b.status.toLowerCase() === "disahkan"
                        ).length
                      }
                    </div>
                    <div className="text-cream/50 text-sm">Disahkan</div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-amber-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-display font-bold text-amber-400 mb-1">
                      {
                        bookings.filter(
                          (b) => b.status.toLowerCase() === "pending"
                        ).length
                      }
                    </div>
                    <div className="text-cream/50 text-sm">
                      Menunggu Pengesahan
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="relative group mb-6 z-20">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/10 to-primary/10 blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-accent/20 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-display font-semibold text-cream flex items-center gap-3">
                  <span className="w-1 h-6 bg-accent" />
                  Senarai Tempahan
                </h2>
                <div className="flex items-center gap-3 relative">
                  <label className="text-sm text-cream/50">Tapis tarikh:</label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="px-4 py-2 bg-black/50 border border-accent/20 text-cream focus:outline-none focus:border-accent transition-colors text-left flex items-center gap-3 min-w-[280px]"
                  >
                    <span
                      className={filterDate ? "text-cream" : "text-cream/40"}
                    >
                      {formatDateDisplay(filterDate)}
                    </span>
                    <svg
                      className="w-5 h-5 text-accent ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  {/* Calendar Dropdown */}
                  {showCalendar && (
                    <div className="absolute top-full right-0 mt-2 z-[100] bg-black border border-accent/30 p-4 shadow-2xl min-w-[300px]">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() => navigateMonth(-1)}
                          className="w-8 h-8 flex items-center justify-center text-cream hover:text-accent transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <span className="text-cream font-semibold">
                          {currentMonth.toLocaleDateString("ms-MY", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigateMonth(1)}
                          className="w-8 h-8 flex items-center justify-center text-cream hover:text-accent transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Day Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-xs text-cream/50 py-1"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((date, index) => {
                          if (!date) {
                            return (
                              <div key={`empty-${index}`} className="h-10" />
                            );
                          }

                          const dateStr = date.toISOString().split("T")[0];
                          const isSelected = filterDate === dateStr;
                          const isToday =
                            new Date().toDateString() === date.toDateString();

                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              onClick={() => handleDateSelect(date)}
                              className={`h-10 flex items-center justify-center text-sm transition-all ${
                                isSelected
                                  ? "bg-accent text-black font-bold"
                                  : "text-cream hover:bg-accent/20 hover:text-accent"
                              } ${
                                isToday && !isSelected
                                  ? "border border-accent/50"
                                  : ""
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setFilterDate("");
                            setShowCalendar(false);
                          }}
                          className="flex-1 py-2 border border-accent/20 text-cream/70 hover:text-accent hover:border-accent/50 transition-all text-sm"
                        >
                          Padam tapis
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(false)}
                          className="flex-1 py-2 border border-accent/20 text-cream/70 hover:text-accent hover:border-accent/50 transition-all text-sm"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  )}

                  {filterDate && (
                    <button
                      onClick={() => setFilterDate("")}
                      className="text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      Padam tapis
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/10 to-primary/10 blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-accent/20 overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent mx-auto mb-4" />
                  <p className="text-cream/50">Memuatkan data...</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={fetchBookings}
                    className="text-accent hover:text-accent-light transition-colors"
                  >
                    Cuba lagi
                  </button>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-cream/50">Tiada tempahan dijumpai</p>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y divide-accent/10">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 hover:bg-white/5 transition-colors"
                      >
                        {/* Header Row: Name + Status */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-cream font-semibold text-lg">
                              {booking.name}
                            </div>
                            <div className="text-cream/40 text-sm">
                              {booking.email}
                            </div>
                          </div>
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {/* Booking Details */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-zinc-800/50 p-3 border border-accent/10">
                            <div className="text-accent text-xs uppercase tracking-wider mb-1">
                              Tarikh
                            </div>
                            <div className="text-cream text-sm font-medium">
                              {new Date(booking.date).toLocaleDateString(
                                "ms-MY",
                                {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                }
                              )}
                            </div>
                          </div>
                          <div className="bg-zinc-800/50 p-3 border border-accent/10">
                            <div className="text-accent text-xs uppercase tracking-wider mb-1">
                              Waktu
                            </div>
                            <div className="text-cream text-sm font-medium">
                              {formatTimeSlot(getTimeSlot(booking))}
                            </div>
                          </div>
                          <div className="bg-zinc-800/50 p-3 border border-accent/10">
                            <div className="text-accent text-xs uppercase tracking-wider mb-1">
                              Tetamu
                            </div>
                            <div className="text-cream text-sm font-medium">
                              {booking.guests} orang
                            </div>
                          </div>
                          <a
                            href={`tel:${booking.phone}`}
                            className="bg-accent/10 p-3 border border-accent/30 flex flex-col items-center justify-center hover:bg-accent/20 transition-colors active:scale-95"
                          >
                            <svg
                              className="w-5 h-5 text-accent mb-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <span className="text-accent text-xs font-medium">
                              Hubungi
                            </span>
                          </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {booking.status.toLowerCase() !== "confirmed" &&
                            booking.status.toLowerCase() !== "disahkan" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "Confirmed")
                                }
                                disabled={updatingId === booking.id}
                                className="flex-1 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium hover:bg-emerald-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                              >
                                {updatingId === booking.id ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <svg
                                      className="animate-spin w-4 h-4\"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                      />
                                    </svg>
                                    Mengemaskini...
                                  </span>
                                ) : (
                                  "✓ Sahkan"
                                )}
                              </button>
                            )}
                          {booking.status.toLowerCase() !== "cancelled" &&
                            booking.status.toLowerCase() !== "dibatalkan" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "Cancelled")
                                }
                                disabled={updatingId === booking.id}
                                className="flex-1 py-3 bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                              >
                                {updatingId === booking.id ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <svg
                                      className="animate-spin w-4 h-4"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                      />
                                    </svg>
                                    Mengemaskini...
                                  </span>
                                ) : (
                                  "✕ Batal"
                                )}
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-zinc-800/50 border-b border-accent/10">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Tarikh
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Waktu
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Nama
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Tetamu
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Telefon
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-accent uppercase tracking-wider">
                            Tindakan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-accent/10">
                        {filteredBookings.map((booking) => (
                          <tr
                            key={booking.id}
                            className="hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 text-cream">
                              {new Date(booking.date).toLocaleDateString(
                                "ms-MY",
                                {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                }
                              )}
                            </td>
                            <td className="px-6 py-4 text-cream">
                              {formatTimeSlot(getTimeSlot(booking))}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-cream font-medium">
                                {booking.name}
                              </div>
                              <div className="text-cream/40 text-sm">
                                {booking.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-cream">
                              {booking.guests} orang
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`tel:${booking.phone}`}
                                className="text-accent hover:text-accent-light transition-colors"
                              >
                                {booking.phone}
                              </a>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(
                                  booking.status
                                )}`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {booking.status.toLowerCase() !== "confirmed" &&
                                  booking.status.toLowerCase() !==
                                    "disahkan" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(booking.id, "Confirmed")
                                      }
                                      disabled={updatingId === booking.id}
                                      className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs hover:bg-emerald-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {updatingId === booking.id
                                        ? "..."
                                        : "Sahkan"}
                                    </button>
                                  )}
                                {booking.status.toLowerCase() !== "cancelled" &&
                                  booking.status.toLowerCase() !==
                                    "dibatalkan" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(booking.id, "Cancelled")
                                      }
                                      disabled={updatingId === booking.id}
                                      className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 text-xs hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {updatingId === booking.id
                                        ? "..."
                                        : "Batal"}
                                    </button>
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pb-8">
            <p className="text-cream/30 text-xs tracking-wider">
              © 2026 Rembayung. Panel Admin.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
