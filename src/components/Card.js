import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../slice/posts/postSlice';
import { Link } from 'react-router-dom';
import {
    Card as MuiCard,
    CardContent,
    Typography,
    Pagination,
    CircularProgress,
    Box,
    Avatar,
} from '@mui/material';
import AuthorPopup from './AuthorDetails';
import axios from 'axios';
import '../styles/Card.css';

const Card = () => {

    const Users_API = 'https://dummyjson.com/users';

    const dispatch = useDispatch();
    const posts = useSelector((state) => state?.posts?.posts);

    const [selectedAuthorId, setSelectedAuthorId] = useState(null);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [shuffledImageUrls, setShuffledImageUrls] = useState([]);
    const imageUrls = [
        'https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_1280.jpg',
        'https://cdn.pixabay.com/photo/2014/02/13/07/28/security-265130_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/07/31/04/11/tomato-2556426_1280.jpg',
        'https://cdn.pixabay.com/photo/2014/08/22/05/58/social-media-423857_640.jpg',
        'https://cdn.pixabay.com/photo/2014/08/27/08/11/blogging-428955_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/06/19/08/35/marketing-1466313_1280.jpg'
    ];

    useEffect(() => {
        dispatch(fetchPosts());

        axios.get(Users_API)
            .then((response) => {
                const fetchedUserData = response?.data?.users;
                setUserData(fetchedUserData);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });

        const shuffledImages = [...imageUrls];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        setShuffledImageUrls(shuffledImages);
        // eslint-disable-next-line
    }, [dispatch]);

    const handleAuthorClick = (authorId) => {
        setSelectedAuthorId(authorId);
    };

    const closePopup = () => {
        setSelectedAuthorId(null);
    };

    if (!posts?.posts) {
        return (
            <div className='loader'>
                <CircularProgress />
            </div>
        );
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.posts?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='blog-container'>
            <Box className='blog-body'>
                {currentPosts?.map((post, index) => {
                    const author = userData?.find(user => user?.id === post?.userId);
                    const randomImageUrl = shuffledImageUrls[index % shuffledImageUrls.length];
                    return (
                        <MuiCard key={post?.id} className='inner-card'>
                            <Link to={`/post/${post?.id}/${encodeURIComponent(randomImageUrl)}`} style={{ color: 'black', textDecoration: 'none' }}>
                                <CardContent>
                                    <div className='blog-image'>
                                        <img src={randomImageUrl} alt="" />
                                    </div>
                                    <Typography variant="h4" component="h2">
                                        {post?.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {post?.body?.split(' ').slice(0, 50).join(' ')} {post?.body?.split(' ').length > 50 ? '...' : ''}
                                    </Typography>
                                </CardContent>
                            </Link>
                            <div variant="body2" color="textSecondary">
                                {author ? (
                                    <div className="author-card-image" onClick={() => handleAuthorClick(post?.userId)}>
                                        <img className="author-card-image-circle" src={author?.image} alt="" />
                                        <div className="author-card-link" >
                                            <div className="author-card-bio">{author?.firstName} {author?.lastName}</div>
                                            <div className="author-card-bio">{author?.email}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="author-card-image" style={{ padding: '16px' }}>
                                        <Avatar />
                                        <div >
                                            <div className="author-card-bio">
                                                <span style={{ fontWeight: '800' }}> &nbsp;Unknown Author</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </MuiCard>
                    );
                })}
            </Box>
            <div className="pagination-container">
                <Pagination
                    color="primary"
                    count={Math.ceil(posts?.posts?.length / postsPerPage)}
                    shape="rounded"
                    size="large"
                    onChange={(event, pageNumber) => paginate(pageNumber)}
                    className="pagination"
                />
            </div>
            <AuthorPopup user={userData?.find(user => user?.id === selectedAuthorId)} onClose={closePopup} />
        </div>
    );
};

export default Card;
