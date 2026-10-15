/**
 * Pose Suggestions Data - Sourced from SnapPose real pose dataset
 */
export const POSE_SUGGESTIONS = [
  {
    id: 'ca-phe-nu-16',
    title: 'Ngồi bàn, cười với ống kính',
    category: 'Cà phê',
    icon: 'coffee',
    gender: 'Nữ',
    photoUrl: '/poses/ca-phe/nu/16-photo.jpg',
    skeletonUrl: '/poses/ca-phe/nu/16-skeleton.png',
    tags: ['Nửa người', 'Nhìn thẳng', 'Ngồi'],
    tips: 'Ngồi thẳng lưng, hai tay để hờ quanh ly nước, đầu hơi nghiêng và cười nhìn vào máy.',
    aiAnalysis: {
      lighting: 'Nắng dưới mái hiên',
      composition: 'Nửa người, ở giữa khung',
      mood: 'Vui, gần gũi'
    }
  },
  {
    id: 'bien-nu-30',
    title: 'Giữ mũ, bước dọc bờ biển',
    category: 'Biển',
    icon: 'waves',
    gender: 'Nữ',
    photoUrl: '/poses/bien/nu/30-photo.png',
    skeletonUrl: '/poses/bien/nu/30-skeleton.png',
    tags: ['Toàn thân', 'Đang bước', 'Có gió'],
    tips: 'Một tay giữ vành mũ, bước chéo chân về phía trước, mặt hơi quay đi để gió thổi váy.',
    aiAnalysis: {
      lighting: 'Nắng trưa, trời trong',
      composition: 'Toàn thân, biển làm nền',
      mood: 'Nhẹ nhàng'
    }
  },
  {
    id: 'cong-vien-nam-08',
    title: 'Tựa lan can, ngước nhìn hoa',
    category: 'Công viên',
    icon: 'trees',
    gender: 'Nam',
    photoUrl: '/poses/cong-vien/nam/08-photo.jpg',
    skeletonUrl: '/poses/cong-vien/nam/08-skeleton.png',
    tags: ['Toàn thân', 'Không nhìn máy', 'Mùa hoa'],
    tips: 'Tựa hông vào lan can, một tay chống ra sau, ngửa mặt nhìn lên tán hoa.',
    aiAnalysis: {
      lighting: 'Trời trong, nắng qua tán cây',
      composition: 'Lối đi dẫn mắt về người',
      mood: 'Thư thả'
    }
  },
  {
    id: 'selfie-nu-39',
    title: 'Selfie cầm kem',
    category: 'Selfie',
    icon: 'smartphone',
    gender: 'Nữ',
    photoUrl: '/poses/selfie/nu/39-photo.png',
    skeletonUrl: '/poses/selfie/nu/39-skeleton.png',
    tags: ['Selfie', 'Cận cảnh', 'Ngoài trời'],
    tips: 'Giơ máy cao ngang mắt, tay kia đưa cây kem lại gần khung hình, cười và nghiêng đầu nhẹ.',
    aiAnalysis: {
      lighting: 'Nắng chiếu xiên vào mặt',
      composition: 'Cận nửa người, biển phía sau',
      mood: 'Tươi, tinh nghịch'
    }
  }
];
