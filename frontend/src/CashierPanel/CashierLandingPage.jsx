// src/pages/CashierLandingPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../CashierPanel/Sidebar";
import Navbar from "../CashierPanel/Navbar";
import LoadingScreen from "../UserPanel/Components/UserLoadingScreen";
import {
  ShoppingCart,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  TrendingUp,
  Calendar,
  Eye,
  Bell,
  FilePlus,
  ClipboardList,
  Repeat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CashierLandingPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // load user and hide loading screen after small delay
  useEffect(() => {
    let mounted = true;

    try {
      const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("authUser")) ||
        null;
      if (mounted) setUser(storedUser);
    } catch (e) {
      if (mounted) setUser(null);
    }

    const MINIMUM_LOADER_MS = 700;
    const t = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, MINIMUM_LOADER_MS);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, []);

  // sample data (replace with real API calls)
  const stats = {
    transactionsToday: 48,
    paymentsCollected: 125000.0,
    pendingPayments: 4,
    shiftSales: 18500.0,
  };

  const recentTransactions = [
    {
      id: "TX-2025-1001",
      customer: "Juan Dela Cruz",
      method: "Cash",
      amount: 1200,
      time: "09:12 AM",
      status: "Paid",
    },
    {
      id: "TX-2025-1002",
      customer: "Maria Santos",
      method: "Card",
      amount: 4500,
      time: "09:40 AM",
      status: "Pending",
    },
    {
      id: "TX-2025-1003",
      customer: "ACME Supplies",
      method: "Online",
      amount: 23000,
      time: "10:05 AM",
      status: "Paid",
    },
    {
      id: "TX-2025-1004",
      customer: "Pedro Reyes",
      method: "Cash",
      amount: 300,
      time: "10:30 AM",
      status: "Refunded",
    },
  ];

  const upcomingShiftNotes = [
    { note: "Shift ends at 6:00 PM", type: "shift" },
    { note: "Cash drawer reconciliation at end of shift", type: "reminder" },
    { note: "Pending payout batch: 1", type: "alert" },
  ];

  // Desktop sidebar toggle
  const toggleSidebar = () => setIsCollapsed((s) => !s);

  // Mobile menu toggle
  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const formatCurrency = (n) =>
    Number(n).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getDisplayName = () => {
    if (!user) return "Cashier";
    const first = user.first_name ?? user.firstName ?? user.fname ?? "";
    const last = user.last_name ?? user.lastName ?? user.lname ?? "";
    const name = `${first} ${last}`.trim();
    return name || "Cashier";
  };

  if (isLoading) {
    return (
      <LoadingScreen message="Loading cashier dashboard..." showLogo={true} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={closeMobileMenu}
        user={user}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <Navbar
          toggleMobileMenu={toggleMobileMenu}
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
          user={user}
        />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-teal-50 to-emerald-100">
          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Transactions Today
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    {stats.transactionsToday}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-teal-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-teal-600 flex items-center">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> +4% vs
                yesterday
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Payments Collected
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    ₱ {formatCurrency(stats.paymentsCollected)}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-green-600">Today so far</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Pending Payments
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    {stats.pendingPayments}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-yellow-600">
                Requires follow-up
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Current Shift Sales
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    ₱ {formatCurrency(stats.shiftSales)}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-indigo-600">
                Shift: Morning
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Left (transactions & quick actions) */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-1">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <FilePlus className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    New Sale
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    Open POS and record a new transaction.
                  </p>
                  <button
                    onClick={() => navigate("/cashier/pos")}
                    className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    Start Sale
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Transactions
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    Search or review recent sales.
                  </p>
                  <button
                    onClick={() => navigate("/cashier/transactions")}
                    className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    View List
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Quick Pay
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    Process card or online payments quickly.
                  </p>
                  <button
                    onClick={() => navigate("/cashier/payments")}
                    className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    Quick Pay
                  </button>
                </div>
              </div>

              {/* Recent transactions */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Recent Transactions
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("/cashier/transactions")}
                      className="text-sm text-teal-600 hover:underline"
                    >
                      View all
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800 truncate">
                            {tx.customer}
                          </span>
                          <span className="text-xs text-gray-500">
                            • {tx.method}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{tx.id}</span>
                          <span>• {tx.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-800">
                            ₱ {formatCurrency(tx.amount)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tx.method}
                          </div>
                        </div>

                        <div>
                          {tx.status === "Paid" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                              <CheckCircle2 className="w-3 h-3" /> Paid
                            </span>
                          )}
                          {tx.status === "Pending" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                              <AlertTriangle className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {tx.status === "Refunded" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                              <Repeat className="w-3 h-3" /> Refunded
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() =>
                              navigate(`/cashier/transactions/${tx.id}`)
                            }
                            className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs hover:bg-teal-200 flex items-center"
                          >
                            <Eye className="w-3 h-3 mr-1" /> View
                          </button>
                          {tx.status === "Paid" && (
                            <button
                              onClick={() => {
                                /* trigger receipt download action */
                              }}
                              className="px-2 py-1 bg-white border border-gray-200 text-xs rounded hover:bg-gray-50 flex items-center"
                            >
                              <Download className="w-3 h-3 mr-1" /> Receipt
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: activities, shifts, reminders */}
            <div className="space-y-4 sm:space-y-6">
              {/* Shift / quick summary */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    Shift Summary
                  </h2>
                  <span className="text-xs text-gray-500">Today</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Transactions</p>
                      <p className="font-medium text-gray-800">
                        {stats.transactionsToday}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Sales</p>
                      <p className="font-medium text-gray-800">
                        ₱ {formatCurrency(stats.shiftSales)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate("/cashier/reconcile")}
                      className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      Reconcile Shift
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming / reminders */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-teal-600" />
                  <h2 className="text-base sm:text-lg font-semibold text-teal-800">
                    Reminders
                  </h2>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  {upcomingShiftNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className={`mt-1 w-2 h-2 rounded-full ${
                          note.type === "shift"
                            ? "bg-indigo-500"
                            : note.type === "alert"
                            ? "bg-yellow-500"
                            : "bg-teal-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs">{note.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Small quick report / export */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Reports
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Generate quick shift reports or export receipts.
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 flex items-center justify-center gap-2"
                    onClick={() => navigate("/cashier/reports")}
                  >
                    <TrendingUp className="w-4 h-4" /> View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CashierLandingPage;
