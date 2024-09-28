import React, { useState } from 'react';
import PlanPopup from './PlanPopup';
import {
  Form,
  InputGroup,
  TitleInput,
  ContentInput,
  ButtonGroup,
  Container,
  Title,
  PlanSelect,
  PlanStyledBox,
  ImageStyledBox,
  HiddenFileInput,
  InputLabel,
  RemoveButton,
} from '../../styles/board/boardForm';

const BoardForm = ({ onSubmit, buttonText }) => {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = indexToRemove => {
    setSelectedFiles(prevFiles =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 게시글 데이터를 JSON으로 생성
    const formData = {
      title: boardTitle,
      content: boardContent,
      memberId: 1, // 예시로 고정 값, 실제로는 로그인된 사용자 정보
      boardImages: selectedFiles.map((file, index) => ({
        uuid: URL.createObjectURL(file),
        fileName: file.name,
        ord: index,
      })),
    };

    // onSubmit을 호출하면서 데이터를 넘겨줌
    onSubmit(formData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <PlanSelect>
          <Title>나의 플랜</Title>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <InputLabel htmlFor="plan" onClick={togglePopup}>
              플랜 선택
            </InputLabel>
            {isPopupOpen && (
              <PlanPopup
                onClose={closePopup}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '105%',
                }}
              />
            )}
          </div>
        </PlanSelect>

        <PlanStyledBox>선택된 플랜이 여기에 표시됩니다</PlanStyledBox>

        <InputGroup>
          <TitleInput
            type="text"
            id="title"
            value={boardTitle}
            onChange={e => setBoardTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <ContentInput
            id="content"
            value={boardContent}
            onChange={e => setBoardContent(e.target.value)}
            placeholder="내용을 입력하세요"
            required
            rows="5"
          />
        </InputGroup>

        <PlanSelect>
          <Title>이미지 첨부</Title>
          <InputLabel htmlFor="file">파일 선택</InputLabel>
          <HiddenFileInput
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFileChange}
            multiple
          />
        </PlanSelect>

        <ImageStyledBox>
          {selectedFiles.length > 0 ? (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                justifyContent: 'flex-start',
              }}
            >
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`thumbnail-${index}`}
                    style={{
                      width: '110px',
                      height: '110px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      padding: '10px 5px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={e => {
                      handleRemoveFile(index);
                    }}
                  >
                    <RemoveButton
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                    >
                      x
                    </RemoveButton>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>
              선택된 이미지가 없습니다
            </div>
          )}
        </ImageStyledBox>

        <ButtonGroup>
          <button type="button" className="btn_wht">
            취소
          </button>
          <button type="submit" className="btn_blue">
            {buttonText}
          </button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default BoardForm;
