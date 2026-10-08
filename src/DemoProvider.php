<?php

namespace Demo;

use Pterodactyl\Extensions\ExtensionProvider;
use Pterodactyl\Services\Extensions\ExtensionSettingDefinition;
use Pterodactyl\Services\Extensions\ExtensionSettingsDefinition;

class DemoProvider extends ExtensionProvider
{
    public function boot(): void
    {
        $this->registerWebRoutes($this->extensionPath('routes', 'web.php'));

        $this->registerSettings(new ExtensionSettingsDefinition($this->settings(), [
            ExtensionSettingDefinition::make('enabled', 'enabled', false, ['required', 'boolean'])
                ->label('Fill the login form')
                ->help('Pre-fill the login page with the demo account below.')
                ->field('toggle'),
            ExtensionSettingDefinition::make('username', 'username', '', ['nullable', 'string', 'max:191'])
                ->label('Username or email')
                ->help('Use an account with no admin rights and only demo servers.')
                ->field('text'),
            ExtensionSettingDefinition::make('password', 'password', '', ['nullable', 'string', 'max:191'])
                ->label('Password')
                ->help('Shown to everyone who opens the login page.')
                ->field('text'),
        ]));
    }
}
