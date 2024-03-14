import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPostThumbnail } from "../Util/utils";
import {Icon} from '@iconify/react';
import "./Main.css";

const Main = ( {loggedIn, handleLogout} ) => {
  //------------------------로그인로그인----------------
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState("");

  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출
  const handleLogin = () => {
    axios
      .post("http://localhost:8000/Login", {
        email: email,
        password: password,
      }) //회원 정보 email, password의 정보를 가져옴
      .then((response) => {
        console.log("서버 응답:", response);
        if (response.data.success) {
          const { userid, username } = response.data.data[0];
          const userData = {
            userid: userid,
            username: username,
          };
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userData", JSON.stringify(userData));
          navigate("/");
          window.location.reload();
        } else {
          // 로그인 실패 시 처리
          console.log("로그인 실패:", response.data);
          setloginStatus(response.data.message);
          alert("일치하는 유저가 없습니다. 다시 입력해 주세요")
        }
      });
  };

  // 
  // const renderContent = () => {
  //   if (!loggedIn) {
  //     // 로그인이 안되어 있는 경우
  //     return (
  //       <>
  //         {/* 로그인 아이디, 비밀번호 입력 폼 */}
  //         <div className="main-login-form--input-and-button">
  //         <input
  //           id="id"
  //           className="main-login__form--id"
  //           type="text"
  //           placeholder="아이디"
  //           value={email}
  //           onChange={(e) => setemail(e.target.value)}
  //         />
  //         <input
  //           type="password"
  //           className="main-login__form--password"
  //           placeholder="비밀번호"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <div className="main-login__form--button-box">
  //           {/* 로그인 버튼 */}
  //           <button className="main-login__form--button--login" onClick={handleLogin}>로그인</button>
  //           {/* 회원가입 링크 */}
  //           <button className="main-login__form--button--register" onClick={() => navigate("/RegisterPersonal")}>회원가입</button>
  //         </div>
  //         </div>
  //         {/* {loginStatus && <div className="main-login__form--message">{loginStatus}</div>} */}
  //       </>
  //     );
  //   } else {
  //     // 로그인이 되어 있는 경우
  //     return (
  //       <>
  //         <p>마이페이지</p>
  //         {/* 로그아웃 버튼 */}
  //         <button className="Btn" onClick={handleLogout}>
  //           로그아웃
  //         </button>
  //       </>
  //     );
  //   }
  // };
  //------------------------로그인 끝----------------

  //------------------------뉴스뉴스뉴스----------------
  const [news, setNews] = useState([]);

  // 뉴스 정보 가져오기
  useEffect(() => {
    // /news 엔드포인트에서 데이터를 가져오는 함수 호출
    axios
      .get("http://localhost:8000/news")
      .then((response) => {
        // 최신순으로 정렬
        const sortedNews = response.data.sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
        );
        setNews(sortedNews);
      })
      .catch((error) => {
        console.error("뉴스 데이터 불러오는 중 에러 발생:", error);
      });
  }, []);

  // 기사 클릭 시 조회수 증가(썸네일, 제목에 사용)
  const handleClick = (item) => {
    const clickedNews = news.map((n) =>
      n.newsid === item.newsid ? { ...n, views: n.views + 1 } : n
    );
    setNews(clickedNews);

    // 서버로 조회수 데이터 전송
    axios
      .post("http://localhost:8000/news/views", {
        newsid: item.newsid, // newsid 이름으로 기사 newsid 정보를 넘겨줌
        views: item.views + 1, // views라는 이름으로 기사 조회수 정보를 넘겨줌
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    // 기사 링크 열기
    window.open(item.url, "_blank");
  };

  const topFiveNews = news.slice(0, 5);
  //------------------------뉴스뉴스뉴스 끝----------------
  //------------------------워드클라우드----------------
  // 워드클라우드 이미지 다운로드
  const imageUrl = "http://localhost:3000/wc_image/result.png";

  const handleDownload = async () => {
    try {
      // 이미지 가져오기
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 파일 저장 위치 선택 및 파일 형식 지정
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "image.jpg",
        types: [
          { accept: { "image/jpeg": [".jpg"] } },
          { accept: { "image/png": [".png"] } },
        ],
      });

      // 사용자가 선택한 파일 핸들을 사용하여 파일을 저장합니다.
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(blob);
      await writableStream.close();
    } catch (error) {
      console.error("파일을 다운로드하는 동안 오류가 발생했습니다.", error);
    }
  };
  //------------------------워드클라우드 끝----------------
  //------------------------커뮤니티-----------------------
  const [topFivePosts, setTopFivePosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/Main")
      .then((response) => {
        setTopFivePosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching top four community posts:", error);
      });
  }, []);
  //-----------------------커뮤니티 끝----------------------

  return (
    <div className="main-page">
      <div className="wrap">
      {/* section-1__빵끗 의미 소개 */}
        <div className="main-section main-section-1">
          <div className="main-section-1-slogan-box">
            <p className="main-section-1-slogan__title">Bring Back A Natural, Green environment</p>
            <div>
            지속 가능한 미래를 위한<br/>
            탄소중립 실천<br/>
            빵끗과 함께 해요<br/>
            </div>
          </div>
          <div className="main-login-form">
          {loggedIn ? (
            <>
              <button className="button">마이페이지</button>
              {/* 로그아웃 버튼 */}
              <button className="button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* 로그인 아이디, 비밀번호 입력 폼 */}
              <div className="main-login-form--input-and-button">
                <input
                  id="id"
                  className="main-login__form--id"
                  type="text"
                  placeholder="아이디"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <input
                  type="password"
                  className="main-login__form--password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="main-login__form--button-box">
                  {/* 로그인 버튼 */}
                  <button className="main-login__form--button--login" onClick={handleLogin}>로그인</button>
                  {/* 회원가입 링크 */}
                  <button className="main-login__form--button--register" onClick={() => navigate("/RegisterPersonal")}>회원가입</button>
                </div>
              </div>
              {/* {loginStatus && <div className="main-login__form--message">{loginStatus}</div>} */}
            </>
          )}
            </div>
          <img
            src="/background_img/earth1.png"
            className="main-section-1__img--earth"
            alt="지구 이미지"
          />
        </div>
        {/* section-2__빵끗 제공 서비스 소개 */}
        <div className="main-section main-section-2 ">
        <div className="main-inner">
          <p className="main-header">탄소중립, 함께 실천해요</p>
          <div className="main-section-2-intro-box">
            <div className="main-section-2-intro main-intro__net-zero">
              <img src="/background_img/netzero1.png"
                   className="main-intro__img"
                   alt="CARBON NATURAL문구가 써진 탄소중립 이미지" />
              <p className="main-intro__title">탄소중립이란?</p>
              <div className="main-intro__content">탄소중립이 무엇인지, <br />
              어떻게 실천해야 하는지 알아봐요</div>
              <p className="main-intro__content main-intro__link" 
                 onClick={() => navigate("/NetZero")}>
                <Icon icon="ci:arrow-right-lg" className="main-intro__icon" />이동하기</p>
            </div>
            <div className="main-section-2-intro main-intro__news">
              <img src="/background_img/news7.png"
                   className="main-intro__img" 
                   alt="신문 이미지"/>
              <p className="main-intro__title">환경이슈</p>
              <div className="main-intro__content">하루 두 번, 오전 6시와 오후 6시
                <br />최신 환경 이슈들을 만나 봐요</div>
              <p className="main-intro__content main-intro__link"
                 onClick={() => navigate("/News")}>
                <Icon icon="ci:arrow-right-lg" className="main-intro__icon" />이동하기</p>
            </div>
            <div className="main-section-2-intro main-intro__community">
              <img src="/background_img/community3.png"
                   className="main-intro__img"
                   alt="지구촌 곳곳의 사람들이 서로 이야기하는 이미지"/>
              <p className="main-intro__title">커뮤니티</p>
              <div className="main-intro__content">자유롭게 소통해요<br/>
              탄소중립 실천 기록도 남기고, 고민도 나눠요</div>
              <p className="main-intro__content main-intro__link"
                 onClick={() => navigate("/Community")}>
                <Icon icon="ci:arrow-right-lg" className="main-intro__icon" />이동하기</p>
            </div>
          </div>
        </div>
        </div>
        {/* section-3__빵끗 핫이슈 */}
        <div className="main-section main-section-3">
        <div className="main-inner">
          <p className="main-header main-issue__header">오늘의 핫 이슈에요🔥</p>
            <div className="main-issue">
            <div className="main-issue-box">
              <p className="main-issue__name">지구촌 환경이슈</p>
              <img
                className="main-issue__wordcloud"
                src="./wc_image/result.png"
                alt="지구촌 환경이슈 워드 클라우드 이미지"
              />
              <button
                className="main-issue__wordcloud__button button"
                onClick={handleDownload}>
                이미지 다운로드
              </button>
            </div>
            <div className="main-issue-box">
              <p className="main-issue__name">최신뉴스 TOP5</p>
              <ul className="main-issue__list-box">
                {topFiveNews.map((item) => (
                  <li key={item.newsid} className="main-issue__list">
                    <a
                    className="main-issue__thumbnail-and-title-box"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(item)}>
                    <img
                    className="main-issue__thumbnail"
                    src={item.image_url}
                    alt="뉴스 썸네일"
                    onClick={() => handleClick(item)}/>
                    <span className="main-issue__title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="main-issue-box">
              <p className="main-issue__name">인기글 TOP5</p>
              <ul className="main-issue__list-box">
                {topFivePosts.map((post) => (
                  <li key={post.postid} className="main-issue__list">
                    <a 
                    className="main-issue__thumbnail-and-title-box main-issue__thumbnail-and-title-box--community"
                    href={`/Community/Read/${post.postid}`}
                    target="_self">
                    <img src={getPostThumbnail(post.content)}
                    className="main-issue__thumbnail main-issue__thumbnail--community" alt="게시물 썸네일"  />
                    <span className="main-issue__title main-issue__title--community">{post.title}</span>
                    </a>
                    <p className="main-issue__like">
                    <Icon icon="icon-park-outline:like" className='commu-post-list__icon'/>
                    {post.totalLikes}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            </div>
        </div>
        </div>
      </div>
      </div>
  );
};

export default Main;
