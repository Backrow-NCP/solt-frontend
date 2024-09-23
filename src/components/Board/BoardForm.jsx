import React, { useState } from 'react';

const BoardForm = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // 제출 시 서버에 데이터를 전송하는 로직을 추가할 수 있습니다.
    console.log('제출된 게시글:', { title: boardTitle, content: boardContent });

    // 제출 후 입력값 초기화
    setBoardTitle('');
    setBoardContent('');
  };

  return (
    <div style={styles.container}>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={boardTitle}
            onChange={e => setBoardTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={boardContent}
            onChange={e => setBoardContent(e.target.value)}
            required
            rows="5"
            style={styles.textarea}
          ></textarea>
        </div>

        <button type="submit" style={styles.button}>
          게시글 제출
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BoardForm;
