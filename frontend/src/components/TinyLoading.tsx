export default function TinyLoading() {
  return (
    <>
      <div className="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] flex items-center justify-center z-10 bg-black/5 backdrop-blur-md">
        <div className="tiny-loader"></div>
      </div>
    </>
  )
}
