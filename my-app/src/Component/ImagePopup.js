// ImagePopup.js

import { useState, useRef } from "react";
import axios from "axios";
import '../Styles/ImagePopup.css';
import Draggable from "./Draggable";

const ImagePopup = ({ userId, onClose, handleProfileImg }) => {
  // 이미지 URL 상태
  const [imageUrl, setImageUrl] = useState(""); 
  // file input 요소접근
  const fileInputRef = useRef(null); 

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('img', file);

    try {
      // const result = await axios.post('http://localhost:8000/my/profile/img', formData,
      const result = await axios.post(`http://localhost:8000/imgupdate/${userId}`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' }}
      );
      console.log('success: 서버응답', result.data);


      // 이미지가 존재하는 파일명으로 경로 수정 - *수정코드
      const imageUrl = `http://localhost:8000/public/userimg/${result.data}`;
      setImageUrl(imageUrl);
      handleProfileImg(imageUrl);
      // 업로드 성공 시 서버에서 받은 이미지 URL을 상태에 설정 - *오류코드
      // const imageUrl = `http://localhost:8000/my/profile/img/${result.data}`;
      
      
      // 이미지 URL을 부모 컴포넌트로 전달
      // handleProfileImg(`http://localhost:8000/my/profile/img/${result.data}`);
      // 이미지url 로컬스토리지 저장
      // localStorage.setItem('saveImgUrl', `http://localhost:8000/my/profile/img/${result.data}`);
      // localStorage.setItem('saveImgUrl', imgUrl);

    } catch (error) {
      console.error('이미지업로드: error', error);
      alert('이미지업로드: error');
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    } else {
      alert('이미지가 선택되지 않았습니다.');
    }
  };

// 이미지를 가져오는 함수 *수정중
const handleSaveImage = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/imgsave/${userId}`, {
      responseType: 'arraybuffer', // 이진 데이터로 처리 *추가
    });
    // const imageData = response.data; // 이미지 데이터
    const imageData = Buffer.from(response.data, 'binary').toString('base64');
    // 이미지 데이터를 상태에 설정하여 이미지를 표시합니다.
    // setImageUrl(imageData.path); // 예시: 서버로부터 받은 이미지 데이터에 따라서 설정
    const imageUrl = `data:image/png;base64,${imageData}`;
    setImageUrl(imageUrl); // 이미지 표시
  } catch (error) {
    console.error('이미지 가져오기 오류:', error);
    alert('이미지 가져오기 오류');
  }
};

  // 이미지를 서버에서 삭제
  // const handleImageDelete = async () => {
  //   try {
  //     await axios.delete('http://localhost:8000/imgdelete', {
  //       data: { imageUrl } // 이미지 URL을 서버에 전달하여 삭제
  //     });
  //     setImageUrl("");
  //     alert('이미지 삭제 완료');
  //   } catch (error) {
  //     console.error('이미지 삭제 오류:', error);
  //     alert('이미지 삭제 오류');
  //   }
  // };

  // 파일 선택 창 이벤트 버튼
  const handleUploadBtnRef = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.log('이미지업로드 버튼 참조 오류');
    }
  };


  return (
    <div className="Modal">
      <Draggable>
        <div className="ModalContent">
          <button onClick={onClose}>X</button>
          <br />
          {/* 업로드 버튼 참조 */}
          <button className="UploadBtn" onClick={handleUploadBtnRef}>이미지 업로드</button>
          {/* 파일 업로드 버튼 */}
          <input
            type="file"
            ref={fileInputRef} // useRef로 참조한 input요소
            name="image"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: "none" }} // input 요소 숨김
          /> 
          <br />
          {imageUrl && ( // 이미지 URL이 존재할 경우 이미지 표시
              <img className="ProfileImg" src={imageUrl} alt="이미지" />
          )}
          <button onClick={handleSaveImage}>저장</button>
          {/* <button onClick={handleImageDelete}>삭제</button> */}
        </div>
      </Draggable>
    </div>
  );
};

export default ImagePopup;


// ImagePopup.js

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import '../Styles/ImagePopup.css';
// import Draggable from "./Draggable";

// const ImagePopup = ({ onClose, handleProfileImg }) => {
//   // 이미지 URL 상태
//   const [imageUrl, setImageUrl] = useState(""); 
//   // file input 요소접근
//   const fileInputRef = useRef(null); 

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('img', file);

//     try {
//       const result = await axios.post('http://localhost:8000/my/profile/img', formData,
//       { headers: { 'Content-Type': 'multipart/form-data' }}
//       );
//       console.log('success: 서버응답', result.data);


//       // 이미지가 존재하는 파일명으로 경로 수정 - *수정코드
//       const imageUrl = `http://localhost:8000/public/userimg/${result.data}`;
//       setImageUrl(imageUrl);
//       handleProfileImg(imageUrl);
//       // 업로드 성공 시 서버에서 받은 이미지 URL을 상태에 설정 - *오류코드
//       // const imageUrl = `http://localhost:8000/my/profile/img/${result.data}`;
      
      
//       // 이미지 URL을 부모 컴포넌트로 전달
//       // handleProfileImg(`http://localhost:8000/my/profile/img/${result.data}`);
//       // 이미지url 로컬스토리지 저장
//       // localStorage.setItem('saveImgUrl', `http://localhost:8000/my/profile/img/${result.data}`);
//       // localStorage.setItem('saveImgUrl', imgUrl);

//     } catch (error) {
//       console.error('이미지업로드: error', error);
//       alert('이미지업로드: error');
//     }
//   };

//   const handleImageSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       handleUpload(file);
//     } else {
//       alert('이미지가 선택되지 않았습니다.');
//     }
//   };
  
//   // 이미지url을 상태에서 제거하는 함수
//   const handleImageDelete = () => {
//     setImageUrl("");
//     // 로컬스토리지에서 이미지url 제거
//     localStorage.removeItem('storageImg');
//   };

//   // 이미지url을 저장하는 함수
//   const handleSaveImage = () => {
//     // 이미지url이 존재할 경우에 저장
//     // key = saveImgUrl / value = imageUrl
//     if (imageUrl) {
//       localStorage.setItem('storageImg', imageUrl);
//       alert('이미지 저장');
//       onClose();
//     } else {
//       alert('이미지 없음');
//     }
//   };


//   // 파일 선택 창 이벤트 버튼
//   const handleUploadBtnRef = () => {
//     if(fileInputRef.current) {
//       fileInputRef.current.click();
//     } else {
//       console.log('이미지업로드 버튼 참조 오류');
//     }
//   };

//   useEffect(() => {
//     const savedImageUrl = localStorage.getItem('storageImg');
//     if (savedImageUrl) {
//       setImageUrl(savedImageUrl);
//     }
//   }, []);

//   return (
//     <div className="Modal">
//       <Draggable>
//         <div className="ModalContent">
//           <button onClick={onClose}>X</button>
//           <br />
//           {/* 업로드 버튼 참조 */}
//           <button className="UploadBtn" onClick={handleUploadBtnRef}>이미지 업로드</button>
//           {/* 파일 업로드 버튼 */}
//           <input
//             type="file"
//             ref={fileInputRef} // useRef로 참조한 input요소
//             name="image"
//             accept="image/*"
//             onChange={handleImageSelect}
//             style={{ display: "none" }} // input 요소 숨김
//           /> 
//           <br />
//           {imageUrl && ( // 이미지 URL이 존재할 경우 이미지 표시
//               <img className="ProfileImg" src={imageUrl} alt="이미지" />
//           )}
//           <button onClick={handleSaveImage}>저장</button>
//           <button onClick={handleImageDelete}>삭제</button>
//         </div>
//       </Draggable>
//     </div>
//   );
// };

// export default ImagePopup;
