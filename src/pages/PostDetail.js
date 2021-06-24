import React from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";

function PostDetail() {
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [bookmark, setBookmark] = React.useState(false);
  const { id } = useParams();

  const toggleBookmark = async () => {
    let bookMarked = await localStorage.getItem("postId");
    let splitBookmark = bookMarked ? bookMarked.split(",") : [];
    let findBookmark = splitBookmark.find((item) => item === id);
    if (findBookmark === undefined && bookmark === false) {
      splitBookmark.push(id);
      localStorage.setItem("postId", splitBookmark.join(","));
      setBookmark(true);
    } else {
      splitBookmark.splice(splitBookmark.indexOf(id), 1);
      localStorage.setItem("postId", splitBookmark.join(","));
      setBookmark(false);
    }
  };

  const getBookmark = async () => {
    let bookMarked = await localStorage.getItem("postId");
    let splitBookmark = bookMarked ? bookMarked.split(",") : [];
    let findBookmark = splitBookmark.find((item) => item === id);
    if (findBookmark !== undefined) {
      setBookmark(true);
    }
  };

  const getPostDetail = async () => {
    try {
      const response = await fetch(`${API.global}/${id}.json`);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const postDetail = await response.json();
      const comments = await postDetail.kids.map((id) =>
        fetch(`${API.global}/${id}.json`).then((response) => response.json())
      );
      const allComments = await Promise.all(comments);
      setPost(postDetail);
      setComments(allComments);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getPostDetail();
    getBookmark();
  }, []);

  if (comments.length === 0 && Object.keys(post).length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="post-head">
        <Link to="/">&laquo; Back</Link>
        <div onClick={toggleBookmark} className="star">
          {bookmark ? <span>&#9733;</span> : <span>&#9734;</span>}
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-subtitle mb-2 text-muted">{post.title}</h5>
        <hr />
        <p className="mb-5">{post.text}</p>

        <h5 className="card-subtitle mb-2 text-muted">Comments</h5>
        <ul className="list-group">
          {comments.map((item) => (
            <li className="list-group-item" key={item.id}>
              <p>{item.text}</p>
              <p>
                By <strong>{item.by}</strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostDetail;
