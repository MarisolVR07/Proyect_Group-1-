const SkeletonLoader = () => (
    <tr>
      <td colSpan={4}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="h-2 bg-slate-700 rounded col-span-3"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </td>
    </tr>
  );
  
  export default SkeletonLoader;
  