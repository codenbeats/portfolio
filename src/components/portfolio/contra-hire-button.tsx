export function ContraHireButton() {
    return (
        <a
            href="https://contra.com/kittipong"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-full border border-secondary px-5 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand-secondary"
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
