export const getFirebaseErrorMessage = firebaseErrorCode => {
  switch (firebaseErrorCode) {
    // Kesalahan Autentikasi
    case 'auth/email-already-in-use':
      return 'Email yang digunakan sudah terdaftar. Silakan coba lagi dengan email yang berbeda.';
    case 'auth/invalid-email':
      return 'Alamat email yang Anda masukkan tidak valid. Silakan periksa kembali.';
    case 'auth/weak-password':
      return 'Kata sandi yang Anda masukkan terlalu lemah. Silakan gunakan kata sandi yang lebih kuat.';
    case 'auth/wrong-password':
      return 'Kata sandi yang Anda masukkan salah. Silakan coba lagi.';
    case 'auth/user-not-found':
      return 'Pengguna dengan email tersebut tidak ditemukan. Silakan daftar akun baru.';
    case 'auth/network-request-failed':
      return 'Terjadi masalah jaringan. Silakan periksa koneksi internet Anda dan coba lagi.';
    case 'auth/missing-password':
      return 'Mohon masukkan kata sandi';
    case 'auth/missing-email':
      return 'Mohon masukkan Email';

    // Kesalahan Database
    case 'database/permission-denied':
      return 'Pengguna tidak memiliki izin untuk mengakses database.';
    case 'database/data-consistency-error':
      return 'Terjadi konflik data pada database. Silakan coba lagi.';
    case 'database/disconnected':
      return 'Koneksi ke database Firebase terputus. Silakan periksa koneksi internet Anda dan coba lagi.';
    case 'database/invalid-arguments':
      return 'Argumen yang dimasukkan untuk operasi database tidak valid. Silakan periksa dokumentasi Firebase.';

    // Kesalahan Penyimpanan
    case 'storage/unauthorized':
      return 'Pengguna tidak memiliki izin untuk mengakses bucket penyimpanan.';
    case 'storage/quota-exceeded':
      return 'Kapasitas penyimpanan yang digunakan telah melebihi kuota. Silakan upgrade paket penyimpanan Anda.';
    case 'storage/object-not-found':
      return 'Objek yang ingin diakses tidak ditemukan di penyimpanan.';
    case 'storage/canceled':
      return 'Operasi upload atau download dibatalkan.';

    // Kesalahan Cloud Functions
    case 'functions/argument-error':
      return 'Argumen yang dimasukkan untuk Cloud Function tidak valid. Silakan periksa dokumentasi Cloud Functions.';
    case 'functions/internal':
      return 'Terjadi masalah internal pada Cloud Functions. Silakan hubungi tim support Firebase.';
    case 'functions/https-error':
      return 'Terjadi masalah dengan HTTP request atau response pada Cloud Function. Silakan periksa log Cloud Function.';
    case 'functions/timeout':
      return 'Cloud Function melebihi batas waktu eksekusi. Silakan optimasi kode Cloud Function Anda.';

    // Kesalahan Lainnya
    case 'app/invalid-app-id':
      return 'ID aplikasi yang digunakan tidak valid. Silakan periksa konfigurasi aplikasi Anda.';
    case 'app/deleted-app':
      return 'Aplikasi Firebase telah dihapus. Silakan buat aplikasi baru.';
    case 'app/invalid-credentials':
      return 'Kredensial yang digunakan tidak valid. Silakan periksa konfigurasi aplikasi Anda.';
    case 'app/app-not-authorized':
      return 'Aplikasi tidak memiliki izin untuk melakukan operasi. Silakan periksa konfigurasi izin aplikasi Anda.';
    default:
      return 'Terjadi error yang tidak diketahui. Silakan hubungi administrator.';
  }
};
