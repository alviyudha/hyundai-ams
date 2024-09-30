import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Selamat Datang!</h1>
        <p className="text-xl mb-2">Anda telah berhasil masuk ke Dashboard.</p>
        <p className="text-md text-gray-600">Gunakan menu di sebelah kiri untuk menavigasi melalui aplikasi.</p>
      </div>
    </div>
  );
}
