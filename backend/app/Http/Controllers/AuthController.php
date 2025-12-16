<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return new JsonResponse([
            'user' => $request->user(),
            'session' => session()->all()
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            return new JsonResponse([
                'user' => Auth::user(),
                'message' => 'Authenticated successfully'
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'username' => $request->name,
            'email' => $request->email,
            'password_hash' => Hash::make($request->password),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return new JsonResponse([
            'user' => $user,
            'message' => 'Registered successfully'
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse(['message' => 'Logged out successfully']);
    }
}
