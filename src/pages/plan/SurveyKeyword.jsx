import { useState, useEffect } from 'react';

const SurveyKeyword = ({ onKeywordSelect, savedKeywords }) => {
  const travelStyles = [
    { id: 1, name: '😎 여유롭게 즐겨요' },
    { id: 2, name: '🎒 부지런히 움직여요' },
    { id: 3, name: '☀️ 아침형 인간이에요' },
    { id: 4, name: '🌙 저녁형 인간이에요' },
  ];
  const travelThemes = [
    { id: 1, name: '😋 맛집에 관심 있어요' },
    { id: 2, name: '☕ 카페를 좋아해요' },
    { id: 3, name: '🏊 액티비티를 즐겨요' },
    { id: 4, name: '🔎 역사에 관심 있어요' },
    { id: 5, name: '🛍️ 쇼핑을 좋아해요' },
  ];
  const travelEnvirons = [
    { id: 1, name: '💸 가성비가 중요해요' },
    { id: 2, name: '🌆 풍경이 좋아요' },
    { id: 3, name: '😌 조용한 곳이 좋아요' },
    { id: 4, name: '🏙️ 도시가 좋아요' },
    { id: 5, name: '⛰️ 자연이 좋아요' },
  ];

  const [selectedStyles, setSelectedStyles] = useState(savedKeywords?.travelStyle || []);
  const [selectedThemes, setSelectedThemes] = useState(savedKeywords?.theme || []);
  const [selectedEnvirons, setSelectedEnvirons] = useState(savedKeywords?.environment || []);

  // 주제별로 최소 1개 선택 여부 확인
  useEffect(() => {
    const isStylesSelected = selectedStyles.length > 0;
    const isThemesSelected = selectedThemes.length > 0;
    const isEnvironsSelected = selectedEnvirons.length > 0;

    if (isStylesSelected && isThemesSelected && isEnvironsSelected) {
      const selectedKeywords = {
        travelStyle: selectedStyles,
        theme: selectedThemes,
        environment: selectedEnvirons,
      };
      onKeywordSelect(selectedKeywords); // 상태가 선택된 후 한 번만 호출 (여기 이슈 생김 !!)
    }
  }, [selectedStyles, selectedThemes, selectedEnvirons, onKeywordSelect]);

  // 항목 선택 처리
  const handleSelect = (category, item) => {
    switch (category) {
      case 'travelStyle':
        setSelectedStyles(prev =>
          prev.some(style => style.id === item.id)
            ? prev.filter(style => style.id !== item.id)
            : [...prev, item]
        );
        break;
      case 'theme':
        setSelectedThemes(prev =>
          prev.some(theme => theme.id === item.id)
            ? prev.filter(theme => theme.id !== item.id)
            : [...prev, item]
        );
        break;
      case 'environment':
        setSelectedEnvirons(prev =>
          prev.some(env => env.id === item.id)
            ? prev.filter(env => env.id !== item.id)
            : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="survey_cont">
        <div className="keyword_list flex">
          {/* 여행 스타일 */}
          <div className="keyword_styles">
            <h3>여행 스타일</h3>
            <ul>
              {travelStyles.map((style) => (
                <li key={style.id}>
                  <button
                    className={selectedStyles.some(s => s.id === style.id) ? "active" : ""}
                    onClick={() => handleSelect("travelStyle", style)}
                  >
                    {style.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 여행 테마 */}
          <div className="keyword_themes">
            <h3>테마</h3>
            <ul>
              {travelThemes.map((theme) => (
                <li key={theme.id}>
                  <button
                    className={selectedThemes.some(t => t.id === theme.id) ? "active" : ""}
                    onClick={() => handleSelect('theme', theme)}
                  >
                    {theme.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 여행 환경 */}
          <div className="keyword_environ">
            <h3>환경</h3>
            <ul>
              {travelEnvirons.map((env) => (
                <li key={env.id}>
                  <button
                    className={selectedEnvirons.some(e => e.id === env.id) ? "active" : ""}
                    onClick={() => handleSelect('environment', env)}
                  >
                    {env.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyKeyword;
