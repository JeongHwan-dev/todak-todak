import React from 'react';

// 프로필 작성 컴포넌트 (미완성)
const Profile = () => {
  return (
    <div className="profile-register-container">
      <div className="profile-register-header">
        <h1>프로필 작성</h1>
      </div>
      <div className="profile-register-body">
        <div>
          <input type="text" placeholder="소개말을 입력해주세요." />
        </div>
        <div>
          <h4>관심질환 설정하기</h4>
          <span>고혈압 </span>
          <span>다이어트 </span>
          <span>당뇨 </span>
          <span>운동 </span>
        </div>
        <div>
          <h4>우리동네 설정하기</h4>
          <input type="text" placeholder="거주지 주소를 입력해주세요." />
        </div>
        <div>
          <h4>토닥터 인증</h4>
          <input type="text" placeholder="의사 면허증을 업로드해주세요." />
        </div>
      </div>
      <div className="profile-register-footer">
        <button>저장</button>
      </div>
    </div>
  );
};

export default Profile;
