export const dynamic = 'force-static'; // This makes sure the page is static

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-3xl font-bold">You are Offline</h1>
            <p className="mt-2 text-gray-500">Please reconnect to continue using the app.</p>
        </div>
    );
}
