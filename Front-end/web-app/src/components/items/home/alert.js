import React from 'react';
import classNames from 'classnames';

export default function ResponsiveDialog({
  open,
  onClose,
  contentText,
  contentTitle,
  actionButtonLabel,
  onActionButtonClick,
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={classNames(
        'fixed inset-0 flex items-center justify-center z-50',
        { hidden: !open }
      )}
    >
      <div className="bg-white rounded-md p-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{contentTitle}</h2>
        <p className="mb-6">{contentText}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onActionButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {actionButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
