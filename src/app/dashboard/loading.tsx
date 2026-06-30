export default function DashboardLoading() {
  return (
    <div className="flex flex-col flex-1 bg-canvas py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="h-7 w-28 bg-hairline rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-44 bg-hairline rounded animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-hairline rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-xl border border-hairline p-4 text-center">
              <div className="h-8 w-12 bg-hairline rounded animate-pulse mx-auto mb-2" />
              <div className="h-3 w-24 bg-hairline rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
        <div className="bg-surface rounded-2xl border border-hairline overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-6 py-4 border-b border-hairline last:border-0 flex items-center gap-4">
              <div className="w-10 h-10 bg-hairline rounded-xl animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-48 bg-hairline rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-hairline rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
