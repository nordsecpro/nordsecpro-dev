export const getPaymentStatusBadge = (paymentStatus: string) => {
  if (!paymentStatus) paymentStatus = 'pending'; // Handle undefined/null paymentStatus

  const statusConfig = {
    succeeded: {
      color:
        'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
      dot: 'bg-green-500',
    },
    failed: {
      color:
        'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
      dot: 'bg-red-500',
    },
    pending: {
      color:
        'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200',
      dot: 'bg-yellow-500',
    },
  };

  const config =
    statusConfig[paymentStatus as keyof typeof statusConfig] ||
    statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200 hover:scale-105`}>
      <div
        className={`w-2 h-2 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
      {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
    </span>
  );
};
