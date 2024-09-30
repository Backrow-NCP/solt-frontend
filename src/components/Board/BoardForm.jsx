import React, { useState, useEffect, useRef } from 'react';
import PlanPopup from './PlanPopup';
import {
  Form,
  InputGroup,
  TitleInput,
  ContentInput,
  ButtonGroup,
  Container,
  Title,
  SectionContainer,
  PlanStyledBox,
  HiddenFileInput,
  InputLabel,
  RemoveButton,
  ImageContainer,
  ImageThumbnail,
  ImageStyledBox,
  RemoveAllButton, // 모든 이미지 삭제 버튼 스타일 추가
} from '../../styles/board/boardForm';

const BoardForm = ({ onSubmit, buttonText }) => {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const imageContainerRef = useRef(null);

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = indexToRemove => {
    if (window.confirm('이 이미지를 정말로 제거하시겠습니까?')) {
      setSelectedFiles(prevFiles =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleRemoveAllFiles = () => {
    if (window.confirm('모든 이미지를 삭제하시겠습니까?')) {
      setSelectedFiles([]); // 모든 이미지 삭제
    }
  };

  const togglePopup = () => {
    if (!isButtonClicked) {
      setIsPopupOpen(!isPopupOpen);
    }
    setIsButtonClicked(false);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    togglePopup();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      title: boardTitle,
      content: boardContent,
      memberId: 1,
      boardImages: selectedFiles.map((file, index) => ({
        uuid: URL.createObjectURL(file),
        fileName: file.name,
        ord: index,
      })),
    };
    onSubmit(formData);
  };

  const handleScroll = e => {
    e.preventDefault();
    const container = imageContainerRef.current;
    if (container) {
      container.scrollLeft += e.deltaY; // 수직 스크롤을 좌우 스크롤로 변환
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const container = imageContainerRef.current;

    const checkScrollable = () => {
      if (container) {
        // 스크롤이 필요할 경우
        setScrollable(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable(); // 처음 렌더링 시 체크
    window.addEventListener('resize', checkScrollable); // 창 크기 변경 시 체크

    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [selectedFiles]); // selectedFiles가 변경될 때마다 체크

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <SectionContainer>
          <Title>나의 플랜</Title>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <InputLabel htmlFor="plan" onClick={handleButtonClick}>
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
        </SectionContainer>

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

        <SectionContainer style={{ alignItems: 'flex-end' }}>
          <Title>이미지 첨부</Title>
          <InputLabel htmlFor="file">파일 선택</InputLabel>
          <HiddenFileInput
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFileChange}
            multiple
          />
          {/* 이미지가 2개 이상일 때만 삭제 버튼 표시 */}
          {selectedFiles.length > 1 && (
            <RemoveAllButton type="button" onClick={handleRemoveAllFiles}>
              모든 이미지 삭제
            </RemoveAllButton>
          )}
        </SectionContainer>

        <ImageStyledBox
          ref={imageContainerRef} // ref 추가
          scrollable={scrollable} // 스크롤 가능 여부에 따라 scrollable prop 설정
        >
          {selectedFiles.length > 0 ? (
            selectedFiles.map((file, index) => (
              <ImageContainer key={index}>
                <ImageThumbnail
                  src={URL.createObjectURL(file)}
                  alt={`thumbnail-${index}`}
                />
                <RemoveButton
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                >
                  x
                </RemoveButton>
              </ImageContainer>
            ))
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
