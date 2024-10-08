import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editPostId, setEditPostId] = useState(null); 
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const commentsPerPage = 2;

  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
  };

  useEffect(() => {
    const userData = checkLoginStatus();
    if (!userData) {
      Swal.fire({
        title: 'Akses Terbatas',
        text: 'Halaman ini hanya untuk user yang sudah login.',
        icon: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      axios.get('https://fcollection.my.id/landing2/home/get_posts_with_comments')
        .then(response => {
          const updatedTopics = response.data.map(topic => ({
            ...topic,
            comments: topic.comments.map(comment => ({
              ...comment,
              created_at: moment.utc(comment.created_at).tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ssZ')
            }))
          }));
          setTopics(updatedTopics);
        })
        .catch(error => {
          Swal.fire('Error', 'Failed to fetch posts', 'error');
        });
    }
  }, [navigate]);

  const handleAddPost = () => {
    const userData = JSON.parse(localStorage.getItem('userData')); 
    if (!userData || !userData.userId) {
      Swal.fire('Error', 'User tidak ditemukan. Silakan login lagi.', 'error');
      return;
    }

    if (newPost.title.trim() && newPost.body.trim()) {
      const postData = {
        ...newPost,
        userId: userData.userId, 
        created_by: userData.nama, 
        create_at: moment().format('YYYY-MM-DD HH:mm:ss'), 
      };

      axios.post('https://fcollection.my.id/landing2/home/add_post', postData)
        .then(response => {
          if (response.data.status === 'success') {
            const newTopic = {
              id: topics.length + 1,
              ...postData,
              comments: []
            };
            setTopics([newTopic, ...topics]);
            Swal.fire('Success', response.data.message, 'success');
            setShowAddPostModal(false);
            setNewPost({ title: '', body: '' }); 
          } else {
            Swal.fire('Error', response.data.message, 'error');
          }
        })
        .catch(error => {
          Swal.fire('Error', 'Failed to add post', 'error');
        });
    } else {
      Swal.fire('Error', 'Title and body are required', 'error');
    }
  };

  const handleViewTopic = (topic) => {
    setSelectedTopic(topic);
    setComments(topic.comments || []);
    setNewComment('');
    setCurrentCommentPage(1); // Reset ke halaman pertama saat topik dipilih
  };

  const handleDeletePost = (topicId) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Post ini akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://fcollection.my.id/landing2/home/delete_post/${topicId}`)
          .then(response => {
            if (response.data.status === 'success') {
              setTopics(topics.filter(topic => topic.id !== topicId));
              setSelectedTopic(null); 
              Swal.fire('Dihapus!', 'Post berhasil dihapus.', 'success');
            } else {
              Swal.fire('Error', response.data.message, 'error');
            }
          })
          .catch(error => {
            Swal.fire('Error', 'Gagal menghapus post.', 'error');
          });
      }
    });
  };

  const handleEditPost = () => {
    setEditPostId(selectedTopic.id);
    setShowEditPostModal(true);
    setSelectedTopic(null);
    setNewPost({ title: selectedTopic.title, body: selectedTopic.body });
  };

  const handleSaveEditPost = () => {
    if (newPost.title.trim() && newPost.body.trim()) {
      axios.put(`https://fcollection.my.id/landing2/home/update_post/${editPostId}`, newPost)
        .then(response => {
          if (response.data.status === 'success') {
            setTopics(topics.map(topic => 
              topic.id === editPostId ? { ...topic, title: newPost.title, body: newPost.body } : topic
            ));
            setShowEditPostModal(false);
            setNewPost({ title: '', body: '' }); 
            Swal.fire('Success', 'Post berhasil diupdate.', 'success');
          } else {
            Swal.fire('Error', response.data.message, 'error');
          }
        })
        .catch(error => {
          Swal.fire('Error', 'Gagal mengupdate post.', 'error');
        });
    } else {
      Swal.fire('Error', 'Title dan body tidak boleh kosong.', 'error');
    }
  };

  const handleSaveComment = () => {
    if (newComment.trim()) {
      const commentData = {
        post_id: selectedTopic.id,
        comment: newComment,
        created_at: moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ssZ')
      };

      axios.post('https://fcollection.my.id/landing2/home/add_comment', commentData)
        .then(response => {
          if (response.data.status === 'success') {
            const newCommentObj = {
              comment: newComment,
              created_at: commentData.created_at
            };
            const updatedComments = [...comments, newCommentObj];
            setComments(updatedComments);
            setTopics(prevTopics =>
              prevTopics.map(topic =>
                topic.id === selectedTopic.id
                  ? { ...topic, comments: updatedComments }
                  : topic
              )
            );
            setNewComment('');
            setCurrentCommentPage(1); // Reset pagination ke halaman pertama setelah komentar ditambahkan
            Swal.fire('Success', 'Komentar berhasil ditambahkan', 'success');
          } else {
            Swal.fire('Error', response.data.message, 'error');
          }
        })
        .catch(error => {
          Swal.fire('Error', 'Failed to add comment', 'error');
        });
    } else {
      Swal.fire('Error', 'Komentar tidak boleh kosong.', 'error');
    }
  };

  const totalPages = Math.ceil(topics.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTopics = topics.slice(indexOfFirstPost, indexOfLastPost);

  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentCommentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateComments = (pageNumber) => setCurrentCommentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 relative pb-10">
      <h2 className="text-2xl font-bold mb-4">Forum Diskusi</h2>
      <div className="flex justify-between items-center mb-5">
        <button
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-200"
          onClick={() => {
            setNewPost({ title: '', body: '' });
            setShowAddPostModal(true);
          }}
        >
          Add Post
        </button>
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Topic cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8"> 
        {currentTopics.map(topic => (
          <div key={topic.id} className="bg-white rounded-lg shadow-lg p-6">
            <h5 className="text-lg font-semibold mb-2">{topic.title}</h5>
            <p className="text-gray-600 text-sm">
              {moment(topic.created_at).format('MM/DD/YYYY')} by: {topic.created_by}
            </p>
            <p className="text-gray-600 text-sm">
              {topic.comments.length} Comments
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => handleViewTopic(topic)}
            >
              Lihat Topik
            </button>
          </div>
        ))}

        {/* Fill empty cards to maintain grid structure */}
        {Array.from({ length: postsPerPage - currentTopics.length }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 opacity-0"></div>
        ))}
      </div>

      {/* Add Post Modal */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Tambah Post Baru</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="border rounded w-full py-2 px-3"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Body</label>
              <textarea
                id="body"
                className="border rounded w-full py-2 px-3"
                rows="5"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowAddPostModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddPost}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditPostModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="border rounded w-full py-2 px-3"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Body</label>
              <textarea
                id="body"
                className="border rounded w-full py-2 px-3"
                rows="5"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowEditPostModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveEditPost}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic and Comments Section */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 text-2xl font-bold hover:text-gray-900"
              onClick={() => setSelectedTopic(null)}
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">{selectedTopic.title}</h3>
            <p className="text-gray-600">
              {moment(selectedTopic.created_at).format('MM/DD/YYYY')} by: {selectedTopic.created_by}
            </p>
            <div className="overflow-y-auto max-h-60 border-t mt-4 pt-4">
              <p>{selectedTopic.body}</p>
            </div>

            {JSON.parse(localStorage.getItem('userData')).nama === selectedTopic.created_by && (
              <>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600 transition duration-200"
                  onClick={handleEditPost}
                >
                  Edit Post
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition duration-200 ml-2"
                  onClick={() => handleDeletePost(selectedTopic.id)}
                >
                  Hapus Post
                </button>
              </>
            )}

            <h4 className="text-lg font-bold mt-4 mb-2">Komentar:</h4>
            {comments.length === 0 ? (
              <p>Tidak ada komentar</p>
            ) : (
              currentComments.map((comment, index) => (
                <div key={index} className="bg-gray-200 rounded p-2 mb-2">
                  <p>{comment.comment.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                  <small>
                    {comment.created_at ? (
                      moment.tz(comment.created_at, 'Asia/Jakarta').format('MM/DD/YYYY, h:mm:ss A')
                    ) : (
                      "Tanggal tidak tersedia"
                    )}
                  </small>
                </div>
              ))
            )}
            <nav className="mt-2">
              <ul className="flex justify-center space-x-2">
                {[...Array(totalCommentPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      className={`px-3 py-2 rounded ${currentCommentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                      onClick={() => paginateComments(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <Editor
              apiKey="ymei22rk0pz98uvnbpelx1dujab24u1qevx7pe8g4h2uyfrr"
              value={newComment}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={(content) => setNewComment(content)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 transition duration-200"
              onClick={handleSaveComment}
            >
              Tambah Komentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
