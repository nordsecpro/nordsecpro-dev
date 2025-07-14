export const getAutoRenewBadge = (autoRenew: boolean) => {
  // Handle undefined/null autoRenew
  if (autoRenew === undefined || autoRenew === null) autoRenew = false;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-sm whitespace-nowrap transition-all duration-200 hover:scale-105 ${
        autoRenew
          ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200'
          : 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200'
      }`}>
      <div
        className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse ${
          autoRenew ? 'bg-green-500' : 'bg-orange-500'
        }`}></div>
      {autoRenew ? 'Auto Renew' : 'Manual'}
    </span>
  );
};
