import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';


const Details = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState(["", "", ""]);
    const [likes, setLikes] = useState();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkills(res.data.skills);
            setLikes(res.data.likes);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, []);

    const deletePet = e => {
        axios.delete(`http://localhost:8000/api/pet/${id}`)
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    const likeButton = (e) => {
        e.preventDefault();
        e.currentTarget.disabled = true;
        const newPet = ({name, type, description, skills, likes: likes+1})
        axios.put(`http://localhost:8000/api/pet/${id}`, newPet)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
        setLikes(likes + 1);
    }

    return (
        <div>
            <div class="navbar navbar-light bg-light justify-content-between">
                <h1>Pet Shelter</h1>
                <Link to={`/`}>Back to home</Link>
            </div>
            <div class="navbar justify-content-between">
                <h3>Details about: {name}</h3>
                <button class="btn btn-danger" onClick={deletePet}>Adopt: {name}</button>
            </div>
            <div class="border text-left mx-auto p-3">
                <p>Pet Name: {type}</p>
                <p>Description: {description}</p>
                <p>Skills:</p>
                {loaded && skills.map((skill, index) => <div key={index}>{skills[index]}</div>)}
                <button onClick={likeButton}>Like: {name}</button> <p>{likes} Like(s)</p>
            </div>
        </div>
    )
}
export default Details;