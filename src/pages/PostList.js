import React from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

function PostList() {
  const [posts, setPosts] = React.useState([]);
  const [recentBookmark, setRecentBookmark] = React.useState([]);

  async function getTopStories() {
    try {
      const response = await fetch(`${API.posts}`);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const json = await response.json();
      const promises = json
        .slice(0, 20)
        .map((id) =>
          fetch(`${API.global}/${id}.json`).then((response) => response.json())
        );
      const result = await Promise.all(promises);
      setPosts(result);
    } catch (err) {
      console.error(err);
    }
  }

  const getRecentBookmark = async () => {
    let bookMarked = await localStorage.getItem("postId");
    let splitBookmark = bookMarked ? bookMarked.split(",") : [];
    try {
      const promises = splitBookmark
        .slice(-3)
        .map((id) =>
          fetch(`${API.global}/${id}.json`).then((response) => response.json())
        );
      const recentBookmark = await Promise.all(promises);
      setRecentBookmark(recentBookmark.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getTopStories();
    getRecentBookmark();
  }, []);

  if (posts.length === 0 && !recentBookmark === false ) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-2">Top Stories</h3>
        <hr />
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title mb-2">
              <span>&#9733;</span> Recent bookmarked
            </h5>
            {recentBookmark.length === 0 ? (
              <p>Bookmark is empty</p>
            ) : (
              recentBookmark.map((item) => (
                <div className="ml-4">
                  &bull;&nbsp; <Link className="mb-1" to={`/detail/${item.id}`}>{`${item.title}`}</Link>
                </div>
              ))
            )}
          </div>
        </div>
        <ul className="list-group">
          {posts.map((post) => (
            <li className="list-group-item" key={post.id}>
              <Link to={`/detail/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostList;
