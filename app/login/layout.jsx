export default function Layout({ children }) {
    return (
        <div className="bg-brand-200 flex h-screen w-screen flex-col items-center justify-center">
            {children}
        </div>
    )
}
