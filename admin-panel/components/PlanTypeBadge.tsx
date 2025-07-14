export const getPlanTypeBadge = (planType: string) => {
  if (!planType) planType = 'ongoing'; // Handle undefined/null planType

  const typeConfig = {
    ongoing: {
      color:
        'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200',
      dot: 'bg-blue-500',
    },
    'one-time': {
      color:
        'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200',
      dot: 'bg-purple-500',
    },
  };

  const config =
    typeConfig[planType as keyof typeof typeConfig] || typeConfig.ongoing;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-sm whitespace-nowrap ${config.color} transition-all duration-200 hover:scale-105`}>
      <div
        className={`w-1.5 h-1.5 ${config.dot} rounded-full mr-1.5 animate-pulse`}></div>
      {planType.charAt(0).toUpperCase() + planType.slice(1)}
    </span>
  );
};
