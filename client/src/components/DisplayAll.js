import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAll = (props) => {
    const [petList, setPetList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/pet')
        .then(res => {
            console.log(res.data);
            setPetList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div class="navbar navbar-light bg-light justify-content-between">
                <h1>Pet Shelter</h1>
                <Link to={`/pet/add`}>Add a pet to the shelter</Link>
            </div>
            <h3>These Pets are looking for a good home</h3>
            <hr/>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                petList && petList.map((pet, index) => (
                    <tr key={index}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td><Link to={`/pet/details/${pet._id}`}>Details</Link> | <Link to={`/pet/edit/${pet._id}`}>Edit Pet</Link></td>

                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}
export default DisplayAll;