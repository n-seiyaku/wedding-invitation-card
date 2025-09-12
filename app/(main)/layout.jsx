import Navigator from '../components/Navigator'
import TopBar from '../components/TopBar'

export default function MainLayout({ children }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <div className="flex-1 pb-16">{children}</div>
            <Navigator />
        </div>
    )
}
