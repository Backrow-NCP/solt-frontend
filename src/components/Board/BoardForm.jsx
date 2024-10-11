import React, { useState, useEffect, useRef } from 'react';
import PlanPopup from './PlanPopup';
import Button from '../../components/Button';
import PlanSelectBox from './PlanSelectBox'; // PlanSelectBox 임포트
import {
  Form,
  InputGroup,
  TitleInput,
  ContentInput,
  ButtonGroup,
  Container,
  Title,
  SectionContainer,
  HiddenFileInput,
  InputLabel,
  RemoveButton,
  ImageContainer,
  ImageThumbnail,
  ImageStyledBox,
  RemoveAllButton,
} from '../../styles/board/boardForm';

const BoardForm = ({ onSubmit, buttonText, initialData }) => {
  const [boardTitle, setBoardTitle] = useState(initialData?.title || '');
  const [boardContent, setBoardContent] = useState(initialData?.content || '');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(
    initialData?.selectedPlan || null
  ); // 초기 선택된 플랜
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
    setIsPopupOpen(prev => !prev);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePlanSelect = plan => {
    setSelectedPlan(plan); // 선택된 플랜 상태 업데이트
    closePopup();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {
      title: boardTitle,
      content: boardContent,
      memberId: 1, // 임시 사용자 ID
      planId: selectedPlan.id,
      // selectedPlan, // 선택된 플랜 추가
      boardImages: selectedFiles.map((file, index) => ({
        uuid: URL.createObjectURL(file),
        fileName: file.name,
        ord: index,
      })),
    };

    try {
      // BoardForm에서 전달된 onSubmit을 호출하여 POST 또는 PUT 처리
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('게시글 전송 실패:', error);
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    const handleScroll = e => {
      e.preventDefault();
      if (container) {
        container.scrollLeft += e.deltaY; // 수직 스크롤을 좌우 스크롤로 변환
      }
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <SectionContainer>
          <Title>나의 플랜</Title>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <InputLabel htmlFor="plan" onClick={togglePopup}>
              플랜 선택
            </InputLabel>
            {isPopupOpen && (
              <PlanPopup
                onClose={closePopup}
                onSelect={handlePlanSelect} // 선택한 플랜을 부모에게 전달
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '105%',
                }}
              />
            )}
          </div>
        </SectionContainer>
        <PlanSelectBox selectedPlan={selectedPlan} />{' '}
        {/* 선택한 플랜을 표시하는 컴포넌트 */}
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
          {selectedFiles.length > 1 && (
            <RemoveAllButton type="button" onClick={handleRemoveAllFiles}>
              모든 이미지 삭제
            </RemoveAllButton>
          )}
        </SectionContainer>
        <ImageStyledBox
          ref={imageContainerRef}
          style={{ overflowX: 'auto', display: 'flex', alignItems: 'center' }}
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
          <Button type="button" color="white" size="lg">
            취소
          </Button>
          <Button type="submit" color="blue" size="lg">
            {buttonText}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default BoardForm;
