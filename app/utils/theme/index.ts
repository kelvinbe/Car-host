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
        available: {
            1000: "rgba(251, 188, 5, 1)",
            100: "rgba(251, 188, 5, 0.1)",
        },
        unavailable: {
            1000: "rgba(191, 6, 3, 1)",
            100: "rgba(191, 6, 3, 0.1)",
        },
        upcoming: {
            1000: "rgba(56, 176, 0, 1)",
            100: "rgba(56, 176, 0, 0.1)",
        },
        hold: {
            1000: "rgba(191, 6, 3, 1)",
            100: "rgba(191, 6, 3, 0.1)",
        },
        reserved: {
            1000: "rgba(24, 119, 242, 1)",
            100: "rgba(24, 119, 242, 0.1)",
        },
        paid: {
            1000: "rgba(56, 176, 0, 1)",
            100: "rgba(56, 176, 0, 0.1)",
        },
        pending: {
            1000: "rgba(251, 188, 5, 1)",
            100: "rgba(251, 188, 5, 0.1)",
        },
        cancelled: {
            100: "#f7a8aa",
            1000: "#ab0306",
        },
        denied: {
            100: "#F1A293 ",
            1000: "#EE4120 ",
        },
        success: {
            100: "#E1F8FF ",
            1000: "#02C4FE ",
        },
        complete: {
            100: "#E0FEE4 ",
            1000: "#0CD225 ",
        },
        blocked: {
            100: "#a69091",
            1000: "#ab070a",
        },
        inactive: {
            100: "#e8e8e6",
            1000:"#7d7d7a",
        },
        incomplete: {
            100: "#FEFDE5 ",
            1000:"#D7D304  ",
        },
        expired: {
            100: "#e8e8e6",
            1000:"#7d7d7a",
        },
        nonactive: {
            100: "#e8e8e6",
            1000:"#7d7d7a",
        },
        revoked: {
            100: "#F1A293 ",
            1000: "#EE4120 ",
        },
        other: {
            100: "#EBF5FB ",
            1000:"#2874A6  ",
        },
        failed: {
            100: "#f7a8aa",
            1000: "#ab0306",
        }, 
        completed: {
            100: "#E0FEE4 ",
            1000: "#0CD225 ",
        },
        approved:{
            100: "#E1F8FF ",
            1000: "#02C4FE ",
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