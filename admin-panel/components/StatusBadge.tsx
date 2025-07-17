export const getStatusBadge = (status: string = 'active') => {
  if (!status) status = 'active'; // Handle undefined/null status

  const statusConfig = {
    active: {
      color:
        'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500',
    },
    inactive: {
      color:
        'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200',
      dot: 'bg-gray-500',
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200 hover:scale-105`}>
      <div
        className={`w-2 h-2 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
