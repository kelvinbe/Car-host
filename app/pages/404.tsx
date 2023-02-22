// import { Link } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function PageNotFound(){
    const headStyle = {
        fontSize: 40,
        fontWeight: 900,
        textColor: "#33415C",
    }

    const divStyle = {
        width: "80%",
        marginLeft: "auto",
        marginRight:"auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

    const linkStyle = {
        marginTop: "30px",
        textDecoration: "underline",
    }
    return(
        <div style={divStyle}>
            <h1 style={headStyle}>404 | Page not found</h1>
            <p>Sorry, there is nothing to see here</p>
            <Link href="landing-page" style={linkStyle}>
                Home
            </Link>
            
        </div>
    )
}