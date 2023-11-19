import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts/");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-y-auto ">
      <Header />
      <div className="w-3/5 flex mt-4 mx-auto ">
        <div className="main-view-page w-2/3 mr-10">
          <div className="sticky z-10 top-[72px]">
            <div className="h-14 bg-white p-2 mb-4 flex">
              <img src="/social-media.png" alt="icon" className="mx-2"></img>
              <Link
                className="w-full border border-gray-300 text-gray-400 flex items-center p-2"
                to="/create-post"
              >
                Create Post
              </Link>
            </div>
          </div>

          <div className="filter bg-white py-2 sticky top-[144px] z-10">
            <div className="flex ml-10">
              <div className="mr-2">
                <button className="bg-[#eeeeee] flex items-center justify-center">
                  <img src="/star.png" alt="Star" className="mr-2"></img>Best
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/fire.png" alt="Fire" className="mr-2"></img>Hot
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/thunder.png" alt="Thunder" className="mr-2"></img>
                  New
                </button>
              </div>
              <div>
                <button className="flex items-center justify-center">
                  <img src="/up.png" alt="Up" className="mr-2"></img>Top
                </button>
              </div>
            </div>
          </div>
          <div className="post-view bg-white mt-4 z-0">
            {posts.map((post) => (
              <div key={post.id} className="h-[60vh] p-4">
                <div className="header-post flex items-center h-[10%]">
                  <div className="user-icon mr-2">
                    <img
                      src="/social-media.png"
                      alt="icon"
                      width={20}
                      height={20}
                    ></img>
                  </div>
                  <div className="user-name font-medium text-base mr-2">
                    <div>{post.user.name}</div>
                  </div>
                  <div className="time-post font-light text-xs mr-2">
                    {/* <div>Posted at {post.created_at}</div> */}
                    <div>
                      Posted at {formatDistanceToNow(new Date(post.created_at))}{" "}
                      ago
                    </div>
                  </div>
                  <div className="post-tag flex mr-2">
                    {post.post_tag?.map((tag) => (
                      <div
                        key={tag.id}
                        className="tag text-xs mr-1 border border-gray-200 p-1 rounded-lg bg-neutral-700 text-white"
                      >
                        {tag.tag.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="content-post h-[60%] flex">
                  <div className="w-[5%] mr-6 flex justify-center font-bold">
                    +{post.post_vote?.length ?? 0}
                  </div>
                  <div className="w-[85%]">
                    <div className="post-title font-bold mb-1">
                      {post.title}
                    </div>
                    <div className="description mb-1">{post.description}</div>
                    <div className="image mb-1">{post.image}</div>
                    <div className="comment flex">
                      <img src="/cmt.png"></img>
                      <span className="ml-2">
                        {post.comments?.length ?? 0} Comments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-post h-[30%] flex">
                  <div className="border-l-2 border-gray-400">
                    {post.comments?.map((comment) => (
                      <div key={comment.id} className="comment-item ml-4">
                        <div className="comment header flex">
                          <div className="mr-2">
                            <img src="/social-media.png" alt="cmt icon" width={32} height={32}></img>
                          </div>
                          <div>{comment.user.name}</div>
                          <div className="mr-2">
                            {formatDistanceToNow(new Date(comment.created_at))}{" "}
                            ago
                          </div>
                        </div>
                        <div className="comment content mr-2 border-dotted border-l-2 border-gray-400 pl-4">{comment.content}</div>
                        <div className="vote font-bold">
                          {post.comments.comment_vote?.length ?? 0}
                        </div>
                      </div>
                    ))}
                    <div className="text comment flex mt-4 ml-4">
                      <img src="/social-media.png" alt="cmt icon" width={32} height={32}></img>
                      <input className="p-1 border border-gray-400 mx-2 rounded-lg w-[60vh]" placeholder="Send message"></input>
                      <button style={{height: '32px'}}
                      className="flex items-center">
                        <img src="/send.png" alt="send cmt"></img>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="recent-post w-1/3 bg-white p-4 h-[40vh] sticky top-[72px]">
          <div>
            <p className="font-bold text-black">RECENT POST</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
