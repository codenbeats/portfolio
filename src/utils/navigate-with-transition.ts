import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function navigateWithTransition(
    router: AppRouterInstance,
    href: string,
    element?: HTMLElement | null,
    transitionName = "work-card",
) {
    if (!element || !("startViewTransition" in document)) {
        router.push(href);
        return;
    }

    const rect = element.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const vpCenterX = window.innerWidth / 2;
    const vpCenterY = window.innerHeight / 2;
    const dx = vpCenterX - cardCenterX;
    const dy = vpCenterY - cardCenterY;

    document.documentElement.style.setProperty("--card-dx", `${dx}px`);
    document.documentElement.style.setProperty("--card-dy", `${dy}px`);

    element.style.viewTransitionName = transitionName;

    (document as any).startViewTransition(() => {
        router.push(href);
        element.style.viewTransitionName = "";
        document.documentElement.style.removeProperty("--card-dx");
        document.documentElement.style.removeProperty("--card-dy");
    });
}
