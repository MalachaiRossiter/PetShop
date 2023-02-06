import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";

const CreateForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState(["", "", ""]);
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newPet = ({name, type, description, skills, likes})
        console.log(newPet);
        axios.post('http://localhost:8000/api/pet', newPet)
        .then(res => {
            console.log(res);
            console.log(res.data);
            navigate('/');
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    return (
        <div>
            <div class="navbar navbar-light bg-light justify-content-between">
                <h1>Pet Shelter</h1>
                <Link to={`/`}>Back to Home</Link>
            </div>
            <h3>Know a pet needing a home?</h3>
            <div class="container border">
            <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
                <div class="row">
                    <div class="col">
                        <p>
                            <label>Name</label><br/>
                            <input type="text" onChange={(e) => setName(e.target.value)}/>
                        </p>
                        <p>
                            <label>Type</label><br/>
                            <input type="text" onChange={(e) => setType(e.target.value)}/>
                        </p>
                        <p>
                            <label>Description</label><br/>
                            <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                        </p>
                    </div>
                    <div class="col">
                    <p>
                    <label>Skill 1</label><br/>
                    <input type="text" onChange={(e) => setSkills(value => {
                        value[0] = e.target.value;
                        return [...value];
                    })}/>
                </p>
                <p>
                    <label>Skill 2</label><br/>
                    <input type="text" onChange={(e) => setSkills(value => {
                        value[1] = e.target.value;
                        return [...value];
                    })}/>
                </p>
                <p>
                    <label>Skill 3</label><br/>
                    <input type="text" onChange={(e) => setSkills(value => {
                        value[2] = e.target.value;
                        return [...value];
                    })}/>
                </p>
                    </div>
                </div>
                <input class="btn btn-primary" type="submit"/>
            </form>
            </div>
        </div>
    );
};

export default CreateForm;