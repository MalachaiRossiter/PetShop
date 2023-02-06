import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate, Link, useParams} from "react-router-dom";

const UpdateForm = (props) => {
    const [pet, setPet] =useState({})
    const {id} = useParams();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState(["", "", ""]);
    const [likes, setLikes] = useState();

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then((res) => {
            console.log(res.data);
            setPet(res.data);
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkills(res.data.skills);
            setLikes(res.data.likes);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newPet = ({name, type, description, skills, likes})
        console.log(newPet);
        axios.put(`http://localhost:8000/api/pet/${id}`, newPet)
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
            <div class="navbar navbar-light bg-light justify-content-betweenjustify-content-between">
                <h1>Pet Shelter</h1>
                <Link to={`/`}>Back to Home</Link>
            </div>
            <h3>Edit: {pet.name}</h3>
            <div class="container border">
            <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
                {
                    loaded ? 
                    <div class="row">
                        <div class="col">
                            <p>
                                <label>Name</label><br/>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </p>
                            <p>
                                <label>Type</label><br/>
                                <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                            </p>
                            <p>
                                <label>Description</label><br/>
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                <label>Skill 1</label><br/>
                                <input type="text" value={skills[0]} onChange={(e) => setSkills(value => {
                                value[0] = e.target.value;
                                return [...value];
                                })}/>
                            </p>
                            <p>
                                <label>Skill 2</label><br/>
                                <input type="text" value={skills[1]} onChange={(e) => setSkills(value => {
                                value[1] = e.target.value;
                                return [...value];
                                })}/>
                            </p>
                            <p>
                                <label>Skill 3</label><br/>
                                <input type="text" value={skills[2]} onChange={(e) => setSkills(value => {
                                value[2] = e.target.value;
                                return [...value];
                                })}/>
                            </p>
                        </div>
                    </div>
                    : null }
                <input class="btn btn-primary" type="submit"/>
            </form>
            </div>
        </div>
    )
}
export default UpdateForm;