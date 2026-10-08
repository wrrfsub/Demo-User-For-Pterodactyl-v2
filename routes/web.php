<?php

use Illuminate\Support\Facades\Route;
use Pterodactyl\Models\User;
use Pterodactyl\Services\Extensions\ExtensionSettingsRegistry;

Route::get('/account', function (ExtensionSettingsRegistry $registry) {
    $settings = $registry->get('demo');
    $username = trim((string) $settings->get('username'));

    $admin = $username !== '' && User::query()->where('root_admin', true)
        ->where(fn ($q) => $q->where('email', $username)->orWhere('username', $username))->exists();

    if (! $settings->get('enabled') || $username === '' || $admin) {
        return response()->json(['enabled' => false]);
    }

    return response()->json(['enabled' => true, 'username' => $username, 'password' => (string) $settings->get('password')]);
})->middleware('throttle:60,1');
