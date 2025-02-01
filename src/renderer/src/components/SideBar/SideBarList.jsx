const SideBarList = props => {

    return (
        <div className="h-[calc(100vh)] bg-white w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/5">
            {props.children}
        </div>
    )
}

export default SideBarList