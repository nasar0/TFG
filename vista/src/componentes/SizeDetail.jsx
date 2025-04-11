import React from 'react'

const SizeDetail = ({ label, value }) => (
    <div>
      <span className="text-gray-500 text-xs">{label}: </span>
      <span className="text-sm">{value}</span>
    </div>
);

export default SizeDetail