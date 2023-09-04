import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, CircularProgress, Divider, Tooltip } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import AuthorPopup from './AuthorDetails';
import '../styles/Post.css'

const Post = () => {

  const { postId, imagePath } = useParams();
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  var filteredUserData = [];

  const Posts_API = `https://dummyjson.com/posts`;
  const Users_API = 'https://dummyjson.com/users';

  useEffect(() => {

    axios.get(`${Posts_API}/${postId}`)
      .then((response) => {
        setPost(response?.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });

    axios.get(Users_API)
      .then((response) => {
        const fetchedUserData = response?.data?.users;
        setUserData(fetchedUserData);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
    // eslint-disable-next-line
  }, [postId]);


  const handleAuthorClick = (authorId) => {
    setSelectedAuthorId(authorId);
  };

  const closePopup = () => {
    setSelectedAuthorId(null);
  };

  if (!post) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }

  const authorPost = userData?.find((user) => user?.id === post?.userId);

  if (authorPost) {
    filteredUserData = userData?.filter(user => user?.id !== authorPost?.id);
  }
  else {
    filteredUserData = [...userData];
  }

  return (
    <div className='post-main'>
      <div variant="outlined" className='post-card'>
        <div className='post-card-body'>
          <Tooltip title="Back" placement="top-start">
            <Link to={`/`} underline="none" style={{ color: 'black' }}>
              <ArrowBackIcon style={{ opacity: '0.5' }} />
            </Link>
          </Tooltip>
        </div>
        <CardContent>
          <Typography variant="h2" component="h2">
            {post?.title}
          </Typography>

          {authorPost ? (
            <div className="author-image" style={{ marginTop: '20px' }} onClick={() => handleAuthorClick(post?.userId)}>
              <img className="author-image-circle" src={authorPost?.image} alt="" />
              <div className="author-link" >
                <div className="author-bio">{authorPost?.firstName} {authorPost?.lastName}. <Link style={{ textDecoration: 'none' }}>Follow</Link></div>
                <div className="author-bio">{authorPost?.email}</div>
              </div>
            </div>
          ) : (
            <div className="author-image" style={{ padding: '16px' }}>
              <Avatar />
              <div >
                <div className="author-bio">
                  <span style={{ fontWeight: '800' }}> &nbsp;Unknown Author</span>
                </div>
              </div>
            </div>
          )}

          <Divider />
          <div className='action-reaction'>
            <div className='reaction'>
              <div >
                <ThumbUpOutlinedIcon style={{ opacity: '0.5' }} />
                <span>{post?.reactions}</span>
              </div>
              <div style={{ marginLeft: '30px' }}>
                <CommentOutlinedIcon style={{ opacity: '0.5' }} />
              </div>
            </div>
            <div className='action'>
              <div className='save-icon'>
                <BookmarkAddOutlinedIcon style={{ float: 'right', opacity: '0.5' }} />
              </div>
              <div className='share-icon'>
                <IosShareOutlinedIcon />
              </div>
            </div>
          </div>
          <Divider />
          <div className='image-container'>
            <img src={imagePath} alt="" />
          </div>

          <Typography variant="h6" color="textSecondary">
            {post?.body}
          </Typography>
          <div className='hash-tags'>
            {post?.tags && post?.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </div>
          <Divider />
          <div className='action-reaction'>
            <div className='reaction'>
              <div >
                <ThumbUpOutlinedIcon style={{ opacity: '0.5' }} />
                <span>{post?.reactions}</span>
              </div>
              <div style={{ marginLeft: '30px' }}>
                <CommentOutlinedIcon style={{ opacity: '0.5' }} />
              </div>
            </div>
            <div className='action'>
              <div className='save-icon'>
                <BookmarkAddOutlinedIcon style={{ float: 'right', opacity: '0.5' }} />
              </div>
              <div className='share-icon'>
                <IosShareOutlinedIcon />
              </div>
            </div>
          </div>
          <Divider />

          <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
            Recommended Authors
          </Typography>

          <div className='recommend-author'>
            {filteredUserData?.slice(0, 6).map((author, index) => (
              <div key={index} className="author-image author-image-position" onClick={() => handleAuthorClick(author?.id)}>
                <img className="author-image-circle" src={author?.image} alt="" />
                <div className="author-link" >
                  <div className="author-bio">{author?.firstName} {author?.lastName}</div>
                  <div className="author-bio">{author?.email}</div>
                </div>
              </div>
            ))}
          </div>

          <AuthorPopup user={userData?.find((user) => user?.id === selectedAuthorId)} onClose={closePopup} />
        </CardContent>
      </div>
    </div>
  );
};

export default Post;
