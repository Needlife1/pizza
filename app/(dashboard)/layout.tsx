
export const metadata = {
    title: 'Dashboard',
    Description: 'Dashboard'
}

export default function DashboardLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}