import { ReactNode } from "react";

function HeaderContainer({children}: {children: ReactNode}) {
    return (
        <header className="justify-between flex flex-row">
            {children}
        </header>
    )
}

function HeaderTitle({children}: {children: ReactNode}) {
    return <h1 className="font-semibold text-2xl">{children}</h1>
}

function HeaderButton({children}: {children: ReactNode}) {
    return <button className="bg-zinc-700 rounded-md p-1 hover:bg-zinc-600 active:bg-zinc-500 duration-75">
        {children}
    </button>
}

function HeaderDivider() {
    return <div className="h-1 w-full bg-zinc-700 my-6"></div>
}

export const Header = {
    Container: HeaderContainer,
    Title: HeaderTitle,
    Button: HeaderButton,
    Divider: HeaderDivider
}