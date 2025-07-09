'use client';
import {
  getDashboardData,
  DashboardData,
  getStoredAdminData,
} from '@/lib/api/dashboard';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData();

        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load dashboard data';
        setError(errorMessage);
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Load admin data
    const storedAdmin = getStoredAdminData();
    setAdminData(storedAdmin);

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">
                Welcome back, {adminData?.firstName || 'Admin'}!
              </h2>
              <p className="text-blue-100">
                Here&apos;s what&apos;s happening with your subscription
                business today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Total Subscriptions Card */}
        <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <div>Total</div>
                  <div>Subscriptions</div>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {dashboardData?.totalSubscriptions?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Active Subscriptions Card */}
        <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <div>Active</div>
                  <div>Subscriptions</div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-green-500/30 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 group-hover:text-green-700 transition-colors duration-300">
              {dashboardData?.activeSubscriptions?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <div>Total</div>
                  <div>Revenue</div>
                </div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-500/30 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
              ${dashboardData?.totalRevenue?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Monthly Growth Card */}
        <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-colors duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <div>Monthly</div>
                  <div>Growth</div>
                </div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-orange-500/30 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-black text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                {dashboardData?.monthlyGrowth
                  ? `${dashboardData.monthlyGrowth}%`
                  : '0%'}
              </p>
              <span
                className={`text-lg ${
                  (dashboardData?.monthlyGrowth || 0) > 0
                    ? 'text-green-500'
                    : (dashboardData?.monthlyGrowth || 0) < 0
                    ? 'text-red-500'
                    : 'text-gray-400'
                }`}>
                {(dashboardData?.monthlyGrowth || 0) > 0
                  ? '↗️'
                  : (dashboardData?.monthlyGrowth || 0) < 0
                  ? '↘️'
                  : '➡️'}
              </span>
            </div>
          </div>
        </div>

        {/* Average Order Value Card */}
        <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-colors duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <div>Avg Order</div>
                  <div>Value</div>
                </div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-amber-500/30 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
              ${dashboardData?.avgOrderValue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile-First Additional Info Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Active Rate */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-indigo-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                Active Rate
              </p>
              <p className="text-lg font-bold text-indigo-900 mt-1">
                {dashboardData
                  ? `${(
                      (dashboardData.activeSubscriptions /
                        dashboardData.totalSubscriptions) *
                      100
                    ).toFixed(1)}%`
                  : '0%'}
              </p>
            </div>
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm">
              📈
            </div>
          </div>
        </div>

        {/* Inactive Subscriptions */}
        <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-sm rounded-xl p-4 border border-red-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-red-600 uppercase tracking-wider">
                Inactive
              </p>
              <p className="text-lg font-bold text-red-900 mt-1">
                {dashboardData?.inactiveSubscriptions?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
              📉
            </div>
          </div>
        </div>

        {/* Total Employees */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                Total Employees
              </p>
              <p className="text-lg font-bold text-emerald-900 mt-1">
                {dashboardData?.totalEmployees?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">
              👥
            </div>
          </div>
        </div>

        {/* Plan Count */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-cyan-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-cyan-600 uppercase tracking-wider">
                Available Plans
              </p>
              <p className="text-lg font-bold text-cyan-900 mt-1">
                {dashboardData?.planDistribution?.length || '0'}
              </p>
            </div>
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm">
              📋
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Plan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Most Popular Plan
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                #1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {dashboardData?.popularPlan || 'No data available'}
                </h4>
                <p className="text-sm text-gray-600">Top performing plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Plan Distribution
          </h3>
          <div className="space-y-3">
            {dashboardData?.planDistribution?.slice(0, 3).map((plan, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {plan._id}
                  </p>
                  <p className="text-xs text-gray-500">
                    {plan.count} subscriptions •{' '}
                    {plan.totalEmployees.toLocaleString()} employees
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-semibold text-green-600">
                    ${plan.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      {dashboardData?.monthlyRevenue && (
        <div className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Revenue Trend
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {dashboardData.monthlyRevenue.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg p-4 text-white mb-2">
                    <p className="text-sm font-medium">
                      {month._id?.month || 'N/A'}/{month._id?.year || 'N/A'}
                    </p>
                    <p className="text-lg font-bold">
                      ${(month.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {month.count} subscriptions
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Subscriptions */}
      <div className="mt-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Subscriptions
            </h3>
            <p className="text-sm text-gray-600">
              Latest subscription activities
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plans
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData?.recentSubscriptions?.length ? (
                  dashboardData.recentSubscriptions.map((subscription) => (
                    <tr
                      key={subscription._id}
                      className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {subscription.customerEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-900 truncate">
                          {subscription.planTitles}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {subscription.planCount} plan
                          {subscription.planCount > 1 ? 's' : ''}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500">
                      No recent subscriptions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
