import CreateRoomForm from "./CreateRoomForm";
import "./index.css";
import JoinRoomForm from "./JoinRoomForm";
import {useNavigate,useLocation,} from "react-router-dom";

const Forms=({uuid, socket, setUser })=>{
    const location = useLocation();
    return (
        <div className="row">
            <h1>Hello {location.state.id} and welcome to the home</h1> 
            <div className="col-md-4 form-box mx-auto">
                <h1 className="text">Create Room</h1>
                <CreateRoomForm uuid={uuid} socket={socket} setUser = {setUser} />
            </div>
            <div className="col-md-4 mt-5 form-box p-5 rounded-2 mx-auto d-flex flex-column align-items-center ">
                <h1 className="text">Join Room</h1>
                <JoinRoomForm uuid={uuid} socket={socket} setUser = {setUser}/>
            </div>
        </div>
    );
};

export default Forms;