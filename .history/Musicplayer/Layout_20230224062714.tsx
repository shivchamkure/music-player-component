import React from "react"


export const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
    <div className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr,min(640px,100%),1fr] px-4">

          
    </div>
      <div className="grid grid-cols-[1fr,min(640px,100%),1fr] gap-y-8 px-4 pt-48 xl:grid-cols-[1fr,minmax(auto,240px),min(640px,100%),minmax(auto,240px),1fr] xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
        {children}
      </div>

    </>
  )
}
