import React, { useState, useEffect } from 'react';
import { Container, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddComment = ({ onSubmit, postId }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        comment: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [comments, setComments] = useState([]);


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/comments/${postId}`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);



    const handleShowAllProducts = () => {
        navigate('/allPost');
    }

    const handleCancel = () => {
        navigate('/allPost');
    }
    const token = localStorage.getItem('accessToken');

    const handleSubmit = (e, id) => {
        e.preventDefault();
        if (!formData.comment) {
            setErrorMessage('All fields are required!');
            return;
        }
        const { comment } = formData;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:5000/api/addComment/${postId}`, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Comment created successfully');

                } else {
                    console.error('Error creating Comment:', xhr.responseText);

                }
            }
        };
        xhr.send(
            JSON.stringify({
                comment
            })
        );
        navigate('/allPost');
    };

    return (
        <Container>
            {/* <h2>Comments for Post {postId}</h2> */}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.user}: {comment.text}
                    </li>
                ))}
            </ul>
            <h1 className="text-center mt-5">Add Comment</h1>
            <div className="justify-content-center mt-5">
                <div md={6}>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    <div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="comment">comment</label>
                            <input type="text" className="form-control" id="comment" name="comment" value={formData.comment} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='allproduct-button mt-5'>
                <button className="btn btn-primary" onClick={handleShowAllProducts}>
                    Show All Categories
                </button>
                <button className="btn btn-danger mr-2 mx-3" onClick={handleCancel}>
                    Cancel
                </button>
                {/* <div>
                        <p>{setCategory.categoryName}</p>
                    </div> */}
                <button className="btn btn-primary mr-2 mx-3" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </Container>

    );
};

export default AddComment;
