# Demo Account for Pterodactyl v2

A Pterodactyl v2 extension that fills the login page with a demo account, so visitors can try your panel in one click.

- The admin sets the demo username or email and password in the extension settings.
- The login form is filled in automatically, with a short note under the Login button.
- Root admin accounts are never filled in, even if entered by mistake.

## Install

Download `demo.pteroext` from the [releases](https://github.com/wrrfsub/Demo-User-For-Pterodactyl-v2/releases) page, then either:

- In your panel, go to **Admin → Extensions**, click **Install**, upload the file and tick **Enable after install**, or
- From the command line, in your panel folder:

  ```bash
  cd /var/www/pterodactyl
  php artisan p:extension:install /path/to/demo.pteroext --enable
  ```

## Set up

1. Create a normal user for the demo (not an admin) and give it only demo servers.
2. Go to **Admin → Extensions → Demo Account → Settings**.
3. Enter that user's username or email and password, turn on **Fill the login form**, and save.

The demo password is visible to everyone who opens the login page.

## Build from source

Requires Node.js and a Pterodactyl v2 panel checkout for the `@pterodactyl/sdk` package. Point `@pterodactyl/sdk` in `package.json` at your panel's `packages/sdk` folder.

```bash
npm install
npm run build
php artisan p:extension:pack /path/to/this/folder
```

## Support

- Discord: https://discord.gg/wmctpwXXUD
- Email: me@s4-way.me
