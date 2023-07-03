import Logo from "../Logo";

export default function Navbar() {
    return <nav className="flex justify-center align-center flex-row bg-dark-700 w-screen h-20 p-4 px-12">
        <div id="nav_logo_section" className="flex align-center justify-center w-fit h-full">
            <Logo width={60} height={60} specific='light'/>
        </div>
        <div className="h-full w-0.5 mx-6 mr-8 bg-dark-300-text rounded-lg"></div>
        <div id="nav_link_section" className="w-[80%] h-full bg-dark-300-text">

        </div>
        <div id="nav_user_section">

        </div>
    </nav>
}