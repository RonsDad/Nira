// Quick test component to disable Spline and check if scrolling stops
export function TestWithoutSpline() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Spline Scene Disabled</h3>
        <p className="text-gray-600">Testing if Spline causes the scroll issue</p>
      </div>
    </div>
  );
}
