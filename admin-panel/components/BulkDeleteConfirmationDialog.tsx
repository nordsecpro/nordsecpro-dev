// Bulk Delete Confirmation Dialog Component
interface BulkDeleteConfirmationDialogProps {
  isOpen: boolean;
  selectedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const BulkDeleteConfirmationDialog: React.FC<BulkDeleteConfirmationDialogProps> = ({
  isOpen,
  selectedCount,
  onConfirm,
  onCancel,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      ></div>
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all duration-300 scale-100">
          
          {/* Header */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20"></div>
            <div className="relative px-6 py-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    Bulk Delete Confirmation
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Multiple subscriptions will be deleted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete
              </p>
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50">
                <div className="text-4xl font-bold text-red-600 mb-2">{selectedCount}</div>
                <p className="text-red-800 font-semibold">
                  subscription{selectedCount > 1 ? 's' : ''}
                </p>
              </div>
              <p className="text-red-600 font-medium text-sm">
                ⚠️ This action is permanent and cannot be undone
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete All Selected
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};