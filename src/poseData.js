/**
 * Pose Suggestions Data - Sourced from SnapPose real pose dataset
 */
export const POSE_SUGGESTIONS = [
  {
    id: 'cafe-nu-02',
    title: 'Cà Phê Tựa Cằm Trầm Tư',
    category: 'Quán Cà Phê',
    gender: 'Nữ',
    matchScore: 99,
    photoUrl: '/poses/ca-phe/nu/02-photo.png',
    skeletonUrl: '/poses/ca-phe/nu/02-skeleton.png',
    tags: ['Candid', 'Thanh lịch', 'Góc nghiêng'],
    tips: 'Khuỷu tay đặt nhẹ lên mặt bàn, mắt nhìn hướng ra cửa sổ để đón trọn ánh sáng tự nhiên.',
    aiAnalysis: {
      lighting: 'Ánh sáng cửa sổ tản 45°',
      composition: 'Quy tắc 1/3 góc trái',
      mood: 'Trầm ấm & Thư thái'
    }
  },
  {
    id: 'bien-nu-11',
    title: 'Hoàng Hôn Biển Gió Nhẹ',
    category: 'Bãi Biển',
    gender: 'Nữ',
    matchScore: 98,
    photoUrl: '/poses/bien/nu/11-photo.jpg',
    skeletonUrl: '/poses/bien/nu/11-skeleton.png',
    tags: ['Outdoor', 'Golden Hour', 'Tự do'],
    tips: 'Người nghiêng 30 độ về hướng mặt trời lặn, một tay vuốt tóc nhẹ đón gió biển.',
    aiAnalysis: {
      lighting: 'Ánh sáng ngược viền tóc (Rim light)',
      composition: 'Đường chân trời ngang ngực',
      mood: 'Lãng mạn & Điện ảnh'
    }
  },
  {
    id: 'cong-vien-nu-01',
    title: 'Dạo Bước Công Viên Nắng Sớm',
    category: 'Công Viên',
    gender: 'Nữ',
    matchScore: 97,
    photoUrl: '/poses/cong-vien/nu/01-photo.png',
    skeletonUrl: '/poses/cong-vien/nu/01-skeleton.png',
    tags: ['Tự nhiên', 'Năng động', 'Toàn thân'],
    tips: 'Chân bước tự nhiên, váy xoè nhẹ, nụ cười tươi nhìn lướt qua ống kính.',
    aiAnalysis: {
      lighting: 'Nắng xuyên kẽ lá (Dappled light)',
      composition: 'Toàn thân trung tâm phối cảnh sâu',
      mood: 'Tươi tắn & Trẻ trung'
    }
  },
  {
    id: 'ca-phe-nam-04',
    title: 'Tự Lưng Đọc Sách Góc Phố',
    category: 'Quán Cà Phê',
    gender: 'Nam',
    matchScore: 99,
    photoUrl: '/poses/ca-phe/nam/04-photo.jpg',
    skeletonUrl: '/poses/ca-phe/nam/04-skeleton.png',
    tags: ['Lịch lãm', 'Tối giản', 'Góc 3/4'],
    tips: 'Lưng tựa thoải mái vào ghế, hai tay cầm cốc cà phê hoặc cuốn sổ, mắt nhìn lơ đãng.',
    aiAnalysis: {
      lighting: 'Đèn vàng ấm indoor kết hợp bóng đổ mềm',
      composition: 'Tam giác cân đối cơ thể',
      mood: 'Điềm tĩnh & Trưởng thành'
    }
  },
  {
    id: 'selfie-nu-02',
    title: 'Selfie Góc Nghiêng 45° Ánh Sáng',
    category: 'Selfie',
    gender: 'Nữ',
    matchScore: 98,
    photoUrl: '/poses/selfie/nu/02-photo.jpg',
    skeletonUrl: '/poses/selfie/nu/02-skeleton.png',
    tags: ['Cận cảnh', 'Sáng da', 'Duyên dáng'],
    tips: 'Nâng máy hơi cao hơn tầm mắt 15 độ, đầu hơi nghiêng nhẹ sang bên mặt đẹp nhất.',
    aiAnalysis: {
      lighting: 'Catchlight tròn lấp lánh trong mắt',
      composition: 'Cận cảnh tỷ lệ vàng khuôn mặt',
      mood: 'Ngọt ngào & Rạng rỡ'
    }
  }
];
