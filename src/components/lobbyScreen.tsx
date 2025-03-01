function Lobby () {
    return <body style={{display: "flex", 
    flexDirection: "row"}}>
        {/* Setting of the body flexbox */}

                <div className="lobbyMain" style={{display: "flex", 
                    flexDirection: "column",}}>
                        {/* Outermost Left flex box creation & nested flex boxes */}

                    <div className="gameConfig" style={{ display: "flex", 
                        flexDirection: "row"}}>
                            {/* Container for the yellow Theme & World setting flex boxes */}

                        <div className="themeSection" style={{display: "flex", 
                            flexDirection: "column"}}>

                            <h1>Theme</h1>

                            <div className="themeBttns" style={{display: "flex", 
                                flexDirection:"row", 
                                justifyContent: "space-evenly"}}>

                                <button className="themeOption">
                                    Adventure
                                </button>

                                <button className="themeOption">
                                    Action
                                </button>

                                <button className="themeOption">
                                    Romance
                                </button>

                                <button className="themeOption">
                                    Mystery
                                </button>
                            </div>
                            {/*End Theme button selection Section */}

                        </div>
                                {/* End Theme Side */}

                        <div className="settingSection" style={{display:"flex", 
                            flexDirection: "column",}}>

                            <h1>World Setting</h1>

                            <div className="settingBttns" style={{display:"flex", flexDirection:"column"}}>

                                <button className="settingOption">
                                    Medieval
                                </button>

                                <button className="settingOption">
                                    Fantasy
                                </button>

                                <button className="settingOption">
                                    Sci-Fi
                                </button>

                                <button className="settingOption">
                                    Horror
                                </button>
                                {/*End World Setting button selection Section */}

                            </div>
                        </div>
                        {/*End Setting side */}

                    </div>
                    {/*End Yellow highlighted flexbox container */}

                    <div className="turns">
                        <h3>No. of Turns</h3>

                    </div>
                    {/*End Turns dropdown */}

                    <div className="bttnSection">
                        <button className="startBttn" style={{fontWeight:"bolder", padding: "30px"}}>
                            START
                        </button>
                    </div>
                    {/*End Start button */}

                </div>
                {/* End of Outer most, left-side flex box container (large) */}

                <div className="playerInfo" style={{display:"flex", 
                    flexDirection:"column",}}>
                        {/*Creation of Outermost, right-side flex box container (large/skinny) */}

                    <div className="timer">
                        <h3>Timer</h3>

                    </div>
                    {/*End Timer Section */}
                
                    <div className="playerList" style={{display:"flex", 
                        flexDirection: "column"}}>
                        
                        <h3>Players List</h3>


                    </div>
                    {/*End Player list Section */}

                    <div className="chat">

                        <h3>Chat Box</h3>

                    </div>
                    {/*End Chat box Section */}

                </div>
                {/*End of Outer most, right-side flex box container (large/skinny) */}
            </body>;


}

export default Lobby;

