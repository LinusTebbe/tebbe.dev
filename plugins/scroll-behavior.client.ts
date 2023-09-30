import { useRouter } from "vue-router";

export default defineNuxtPlugin(nuxtApp => {
    if (typeof window !== "undefined") {
        const router = useRouter();

        router.afterEach(async (to, from) => {
            if (to.hash) {
                const targetElement = document.querySelector(to.hash);

                if (targetElement) {
                    await targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    });
                    return;
                }
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});