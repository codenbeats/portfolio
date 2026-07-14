export function ContraHireButton() {
    return (
        <a
            href="https://contra.com/kittipong"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-secondary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-fg-brand-primary hover:bg-brand-secondary dark:hover:border-brand-600/40 dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
        >
            <img
                src="/contra-logo.svg"
                alt=""
                aria-hidden="true"
                className="size-[18px] shrink-0 dark:invert dark:brightness-200"
            />
            Hire Me on Contra
        </a>
    );
}
