import { extendTheme } from "@chakra-ui/react";


export const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
    colors: {
        primary: {
            100: "#E63B2E10",
            200: "#E63B2E20",
            300: "#E63B2E30",
            400: "#E63B2E40",
            500: "#E63B2E50",
            600: "#E63B2E60",
            700: "#E63B2E70",
            800: "#E63B2E80",
            900: "#E63B2E90",
            1000: "#E63B2E"
        },
        background: "#F9FAFC",
        active: {
            1000: "rgba(56, 176, 0, 1)",
            100: "rgba(56, 176, 0, 0.1)",
        },
        upcoming: {
            1000: "rgba(56, 176, 0, 1)",
            100: "rgba(56, 176, 0, 0.1)",
        },
        cancelled: {
            1000: "rgba(191, 6, 3, 1)",
            100: "rgba(191, 6, 3, 0.1)",
        },
        reserved: {
            1000: "rgba(24, 119, 242, 1)",
            100: "rgba(24, 119, 242, 0.1)",
        },
        pending: {
            1000: "rgba(251, 188, 5, 1)",
            100: "rgba(251, 188, 5, 0.1)",
        },
        link: "#1877F2"
    },
    styles: {
        global: (props: any) => {
            return {
                body: {
                    bg: "white",
                    w: "100vw",
                    overflowX: "hidden",
                    h: "full"
                },
                "*": {
                    "::-webkit-scrollbar": {
                        width: "5px",
                        backgroundColor: "transparent",
                    },
                    "::-webkit-scrollbar-thumb": {
                        borderRadius: "2.5",
                        backgroundColor: "gray.100"
                    }
                }
            };
        }
    }
})  