import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageLinkProps {
    href: string;
    children: ReactNode
}

export function PageLink({href, children}: PageLinkProps) {
    return <Link to={href}>{children}</Link>
}