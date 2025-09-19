import Navigator from '../components/Navigator'
import TopBar from '../components/TopBar'

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col">
            <TopBar />
            <div
                style={{
                    paddingTop: 'var(--top-bar-height, 56px)',
                    paddingBottom: 'var(--bottom-nav-safe, 72px)',
                }}
            >
                {children}
            </div>
            <Navigator />
        </div>
    )
}
