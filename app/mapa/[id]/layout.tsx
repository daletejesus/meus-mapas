type Props = {
  children: React.ReactNode;
}

const MainLayout = ({
  children,
}: Props) => {
  return (
      <>
          <div className="h-full">
              {children}
          </div>
      </>
  )
}

export default MainLayout;