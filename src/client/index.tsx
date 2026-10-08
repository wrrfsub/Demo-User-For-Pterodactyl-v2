import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { definePterodactylExtension } from '@pterodactyl/sdk';

type Account = { enabled: false } | { enabled: true; username: string; password: string };

function fill(input: HTMLInputElement | null, value: string) {
    if (!input) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

function DemoLogin() {
    const ref = useRef<HTMLDivElement>(null);
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        fetch('/extensions/demo/account', { headers: { Accept: 'application/json' } })
            .then((r) => (r.ok ? r.json() : { enabled: false }))
            .then(setAccount)
            .catch(() => setAccount({ enabled: false }));
    }, []);

    useEffect(() => {
        const form = ref.current?.closest('form');
        if (!account?.enabled || !form) return;
        fill(form.querySelector<HTMLInputElement>('input[name="username"], input[type="text"], input[type="email"]'), account.username);
        fill(form.querySelector<HTMLInputElement>('input[type="password"]'), account.password);
    }, [account]);

    if (!account?.enabled) return <div ref={ref} />;

    return (
        <div ref={ref} className={'dm:mt-4 dm:rounded-sm dm:border dm:border-border dm:bg-muted/40 dm:px-3 dm:py-2 dm:text-center dm:text-xs dm:text-muted-foreground'}>
            Demo account filled in. Just press <b className={'dm:text-foreground'}>Login</b>.
        </div>
    );
}

function FitSettings() {
    useEffect(() => {
        const fit = () => {
            for (const dialog of document.querySelectorAll<HTMLElement>('[role="dialog"]')) {
                if (!/^\s*Demo Account settings\s*$/.test(dialog.querySelector('h1, h2, h3')?.textContent ?? '')) continue;
                const body = dialog.querySelector<HTMLElement>('[class*="h-[min(30rem"]');
                if (body && body.style.height !== 'auto') {
                    body.style.height = 'auto';
                    body.style.maxHeight = 'calc(100dvh - 14rem)';
                }
            }
        };
        const observer = new MutationObserver(fit);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    return null;
}

export default definePterodactylExtension({
    setup({ slots }) {
        slots.register('auth.login.form.after', DemoLogin);
        slots.register('panel.extensions.before', FitSettings);
    },
});
