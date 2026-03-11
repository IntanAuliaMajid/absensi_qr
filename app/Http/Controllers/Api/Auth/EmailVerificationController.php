<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Otp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;

class EmailVerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        // mengambil data user
        $user = $request->user();

        // cek apakah user sudah di verifikasi
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified'
            ], 400);
        }

        // mengambil data otp user
        $otp = Otp::where('user_id', $user->id)
            ->where('otp', $request->otp)
            ->where('type', 'email_verification')
            ->where('expires_at', '>=', Carbon::now())
            ->whereNull('used_at')
            ->first();

        if (!$otp) {
            return response()->json([
                'message' => 'Invalid or expired OTP code'
            ], 400);
        }

        // tandai user sudah verifikasi
        $user->markEmailAsVerified();

        // tandai otp sudah digunakan jam saat ini
        $otp->used_at = Carbon::now();
        $otp->save();


        // menambahkan log verifikasi sukses
        Log::info('Email verified successfully', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        // mengirim respon json bahwa email berhasil diverifikasi dan mengirimkan data user dan token
        return response()->json([
            'message' => 'Email verified successfully',
            'user' => new UserResource($user),
        ]);
    }

    public function resendOtp(Request $request)
    {
        $user = $request->user();

        // cek apakah user sudah pernah di verifikasi
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified'
            ], 400);
        }

        // menghapus otp lama
        $user->otps()->where('type', 'email_verification')->whereNull('used_at')->delete();

        // mengirim otp ulang
        $user->sendEmailVerificationNotification();

        // menambahkan log info email verifikasi otp dikrim
        Log::info('Email verification OTP resent', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        // response json untuk pesan otp telah dikirim melalui email
        return response()->json([
            'message' => 'OTP code has been sent to your email'
        ]);
    }
}
