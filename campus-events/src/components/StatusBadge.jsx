function StatusBadge({ status }) {
  return (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
      {status}
    </span>
  );
}

export default StatusBadge;