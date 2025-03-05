
export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "draft":
      return "bg-yellow-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
};
