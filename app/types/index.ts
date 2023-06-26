/**
 * All new global type definitions that are outside the scope of the Phase1 release will go here
 * 
 * @note don't add any type definitions that don't need to be global here
 */

export {}

export interface PagePhaseProps {
    /**
     * !!! IMPORTANT !!! - this is an opt in feature, add it to pages that are in development and should not be released yet, note once a page is ready for release you will need to remove this prop
     * The current phase of the page
     * 
     * @note this will determine if the page will get rendered or a placeholder will be shown
     * 
     * @default "ph1"
     * 
     * ph1: the page is in phase 1 and should always be rendered
     * ph1.5: the page is in phase 1.5 and will only be rendered in development mode until the page is ready for release
     * ph2: the page is in phase 2 and will only be rendered in development mode until the page is ready for release
     * 
     */
    phase?: "ph1" | "ph1.5" | "ph2"
}