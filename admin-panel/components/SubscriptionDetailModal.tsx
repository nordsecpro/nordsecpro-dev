import {
  CustomerDetails,
  Subscription,
} from '@/app/(admin panel)/subscription-management/page';

// Subscription Detail Modal Component
interface SubscriptionDetailModalProps {
  subscription: Subscription;
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionDetailModal: React.FC<
  SubscriptionDetailModalProps
> = ({ subscription, isOpen, onClose }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string = 'active') => {
    const statusConfig = {
      active: {
        color:
          'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: '✓',
      },
      inactive: {
        color:
          'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200',
        dot: 'bg-gray-500',
        icon: '◯',
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200`}>
        <div
          className={`w-2.5 h-2.5 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusConfig = {
      succeeded: {
        color:
          'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
        dot: 'bg-green-500',
        icon: '💳',
      },
      failed: {
        color:
          'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
        dot: 'bg-red-500',
        icon: '❌',
      },
      pending: {
        color:
          'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200',
        dot: 'bg-yellow-500',
        icon: '⏳',
      },
    };

    const config =
      statusConfig[paymentStatus as keyof typeof statusConfig] ||
      statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200`}>
        <div
          className={`w-2.5 h-2.5 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
        <span className="mr-1">{config.icon}</span>
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative px-8 py-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Subscription Details
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Complete information about this subscription
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-8 max-h-96 overflow-y-auto">
            {/* Status and ID Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Subscription ID
                </p>
                <p className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-lg break-all">
                  {subscription._id}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
                {getStatusBadge(subscription.status)}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Payment Status
                </p>
                {getPaymentStatusBadge(subscription.paymentStatus)}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Total Plans
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {subscription.planCount}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Total Employees
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {subscription.totalEmployees.toLocaleString()}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Total Price
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(subscription.totalPrice)}
                </p>
              </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plans Information */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Plans Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Plan Titles
                      </p>
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {subscription.planTitles}
                      </p>
                    </div>

                    {/* Individual Plans */}
                    {subscription.plans && subscription.plans.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-500">
                          Individual Plans
                        </p>
                        <div className="space-y-2">
                          {subscription.plans.map((plan, index) => (
                            <div
                              key={plan._id}
                              className="bg-white/50 rounded-lg p-3 border border-blue-100">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {plan.planTitle}
                                  </p>
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <span className="text-blue-500">👥</span>
                                    {plan.numberOfEmployees.toLocaleString()}{' '}
                                    employees
                                  </p>
                                </div>
                                <p className="font-bold text-green-600">
                                  {formatCurrency(plan.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Customer Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Customer Name
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {subscription.customerName}
                      </p>
                    </div>

                    {subscription.customerDetails.firstName &&
                      subscription.customerDetails.lastName && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Full Name
                          </p>
                          <p className="text-gray-900 flex items-center gap-2">
                            <span className="text-emerald-500">👤</span>
                            {subscription.customerDetails.firstName}{' '}
                            {subscription.customerDetails.lastName}
                          </p>
                        </div>
                      )}

                    {subscription.customerDetails.email && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email Address
                        </p>
                        <p className="text-gray-900 flex items-center gap-2">
                          <span className="text-emerald-500">📧</span>
                          {subscription.customerDetails.email}
                        </p>
                      </div>
                    )}

                    {subscription.customerDetails.phone && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone Number
                        </p>
                        <p className="text-gray-900 flex items-center gap-2">
                          <span className="text-emerald-500">📞</span>
                          {subscription.customerDetails.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Status */}
                <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Email Status
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Confirmation Email
                      </p>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          subscription.confirmationEmailSent
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {subscription.confirmationEmailSent
                          ? '✅ Sent'
                          : '❌ Not Sent'}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Invoice Email
                      </p>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          subscription.invoiceEmailSent
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {subscription.invoiceEmailSent
                          ? '✅ Sent'
                          : '❌ Not Sent'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Information */}
            <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Timeline Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscription.createdAt && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Created Date
                    </p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <span className="text-purple-500">📅</span>
                      {formatDate(subscription.createdAt)}
                    </p>
                  </div>
                )}

                {subscription.updatedAt && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Updated
                    </p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <span className="text-purple-500">🔄</span>
                      {formatDate(subscription.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50/50">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
