import React, { useState, useEffect } from 'react';
import 'routes/css/Profile.css';

// 프로필 작성 컴포넌트 (미완성)
const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState('');

  // 프로필 사진 업로드 핸들러
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files[0]);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfilePhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 프로필 사진 Clear 핸들러
  const onClearAttachment = () => setProfilePhoto(null);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div id="profile-register-container">
        <div className="profile-register-header">
          <h1>프로필 작성</h1>
        </div>
        <div id="profile-register-body">
          <div id="profile-photo">
            <label for="profile-photo-input">
              사진 업로드
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </label>
            <input id="self-introduction-input" type="text" placeholder="소개말을 입력해주세요." />
            {profilePhoto && (
              <div>
                <img src={profilePhoto} width="200px" height="150px" />
                <button onClick={onClearAttachment}>지우기</button>
              </div>
            )}
          </div>
          <br />
          <div>
            <h3>관심질환 설정하기</h3>
            <span>고혈압 </span>
            <span>다이어트 </span>
            <span>당뇨 </span>
            <span>운동 </span>
          </div>
          <br />
          <div>
            <h3>우리동네 설정하기</h3>
            <input id="address-input" type="text" placeholder="거주지 주소를 입력해주세요." />
          </div>
          <br />
          <div id="doctor-validate">
            <h3>토닥터 인증</h3>
            <label for="doctor-validate-input">
              의사 면허증을 업로드해주세요. (.pdf 파일 형식만 가능)
              <input id="doctor-validate-input" type="file" accept=".pdf" />
            </label>
          </div>
        </div>
        <div id="profile-register-footer">
          <button>저장</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
