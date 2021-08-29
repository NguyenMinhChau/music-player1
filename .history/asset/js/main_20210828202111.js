const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const PLAYER_KEY = 'Music player';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const btnPlay = $('.btn-toggle-play');
const cd = $('.cd');
const progress = $('#progress');
const btnPrev = $('.btn-prev');
const btnRepeat = $('.btn-repeat');
const btnNext = $('.btn-next');
const btnRandom = $('.btn-random');
const playlist = $('.playlist');

const app = {
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    currentIndex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_KEY, JSON.stringify(this.config));
    },
    songs: [
        /**
         * 
         * image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/9/e/e/a9ee81fdd1c2b569c1c9631e969ea0aa.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
         *  ZGJHtLZnSibNhiFtHyDHkHTLCdGLCNdiH Rồi Tới Luôn Nal
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/1/7/c/517ca58e0bb720d2e469e96259ef2bdd.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
 LGxntkLGlRNWsLaymybGZmyZhBHkXNViG Sai Cách Yêu Lê Bảo Bình
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/2/6/1/d26117831a67fecf48f95c99823cecc6.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
 LHcHyLknghHapkhyHtFnZmTkCdHkCNBEn Khuê Mộc Lang Hương Ly, Jombie
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/c/9/a/bc9a9feaff8fe7bda8bc67621b8c1312.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
 LmJHyLkHhvDhW,
cAynTvHkmykgBnLXNdRH Em Hát Ai Nghe Orange
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/8/8/5/7885c2ade26fc2dd33a2c33638f5f72a.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
 kGcGTZkGphZFGmVtmtFnkHtZhdHLCaVEm Em Hứa Thế Nào Như Việt, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/9/c/0/79c0fe52e37b8bbe8d7134c028b13551.jpg?fs=MTYzMDE1NjU5MDE5M3x3ZWJWNHw,
 kHxGyZZGzhpNAciynTvHZmyZhdGZhaBiH Em Nào Có Tội Thương Võ, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/e/3/f/1e3ff6ba201610e2d0991b74266d7379.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kGcGtkZmWCbFsRcymyvHkHyZhdHZXNdiH Chiều Đồng Quê H2K
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/e/0/9/fe09fb3583e525d9c5c3619f446baae7.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmcGtkLmCVFWsgRymyFmLmyLCVHkCsVun Thú Tội Đạt G
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/9/3/d/e93da34adef7ef51f8d93dd43ee74368.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kGcGykLHNGHDaEztnyDmZnykhVHLXadRn Phải Nên Bắt Đầu Từ Đâu Hoài Lâm
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/2/1/8/421867a919958f9ed1297af009118747.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZGxHtLkHFJSLsFJynyvnZmyZCVGZhsdRG Sầu Tương Tư Nhật Phong
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 LmxHykknSZiGLukyGyDmZmtZhdmkXsdRm có hẹn với thanh xuân MONSTAR
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/b/3/3/8b337aca4250fde26de3dfb1d6eca697.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZmJHtkmRCkALLlpyGTFnkHyZhBHZCadim Cô Đơn Dành Cho Ai Lee Ken, Nal
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/2/d/1/92d1087e7b366b4cf7d1539d37e5f610.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZHcmtkkHvbXLWdvtHyFmLmtkhdHkhsdRm Bỏ Em Vào Balo Tân Trần, Freak D
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/e/f/1/9ef1a6784f9736d0102a5560483dd7a0.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 LnxHtZkmhbBVNLxyntbGLmtZXdnkhaVRH Chưa Từng Vì Nhau Karik, Vũ Phụng Tiên
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/8/7/a/487a6e3ecdeaf5a3fba40174108098d4.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmcnTLkHXbkpWJdyntvHLGyZhBmLCsViG Dắt Mẹ Đi Khắp Thế Gian Chi Dân
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/2/b/7/e2b77a0a5ede9764046294a20f767076.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kHxmyZkHvViXQiFyGyvmkntkhVHkCsVim Yêu Một Người Gian Dối Như Việt, Thương Võ, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/8/1/8/88186dc50283d484954a81d336c58fe8.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kHJHtLkGSQLDDpCTnyvmkHyZhBmLCNduH Phải Giữ Em Thế Nào Mr. Siro
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/5/3/5/9535cf2a5ebf34f486a42392f70a0dec.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmcHyLkHgCCGRBSymyvHLHTkhBHZXsBuH Bao Giờ Anh Quên Anh Quân Idol
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/9/4/d/a94d404a69d40e168ca844460c729aa5.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmJnyZZHkkQxxbxTmybHLGTZgBnLCsBiH Anh Thề Đấy Thanh Hưng
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/1/1/f/e11fe0da669959f8dbe4c4d305b8324f.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZmcGyZLmLWRDilBtHtFnkHtLgdmLgadRm Thương Thầm NB3 Hoài Bảo
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/6/7/5/9675faf09a3f6cc4e78b45c170bccd6c.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmxGTLkGQECmdQmyGtbGkHTkCBnZhsdRH Độ Tộc 2 Độ Mixi, Phúc Du, Pháo, Masew
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/d/e/0/0de0b18a91ceedd16bb42cc260210de3.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZnxmtZLmZHNzzpBtHtFmkHyZhBHkhNdum Đổi Tình Đổi Áo Đổi Anh Nguyễn Thành Đạt
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 kmcnykmihZxnbsbtGtvnkGtLgVHZCNdRm Hạ Còn Vương Nắng DatKaa, Kido
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/1/4/8/01489ff733fe577c0eea93c06ef3bead.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZHcnykZmznHlVbBtGyvmknyZgBmLCsdiG Cô Đơn Dành Cho Ai (Lofi Version) Lee Ken, Nal
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/5/f/3/65f316face040eb499884719b9d2c214.jpg?fs=MTYzMDE1NjU5MDE5NHx3ZWJWNHw,
 ZHxHtkLmCgCBxNGyGybmLnykhdHLCadin Khoan Thai Khải Đăng
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/c/0/a/7c0a59775515ddf9bc1b8a9a006d6b6d.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZnJHtZknppLJcnBtHybHkmtkhdHkgNdRH Đổi Tình Đổi Áo Gia Huy Singer
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/f/4/7/3f47b0c8cea593b6db4c3acade1bc498.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 knJHyZLHzZRdBEpymtbHLGyLhBHZgsBiH Hoàng Hoa Ký Long Nón Lá
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/7/2/0/3720acfa5e78a4dc04b35413e5101e5a.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kHcnTZLmdLcLLRHTHyDmLHtLhdmkXsdRH Lỗi Tại Anh Alex Lam
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/1/8/3/e18366f4c2ad897565185ea267444795.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZGxmtkLnCXgFaxbynTDnkHyZhBGkXaBiG 3 1 0 7 3 (CuCak Remix) W/N, Duongg, Nâu, titie
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/c/9/a/3c9a4bfc0eac279475dc08daa64441eb.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kmJmTZLmNnANbcFyHtFnZHtkhBnLhaBRm Xin Cúi Đầu, Xin Biết Ơn Đạt G
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/c/f/7/0cf704c73a2eb790d69a0aa1434ee699.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZGxHykkGgQpxsWRymyvGZmtLhVGLgNduH Yêu Ai Cũng Vậy Yêu Dùm Anh Đi Hồng Thanh
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/7/8/d/978d12830c18df95c26e93e658019166.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZmxnTkLmzWnvnNitHtDmLmyZhdmZXNVEn Phố Đã Lên Đèn (Masew Remix) Masew, Huyền Tâm Môn, Great
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/6/5/7/6657cb0713f758c68dc3b96f06bbf9d3.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kGcHTLZnAZbNxpZynyFGkmyZhdnLgadim Con Đò Lỡ Hẹn (Lofi Version) H2K, Kunzing
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/5/4/6/15464365b9ceaaa3410de8ed722f518a.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZHxHTkLmLdbabQZyntbmLGtLCBHZCsdiH Sợ Ta Mất Nhau Châu Khải Phong, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/b/c/c/3bcc9508a2f1b017534d08bc1a46a449.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZmcmyZLHCNaCcLEymyFmkmtZCVHZhaBRH Yêu Thương Tan Vỡ Huy Vạc
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/c/9/6/8c969b6c0ff48d261e4906f69a51bdba.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kHcHTkZmCRuxAZcyHtvnZmykgdmkhaBRm Cafe Đắng Và Mưa Minh Vương M4U, Hương Ly
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/4/3/6/44360199ed16ab52d9ae8daf7aa75960.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 LHJmtkkHCRBLCJztmyFmLHyLCBmkCsdRG Mày Của Hôm Nay Kidz
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/8/4/9/c8497a2b8f91e5ed5a06077fc8c078cf.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 ZHJmTLkGhscpHckyHtbnLHtkCBHLgsdin Thức Giấc (CuCak Remix) Da LAB
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/d/8/5/8d85956b2a97c740699d9a56e3a240bd.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kmxHyLLnQFHzJShtmtFmkHTkCdmLCsdRG Hương Tình Thân (Hương Vị Tình Thân OST) Lâm Bảo Ngọc
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/f/0/3/3f0398e6f0f9d9783b441fd1580e3dab.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 LGJHyknRiQQdFSntnybmLntkhdmLCsdiH Vách Ngọc Ngà (New Version) G5R Squad, Phan Ann
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/9/f/4/09f43804093fcd6d6d473e2270a719d4.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kHcHtkZmCngSVaCyHyDGZmtkhBHZCadEn Rồi Tới Luôn (Remix Version) Nal
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/4/c/c/14cccc3b14e60ee4d49de232743bf62e.jpg?fs=MTYzMDE1NjU5MDE5NXx3ZWJWNHw,
 kHxmtZZmWCNckFRtHtFHLmyLhBmZhaduH Muôn Kiếp Vấn Vương K-ICM, RYO
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/1/0/b/710b33e13a98b6943a7686243b50da33.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZmJGTZLHCddxnaZTntbHkGtLhBGkCNdiG Ôm Em Lần Cuối NIT, Sing
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/9/e/9/d9e901750b0205d7fd0cbc8bd87aea85.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kmJnyLkHHaNHpzdyGtbnZmykhdHZCNduG Sắp 30 Trịnh Đình Quang
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/3/b/d/93bdae6f46a032e1345263c1963c8865.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LncGtZLHVCpGxpHyHtvnZGtLCBmZCNdRn STAY The Kid LAROI, Justin Bieber
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/b/b/b/1bbb92a19f1acccbc5858393fef3af17.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kmcHyLkHhpRSFBgyGtFGkHTkCBmZgaBRm Quý Giá Đạt G
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/2/8/9/5/2895d9b833489a535f5c35b5114fd170.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kmcmtkLHvFpWHVbTHyvHkHykhdmZXaBRH Khi Thế Giới Đó Mất Đi (Gala Nhạc Việt) Tăng Phúc, Hương Ly
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/a/3/3/0a3369d62f70542728845dfe90758146.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LmcmtLkGWhZpzQEtmtDGZHTLhBmLhNBuH Ngã Đau Thiên Tú
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/a/1/a/aa1aa9276ddda9f826aca495038b06db.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kmcmtZZmALuQCxlynyFGkHyLCdnZhaBiH Kẻ Theo Đuổi Ánh Sáng Huy Vạc
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/5/7/7/b577c7ec5d9c7edb9935c93c9985d3d0.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LnxHyZkHQXkWLshymybmLmykhdHZCNBEm Đau Là Còn Thương Võ Kiều Vân
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/f/6/6/af669f1450c6addd87a437e3f001b5aa.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZmJGyLkmVEliQBHyGTbnZmyZXBmkhNdun Chim Quý Trong Lồng K-ICM, Văn Mai Hương
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/d/0/c/fd0c43ad1d2c2eb3b1e77e4c726bdac2.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZHJmTLkHkhdgbQQTHTFHZHyLhBHkCNVEm Lựa Chọn Của Anh Thương Võ, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/9/3/8/09384dd774ed59af7469e8a43df3adab.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LGxmyLLmpaRnvbWyHTDGkmtZgBmkCNVRH Cớ Sao Em Buồn Nguyễn Trọng Tài
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/e/0/c/6e0cd858976bcc029faafc731cdceb28.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZHcmTZkHCshJxLWtHtvmkmyLCdmZXadin Từ Khi Anh Ghé Qua K-ICM
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/4/1/d/641d68d59142f6d62ba5d87e79f052da.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZHJHTZZmhVdvmFSyHtvnLHtZCBnZCNBim Tận Cùng Cô Đơn Nguyễn Đình Vũ
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/1/4/5/d1454e79a8758e00d7c2452d4d794af9.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kHcGyLLmCBFCWZGymTbHZGyLXdmkCNdEn Tình Xa Lúc Ban Chiều K-ICM
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/a/4/f/ca4f788bb9126137e1a302130a4edbb4.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LGJnykZmWZkdQFvtmtDHZnyLCdmkgNBuH Tình Đơn Phương Nguyên., KOO
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/0/2/4/e024a8ef47798c4a86309494be03c2b1.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 kmJmtkLmlmNFJkByHyFnLHyLhVmZCNBiG Mất Nhau Yên Bình Vũ Quốc Hải, Dick
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/0/9/c/309cba39c974f227e179ad655adcecf1.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZmJHtkknCdbaSJLymybGLHtLhBHkXsdiH Trùng Dương Long Nón Lá, KayDee
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/d/2/b/6d2bd4d06412d8d0874b35b4dad12874.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 ZHcntkkmFBkmSkptGtFHZHtkCBGLCNBRm Xe Anh Đến Đâu Em Theo Đến Đó Dương Hoàng Yến, Đạt G
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/0/a/e/60ae4c9a54bf8800e89aa7339cff584c.jpg?fs=MTYzMDE1NjU5MDE5Nnx3ZWJWNHw,
 LnxntkkmXsXCHDntnTbmknyLhBnLgsVuH Một Thuở Yêu Người Vicky Nhung
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/e/2/d/de2d2cabc7953d07fad3d7ada7789f72.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 LncGykZmhgpumQgymTbHknyLCBHLhadum Tĩnh Lặng Chi Dân
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/d/6/7/ed673addb1b454bf4a37a9d344690617.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kmJmykkGAEZxAsnTGtDHZnyLXBmZhaBRH Em Sẽ Chờ Thảo Wendy
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/d/1/e/5d1eca1c4e55ec1e3db64ce29c58e2a5.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 LHxGyLHRidmsEHkTntFHkntZhdHLXNduH Lệ Duyên Tình K-ICM, Long Nón Lá
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/c/8/0/ec8080f5846156051f22d90959d4ff12.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kHcmyZkGpSQxQZcyHTFnZmtLXBmZCNdRn DUMB DUMB SOMI
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/f/1/a/1f1ab8428a983f8a7700bfaa5591713b.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZHcmykHEXmHbdphymtDGkGtZhBnkXaBRH Chỉ Là Không Cùng Nhau (Live Version) Tăng Phúc, Trương Thảo Nhi
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/2/b/8/c2b84561d1a4ad568c9a3ed870d2049d.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZHcGyZkmLQBXdLJtGyDmkHyZCVHLXsBim Anh Sẽ Để Em Đi Kidz
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/3/1/4/b314bf8ef523cf1ad124ffd482462cc8.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 LnJGtLLmbkFQHBWtGyDmkmtZgdHkhNBin Em Có Yêu Anh Không? Anh Quân Idol
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/0/c/9/f0c99531e8144c38740bbb9417279fa7.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 LHcHTLZnSnaFkSxtmTDGkHTLhBGZCNdiH Cố Gắng Vô Hình Văn Võ Ngọc Nhân, Vương Anh Tú
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/a/a/3/caa33fde7c86c0d0fc8842593b059f30.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 LnJGtZknCshdNibtHtDHZmTZXdnLCsdRH Hôm Nay Em Đẹp Lắm Tường Quân, TQE
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/2/c/a/52ca75e7aa937df8c3559dfd00585fbd.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZmJnyLZmzEkEAdQtGtFmkmtZCBHLhsdRn Kiêu (骁)/ Xiao Tỉnh Lung (Jing Long)
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/e/9/4/7e94b95743998a108ff33beed5bae5c3.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZncHyZZnBLLCRaQtHyFHLmtLCBGkgsdin Lần Hẹn Hò Đầu Tiên Huyền Tâm Môn
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/9/8/6/3986cf2e778348cb9b514f1787b10e77.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZmcGTLZnhW,
SnzuLymtbGZmtZhVnZhaVRm Gần Anh Hơn Đức Hati
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/7/0/c/670c0d435480b2eee62974f9ae984be9.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZHJGtLkHSSFBNsbyntvmZHyZhdnZCNVim Lý Do... Anh Bỏ Em Vào Balo Tân Trần
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/2/b/6/2/2b62681eb5f225949b1a3f2ed54c837f.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kHxGyLkGWNiShdWymtbmkHyLhdmLhadRH Anh Có Thể Đừng Rời Xa Em Được Không Thiên Tú
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/b/f/e/4bfe459ca565c3c6853bf3c98af481c7.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 ZncHyLknQRNzbNkTnTbmLmyLhdGLhNBin Xem Như Anh Chẳng May Trung Ngon, COCC
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/9/a/4/e9a49ec8996eb8208994810831eca730.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kHxHyLLGzSmCaJByHybGZHtZhdHZCadim Buông Tay Nhau Đi Thảo Wendy
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/0/2/c/e02cd4e0a723ed9b3510a95b5f6dbdd7.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kHcmtLkHDRhLXsXyHyFmknyLgVHkCaBEm Tay To Rapital, MCK, RPT PhongKhin
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/2/c/f/92cf9533fadd58123f71a4ae5bf3a962.jpg?fs=MTYzMDE1NjU5MDE5N3x3ZWJWNHw,
 kGJmTkknpXxLkHdTmTFmZnTZXBHZhNdEH Ta Nợ Nhau Một Đời Hạnh Phúc Đông Đặng
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/8/3/8/b8389a82a4e42b79e48f676a5e04e924.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LmcGTLLHzgWcEdFyHybHkHtkhVnZCsBEH Ngựa Ô Duyên Tình Phạm Sắc Lệnh, Jiren K
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/a/1/6/fa164a95ff18192a620942312675729a.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZncmtLkmFbmuaxztGyvnLmTLXBGLhadum Tình Yêu Ngủ Quên Hoàng Tôn, LyHan
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/9/d/6/89d611f9e2d0298bf6e6458ecf451741.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 kmxGyZLmpWkRdRmtGyDGLmTkXBHkgaBRn Sau Ngày Mưa Quang Đăng Trần
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/f/a/4/5fa4a1dc0db9be1b390b01bd9e42ce80.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 kmJGtkkHW,
WFhvCRyntFmLHtZCdHLCNBin Thì Thôi T-Passion, TVk
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/b/6/b/db6bafcc05f04fbe408c6acc36b7dcfb.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 knJHtZkGhbbSmDmTHtFHZmyLCBmLXsdum Sai Cách Yêu (Remix) Lê Bảo Bình
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/5/b/6/55b611a08fb842bf2555388eb52d5263.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZHxHTZLGpaHDBLztmTbmZHykCdHkhaBum Sài Gòn Ơi! Châu Khải Phong, ACV
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/6/9/b/569bdeb4071723d8a8ea4ac4ad1700ff.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZmcmtLknnxVJsJmyHyDHZntLhVHLCsBin Ngân Lang G5R Squad
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/7/b/5/b7b5b99e4aa374702ce8ee64858a9bbb.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LmJntLnEEWWaxhiymtvmLmyZgVHkXadRm Răng Khôn Phí Phương Anh, RIN9
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/2/9/c/129cb6b4f2a85ebb2b1d890ffd93f052.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LHcmyZkmkBvQcZxymyvnZHyLgdmLCsVim Càng Lớn Càng Cô Đơn JayKii
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/9/8/d/998dd7d002f3b4adb4cbccfcd76adffe.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LHcGyLLnzHXiSbAymtbmLHyZXVnkCNBin Cảm Ơn Anh Hoàng Yến Chibi
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/4/3/a/c43a3f7cc98ee9c62401edb8fb999b74.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZGxGyZGuiAFcFVxymyFnZmTLCVHLXNdiH Khi Em Lớn Orange, Hoàng Dũng
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/8/7/b/c87b071d6bcedee4dfb91ed28eaa24b9.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZGJHyZLmgXZnkpnymTbmLmykhdnLCaBiH Tao Lo Cho Mày Pjnboys, TamKe
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/a/1/a/ea1a0f537f0673fb1356a1ea58609d35.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LGJntkZmSXCmzXSTHyDHknTZhdmkCsdim Ai Mà Muốn Mình Cô Đơn Đâu Kidz
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/8/c/1/08c1b75c9d890bc527138226513fbf8e.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LnJHyZLnFvCGsdZtGtDHkHTLhBmZgsBiG Yếu Đuối Ai Xem JayKii
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/8/b/2/a8b2a716b46b88659bd0c7e5ae749f1d.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 kHcHtZZmhGhldNxtmtvHLmyLhBmkXaBRH Xin Vẫy Tay Chào Lưu Ánh Loan
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/f/f/0/cff0875b2d4de5cf4931f3739ee69e7a.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZmxGyZLHSznxdHQymTFHkntkgBmZCNBRG Đau Hơn Chữ Đau Phạm Nguyên Ngọc, B.
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/d/8/4/1d8407fabf75d52119c68b60aee68685.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 LGxmyLZmSbQWZBpyGtFmZmtZgdnLgsdRn Có Ai Cho Tôi Hay Trịnh Thăng Bình, XAN
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/1/a/c/91ac88e5cc2dc02264b0624b2ce25b9c.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 ZHJHyZLmWXcFZdBymybmLnTLCdnLgsBRH Chia Tay? Trung Tự
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/6/c/8/e6c863e57e27561e8c3abb66b5b85818.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 kHJHTLZGdhEkvHHyHtDHLmykCBmLCaBiH Ước Mơ Của Mẹ Vương Long
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/6/7/7/f677c471260b06f3961071f19b00f786.jpg?fs=MTYzMDE1NjU5MDE5OHx3ZWJWNHw,
 kmxnykLHClLVVGptHtbHknyZhBHkXsBum Giống Như Định Mệnh Nhật Kim Anh, Dương Hiếu Nghĩa
 
image: https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/4/1/b/341bcf486dac9f48837e17fecde775d6.jpg?fs=MTYzMDE1NjU5MDE5OXx3ZWJWNHw,
 LGxHykkHzZBVdRmyGyDGkHtLhBHkCNdim Một Khúc Sầu Vương Thiên Tú
         */
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
            name: 'Light It Up',
            singer: 'Robin Hustin x TobiMorrow',
            path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
        },
        {
            name: 'Yoru ni kakeru',
            singer: 'YOASOBI',
            path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },

        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
    ],
    render: function () {
        const htmls = this.songs.map((item, index) => {
            return `        
        <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''
                }">
            <div
                class="thumb"
                style="
                background-image: url('${item.image}');
            "
            ></div>
            <div class="body">
                <h3 class="title">${item.name}</h3>
                <p class="author">${item.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`;
        });
        playlist.innerHTML = htmls.join('');
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: 'rotate(360deg)',
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        //xử lý phóng to / thu nhỏ
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCDwidth = cdWidth - scrollTop;
            cd.style.width = newCDwidth > 0 ? newCDwidth + 'px' : 0;
            cd.style.opacity = newCDwidth / cdWidth;
        };
        //xử lý khi click play
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        //xử lý khi nhấn next songs
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            _this.scrollToActiveSong();
            audio.play();
        };
        //xử lý khi nhấn pre songs
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.preSong();
            }
            _this.scrollToActiveSong();
            audio.play();
        };
        //xử lý khi random
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('active', _this.isRandom);
        };
        //xử lý khi repeat
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRepeat.classList.toggle('active', _this.isRepeat);
        };
        // Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true;
            cdThumbAnimate.play();
            player.classList.add('playing');
        };
        // Khi bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            cdThumbAnimate.pause();
            player.classList.remove('playing');
        };
        // Bắt được tiến độ bài hát ở thanh progress khi play song
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercen = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercen;
            }
        };
        // Xử lý tua nhạc khi kéo thanh progress
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click();
            }
        };
        //lắng nghe click hành vi click vào playlist
        playlist.onclick = function (e) {
            let songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                }
                if (e.target.closest('.option')) {
                }
            }
        };
    },
    // Xử lý nút Random
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // Chuyển đến bài hát tiếp theo
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    // Trở về bài hát trước đó
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 300);
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    // Định nghĩa các thuộc tính cho object
    defineProperty: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (Number(song.getAttribute('data-index')) === this.currentIndex) {
                song.classList.add('active');
            }
        });
    },
    start: function () {
        this.loadConfig();
        btnRandom.classList.toggle('active', this.isRandom);
        btnRepeat.classList.toggle('active', this.isRepeat);
        // Định nghĩa các thuộc tính cho object
        this.defineProperty();
        //Lắng nghe / xử lý sự kiện (DOM events)
        this.handleEvents();
        //Tải thông tin bài hát đầu tiên khi mới chạy ứng dụng
        this.loadCurrentSong();
        //Render playlist
        this.render();
    },
};
app.start();
