export default function StaffSkeletonCard() {
  return (
    <div className="flex w-full flex-col  items-center ">
      <div className="w-2/3 animate-pulse">
        <div className="flex flex-col space-y-3">
          <div className="w-full h-6 bg-gray-300"></div>
          <div className="flex flex-row space-x-4">
            <div className="w-full h-6 bg-gray-300"></div>
            <div className="w-full h-6 bg-gray-300"></div>
            <div className="w-full h-6 bg-gray-300"></div>
            <div className="w-full h-6 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
